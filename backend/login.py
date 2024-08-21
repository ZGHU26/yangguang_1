from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import hashlib
import os
import jwt
import datetime

app = Flask(__name__,static_url_path='/')
CORS(app )

CSV_FILE = 'backend/users.csv'
SECRET_KEY = os.urandom(32)

# 辅助函数：验证JWT token
def verify_token(token):
    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        username = decoded['username']
        return username
    except jwt.ExpiredSignatureError:
        return None  # Token过期
    except jwt.InvalidTokenError:
        return None  # Token无效
# 创建CSV文件如果不存在
if not os.path.exists(CSV_FILE):
    with open(CSV_FILE, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['username', 'password', 'token', 'userlevel', 'admin_approved'])

# 哈希密码函数
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# 检查用户名是否存在
def username_exists(username):
    try:
        with open(CSV_FILE, mode='r', newline='') as file:
            reader = csv.reader(file)
            for row in reader:
                if row and row[0] == username:
                    return True
    except Exception as e:
        print(f"Error reading CSV file: {e}")
    return False

# 将token写入CSV文件的函数
def write_token_to_csv(username, token):
    try:
        data = []
        with open(CSV_FILE, mode='r', newline='') as file:
            reader = csv.reader(file)
            for row in reader:
                data.append(row)

        updated = False
        for row in data:
            if row[0] == username:
                row[2] = token
                updated = True
                break

        if not updated:
            data.append([username, '', token, 'user', '', ''])  

        with open(CSV_FILE, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerows(data)

        print(f"Successfully updated token for user: {username}")
    except Exception as e:
        print(f"Error writing token to CSV file: {e}")
# 计算管理员数量
def count_admins():
    count = 0
    try:
        with open(CSV_FILE, mode='r', newline='') as file:
            reader = csv.reader(file)
            for row in reader:
                if row and row[3] == 'admin' and row[4] == 'approved':
                    count += 1
    except Exception as e:
        print(f"Error counting admins: {e}")
    return count
# 处理登录的路由
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    hashed_password = hash_password(password)

    try:
        with open(CSV_FILE, mode='r', newline='') as file:
            reader = csv.reader(file)
            for row in reader:
                if row and row[0] == username and row[1] == hashed_password:
                    token = jwt.encode({'username': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, SECRET_KEY, algorithm='HS256')
                    write_token_to_csv(username, token)
                    userlevel = row[3]
                    response = jsonify({'message': 'Login successful', 'token': token, 'userlevel': userlevel})
                    return response, 200
    except Exception as e:
        print(f"Error reading or writing CSV file: {e}")
        return jsonify({'message': 'Error logging in'}), 500

    return jsonify({'message': 'Invalid username or password'}), 401

# 验证token的路由
@app.route('/check_token', methods=['POST'])
def check_token():
    data = request.json
    token = data.get('token')

    if not token:
        return jsonify({'status': 'failed'}), 401

    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        username = decoded['username']

        with open(CSV_FILE, mode='r', newline='') as file:
            reader = csv.reader(file)
            for row in reader:
                if row and row[0] == username and row[2] == token:
                    return jsonify({'status': 'success', 'username': username}), 200

        return jsonify({'status': 'failed', 'message': 'Invalid token'}), 401

    except jwt.ExpiredSignatureError:
        return jsonify({'status': 'failed', 'message': 'Token expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'status': 'failed', 'message': 'Invalid token'}), 401
    except Exception as e:
        print(f"Error while validating token: {e}")
        return jsonify({'status': 'failed', 'message': 'Token validation failed'}), 500
    

# 处理注册的路由
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    userlevel = data.get('userlevel', 'user')
    admin_approved =data.get("admin_approved","None")
    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    if username_exists(username):
        return jsonify({'message': 'Username already exists'}), 400

    hashed_password = hash_password(password)
    try:
        with open(CSV_FILE, mode='a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([username, hashed_password, '', userlevel,admin_approved])  
            file.flush()
            print(f"Registered user: {username}")
            
    except Exception as e:
        print(f"Error writing to CSV: {e}")
        return jsonify({'message': 'Error registering user'}), 500
    return jsonify({'message': 'Registration successful'}), 201
#----------------------------------------管理人员------------------------------
@app.route('/register/admin', methods=['POST'])
def register_admin():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'message': '用户名和密码不能为空'}), 400

    if username_exists(username):
        return jsonify({'message': '用户名已存在'}), 400

    hashed_password = hash_password(password)
    # 如果是第一次注册管理员
    if count_admins() == 0:
        userlevel = 'admin'
        admin_approved = 'approved'
    else:
        userlevel = 'admin'
        admin_approved = 'pending'
    try:
        with open(CSV_FILE, mode='a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([username, hashed_password, '', userlevel, admin_approved])
            file.flush()
            print(f"注册管理员: {username}")

    except Exception as e:
        print(f"写入CSV时出错: {e}")
        return jsonify({'message': '注册管理员失败'}), 500

    return jsonify({'message': '管理员注册成功'}), 201
#-------------------------------管理人员功能----------------------------#
@app.route("/admin/usermanagement", methods=['GET','POST'])
def admin_user_management():
    if request.method == 'GET':
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Missing token'}), 401
        token = token.split()[1]
        username = verify_token(token) 
        if not username:
            return jsonify({'message': 'Invalid token'}), 401
        try:
           
            users = []
            with open(CSV_FILE, mode='r', newline='') as file:
                reader = csv.reader(file)
                next(reader) 
                for row in reader:
                     if len(row) >= 4:
                        users.append ({
                            'username': row[0],
                            'password': row[1],
                            'token': row[2],
                            'userlevel': row[3],
                            'admin_approved': row[4]  
                        })
                current_user = next((user for user in users if user['username'] == username and user['userlevel'] == 'admin' and user['admin_approved'] == 'approved'), None)
                if current_user:
                        filtered_users = [user for user in users if (user['userlevel'] == 'admin' and user['admin_approved'] == 'pending') or (user['userlevel'] == 'user'and user['admin_approved'] == "None")]
                        return jsonify({'message': 'Successfully retrieved user information','users': filtered_users, 'is_admin': True,}), 200
                else:
                        return jsonify({'message': 'Unauthorized access'}), 403
        except FileNotFoundError:
                    return jsonify({'User information file not found'}), 404
        except Exception as e:
                    return jsonify({'message': 'Error while fetching user information', 'error': str(e)}), 500
#------------------------------------添加用户-------------------------#
    elif request.method == 'POST':
            data = request.json
            action = data.get('action')

            if action == 'add_user':
                username = data.get('username')
                password = data.get('password')
                userlevel = data.get('userlevel', 'user')

                if not username or not password:
                    return jsonify({'message': '用户名和密码不能为空'}), 400

                if username_exists(username):
                    return jsonify({'message': '用户名已存在'}), 400

                hashed_password = hash_password(password)

                try:
                    with open(CSV_FILE, mode='a', newline='') as file:
                        writer = csv.writer(file)
                        writer.writerow([username, hashed_password, '', userlevel, 'None'])
                        file.flush()
                        print(f"管理员添加用户: {username}")
                except Exception as e:
                    print(f"Error writing to CSV: {e}")
                    return jsonify({'message': '添加用户失败'}), 500

                return jsonify({'message': '用户添加成功'}), 201
#----------------------------------删除用户---------------------------------#
            elif action == 'delete_user':
                username = data.get('username')
                deleted = False
                rows_to_keep = []
                with open(CSV_FILE, mode='r', newline='') as file:
                    reader = csv.reader(file)
                    for row in reader:
                        if row and row[0] == username:
                            deleted = True
                        else:
                           rows_to_keep.append(row)
                if not deleted:
                    return jsonify({'message': '用户不存在'}), 404

                with open(CSV_FILE, mode='w', newline='') as file:
                    writer = csv.writer(file)
                    writer.writerows(rows_to_keep)
                return jsonify({'message': '用户删除成功'}), 200
#----------------------------------------修改密码--------------------------------#
            elif action == 'modify_user_password':
                username = data.get('username')
                new_password = data.get('new_password')

                if not username or not new_password:
                    return jsonify({'message': '用户名和新密码不能为空'}), 400

                hashed_password = hash_password(new_password)

                data = []
                updated = False

                with open(CSV_FILE, mode='r', newline='') as file:
                    reader = csv.reader(file)
                    for row in reader:
                        if row and row[0] == username:
                            row[1] = hashed_password
                            updated = True
                        data.append(row)

                if not updated:
                    return jsonify({'message': '用户不存在'}), 404

                with open(CSV_FILE, mode='w', newline='') as file:
                    writer = csv.writer(file)
                    writer.writerows(data)

                print(f"管理员修改用户密码: {username}")
                return jsonify({'message': '用户密码修改成功'}), 200
            
#--------------------------------------同意成为管理员---------------------------------#

            elif action == 'approve_user':
                username = data.get('username')

                if not username:
                    return jsonify({'message': '用户名不能为空'}), 400

                updated = False
                data = []
                with open(CSV_FILE, mode='r', newline='') as file:
                    reader = csv.reader(file)
                    for row in reader:
                        if row and row[0] == username and row[3] == 'admin' and row[4] == 'pending':
                            row[4] = 'approved'
                            updated = True
                        data.append(row)

                if not updated:
                    return jsonify({'message': '用户不存在或不在待审核列表中'}), 404

                with open(CSV_FILE, mode='w', newline='') as file:
                    writer = csv.writer(file)
                    writer.writerows(data)

                print(f"管理员同意用户申请成为管理员: {username}")
                return jsonify({'message': '欢迎成为管理员'}), 200

            elif action == 'reject_user':
                username = data.get('username')

                if not username:
                    return jsonify({'message': '用户名不能为空'}), 400

                updated = False
                data = []
                with open(CSV_FILE, mode='r', newline='') as file:
                    reader = csv.reader(file)
                    for row in reader:
                        if row and row[0] == username and row[3] == 'admin' and row[4] == 'pending':
                            row[4] = 'rejected'
                            updated = True
                        data.append(row)

                if not updated:
                    return jsonify({'message': '用户不存在或不在待审核列表中'}), 404

                with open(CSV_FILE, mode='w', newline='') as file:
                    writer = csv.writer(file)
                    writer.writerows(data)

                print(f"管理员拒绝用户申请成为管理员: {username}")
                return jsonify({'message': '管理员拒绝了你的请求'}), 200

            else:
                return jsonify({'message': '未知操作'}), 400

    else:
                return jsonify({'message': '未知操作'}), 400



if __name__ == '__main__':
    app.run(debug=True)
