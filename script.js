const floatingHeartsContainer = document.querySelector('.floating-hearts-container');
const centerHeartSVG = document.querySelector('.glowing-heart-svg');

// 创建单个爱心实例的函数
function createHeart(x = null, y = null, isClick = false) {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    let startX, startY;
    let endDistance; // 扩散的距离

    if (isClick) {
        // --- 鼠标点击产生的爱心 ---
        startX = x;
        startY = y;
        endDistance = Math.random() * 50 + 50; // 扩散 50-100px
        heart.style.animationDuration = Math.random() * 1.5 + 1 + 's';
        heart.style.setProperty('--heart-size', Math.random() * 10 + 15 + 'px'); // 15-25px
        heart.style.animationDelay = '0s';
    } else {
        // --- 围绕中心爱心跃动的爱心 ---
        const rect = centerHeartSVG.getBoundingClientRect();
        
        // 初始位置：随机在中心爱心周围的小范围内
        // 获取中心坐标
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // 初始位置在中心附近 (± 50px)
        startX = centerX + (Math.random() - 0.5) * 50;
        startY = centerY + (Math.random() - 0.5) * 50;

        endDistance = Math.random() * 100 + 100; // 扩散 100-200px
        heart.style.animationDuration = Math.random() * 1.5 + 1.5 + 's';
        heart.style.animationDelay = Math.random() * 0.5 + 's';
        heart.style.setProperty('--heart-size', Math.random() * 10 + 10 + 'px'); // 10-20px
    }

    // 设置爱心初始位置
    heart.style.left = startX + 'px';
    heart.style.top = startY + 'px';

    // 随机角度 (0到 2π 弧度)
    const angle = Math.random() * 2 * Math.PI; 
    
    // 计算最终的 X 和 Y 坐标，实现径向扩散
    const endX = startX + Math.cos(angle) * endDistance;
    const endY = startY + Math.sin(angle) * endDistance;

    // 设置 CSS 变量，用于 CSS 动画中的 translate()
    heart.style.setProperty('--end-x', `${endX - startX}px`); // 相对位移
    heart.style.setProperty('--end-y', `${endY - startY}px`); // 相对位移

    floatingHeartsContainer.appendChild(heart);

    // 动画结束后移除爱心，释放内存
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

// 1. 不断创建围绕中心爱心跃动的爱心
setInterval(() => createHeart(null, null, false), 100); // 每 100ms 创建一个，营造持续的“跃动”感

// 2. 鼠标点击时创建爱心
document.addEventListener('click', (e) => {
    createHeart(e.clientX, e.clientY, true);
});