$(document).ready(function()
{
	var prevEntry = null;
	var operation = null;
	var currentEntry = '0';

	$('.btn').on('click', function(evt)
	{
		var buttonPressed = $(this).html();
		console.log(buttonPressed);

		if (buttonPressed == "C")
		{
			result = 0;
			currentEntry = '0';
		}
		else if (buttonPressed == "CE")
		{
			currentEntry = '0';
		}
		else if (buttonPressed == "del")
		{
			currentEntry = currentEntry.slice(0, -1);
		}
		else if (buttonPressed == "(-)")
		{
			currentEntry *= -1;
		}
		else if (buttonPressed == ".")
		{
			if ($('.screen').html().includes('.'))
				console.log("too many dots...");
			else
				currentEntry += ".";
		}
		else if (isNumber(buttonPressed))
		{
			if (currentEntry === '0')
				currentEntry = buttonPressed;
			else
				currentEntry += buttonPressed;
		}
		else if (isOperator(buttonPressed))
		{
			prevEntry = parseFloat(currentEntry);
			operation = buttonPressed;
			currentEntry = '';
		}
		else if (buttonPressed == '%')
		{
			currentEntry = currentEntry / 100;
		}
		else if (buttonPressed == 'sqrt')
		{
			currentEntry = Math.sqrt(currentEntry);
		}
		else if (buttonPressed == '1/x')
		{
			currentEntry = 1 / currentEntry;
		}
		else if (buttonPressed == '𝝅')
		{
			currentEntry = Math.PI;
		}
		else if (buttonPressed == '=')
		{
			if (prevEntry != null && currentEntry != null && operation != null)
			{
				currentEntry = operate(prevEntry, currentEntry, operation);
				operation = null;
			}
		}

		updateScreen(currentEntry);
	});
})

updateScreen = function(displayValue)
{
	var displayValue = displayValue.toString();
	$('.screen').html(displayValue.substring(0, 15));
};

isNumber = function(value)
{
	return !isNaN(value);
}

isOperator = function(value)
{
	return value == '/' || value == '*' || value == '+' || value == '-';
}

operate = function(a, b, operation)
{
	a = parseFloat(a);
    b = parseFloat(b);
    console.log(a, b, operation);

    if (operation === '+') {
        return a + b;
    }

    if (operation === '-') {
        return a - b;
    }

    if (operation === '*') {
        return a * b;
    }

    if (operation === '/') {
        if(b === 0) {
            alert('деление на ноль.');
            result = 0;
            prevEntry = 0;
            operation = null;
            currentEntry = '0';
        }
        else {
            return a / b;
        }

    }
}
