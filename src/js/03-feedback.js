import throttle from 'lodash.throttle';

const LOCAL = 'selectedFilters';
const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

let formData = {};

onPageLoad();

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  const email = evt.target.elements.email.value;
  const password = evt.target.elements.password.value;

  if (email !== '' || password !== '') {
  console.dir(JSON.parse(localStorage.getItem(LOCAL)));
  localStorage.removeItem(LOCAL);
  formData = {};
    };
}

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCAL, JSON.stringify(formData));
}

function onPageLoad() {
  const savedData = JSON.parse(localStorage.getItem(LOCAL));

  if (savedData) {
    Object.entries(savedData).forEach(([key, value]) => {
      formEl[key].value = value;
      formData[key] = value;
    });
  }
}