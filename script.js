let displayInput = document.getElementById('displayInput');

 

function appendValue(value) {

  displayInput.value += value;

}

 

function clearDisplay() {

  displayInput.value = '';

}

 

function calculate() {

  try {

    displayInput.value = evaluateExpression(displayInput.value);

  } catch (error) {

    displayInput.value = 'Błąd';

  }

}

 

 

document.addEventListener("keydown", function(even) {

  if (event.key === "Enter") {

  calculate()

  }

});

 

 

// Make the DIV element draggable:

dragElement(document.getElementById('calculator'));

 

function dragElement(elmnt) {

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  if (document.getElementById(elmnt.id + "header")) {

    // if present, the header is where you move the DIV from:

    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;

  } else {

    // otherwise, move the DIV from anywhere inside the DIV:

    elmnt.onmousedown = dragMouseDown;

  }

 

  function dragMouseDown(e) {

    e = e || window.event;

    e.preventDefault();

    // get the mouse cursor position at startup:

    pos3 = e.clientX;

    pos4 = e.clientY;

    document.onmouseup = closeDragElement;

    // call a function whenever the cursor moves:

    document.onmousemove = elementDrag;

  }

 

  function elementDrag(e) {

    e = e || window.event;

    e.preventDefault();

    // calculate the new cursor position:

    pos1 = pos3 - e.clientX;

    pos2 = pos4 - e.clientY;

    pos3 = e.clientX;

    pos4 = e.clientY;

    // set the element's new position:

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";

    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

  }

 

  function closeDragElement() {

    // stop moving when mouse button is released:

    document.onmouseup = null;

    document.onmousemove = null;

  }

}

function evaluateExpression(expressionToParse) {
  let currentPosition = 0;

  function peek() {
      return expressionToParse[currentPosition];
  }

  function get() {
      const char = expressionToParse[currentPosition];
      currentPosition++;
      return char;
  }

  function expression() {
      let result = term();
      while (peek() === '+' || peek() === '-') {
          if (get() === '+') {
              result += term();
          } else {
              result -= term();
          }
      }
      return result;
  }

  function term() {
      let result = factor();
      while (peek() === '*' || peek() === '/') {
          if (get() === '*') {
              result *= factor();
          } else {
              result /= factor();
          }
      }
      return result;
  }

  function factor() {
      if (peek() >= '0' && peek() <= '9') {
          return number();
      } else if (peek() === '(') {
          get(); // '('
          const result = expression();
          get(); // ')'
          return result;
      } else if (peek() === '-') {
          get();
          return -factor();
      }
      return 0; // error
  }

  function number() {
      let result = get() - '0';
      while (peek() >= '0' && peek() <= '9') {
          result = 10 * result + (get() - '0');
      }
      return result;
  }

  return expression();
}