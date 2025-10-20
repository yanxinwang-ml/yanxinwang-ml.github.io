const floatingHeartsContainer = document.querySelector('.floating-hearts-container');

function createHeart(x = null, y = null) {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    // 随机初始位置，如果未传入则随机生成
    const startX = x !== null ? x : Math.random() * window.innerWidth;
    const startY = y !== null ? y : window.innerHeight; // 初始从底部出现

    heart.style.left = startX + 'px';
    heart.style.top = startY + 'px';

    // 随机大小
    const size = Math.random() * 40 + 25; // 25px 到 65px
    heart.style.setProperty('--heart-size', size + 'px');

    // 随机动画持续时间
    const duration = Math.random() * 3 + 4; // 4s 到 7s
    heart.style.animationDuration = duration + 's';

    // 随机动画延迟，使爱心不会同时出现
    heart.style.animationDelay = Math.random() * 0.5 + 's';

    // 计算最终的 X 和 Y 坐标，实现随机飘动
    const endY = -100; // 最终飘到屏幕上方-100px
    const endX = startX + (Math.random() - 0.5) * 300; // 初始位置左右随机偏移300px

    heart.style.setProperty('--end-x', `${endX - startX}px`); // 相对位移
    heart.style.setProperty('--end-y', `${endY - startY}px`); // 相对位移

    floatingHeartsContainer.appendChild(heart);

    // 动画结束后移除爱心
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

// 每隔一段时间创建新的爱心 (背景浮动爱心)
setInterval(createHeart, 250); // 更频繁地创建

// 在鼠标点击时创建爱心
document.addEventListener('click', (e) => {
    // 鼠标点击的爱心可以从点击位置出现
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';

    const size = Math.random() * 30 + 15; // 点击的爱心可以小一点
    heart.style.setProperty('--heart-size', size + 'px');
    heart.style.animationDuration = Math.random() * 2 + 2 + 's'; // 点击的爱心动画可以短一些

    // 点击爱心向上飘动的终点
    const endYClick = e.clientY - (Math.random() * 100 + 50); // 向上飘动50-150px
    const endXClick = e.clientX + (Math.random() - 0.5) * 100; // 左右随机飘动50px

    heart.style.setProperty('--end-x', `${endXClick - e.clientX}px`);
    heart.style.setProperty('--end-y', `${endYClick - e.clientY}px`);
    
    floatingHeartsContainer.appendChild(heart);

    heart.addEventListener('animationend', () => {
        heart.remove();
    });
});