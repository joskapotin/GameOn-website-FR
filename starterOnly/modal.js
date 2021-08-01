function editNav() {
  const x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');
const closeModalBtn = document.querySelector('.close');

// launch modal form
function launchModal() {
  modalbg.style.display = 'block';
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// close modal form
function closeModal() {
  modalbg.style.display = 'none';
}

// close modal event
closeModalBtn.addEventListener('click', closeModal);

// set some variables
const form = document.forms.reserve;
const prenom = form.first;
const nom = form.last;
const { email } = form;
const { birthdate } = form;
const { quantity } = form;
const locations = form.location;
const cgu = form.checkbox1;
const submitBtn = form.submit;

// data-error-visible toggle function
function errorVisible(e, value) {
  e.parentNode.dataset.errorVisible = value;
}

// email validation
function validateEmail(item) {
  // regular expression found here http://emailregex.com/
  const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // if email match regex return true else return false
  if (item.value.match(mailformat)) {
    return true;
  }
  return false;
}

// location validation
function validateLocation(items) {
  // will be set to true if there is a location checked
  let locationIsValid = false;

  // loop through the location
  items.forEach((item) => {
    if (item.checked) {
      locationIsValid = true;
    }
  });

  // if there is a location checked return true otherwise return false
  if (locationIsValid === true) {
    return true;
  }
  return false;
}

// validation
function validate() {
  // will be set to false if there is any invalid input
  let formIsValid = true;

  // lets use html5 validation API for those input
  const inputs = [prenom, nom, birthdate, quantity, cgu];

  inputs.forEach((input) => {
    // if is not valide set data-error-visible to true and set formIsValid to false
    // else set data-error-visible to false
    if (input.checkValidity() === false) {
      errorVisible(input, 'true');
      formIsValid = false;
    } else {
      errorVisible(input, 'false');
    }
  });

  // check if the email is valid
  if (validateEmail(email)) {
    errorVisible(email, 'false');
  } else {
    errorVisible(email, 'true');
    formIsValid = false;
  }

  // check if alocation is selected
  if (validateLocation(locations)) {
    errorVisible(locations[0], 'false');
  } else {
    errorVisible(locations[0], 'true');
    formIsValid = false;
  }

  // check if formIsValid and decide what to do
  if (formIsValid === true) {
    console.log('form is valid');
  } else {
    console.log('form not valid');
  }
}

// prevent the browser from showing default error
// the html5 validation triggers on click not on submit, so we need to prevent the default event
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  validate();
});
