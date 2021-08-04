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
const hamburger = document.querySelector('.hamburger');
const closeModalBtn = document.querySelector('.close-modal');
// select the form
const uiFormReserve = document.forms.reserve;
// select the confirmation message
const uiConfirmationMessage = document.querySelector('.confirmation-message');
// select the close-form button
const uiCloseFormBtn = document.querySelector('.close-form');

// Responsive menu
hamburger.addEventListener('click', editNav);

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

/*
FORM VALIDATION SECTION
*/

// we need a variable that will be our form validation token
// if any input is not valid we update this variable to false
let formIsValid = true;

// display or hide error messages function
// Select the parent and set a value to true or false to the attribut "data-error-visible"
// The CSS handle the display
const showError = (uiElement, value) => {
  const uiEl = uiElement;
  uiEl.parentNode.dataset.errorVisible = value;
};

// toogle show/hide function
const toggleVisible = (uiElement) => {
  const uiEl = uiElement.classList;

  if (uiEl.contains('hide')) {
    uiEl.remove('hide');
    uiEl.add('show');
  } else {
    uiEl.remove('show');
    uiEl.add('hide');
  }
};

// html5 validation API function
const validateHtml = (uiElements) => {
  uiElements.forEach((uiElement) => {
    // if an element is valide set data-error-visible to false
    if (uiElement.checkValidity()) {
      return showError(uiElement, 'false');
    }

    // set the form validation token (formIsValid) to false
    formIsValid = false;
    // and set data-error-visible to true
    return showError(uiElement, 'true');
  });
};

// email validation function
// regular expression found here http://emailregex.com/
const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// if email match regex set data-error-visible to false
const validateEmail = (uiElement) => {
  if (mailformat.test(uiElement.value)) {
    return showError(uiElement, 'false');
  }

  // set the form validation token (formIsValid) to false
  formIsValid = false;
  // and set data-error-visible to true
  return showError(uiElement, 'true');
};

// location validation function
const validateLocation = (uiElements) => {
  // set a validation token for this function and default false
  let locationIsValid = false;
  // loop through all the elements and if one is checked set our token (locationIsValid) to true
  uiElements.forEach((uiElement) => {
    if (uiElement.checked) {
      locationIsValid = true;
    }
  });

  // if our token is true set data-error-visible to false
  if (locationIsValid === true) {
    return showError(uiElements[0], 'false');
  }

  // set the form validation token (formIsValid) to false
  formIsValid = false;
  // and set data-error-visible to true
  return showError(uiElements[0], 'true');
};

// reset function
const resetForm = () => {
  uiFormReserve.reset();
  toggleVisible(uiFormReserve);
  toggleVisible(uiConfirmationMessage);
};

// exit function
const exitForm = () => {
  // on click reset and close modal
  uiCloseFormBtn.addEventListener('click', () => {
    resetForm();
    closeModal();
  });
};

// hide the form and show the confirmation message
const showConfirmationMessage = () => {
  toggleVisible(uiFormReserve);
  toggleVisible(uiConfirmationMessage);
  exitForm();
};

// form validation function
const validate = () => {
  // first we need to reset our token
  formIsValid = true;

  // store the inputs that we need to validate in const
  const {
    first, last, email, birthdate, quantity, location, checkbox1,
  } = uiFormReserve;

  // let's use html5 validation API for those inputs
  const inputs = [first, last, birthdate, quantity, checkbox1];
  validateHtml(inputs);

  // check if the email is valid
  validateEmail(email);

  // check if a location is selected
  validateLocation(location);

  // if formIsValid is false stop the function
  if (formIsValid === false) {
    return false;
  }

  // if we got here it means that ou form is valid so we can submit
  // Pretend that we have submit it and received a confirmation
  // we can show a confirmation message
  return showConfirmationMessage();
};

// prevent the browser from showing default error
// the html5 validation triggers on click not on submit, so we need to prevent the default event
uiFormReserve.btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  validate();
});
