// 雪花飘落特效
(function snowEffect() {
  // 配置项（可根据喜好修改）
  const config = {
    snowCount: 80, // 雪花数量（建议50-150）
    snowSizeMin: 5, // 雪花最小尺寸
    snowSizeMax: 15, // 雪花最大尺寸
    snowColor: "#ffffff", // 雪花颜色（可改浅蓝#e6f7ff等）
    snowSpeedMin: 1, // 下落最小速度
    snowSpeedMax: 3, // 下落最大速度
    snowWind: 0.5, // 风力（左右摇摆幅度）
    zIndex: 100 // 雪花层级（避免遮挡内容，可设为-1）
  };

  // 创建雪花容器
  const snowContainer = document.createElement("div");
  snowContainer.id = "snow-container";
  snowContainer.style.position = "fixed";
  snowContainer.style.top = "0";
  snowContainer.style.left = "0";
  snowContainer.style.width = "100%";
  snowContainer.style.height = "100%";
  snowContainer.style.overflow = "hidden";
  snowContainer.style.pointerEvents = "none"; // 不影响鼠标交互
  snowContainer.style.zIndex = config.zIndex;
  document.body.appendChild(snowContainer);

  // 生成随机数工具函数
  const random = (min, max) => Math.random() * (max - min) + min;

  // 创建单个雪花
  const createSnow = () => {
    const snow = document.createElement("div");
    // 雪花形状（圆形/六角形，这里用圆形，可换SVG）
    snow.style.width = `${random(config.snowSizeMin, config.snowSizeMax)}px`;
    snow.style.height = snow.style.width;
    snow.style.borderRadius = "50%"; // 圆形雪花，去掉则为正方形
    snow.style.backgroundColor = config.snowColor;
    snow.style.opacity = random(0.5, 1); // 透明度随机
    snow.style.position = "absolute";
    // 初始位置：水平随机，垂直超出顶部
    snow.style.left = `${random(0, 100)}vw`;
    snow.style.top = `${-config.snowSizeMax * 2}px`;
    // 动画参数
    const fallSpeed = random(config.snowSpeedMin, config.snowSpeedMax);
    const windAmplitude = random(-config.snowWind, config.snowWind);
    const animationDuration = random(10, 20); // 下落动画时长

    // 添加上下落和摇摆动画
    snow.style.animation = `snowFall ${animationDuration}s linear infinite, snowSway ${random(5, 10)}s ease-in-out infinite alternate`;
    // 自定义动画延迟，让雪花下落更分散
    snow.style.animationDelay = `${random(0, animationDuration)}s`;

    // 将雪花添加到容器
    snowContainer.appendChild(snow);

    // 雪花落地后移除，避免内存占用
    setTimeout(() => {
      snow.remove();
    }, animationDuration * 1000);
  };

  // 定义CSS动画（下落+摇摆）
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes snowFall {
      0% { transform: translateY(0); }
      100% { transform: translateY(100vh); }
    }
    @keyframes snowSway {
      0% { transform: translateX(0); }
      100% { transform: translateX(20px); } /* 摇摆幅度 */
    }
  `;
  document.head.appendChild(style);

  // 批量生成雪花
  setInterval(createSnow, 200); // 每200ms生成一个雪花
})();