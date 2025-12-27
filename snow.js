class Snowflake {
    constructor(container) {
        this.container = container;
        this.element = document.createElement('div');
        this.element.classList.add('snowflake');
        this.reset();
        this.container.appendChild(this.element);
    }

    reset() {
        this.size = Math.random() * 8 + 3;
        this.speed = Math.random() * 2 + 1;
        this.wind = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.6 + 0.3;
        this.wobble = Math.random() * 10;
        this.wobbleSpeed = Math.random() * 0.05 + 0.02;
        this.wobbleOffset = Math.random() * Math.PI * 2;
        
        this.x = Math.random() * window.innerWidth;
        this.y = -this.size;
        
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;
        this.element.style.opacity = this.opacity;
        this.element.style.borderRadius = '50%';
        this.element.style.position = 'absolute';
        this.element.style.background = 'white';
        this.element.style.boxShadow = '0 0 5px white';
        this.element.style.pointerEvents = 'none';
        this.element.style.zIndex = '1';
        
        this.updatePosition();
    }

    updatePosition() {
        this.y += this.speed;
        this.x += this.wind + Math.sin(this.wobbleOffset + this.wobble) * this.wobble;
        
        if (this.x > window.innerWidth) this.x = 0;
        if (this.x < 0) this.x = window.innerWidth;
        
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
        
        if (this.y > window.innerHeight) {
            this.reset();
            this.y = -this.size;
        }
        
        this.wobbleOffset += this.wobbleSpeed;
    }
}

class SnowSystem {
    constructor() {
        this.container = document.getElementById('snowflakes');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'snowflakes';
            this.container.style.position = 'fixed';
            this.container.style.top = '0';
            this.container.style.left = '0';
            this.container.style.width = '100%';
            this.container.style.height = '100%';
            this.container.style.pointerEvents = 'none';
            this.container.style.zIndex = '1';
            document.body.appendChild(this.container);
        }
        
        this.snowflakes = [];
        this.count = window.innerWidth < 768 ? 50 : 100;
        this.init();
    }

    init() {
        for (let i = 0; i < this.count; i++) {
            this.snowflakes.push(new Snowflake(this.container));
        }
        
        this.animate();
        
        window.addEventListener('resize', () => {
            this.adjustCount();
        });
    }

    animate() {
        this.snowflakes.forEach(snowflake => {
            snowflake.updatePosition();
        });
        
        requestAnimationFrame(() => this.animate());
    }

    adjustCount() {
        const newCount = window.innerWidth < 768 ? 50 : 100;
        
        if (newCount > this.snowflakes.length) {
            for (let i = this.snowflakes.length; i < newCount; i++) {
                this.snowflakes.push(new Snowflake(this.container));
            }
        } else if (newCount < this.snowflakes.length) {
            const toRemove = this.snowflakes.splice(newCount);
            toRemove.forEach(snowflake => {
                if (snowflake.element.parentNode === this.container) {
                    this.container.removeChild(snowflake.element);
                }
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SnowSystem();
});