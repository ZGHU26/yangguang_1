import "./index.css"
export function createRainEffect(canvas) {
  const demo = {
      speed: 1,
      color: {
          r: '80',
          g: '175',
          b: '255',
          a: '0.5'
      },
      started: false,
      ctx: null,
      width: 0,
      height: 0,
      dpr: window.devicePixelRatio || 1,
      drop_time: 0,
      drop_delay: 25,
      wind: 4,
      rain_color: null,
      rain_color_clear: null,
      rain: [],
      rain_pool: [],
      drops: [],
      drop_pool: []
  };

  demo.init = function() {
      if (!demo.started) {
          demo.started = true;
          demo.ctx = canvas.getContext('2d');
          const c = demo.color;
          demo.rain_color = `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`;
          demo.rain_color_clear = `rgba(${c.r}, ${c.g}, ${c.b}, 0)`;      
          demo.resize();
          Ticker.addListener(demo.step);

          window.addEventListener('resize', demo.resize);
      }
  };

  demo.resize = function() {
      const { rain, drops } = demo;
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

  demo.step = function(time, lag) {
      const speed = demo.speed;
      const width = demo.width;
      const height = demo.height;
      const wind = demo.wind;
      const rain = demo.rain;
      const rain_pool = demo.rain_pool;
      const drops = demo.drops;
      const drop_pool = demo.drop_pool;
      const multiplier = speed * lag;

      demo.drop_time += time * speed;
      while (demo.drop_time > demo.drop_delay) {
          demo.drop_time -= demo.drop_delay;
          const new_rain = rain_pool.pop() || new Rain(demo);
          new_rain.init();
          const wind_expand = Math.abs(height / new_rain.speed * wind);
          let spawn_x = Math.random() * (width + wind_expand);
          if (wind > 0) spawn_x -= wind_expand;
          new_rain.x = spawn_x;
          rain.push(new_rain);
      }

      for (let i = rain.length - 1; i >= 0; i--) {
          const r = rain[i];
          r.y += r.speed * r.z * multiplier;
          r.x += r.z * wind * multiplier;
          if (r.y > height) {
              r.splash();
          }
          if (r.y > height + Rain.height * r.z || (wind < 0 && r.x < wind) || (wind > 0 && r.x > width + wind)) {
              r.recycle();
              rain.splice(i, 1);
          }
      }

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
              d.recycle();
              drops.splice(i, 1);
          }
      }

      demo.draw();
  };

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

  function Rain(demo) {
      this.demo = demo;
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.speed = 25;
      this.splashed = false;
  }
  Rain.width = 2;
  Rain.height = 40;
  Rain.prototype.init = function() {
      this.y = Math.random() * -100;
      this.z = Math.random() * 0.5 + 0.5;
      this.splashed = false;
  };
  Rain.prototype.recycle = function() {
      this.demo.rain_pool.push(this);
  };
  Rain.prototype.splash = function() {
      if (!this.splashed) {
          this.splashed = true;
          const drops = this.demo.drops;
          const drop_pool = this.demo.drop_pool;

          for (let i = 0; i < 16; i++) {
              const drop = drop_pool.pop() || new Drop(this.demo);
              drops.push(drop);
              drop.init(this.x);
          }
      }
  };

  function Drop(demo) {
      this.demo = demo;
      this.x = 0;
      this.y = 0;
      this.radius = Math.round(Math.random() * 2 + 1) * demo.dpr;
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
  Drop.max_speed = 5;
  Drop.prototype.init = function(x) {
      this.x = x;
      this.y = this.demo.height;
      const angle = Math.random() * Math.PI - Math.PI * 0.5;
      const speed = Math.random() * Drop.max_speed;
      this.speed_x = Math.sin(angle) * speed;
      this.speed_y = -Math.cos(angle) * speed;
  };
  Drop.prototype.recycle = function() {
      this.demo.drop_pool.push(this);
  };

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

    return PUBLIC_API;
})();

  demo.init();
}