let caseScore = 0;
let caseOpened = false;

function openCase() {
    if (caseOpened) return;
    
    const caseBox = document.getElementById('case-box');
    const resultScore = document.getElementById('result-score');
    const caseResult = document.getElementById('case-result');
    const openBtn = document.getElementById('open-case');
    const resetBtn = document.getElementById('reset-case');
    const caseForm = document.getElementById('case-form');
    
    caseBox.style.transform = 'rotateX(60deg)';
    
    setTimeout(() => {
        caseScore = Math.floor(Math.random() * 15) + 1;
        resultScore.textContent = caseScore;
        caseResult.style.display = 'block';
        caseBox.style.transform = 'rotateX(0deg)';
        caseOpened = true;
        
        openBtn.style.display = 'none';
        resetBtn.style.display = 'inline-block';
        
        setTimeout(() => {
            caseForm.style.display = 'block';
        }, 1000);
        
    }, 600);
}

function resetCase() {
    caseOpened = false;
    caseScore = 0;
    
    const resultScore = document.getElementById('result-score');
    const caseResult = document.getElementById('case-result');
    const openBtn = document.getElementById('open-case');
    const resetBtn = document.getElementById('reset-case');
    const caseForm = document.getElementById('case-form');
    const successMessage = document.getElementById('success-message');
    
    resultScore.textContent = '0';
    caseResult.style.display = 'none';
    openBtn.style.display = 'inline-block';
    resetBtn.style.display = 'none';
    caseForm.style.display = 'none';
    successMessage.style.display = 'none';
    
    document.getElementById('username').value = '';
}

function submitResult() {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();
    
    if (!username) {
        alert('Пожалуйста, введите никнейм и сервер');
        return;
    }
    
    const parts = username.split(' ');
    if (parts.length < 2) {
        alert('Пожалуйста, введите данные в формате: Никнейм Сервер (например: Sem_Mayorov 01)');
        return;
    }
    
    const nickname = parts.slice(0, -1).join(' ');
    const server = parts[parts.length - 1];
    
    if (!/^\d+$/.test(server)) {
        alert('Номер сервера должен быть числом');
        return;
    }
    
    const data = {
        score: caseScore,
        nickname: nickname,
        server: server,
        date: new Date().toISOString()
    };
    
    const caseForm = document.getElementById('case-form');
    const successMessage = document.getElementById('success-message');
    const savedInfo = document.getElementById('saved-info');
    
    caseForm.style.display = 'none';
    successMessage.style.display = 'block';
    
    savedInfo.innerHTML = `
        Сохраненные данные:<br>
        <strong>Баллы:</strong> ${data.score}<br>
        <strong>Никнейм:</strong> ${data.nickname}<br>
        <strong>Сервер:</strong> ${data.server}<br>
        <strong>Дата:</strong> ${new Date(data.date).toLocaleDateString()}
    `;
    
    saveToFile(data);
}

function saveToFile(data) {
    const formData = new FormData();
    formData.append('score', data.score);
    formData.append('nickname', data.nickname);
    formData.append('server', data.server);
    formData.append('date', data.date);
    
    fetch('save.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        console.log('Данные сохранены:', result);
    })
    .catch(error => {
        console.error('Ошибка сохранения:', error);
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bal_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    });
}

function goToMain() {
    window.location.href = 'index.html';
}