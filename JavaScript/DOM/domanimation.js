// JavaScript source code
var id = null;

function setDisplayBackground(imagePath) {
    const displayDiv = document.getElementById("container");

    if (displayDiv) {
        // Устанавливаем фоновое изображение
        displayDiv.style.backgroundImage = `url('${imagePath}')`;

        // Настраиваем, как изображение должно отображаться
        displayDiv.style.backgroundSize = "cover";       // Масштабирует изображение, чтобы оно полностью покрыло контейнер
        displayDiv.style.backgroundPosition = "center";  // Центрирует изображение
        displayDiv.style.backgroundRepeat = "no-repeat"; // Запрещает повторение

    }
    else {
        console.error("Элемент с ID 'container' не найден.");
    }
}

const defaultBackgroundImage = 'img/night.jpg';

document.addEventListener('DOMContentLoaded', function () {
    // Устанавливаем фон при загрузке DOM
    setDisplayBackground(defaultBackgroundImage);
});

function Move()
{
    const elem = document.getElementById("animation");
    const container = document.getElementById("container");

    // Инициализация или восстановление позиции
    var x_pos = parseInt(elem.style.top) || 0;
    var y_pos = parseInt(elem.style.left) || 0;

    // Инициализация или восстановление сдвигов (если они были сохранены в data-атрибутах)
    var x_shift = parseInt(elem.dataset.x_shift) || 1;
    var y_shift = parseInt(elem.dataset.y_shift) || 1;

    clearInterval(id);

    let interval = parseInt(document.getElementById("interval").value);
    if (isNaN(interval) || interval < 1) {
        interval = 5; // Минимальное безопасное значение
    }

    // Важно: Убедитесь, что сам блок анимации отражает размер шрифта при старте
    changeFontSize();

    id = setInterval(frame, interval);

    function frame()
    {
        // Размеры
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const elemWidth = elem.offsetWidth;
        const elemHeight = elem.offsetHeight;

        // Обновление позиции
        x_pos += x_shift;
        y_pos += y_shift;

        // Применение стилей
        elem.style.top = x_pos + 'px';
        elem.style.left = y_pos + 'px';

        // Логика отскока от границ контейнера (используем текущие x_pos/y_pos)

        // Проверка вертикальной границы (TOP/BOTTOM)
        if (x_pos + elemHeight >= containerHeight) {
            x_shift = -1;
            x_pos = containerHeight - elemHeight; // Корректируем позицию, чтобы не "застревать"
        }
        else if (x_pos <= 0) {
            x_shift = 1;
            x_pos = 0;
        }

        // Проверка горизонтальной границы (LEFT/RIGHT)
        if (y_pos + elemWidth >= containerWidth) {
            y_shift = -1;
            y_pos = containerWidth - elemWidth; // Корректируем позицию
        }
        else if (y_pos <= 0) {
            y_shift = 1;
            y_pos = 0;
        }

        // Сохраняем позицию и сдвиги для следующего шага (важно для сохранения состояния при повторных вызовах Move)
        elem.style.top = x_pos + 'px';
        elem.style.left = y_pos + 'px';
        elem.dataset.x_shift = x_shift;
        elem.dataset.y_shift = y_shift;
    }
}
function updateTimeOverlay()
{
    const now = new Date();
    const timeString = now.toLocaleTimeString('ru-RU'); // ЧЧ:ММ:СС

    const timeOutput = document.getElementById('time-output');
    if (timeOutput)
    {
        timeOutput.textContent = timeString;
    }
}
function changeFontSize()
{
    const fontSizeInput = document.getElementById('font-size');
    const timeOutputElement = document.getElementById('time-output');
    const animationElement = document.getElementById('animation'); // Получаем сам контейнер анимации

    if (fontSizeInput && timeOutputElement)
    {
        const newSize = fontSizeInput.value;

        // Устанавливаем новый размер шрифта в пикселях
        timeOutputElement.style.fontSize = newSize + 'px';
    }
}

setInterval(updateTimeOverlay, 1000);
updateTimeOverlay();