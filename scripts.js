let progress = 0;
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const statusText = document.getElementById('status-text');
const preloader = document.getElementById('preloader');

const loadInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}%`;
    
    if (progress < 25) {
        statusText.textContent = "Загрузка ресурсов";
    } else if (progress < 50) {
        statusText.textContent = "Инициализация елки";
    } else if (progress < 75) {
        statusText.textContent = "Настройка анимаций";
    } else if (progress < 95) {
        statusText.textContent = "Запуск праздничного режима";
    } else {
        statusText.textContent = "Готово";
    }
    
    if (progress >= 100) {
        clearInterval(loadInterval);
        
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 800);
    }
}, 200);

function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;
    const newYear = new Date(`January 1, ${nextYear} 00:00:00`);
    
    const diff = newYear - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    if (document.getElementById('days')) {
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
    }
    if (document.getElementById('hours')) {
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    }
    if (document.getElementById('minutes')) {
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    }
    if (document.getElementById('seconds')) {
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('tree-svg')) {
        initTreeControls();
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
});

function initTreeControls() {
    const speedUpBtn = document.getElementById('speedUp');
    const changeColorsBtn = document.getElementById('changeColors');
    const addSnowBtn = document.getElementById('addSnow');
    
    if (speedUpBtn) {
        speedUpBtn.addEventListener('click', function() {
            const lights = document.querySelectorAll('.blue-lt, .blue-dk, .red-md, .gold-lt, .gold-dk');
            lights.forEach(light => {
                const newDuration = Math.random() * 0.5 + 0.3;
                light.style.animation = `lightTwinkle ${newDuration}s infinite`;
            });
            
            this.textContent = "Огоньки ускорены";
            setTimeout(() => {
                this.textContent = "Ускорить огоньки";
            }, 2000);
        });
    }
    
    if (changeColorsBtn) {
        changeColorsBtn.addEventListener('click', function() {
            const colorSets = [
                ['#0a3d62', '#1e3799', '#4a69bd', '#f6b93b', '#e55039'],
                ['#1e3799', '#4a69bd', '#6a89cc', '#f6b93b', '#fa983a'],
                ['#0c2461', '#1e3799', '#4a69bd', '#fad390', '#f8c291'],
            ];
            
            const randomSet = colorSets[Math.floor(Math.random() * colorSets.length)];
            
            document.querySelectorAll('.blue-lt').forEach(light => {
                light.style.fill = randomSet[0];
            });
            
            document.querySelectorAll('.blue-dk').forEach(light => {
                light.style.fill = randomSet[1];
            });
            
            document.querySelectorAll('.red-md').forEach(light => {
                light.style.fill = randomSet[2];
            });
            
            document.querySelectorAll('.gold-lt').forEach(light => {
                light.style.fill = randomSet[3];
            });
            
            document.querySelectorAll('.gold-dk').forEach(light => {
                light.style.fill = randomSet[4];
            });
            
            this.textContent = "Цвета изменены";
            setTimeout(() => {
                this.textContent = "Изменить цвета";
            }, 2000);
        });
    }
    
    if (addSnowBtn) {
        addSnowBtn.addEventListener('click', function() {
            const treeSvg = document.getElementById('tree-svg');
            
            for (let i = 0; i < 10; i++) {
                const snowflake = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                const x = Math.random() * 180 + 10;
                const y = Math.random() * 250 + 50;
                const r = Math.random() * 3 + 1;
                
                snowflake.setAttribute("cx", -1694.2 + x);
                snowflake.setAttribute("cy", 483.2 + y);
                snowflake.setAttribute("r", r);
                snowflake.setAttribute("fill", "white");
                snowflake.setAttribute("opacity", "0.8");
                
                treeSvg.appendChild(snowflake);
            }
            
            this.textContent = "Снег добавлен";
            setTimeout(() => {
                this.textContent = "Добавить снег";
            }, 2000);
        });
    }
}