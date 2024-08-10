/*const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');
let coins = localStorage.getItem('coins');
let total = localStorage.getItem('total');
let power = localStorage.getItem('power');
let count = localStorage.getItem('count');

if (coins == null) {
    localStorage.setItem('coins', '0');
    h1.textContent = '0';
} else {
    h1.textContent = Number(coins).toLocaleString();
}

if (total == null) {
    localStorage.setItem('total', '500');
    body.querySelector('#total').textContent = '/500';
} else {
    body.querySelector('#total').textContent = `/${total}`;
}

if (power == null) {
    localStorage.setItem('power', '500');
    body.querySelector('#power').textContent = '500';
} else {
    body.querySelector('#power').textContent = power;
}

if (count == null) {
    localStorage.setItem('count', '1');
}

image.addEventListener('click', (e) => {
    let x = e.offsetX;
    let y = e.offsetY;

    navigator.vibrate(5);

    coins = localStorage.getItem('coins');
    power = localStorage.getItem('power');

    if (Number(power) > 0) {
        localStorage.setItem('coins', `${Number(coins) + 1}`);
        h1.textContent = `${(Number(coins) + 1).toLocaleString()}`;

        localStorage.setItem('power', `${Number(power) - 1}`);
        body.querySelector('#power').textContent = `${Number(power) - 1}`;
    }

    if (x < 150 && y < 150) {
        image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x < 150 && y > 150) {
        image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x > 150 && y > 150) {
        image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
    } else if (x > 150 && y < 150) {
        image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
    }

    setTimeout(() => {
        image.style.transform = 'translate(0px, 0px)';
    }, 100);

    body.querySelector('.progress').style.width = `${(100 * Number(power)) / Number(total)}%`;
});

setInterval(() => {
    count = localStorage.getItem('count');
    power = localStorage.getItem('power');
    total = localStorage.getItem('total');
    if (Number(total) > Number(power)) {
        const newPower = Number(power) + Number(count);
        localStorage.setItem('power', `${newPower}`);
        body.querySelector('#power').textContent = `${newPower}`;
        body.querySelector('.progress').style.width = `${(100 * newPower) / Number(total)}%`;
    }
}, 1000);
 */

const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');
const rankText = body.querySelector('#rank');
const progress = body.querySelector('.progress');

let coins = parseFloat(localStorage.getItem('coins')) || 0.001;
let total = parseInt(localStorage.getItem('total')) || 500;
let power = parseInt(localStorage.getItem('power')) || 500;
let rankThresholds = [0.001, 1.001, 5.001, 10.001, 25.001];
let currentRank = parseInt(localStorage.getItem('rank')) || 0;

function updateRank() {
    switch (currentRank) {
        case 0:
            rankText.textContent = 'Bronze';
            rankText.className = 'rank-text bronze';
            progress.className = 'progress bronze';
            image.style.filter = 'drop-shadow(0 0 20px #cd7f32)'; // Bronze glow
            break;
        case 1:
            rankText.textContent = 'Silver';
            rankText.className = 'rank-text silver';
            progress.className = 'progress silver';
            image.style.filter = 'drop-shadow(0 0 20px #c0c0c0)'; // Silver glow
            break;
        case 2:
            rankText.textContent = 'Gold';
            rankText.className = 'rank-text gold';
            progress.className = 'progress gold';
            image.style.filter = 'drop-shadow(0 0 20px #ffd700)'; // Gold glow
            break;
        case 3:
            rankText.textContent = 'Diamond';
            rankText.className = 'rank-text diamond';
            progress.className = 'progress diamond';
            image.style.filter = 'drop-shadow(0 0 20px #b9f2ff)'; // Diamond glow
            break;
        case 4:
            rankText.textContent = 'Ruby';
            rankText.className = 'rank-text ruby';
            progress.className = 'progress ruby';
            image.style.filter = 'drop-shadow(0 0 20px #e0115f)'; // Ruby glow
            break;
        default:
            rankText.textContent = 'Ruby';
            rankText.className = 'rank-text ruby';
            progress.className = 'progress ruby';
            image.style.filter = 'drop-shadow(0 0 20px #e0115f)'; // Ruby glow
            progress.style.width = '100%';
            return;
    }
}

function updateProgress() {
    if (currentRank < rankThresholds.length - 1) {
        const nextThreshold = rankThresholds[currentRank + 1];
        const previousThreshold = rankThresholds[currentRank];
        const progressPercent = ((coins - previousThreshold) / (nextThreshold - previousThreshold)) * 100;

        progress.style.width = `${progressPercent}%`;

        if (coins >= nextThreshold) {
            currentRank++;
            localStorage.setItem('rank', currentRank);
            updateRank();
            progress.style.width = '0%';
        }
    } else {
        progress.style.width = '100%';
    }
}

h1.textContent = coins.toLocaleString();
body.querySelector('#power').textContent = power;

if (total > 0) {
    body.querySelector('.progress-container').style.display = 'block';
    updateProgress();
} else {
    body.querySelector('.progress-container').style.display = 'none';
}

updateRank();

image.addEventListener('click', (e) => {
    let x = e.offsetX;
    let y = e.offsetY;

    navigator.vibrate(5);

    if (power > 0) {
        coins += 0.001;
        power -= 1;
        h1.textContent = coins.toFixed(3).toLocaleString();
        body.querySelector('#power').textContent = power;

        localStorage.setItem('coins', coins.toFixed(3));
        localStorage.setItem('power', power);

        updateProgress();
    }

    if (x < 150 && y < 150) {
        image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x < 150 && y > 150) {
        image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x > 150 && y > 150) {
        image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
    } else if (x > 150 && y < 150) {
        image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
    }

    setTimeout(() => {
        image.style.transform = 'translate(0px, 0px)';
    }, 100);
});











