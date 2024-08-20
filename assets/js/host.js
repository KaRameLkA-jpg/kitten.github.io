fetch('/api/get-telegram-user')
    .then(response => response.json())
    .then(data => {
        const userName = data.username; // Полученное имя пользователя из Telegram
        document.querySelector('#username').textContent = userName;
    });