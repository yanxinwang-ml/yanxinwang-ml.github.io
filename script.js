const floatingHeartsContainer = document.querySelector('.floating-hearts-container');

function createHeart(x = null, y = null, isClick = false) {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    // 初始位置
    let startX, startY;
    if (x !== null && y !== null) { // 如果是点击事件，使用点击坐标
        startX = x;
        startY = y;
    } else { // 否则从屏幕底部随机位置出现
        startX = Math.random() * window.innerWidth;
        startY = window.innerHeight;
    }

    heart.style.left = startX + 'px';
    heart.style.top = startY + 'px';

    // 随机大小
    const size = isClick ? (Math.random() * 30 + 15) : (Math.random() * 40 + 25); // 点击的爱心可以小一点
    heart.style.setProperty('--heart-size', size + 'px');

    // 随机动画持续时间
    const duration = isClick ? (Math.random() * 2 + 2) : (Math.random() * 3 + 4); // 点击的爱心动画短一些
    heart.style.animationDuration = duration + 's';

    // 随机动画延迟，使爱心不会同时出现 (背景爱心需要延迟，点击爱心不需要)
    if (!isClick) {
        heart.style.animationDelay = Math.random() * 0.5 + 's';
    } else {
        heart.style.animationDelay = '0s'; // 点击即刻出现
    }


    // 计算最终的 X 和 Y 坐标，实现随机飘动
    let endY, endX;
    if (isClick) { // 点击爱心向上飘动的终点
        endY = startY - (Math.random() * 100 + 50); // 向上飘动50-150px
        endX = startX + (Math.random() - 0.5) * 100; // 左右随机飘动50px
    } else { // 背景浮动爱心
        endY = -100; // 最终飘到屏幕上方-100px
        endX = startX + (Math.random() - 0.5) * 300; // 初始位置左右随机偏移300px
    }
    
    heart.style.setProperty('--end-x', `${endX - startX}px`); // 相对位移
    heart.style.setProperty('--end-y', `${endY - startY}px`); // 相对位移

    floatingHeartsContainer.appendChild(heart);

    // 动画结束后移除爱心
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

// 每隔一段时间创建新的爱心 (背景浮动爱心)
setInterval(() => createHeart(null, null, false), 250); // 更频繁地创建

// 在鼠标点击时创建爱心
document.addEventListener('click', (e) => {
    createHeart(e.clientX, e.clientY, true);
});