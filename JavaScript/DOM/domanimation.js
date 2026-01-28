// JavaScript source code
var id = null;
function Move()
{
    const elem = document.getElementById("animation");
    const container = document.getElementById("container");

    var x_pos = 0;// Вертикальная позиция (относительно верха)
    var y_pos = 0;// Горизонтальная позиция (относительно левого края)

    var x_shift = 1;
    var y_shift = 1;

    clearInterval(id);

    let interval = parseInt(document.getElementById("interval").value);
    id = setInterval(frame, interval);
    function frame()
    {
        // Получаем размеры контейнера и элемента внутри цикла,
        // так как они могут меняться (хотя в данном случае вряд ли)
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

        // Логика отскока от границ контейнера

        // Проверка вертикальной границы (TOP/BOTTOM)
        if (x_pos + elemHeight >= containerHeight)
        {
            // Достигнут нижний край
            x_shift = -1;
        }
        else if (x_pos <= 0)
        {
            // Достигнут верхний край
            x_shift = 1;
        }

        // Проверка горизонтальной границы (LEFT/RIGHT)
        if (y_pos + elemWidth >= containerWidth)
        {
            // Достигнут правый край
            y_shift = -1;
        }
        else if (y_pos <= 0)
        {
            // Достигнут левый край
            y_shift = 1;
        }
    }
}

function updateTimeOverlay()
{
    const now = new Date();
    const timeString = now.toLocaleTimeString('ru-RU'); // ЧЧ:ММ:СС

    document.getElementById('time-output').textContent = timeString;
}

setInterval(updateTimeOverlay, 1000);
updateTimeOverlay();