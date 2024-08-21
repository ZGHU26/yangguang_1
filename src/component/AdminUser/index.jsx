import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, message,Pagination} from 'antd';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '@/translations';
import "./index.css"
const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [actionType, setActionType] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    fetchUserInfo();
  }, [token]);

  const fetchUserInfo = async () => {
    try {
    const response = await axios.get('http://127.0.0.1:5000/admin/usermanagement',{
    
      headers: {
        'Authorization': `Bearer ${token}`
      }});
    if (response.data.is_admin) {
      setUsers(response.data.users)
    } else {
      setUsers([]);
    }
  } catch (error) {
  }
};

  const handleAddUser = () => {
    setActionType('add');
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleDeleteUser = (username) => {
    Modal.confirm({
      title: t('Delete'),
      content:`${t('Areyousureyouwanttodelete')} ${username}?`,
      cancelText: t('Cancel'), // 自定义 Cancel 按钮文本
      okText: t('OK'), // 自定义 OK 按钮文本
      onOk: async () => {
        try {
          await axios.post('http://127.0.0.1:5000/admin/usermanagement', {
            action: 'delete_user',
            username,
          });
            message.success('User deleted successfully');
            fetchUserInfo();
          
        } catch (error) {
          message.error('Failed to delete user');
        }
      },
    });
  };


  const handleModifyPassword = (user) => {
    setActionType('modify');
    setSelectedUser(user);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (actionType === 'add') {
        await axios.post('http://127.0.0.1:5000/admin/usermanagement', {
          action: 'add_user',
          username: values.username,
          password: values.password,
          userlevel: values.userlevel || 'user'
        });
        message.success (t('Useraddedsuccessfully'));
      } else if (actionType === 'modify') {
        await axios.post('http://127.0.0.1:5000/admin/usermanagement', {
          action: 'modify_user_password',
          username: selectedUser.username,
          new_password: values.password,
        });
        message.success(t('Passwordmodifiedsuccessfully'));
      }
      fetchUserInfo();
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to perform action');
    }
  };
  const handleApproveUser = async (username) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/admin/usermanagement', {
        action: 'approve_user',
        username: username
      });
      message.info(response.data.message);
      fetchUserInfo();
      alert(response.data.message); // 根据后端返回的消息显示弹窗或者其他反馈
      // 可以根据返回的消息做进一步的处理，例如更新界面状态等
  
    } catch (error) {
      console.error('Error approving user:', error);
      message.error(t('Errorapprovinguser'));
      // 处理错误情况
    }
  };
  
  const handleRejectUser = async (username) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/admin/usermanagement', {
        action: 'reject_user',
        username: username
      });
      message.info(response.data.message);
      fetchUserInfo();
      alert(response.data.message); // 根据后端返回的消息显示弹窗或者其他反馈
      // 可以根据返回的消息做进一步的处理，例如更新界面状态等
  
    } catch (error) {
      console.error('Error rejecting user:', error);
      message.error(t('Errorrejectinguser'));
      // 处理错误情况
    }
  };

  const columns = [
    { title: t('username'), dataIndex: 'username', key: 'username', align: 'center' },
    { title: t('userlevel'), dataIndex: 'userlevel', key: 'userlevel', align: 'center' },
    { title: t('admin_approved'), 
      dataIndex: 'admin_approved', 
      key: 'admin_approved', 
      align: 'center',
      render: (text, record) => (
        <>
          {text === 'approved' ? (
            <span>{t('Approved')}</span>
          ) : text === 'pending' ? (
            <>
              <Button type="primary" onClick={() => handleApproveUser(record.username)}>{t('Approve')}</Button>
              <Button danger onClick={() => handleRejectUser(record.username)}>{t('Reject')}</Button>
            </>
          ) : (
            <span>{t('None')}</span>
          )}
        </>
      ),
    },
    {
      title: t('Action'),
      align: 'center' ,
      key: 'action',
      render: (text, record) => (
        <span className='action1'>
          <Button onClick={() => handleModifyPassword(record)}>{t('ModifyPassword')}</Button>
          <Button danger onClick={() => handleDeleteUser(record.username)}>{t('Delete')}</Button>
        </span>
      ),
    },
  ];
  const handleLogout = () => {
    navigate('/page');
  };
  return (
    <div className='adminsysteme'>
       <div className='container1'>
    <h3 className='zitih2'>管理用户</h3>
    <Button className="button2"  onClick={handleLogout}>{t('Logout')}</Button>
    <Button className="button3" type="primary" onClick={handleAddUser}>{t('AddUser')}</Button>
    <div className='Table1'>  
      <Table pagination={{ pageSize: 6 }}
            columns={columns}
            dataSource={users}
            rowKey="username"
            loading={loading}
            style={{width:'100%',height:"100%"
      }}/>
     
      <Modal
        title={actionType === 'add' ? t('AddUser') : t('ModifyPassword')}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <div className="custom-footer">
            <Button key="ok"  type="primary" onClick={handleModalOk}>
            {t('OK')}
          </Button>,
         
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            {t('Cancel')}
          </Button>
          </div>,
        ]}
      >
        <Form form={form} layout="vertical">
          {actionType === 'add' && (
            <div className='adduser'>
              <Form.Item name="username" label={t("username")} rules={[{ required: true, message: 'Please input the username!' }]}>
                <Input />
              </Form.Item>
            </div>
          )}
          <Form.Item name="password"  label={t("password")} rules={[{ required: true, message: 'Please input the password!' }]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
    </div>
    </div>
  );
};

export default AdminUserManagement;
