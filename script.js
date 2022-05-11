const errMsg = [
  'Précisez un tarif pour TH / TJM',
  'Précisez une quantité pour TH',
  'Précisez une quantité pour TJM',
];
const btnCalculate = document.getElementById('calculate-btn');

const validateInputs = () => {
  if (TH.value == 0 && TJM.value == 0) return [false, errMsg[0]];
  if (TH.value != 0 && QtyTH.value == 0) return [false, errMsg[1]];
  if (TJM.value != 0 && QtyTJM.value == 0) return [false, errMsg[2]];
  return [true, null];
};

const errorMessage = (msg) => {
  const result = document.getElementById('result');
  animRes();
  result.style.color = 'red';
  result.style.fontSize = '1rem';
  result.style.letterSpacing = '0.05rem';
  result.innerText = msg;
};

const displayResult = (res) => {
  const result = document.getElementById('result');
  animRes();
  result.style.color = '#0596af';
  result.style.fontSize = '1.2rem';
  result.style.letterSpacing = '0.11rem';
  result.innerText = `${res.toFixed(2)} €`;
};

const animRes = () => {
  result.classList.remove('active');
  setTimeout(() => {
    result.classList.add('active');
  }, 700);
};

const calculate = (e) => {
  let res;
  e.preventDefault();
  const [isValideInputs, msg] = validateInputs();
  if (isValideInputs) {
    TH.value != 0 &&
      (res =
        TH.value * QtyTH.value +
        Extra.value * QtyExtra.value -
        ((TH.value * QtyTH.value + Extra.value * QtyExtra.value) *
          charge.value) /
          100);
    TJM.value != 0 &&
      (res =
        TJM.value * QtyTJM.value +
        Extra.value * QtyExtra.value -
        ((TJM.value * QtyTJM.value + Extra.value * QtyExtra.value) *
          charge.value) /
          100);
  } else {
    errorMessage(msg);
    return;
  }
  displayResult(res);
};

btnCalculate.addEventListener('click', calculate);

const disabledInputs = () => {
  if (TH.value != 0) {
    TJM.setAttribute('disabled', '');
    QtyTJM.setAttribute('disabled', '');
  } else {
    TJM.removeAttribute('disabled', '');
    QtyTJM.removeAttribute('disabled', '');
  }
  if (TJM.value != 0) {
    TH.setAttribute('disabled', '');
    QtyTH.setAttribute('disabled', '');
  } else {
    TH.removeAttribute('disabled', '');
    QtyTH.removeAttribute('disabled', '');
  }
};
const inputsNumber = document.querySelectorAll('input[type=number]');

inputsNumber.forEach((inputNumber) => {
  inputNumber.addEventListener('change', disabledInputs);
});
