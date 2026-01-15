// JavaScript source code

function Factorial(n)
{
    let f = BigInt(1);
    // document.write(typeof (f));
    /// document.write("<pre>"); // учитываются пробелы и знаки переноса
    for (let i = 1n; i <= n; i++)
    {
        f *= i;
        // document.writeln(`${i}! = ${f};`);
    }
    // document.write("</pre>");
    return f;
}

function Factorial2()
{
    let source_input_field = document.getElementById("factorial-source");
    // alert("Привет");
    let source_value = source_input_field.value;
    let factorial_result = document.getElementById("factorial-result");
    factorial_result.innerHTML = Factorial(source_value);
}

//----------------------------
//Возведение в степень
//______________________________
function calculatePower(base, exponent)
{
    // Используем оператор **
    return base ** exponent;
}

document.addEventListener('DOMContentLoaded', () => {
    const baseInput = document.getElementById('base');
    const exponentInput = document.getElementById('exponent');
    const calculateButton = document.getElementById('calculateButton');
    const resultOutput = document.getElementById('resultOutput');

    function handleCalculation() {
        // Получаем значения из полей ввода
        const base = parseFloat(baseInput.value);
        const exponent = parseFloat(exponentInput.value);

        // Проверяем, являются ли значения числами
        if (isNaN(base) || isNaN(exponent)) {
            resultOutput.textContent = "Ошибка: Введите корректные числа.";
            return;
        }

        // Вычисляем результат
        const result = calculatePower(base, exponent);

        // Выводим результат на страницу
        resultOutput.textContent = `${base} в степени ${exponent} = ${result}`;
    }

    // Привязываем функцию к клику на кнопку
    calculateButton.addEventListener('click', handleCalculation);

    // Также запускаем расчет при первом входе (для отображения значения по умолчанию)
    handleCalculation();
});