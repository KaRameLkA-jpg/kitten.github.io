// Пути к изображениям GIF для кубиков
const diceGifs = [
    "/assets/images/dice_1.gif",
    "/assets/images/dice_2.gif",
    "/assets/images/dice_3.gif",
    "/assets/images/dice_4.gif",
    "/assets/images/dice_5.gif",
    "/assets/images/dice_6.gif"
];

// Пути к статическим изображениям выпавших кубиков
const diceImages = [
    "/assets/images/dice.png",
    "/assets/images/dice.png",
    "/assets/images/dice.png",
    "/assets/images/dice.png",
    "/assets/images/dice.png",
    "/assets/images/dice.png"
];

// Предполагаемая продолжительность GIF в миллисекундах (например, 2 секунды)
const gifDuration = 2000;

function rollDice() {
    // Получаем текущее значение ставки и баланса
    let bet = parseFloat(document.getElementById("bet").value);
    let coinCount = parseFloat(document.getElementById("coin").textContent.replace(',', ''));

    // Проверка корректности ставки
    if (isNaN(bet) || bet <= 0 || bet > coinCount) {
        alert("Please enter a valid bet amount within your balance.");
        return;
    }

    // Генерация случайных чисел для кубиков (от 1 до 6)
    const yourRoll = Math.floor(Math.random() * 6) + 1;
    const artemRoll = Math.floor(Math.random() * 6) + 1;

    // Замена изображений на соответствующие GIF
    const yourDiceElement = document.getElementById("yourDice");
    const artemDiceElement = document.getElementById("artemDice");
    yourDiceElement.src = diceGifs[yourRoll - 1];
    artemDiceElement.src = diceGifs[artemRoll - 1];

    // Отключаем кнопку на время проигрывания анимации
    const resultButton = document.getElementById("result");
    resultButton.disabled = true;

    // Задержка перед отображением результата и замена GIF на статическое изображение
    setTimeout(() => {
        // Заменяем GIF на статические изображения выпавших кубиков
        yourDiceElement.src = diceImages[yourRoll - 1];
        artemDiceElement.src = diceImages[artemRoll - 1];

        // Определение победителя и обновление баланса
        let resultText;
        let resultColor;

        if (yourRoll > artemRoll) {
            resultText = "You win!";
            resultColor = "green";
            coinCount += bet;  // Увеличение баланса на ставку
        } else if (yourRoll < artemRoll) {
            resultText = "You lose!";
            resultColor = "red";
            coinCount -= bet;  // Уменьшение баланса на ставку
        } else {
            resultText = "It's a tie!";
            resultColor = "orange";
        }

        // Обновление текста и цвета кнопки
        resultButton.textContent = resultText;
        resultButton.style.backgroundColor = resultColor;

        // Обновление баланса
        document.getElementById("coin").textContent = coinCount.toLocaleString();

        // Включаем кнопку и восстанавливаем её исходный вид
        setTimeout(() => {
            resultButton.textContent = "Roll the dice!";
            resultButton.style.backgroundColor = "";
            resultButton.disabled = false;
        }, 2000); // 2 секунды для демонстрации результата
    }, gifDuration); // Задержка на время проигрывания GIF
}

