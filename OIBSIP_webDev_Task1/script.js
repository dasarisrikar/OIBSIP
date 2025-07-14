const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
let currentInput = '';
let lastAnswer = '';

function updateDisplay() {
  display.textContent = currentInput || '0';
}

function calculate() {
  try {
    let expression = currentInput.replace(/√/g, 'Math.sqrt')
                                 .replace(/%/g, '/100')
                                 .replace(/Ans/g, lastAnswer || '0');
    let result = eval(expression);
    lastAnswer = result;
    currentInput = result.toString();
    updateDisplay();
  } catch {
    display.textContent = 'Error';
    currentInput = '';
  }
}

buttons.forEach(button => {
  const val = button.textContent;

  if (val === '=') {
    button.addEventListener('click', calculate);
  } else if (button.id === 'clearBtn') {
    button.addEventListener('click', () => {
      currentInput = '';
      updateDisplay();
    });
  } else if (button.id === 'delBtn') {
    button.addEventListener('click', () => {
      if (currentInput.endsWith('Ans')) {
        currentInput = currentInput.slice(0, -3); // delete full 'Ans'
      } else {
        currentInput = currentInput.slice(0, -1); // normal delete
      }
      updateDisplay();
    });
  } else if (button.id === 'ansBtn') {
    button.addEventListener('click', () => {
      currentInput += 'Ans';
      updateDisplay();
    });
  } else if (button.id === 'sqrtBtn') {
    button.addEventListener('click', () => {
      currentInput += '√(';
      updateDisplay();
    });
  } else if (button.id === 'negateBtn') {
    button.addEventListener('click', () => {
      if (currentInput) {
        try {
          let value = eval(currentInput.replace(/√/g, 'Math.sqrt').replace(/%/g, '/100').replace(/Ans/g, lastAnswer || '0'));
          value *= -1;
          currentInput = value.toString();
          updateDisplay();
        } catch {
          display.textContent = 'Error';
          currentInput = '';
        }
      }
    });
  } else {
    button.addEventListener('click', () => {
      currentInput += val;
      updateDisplay();
    });
  }
});
