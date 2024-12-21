class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 12 + 1;
        this.speedX = (Math.random() * 1.5 - 0.75) * (this.size / 13);
        this.speedY = (Math.random() * 1.5 - 0.75) * (this.size / 13);
        this.color = this.getRandomColor();
        this.opacity = (Math.random() * 0.4 + 0.1) * (1 - this.size / 13);
    }

    getRandomColor() {
        const colors = [
            'rgba(147, 112, 219, ',
            'rgba(138, 43, 226, ',
            'rgba(75, 0, 130, ',
            'rgba(106, 90, 205, ',
            'rgba(123, 104, 238, ',
            'rgba(148, 87, 235, ',
            'rgba(180, 151, 231, ',
            'rgba(216, 191, 216, ',
            'rgba(221, 160, 221, '
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > this.canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
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
        this.numberOfParticles = 100;

        this.init();
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

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(this.animate.bind(this));
    }
}

new ParticleAnimation(); 