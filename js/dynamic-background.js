class DynamicBackground {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.shapes = [];
        this.config = {
            shapeCount: 15,
            maxSize: 100,
            minSize: 20,
            colors: [
                'rgba(52, 152, 219, 0.2)',   // 柔和蓝
                'rgba(46, 204, 113, 0.2)',   // 绿色
                'rgba(231, 76, 60, 0.2)',    // 红色
                'rgba(241, 196, 15, 0.2)'    // 黄色
            ]
        };
        this.init();
    }

    init() {
        for (let i = 0; i < this.config.shapeCount; i++) {
            this.createShape();
        }
        this.animate();
    }

    createShape() {
        const shape = document.createElement('div');
        shape.classList.add('dynamic-shape');
        const size = this.randomBetween(this.config.minSize, this.config.maxSize);
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.position = 'absolute';
        shape.style.backgroundColor = this.randomColor();
        shape.style.borderRadius = '50%';
        shape.style.opacity = '0.5';
        shape.style.left = `${Math.random() * 100}vw`;
        shape.style.top = `${Math.random() * 100}vh`;
        this.container.appendChild(shape);
        this.shapes.push(shape);
    }

    animate() {
        this.shapes.forEach(shape => {
            const deltaX = (Math.random() - 0.5) * 2;
            const deltaY = (Math.random() - 0.5) * 2;
            const posX = parseFloat(shape.style.left);
            const posY = parseFloat(shape.style.top);
            shape.style.left = `${posX + deltaX}px`;
            shape.style.top = `${posY + deltaY}px`;
            if (posX < 0 || posX > window.innerWidth || posY < 0 || posY > window.innerHeight) {
                shape.style.left = `${Math.random() * 100}vw`;
                shape.style.top = `${Math.random() * 100}vh`;
            }
        });
        requestAnimationFrame(this.animate.bind(this));
    }

    randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    randomColor() {
        return this.config.colors[Math.floor(Math.random() * this.config.colors.length)];
    }
}

const dynamicBackground = new DynamicBackground('backgroundCanvas');
