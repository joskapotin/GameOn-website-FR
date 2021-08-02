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

// set some variables
// we need the form and the inputs we need to check
const form = document.forms.reserve;
const {
  first, last, email, birthdate, quantity, checkbox1, submit,
} = form;
const locations = form.location;

// we also need a variable that will be our form validation token
// if an input is not valid we update this variable to false
let formIsValid = true;

// display or hide error messages function
// Select the parent and set a value to true or false to the attribut "data-error-visible"
// The CSS handle the display
const errorVisible = (e, value) => {
  e.parentNode.dataset.errorVisible = value;
};

// html5 validation API function
const htmlValidation = (items) => {
  items.forEach((item) => {
    // if an item is not valide set data-error-visible to true and set formIsValid to false
    // else set data-error-visible to false
    if (item.checkValidity()) {
      errorVisible(item, 'false');
    } else {
      errorVisible(item, 'true');
      formIsValid = false;
    }
  });
};

// email validation function
// regular expression found here http://emailregex.com/
const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// if email match regex return true else return false
const validateEmail = (item) => {
  if (mailformat.test(item.value)) {
    errorVisible(item, 'false');
  } else {
    errorVisible(item, 'true');
    formIsValid = false;
  }
};

// location validation function
const validateLocation = (items) => {
  // set a validation token for this function and default false
  let locationIsValid = false;
  // loop through all the items and if one is checked set our token (locationIsValid) to true
  items.forEach((item) => {
    if (item.checked) {
      locationIsValid = true;
    }
  });

  // if our token is true set data-error-visible to false
  // else set data-error-visible to true and the form validation token (formIsValid) to false
  if (locationIsValid === true) {
    errorVisible(items[0], 'false');
  } else {
    errorVisible(items[0], 'true');
    formIsValid = false;
  }
};

// form validation function
const validate = () => {
  // let's use html5 validation API for those inputs
  const inputs = [first, last, birthdate, quantity, checkbox1];
  htmlValidation(inputs);

  // check if the email is valid
  validateEmail(email);

  // check if a location is selected
  validateLocation(locations);

  // check formIsValid and decide what to do
  if (formIsValid === true) {
    console.log('form is valid');
  } else {
    console.log('form not valid');
  }
};

// prevent the browser from showing default error
// the html5 validation triggers on click not on submit, so we need to prevent the default event
submit.addEventListener('click', (e) => {
  e.preventDefault();
  validate();
});
