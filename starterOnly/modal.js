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

/*
FORM VALIDATION SECTION
*/

// select the form
const form = document.forms.reserve;

// we also need a variable that will be our form validation token
// if any input is not valid we update this variable to false
let formIsValid = true;

// display or hide error messages function
// Select the parent and set a value to true or false to the attribut "data-error-visible"
// The CSS handle the display
const errorVisible = (element, value) => {
  const el = element;
  el.parentNode.dataset.errorVisible = value;
};

// html5 validation API function
const htmlValidation = (elements) => {
  elements.forEach((element) => {
    // if an element is valide set data-error-visible to false
    if (element.checkValidity()) {
      return errorVisible(element, 'false');
    }

    // set the form validation token (formIsValid) to false
    formIsValid = false;
    // and set data-error-visible to true
    return errorVisible(element, 'true');
  });
};

// email validation function
// regular expression found here http://emailregex.com/
const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// if email match regex set data-error-visible to false
const validateEmail = (element) => {
  if (mailformat.test(element.value)) {
    return errorVisible(element, 'false');
  }

  // set the form validation token (formIsValid) to false
  formIsValid = false;
  // and set data-error-visible to true
  return errorVisible(element, 'true');
};

// location validation function
const validateLocation = (elements) => {
  // set a validation token for this function and default false
  let locationIsValid = false;
  // loop through all the elements and if one is checked set our token (locationIsValid) to true
  elements.forEach((element) => {
    if (element.checked) {
      locationIsValid = true;
    }
  });

  // if our token is true set data-error-visible to false
  if (locationIsValid === true) {
    return errorVisible(elements[0], 'false');
  }

  // set the form validation token (formIsValid) to false
  formIsValid = false;
  // and set data-error-visible to true
  return errorVisible(elements[0], 'true');
};

// submit form function
const submitForm = () => {
  console.log('form is valid');
  // form.submit();
};

// form validation function
const validate = () => {
  // first we need to reset our token
  formIsValid = true;

  // store the inputs that we need to validate in const
  const {
    first, last, email, birthdate, quantity, location, checkbox1,
  } = form;

  // let's use html5 validation API for those inputs
  const inputs = [first, last, birthdate, quantity, checkbox1];
  htmlValidation(inputs);

  // check if the email is valid
  validateEmail(email);

  // check if a location is selected
  validateLocation(location);

  // if formIsValid is false stop the function
  if (formIsValid === false) {
    console.log('form not valid');
    return false;
  }

  // if we got here it means that ou form is valid so we can submit
  return submitForm();
};

// prevent the browser from showing default error
// the html5 validation triggers on click not on submit, so we need to prevent the default event
form.btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  validate();
});
