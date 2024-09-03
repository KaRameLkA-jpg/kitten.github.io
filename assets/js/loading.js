// Получите ссылку на элементы загрузочного экрана
const loadingScreen = document.querySelector('.loading-screen');
const loadingProgress = document.querySelector('.loading-progress');

// Симулируем загрузку
let loadingProgress1 = 0;

function updateLoadingProgress() {
    loadingProgress1 += 2;
    loadingProgress.style.width = `${loadingProgress1}%`;

    if (loadingProgress1 >= 150) {
        clearInterval(loadingInterval);
        hideLoadingScreen();
        loadMainPage();
    }
}

function hideLoadingScreen() {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 1500);
}

function loadMainPage() {
    // Загрузка и переход к console.html
    setTimeout(() => {
        window.location.href = '../../console.html';
    }, 1000);
}

// Запуск загрузочного экрана
const loadingInterval = setInterval(updateLoadingProgress, 50);
