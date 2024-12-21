class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 8 + 1; // 减小粒子大小范围
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 20) + 5; // 调整密度范围
        this.color = this.getRandomColor();
        this.opacity = (Math.random() * 0.4 + 0.1) * (1 - this.size / 9);
    }

    getRandomColor() {
        const colors = [
            'rgba(147, 112, 219, ', // 紫色
            'rgba(138, 43, 226, ',  // 紫罗兰
            'rgba(75, 0, 130, ',    // 靛青
            'rgba(106, 90, 205, ',  // 石板蓝
            'rgba(123, 104, 238, ', // 中紫色
            'rgba(148, 87, 235, ',  // 淡紫色
            'rgba(180, 151, 231, ', // 浅紫色
            'rgba(216, 191, 216, ', // 蓟色
            'rgba(221, 160, 221, '  // 梅红色
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update(mouse) {
        // 添加基础运动
        this.x += (Math.random() - 0.5) * 0.5;
        this.y += (Math.random() - 0.5) * 0.5;

        if (mouse.x) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = mouse.radius;
            
            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                const directionX = dx * force * 0.6;
                const directionY = dy * force * 0.6;
                
                this.x += directionX;
                this.y += directionY;
            } else {
                if (this.x !== this.baseX) {
                    const dx = this.baseX - this.x;
                    this.x += dx * 0.05;
                }
                if (this.y !== this.baseY) {
                    const dy = this.baseY - this.y;
                    this.y += dy * 0.05;
                }
            }
        }

        // 边界检查和回弹
        if (this.x < 0 || this.x > this.canvas.width) {
            this.x = this.baseX;
            this.baseX = Math.random() * this.canvas.width;
        }
        if (this.y < 0 || this.y > this.canvas.height) {
            this.y = this.baseY;
            this.baseY = Math.random() * this.canvas.height;
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color + this.opacity + ')';
        this.ctx.fill();
    }
}

class ParticleAnimation {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numberOfParticles = 150;

        this.mouse = {
            x: undefined,
            y: undefined,
            radius: 120
        };

        this.init();
        this.handleMouse();
        this.animate();
        this.handleResize();
    }

    init() {
        this.setCanvasSize();
        this.createParticles();
    }

    setCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.setCanvasSize();
            this.particles = [];
            this.createParticles();
        });
    }

    handleMouse() {
        // 使用 window 事件来跟踪鼠���位置
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;
        });

        window.addEventListener('mouseout', () => {
            this.mouse.x = undefined;
            this.mouse.y = undefined;
        });

        // 添加触摸支持
        window.addEventListener('touchmove', (event) => {
            event.preventDefault();
            this.mouse.x = event.touches[0].clientX;
            this.mouse.y = event.touches[0].clientY;
        });

        window.addEventListener('touchend', () => {
            this.mouse.x = undefined;
            this.mouse.y = undefined;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.update(this.mouse);
            particle.draw();
        });

        requestAnimationFrame(this.animate.bind(this));
    }
}

// 确保在 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new ParticleAnimation();
}); 