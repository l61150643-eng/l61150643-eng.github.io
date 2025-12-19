document.addEventListener('click', function (e) {
  // 要弹出的文字（固定为happy）
  const text = 'happy';
  // 自定义多种颜色（可自行添加更多）
  const colors = ['#ff4444', '#ffbb33', '#00C851', '#33b5e5', '#aa66cc', '#ff99cc'];
  // 随机选一个颜色
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  // 创建文字元素
  const span = document.createElement('span');
  span.textContent = text;
  span.style.position = 'fixed';
  span.style.zIndex = '9999';
  span.style.color = randomColor; // 随机颜色
  span.style.fontSize = '20px'; // 文字大小
  span.style.fontWeight = 'bold'; // 加粗
  span.style.pointerEvents = 'none';
  span.style.transition = 'all 0.8s ease-out'; // 动画时长

  // 定位到点击位置
  span.style.left = e.clientX + 'px';
  span.style.top = e.clientY + 'px';

  // 添加到页面
  document.body.appendChild(span);

  // 动画：向上飘+渐隐
  setTimeout(() => {
    span.style.opacity = '0';
    span.style.transform = 'translateY(-30px)'; // 向上飘的距离
  }, 10);

  // 移除元素
  setTimeout(() => {
    span.remove();
  }, 800);
});