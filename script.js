const heartContainer = document.querySelector('.heart-container');

function createHeart(x = null, y = null) {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    // 随机位置，如果未传入则随机生成
    heart.style.left = (x !== null ? x : Math.random() * window.innerWidth) + 'px';
    heart.style.top = (y !== null ? y : Math.random() * window.innerHeight) + 'px';

    // 随机大小，但确保是完整的爱心
    const size = Math.random() * 30 + 20; // 20px 到 50px，确保有足够的基础大小
    heart.style.setProperty('--heart-size', size + 'px'); // 使用CSS变量设置大小

    // 随机动画持续时间
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';

    heartContainer.appendChild(heart);

    // 动画结束后移除爱心
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

// 每隔一段时间创建新的爱心
setInterval(createHeart, 300);

// 在鼠标点击时创建爱心
document.addEventListener('click', (e) => {
    createHeart(e.clientX, e.clientY);
});