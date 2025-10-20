const heartContainer = document.querySelector('.heart-container');

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    // 随机位置
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = Math.random() * window.innerHeight + 'px';

    // 随机大小
    const size = Math.random() * 30 + 10; // 10px 到 40px
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    heart.style.transform = `rotate(-45deg) scale(${Math.random() * 0.8 + 0.2})`; // 初始随机大小

    // 随机动画持续时间
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';

    heartContainer.appendChild(heart);

    // 动画结束后移除爱心
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

// 每隔一段时间创建新的爱心
setInterval(createHeart, 300); // 每0.3秒创建一个爱心

// 也可以在鼠标点击时创建爱心
document.addEventListener('click', (e) => {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';

    const size = Math.random() * 30 + 10;
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    heart.style.transform = `rotate(-45deg) scale(${Math.random() * 0.8 + 0.2})`;

    heart.style.animationDuration = Math.random() * 2 + 2 + 's'; // 点击的爱心动画可以短一些

    heartContainer.appendChild(heart);

    heart.addEventListener('animationend', () => {
        heart.remove();
    });
});