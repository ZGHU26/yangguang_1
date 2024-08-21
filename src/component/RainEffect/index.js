import "./index.css"
export function createRainEffect(canvas) {
    // demo 对象保存了整个雨效果的状态和配置
    const demo = {
        speed: 1, // 控制雨滴速度的因子
        color: {
            r: '80', 
            g: '175',
            b: '255',
            a: '0.5'
        },
        started: false, // 标识雨效果是否已经启动
        ctx: null, // canvas 的渲染上下文
        width: 0, // canvas 的宽度
        height: 0, // canvas 的高度
        dpr: window.devicePixelRatio || 1, // 设备像素比，用于高清显示
        drop_time: 0, // 控制雨滴生成的时间
        drop_delay: 25, // 控制雨滴的生成频率，值越小雨滴越密集
        wind: 4, // 控制风速，影响雨滴的水平移动
        rain_color: null, // 雨滴的颜色
        rain_color_clear: null, // 用于渐变效果的透明颜色
        rain: [], // 当前在屏幕上显示的雨滴集合
        rain_pool: [], // 可重复利用的雨滴对象池
        drops: [], // 当前显示的水花集合
        drop_pool: [] // 可重复利用的水花对象池
    };
  
    // 初始化雨效果的函数
    demo.init = function() {
        if (!demo.started) { // 防止重复初始化
            demo.started = true;
            demo.ctx = canvas.getContext('2d'); // 获取 canvas 渲染上下文
            const c = demo.color;
            demo.rain_color = `rgba(${c.r},${c.g},${c.b},${c.a})`;
            demo.rain_color_clear = `rgba(${c.r},${c.g},${c.b},0)`;
            demo.resize(); // 初始化时调整 canvas 大小
            Ticker.addListener(demo.step); // 添加动画帧监听器
  
            window.addEventListener('resize', demo.resize); // 监听窗口大小变化
        }
    };
  
    // 停止雨效果的函数
    demo.stop = function() {
        if (demo.started) {
            demo.started = false;
            Ticker.removeListener(demo.step);  // 停止动画循环
            window.removeEventListener('resize', demo.resize);  // 移除窗口大小监听器
            demo.ctx.clearRect(0, 0, canvas.width, canvas.height);  // 清除 canvas 内容
        }
    };
  
    // 调整 canvas 大小以适应窗口变化
    demo.resize = function() {
        const { rain, drops } = demo;
        // 回收屏幕上的雨滴和水花
        for (let i = rain.length - 1; i >= 0; i--) {
            rain.pop().recycle();
        }
        for (let i = drops.length - 1; i >= 0; i--) {
            drops.pop().recycle();
        }
        demo.width = window.innerWidth;
        demo.height = window.innerHeight;
        canvas.width = demo.width * demo.dpr;
        canvas.height = demo.height * demo.dpr;
    };
  
    // 每帧更新雨滴和水花的状态
    demo.step = function(time, lag) {
        if (!demo.started) return;  // 如果停止了，不再更新
        const speed = demo.speed;
        const width = demo.width;
        const height = demo.height;
        const wind = demo.wind;
        const rain = demo.rain;
        const rain_pool = demo.rain_pool;
        const drops = demo.drops;
        const drop_pool = demo.drop_pool;
        const multiplier = speed * lag;
  
        // 控制雨滴生成的逻辑
        demo.drop_time += time * speed;
        while (demo.drop_time > demo.drop_delay) {
            demo.drop_time -= demo.drop_delay;
            const new_rain = rain_pool.pop() || new Rain(demo); // 从池中取出或新建雨滴
            new_rain.init();
            const wind_expand = Math.abs(height / new_rain.speed * wind);
            let spawn_x = Math.random() * (width + wind_expand);
            if (wind > 0) spawn_x -= wind_expand;
            new_rain.x = spawn_x;
            rain.push(new_rain);
        }
  
        // 更新雨滴的位置
        for (let i = rain.length - 1; i >= 0; i--) {
            const r = rain[i];
            r.y += r.speed * r.z * multiplier;
            r.x += r.z * wind * multiplier;
            if (r.y > height) {
                r.splash();
            }
            if (r.y > height + Rain.height * r.z || (wind < 0 && r.x < wind) || (wind > 0 && r.x > width + wind)) {
                r.recycle(); // 回收雨滴
                rain.splice(i, 1);
            }
        }
  
        // 更新水花的位置和速度
        const drop_max_speed = Drop.max_speed;
        for (let i = drops.length - 1; i >= 0; i--) {
            const d = drops[i];
            d.x += d.speed_x * multiplier;
            d.y += d.speed_y * multiplier;
            d.speed_y += 0.3 * multiplier;
            d.speed_x += wind / 25 * multiplier;
            if (d.speed_x < -drop_max_speed) {
                d.speed_x = -drop_max_speed;
            } else if (d.speed_x > drop_max_speed) {
                d.speed_x = drop_max_speed;
            }
            if (d.y > height + d.radius) {
                d.recycle(); // 回收水花
                drops.splice(i, 1);
            }
        }
  
        demo.draw(); // 绘制当前帧
    };
  
    // 绘制雨滴和水花
    demo.draw = function() {
        const width = demo.width;
        const height = demo.height;
        const dpr = demo.dpr;
        const rain = demo.rain;
        const drops = demo.drops;
        const ctx = demo.ctx;
  
        ctx.clearRect(0, 0, width * dpr, height * dpr);
  
        ctx.beginPath();
        const rain_height = Rain.height * dpr;
        for (let i = rain.length - 1; i >= 0; i--) {
            const r = rain[i];
            const real_x = r.x * dpr;
            const real_y = r.y * dpr;
            ctx.moveTo(real_x, real_y);
            ctx.lineTo(real_x - demo.wind * r.z * dpr * 1.5, real_y - rain_height * r.z);
        }
        ctx.lineWidth = Rain.width * dpr;
        ctx.strokeStyle = demo.rain_color;
        ctx.stroke();
  
        for (let i = drops.length - 1; i >= 0; i--) {
            const d = drops[i];
            const real_x = d.x * dpr - d.radius;
            const real_y = d.y * dpr - d.radius;
            ctx.drawImage(d.canvas, real_x, real_y);
        }
    };
  
    // Rain 类，用于创建和管理雨滴
    function Rain(demo) {
        this.demo = demo;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.speed = 25; // 雨滴下落的速度，影响其下落时间
        this.splashed = false; // 标识雨滴是否已经溅起水花
    }
    Rain.width = 2; // 雨滴的宽度
    Rain.height = 40; // 雨滴的高度
    Rain.prototype.init = function() {
        this.y = Math.random() * -100; // 随机生成雨滴初始 y 轴位置
        this.z = Math.random() * 0.5 + 0.5; // 雨滴的缩放因子，用于模拟深度感
        this.splashed = false; 
    };
    Rain.prototype.recycle = function() {
        this.demo.rain_pool.push(this); // 回收雨滴到对象池
    };
    Rain.prototype.splash = function() {
        if (!this.splashed) {
            this.splashed = true;
            const drops = this.demo.drops;
            const drop_pool = this.demo.drop_pool;
  
            // 生成水花
            for (let i = 0; i < 16; i++) {
                const drop = drop_pool.pop() || new Drop(this.demo);
                drops.push(drop);
                drop.init(this.x);
            }
        }
    };
  
    // Drop 类，用于创建和管理水花
    function Drop(demo) {
        this.demo = demo;
        this.x = 0;
        this.y = 0;
        this.radius = Math.round(Math.random() * 2 + 1) * demo.dpr; // 水花的半径，随机生成
        this.speed_x = 0;
        this.speed_y = 0;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
  
        const diameter = this.radius * 2;
        this.canvas.width = diameter;
        this.canvas.height = diameter;
  
        const grd = this.ctx.createRadialGradient(this.radius, this.radius, 1, this.radius, this.radius, this.radius);
        grd.addColorStop(0, demo.rain_color);
        grd.addColorStop(1, demo.rain_color_clear);
        this.ctx.fillStyle = grd;
        this.ctx.fillRect(0, 0, diameter, diameter);
    }
    Drop.max_speed = 5; // 水花的最大速度
    Drop.prototype.init = function(x) {
        this.x = x;
        this.y = this.demo.height;
        const angle = Math.random() * Math.PI - Math.PI * 0.5;
        const speed = Math.random() * Drop.max_speed;
        this.speed_x = Math.sin(angle) * speed;
        this.speed_y = -Math.cos(angle) * speed;
    };
    Drop.prototype.recycle = function() {
        this.demo.drop_pool.push(this); // 回收水花到对象池
    };
  
    // Ticker 对象，用于管理动画帧
    const Ticker = (function() {
      const PUBLIC_API = {};
      let started = false;
      let last_timestamp = 0;
      const listeners = [];
  
      function queueFrame() {
          requestAnimationFrame(frameHandler);
      }
  
      function frameHandler(timestamp) {
          let frame_time = timestamp - last_timestamp;
          last_timestamp = timestamp;
          if (frame_time < 0) {
              frame_time = 17;
          } else if (frame_time > 68) {
              frame_time = 68;
          }
          for (let i = 0, len = listeners.length; i < len; i++) {
              listeners[i].call(window, frame_time, frame_time / 16.67);
          }
          queueFrame();
      }
  
      PUBLIC_API.addListener = function addListener(fn) {
          if (typeof fn !== 'function') throw 'Ticker.addListener() requires a function reference passed in.';
          listeners.push(fn);
          if (!started) {
              started = true;
              queueFrame();
          }
      };
  
      PUBLIC_API.removeListener = function removeListener(fn) {
          const index = listeners.indexOf(fn);
          if (index !== -1) {
              listeners.splice(index, 1);
          }
      };
  
      return PUBLIC_API;
    })();
  
    demo.init(); // 启动雨效果
  
    return demo;  // 返回 demo 对象，以便外部可以调用 stop 方法
  }
  