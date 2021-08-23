function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const hamburger = document.querySelector(".hamburger");
const closeModalBtn = document.querySelector(".close-modal");
const uiFormReserve = document.forms.reserve;

// Responsive menu
hamburger.addEventListener("click", editNav);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// close modal event
closeModalBtn.addEventListener("click", closeModal);

/*
FORM VALIDATION SECTION
*/

// Display or hide error messages, the CSS handle the display
const showError = (uiElement, value) => {
  const uiEl = uiElement;
  uiEl.parentNode.dataset.errorVisible = value;
};

// Toogle visibility
const toggleVisible = (uiElement) => {
  const uiEl = uiElement.classList;

  if (uiEl.contains("hide")) {
    uiEl.remove("hide");
    uiEl.add("show");
  } else {
    uiEl.remove("show");
    uiEl.add("hide");
  }
};

// firstname and lastname validation
const validateName = (uiElement) => {
  const nameFormat = /^(?!s)([a-z ,.'-]+){2}$/;

  if (nameFormat.test(uiElement.value)) {
    showError(uiElement, "false");
    return true;
  }

  showError(uiElement, "true");
  return false;
};

// Email validation, regular expression found here http://emailregex.com/
const validateEmail = (uiElement) => {
  const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (mailformat.test(uiElement.value)) {
    showError(uiElement, "false");
    return true;
  }

  showError(uiElement, "true");
  return false;
};

// Birthdate validation
const validateBirthdate = (uiElement) => {
  const dateFormat = /^((?:19|20)[0-9][0-9])-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
  const currentDate = Date.parse(new Date());
  const birthdate = Date.parse(uiElement.value);

  if (dateFormat.test(uiElement.value) && currentDate > birthdate) {
    showError(uiElement, "false");
    return true;
  }

  showError(uiElement, "true");
  return false;
};

// Quantity validation
const validateQuantity = (uiElement) => {
  const quantityFormat = /^[0-9]*$/;

  if (quantityFormat.test(uiElement.value)) {
    showError(uiElement, "false");
    return true;
  }

  showError(uiElement, "true");
  return false;
};

// Location validation
const validateLocation = (uiElements) => {
  // set a validation token for this function and default false
  let locationIsValid = false;

  uiElements.forEach((uiElement) => {
    if (uiElement.checked) {
      locationIsValid = true;
    }
  });

  if (locationIsValid === true) {
    showError(uiElements[0], "false");
    return true;
  }

  showError(uiElements[0], "true");
  return false;
};

// CGU Validation
const validateCgu = (uiElement) => {
  if (uiElement.checked) {
    showError(uiElement, "false");
    return true;
  }

  showError(uiElement, "true");
  return false;
};

// Reset function
const resetForm = (uiForm, uiConfirmation) => {
  uiForm.reset();
  toggleVisible(uiConfirmation);
};

// Exit function
const exitForm = (uiForm, uiConfirmation) => {
  const uiCloseFormBtn = uiForm.querySelector(".close-form");
  uiCloseFormBtn.addEventListener("click", () => {
    resetForm(uiForm, uiConfirmation);
    closeModal();
  });
};

// Hide the form and show the confirmation message
const showConfirmationMessage = (uiForm) => {
  const uiConfirmation = uiForm.querySelector(".confirmation-message");
  toggleVisible(uiConfirmation);
  exitForm(uiForm, uiConfirmation);
};

// Form validation function
const validate = ({ first, last, email, birthdate, quantity, location, checkbox1 }) => {
  const isFirstnameValid = validateName(first);
  const isLastnameValid = validateName(last);
  const isEmailValid = validateEmail(email);
  const isBirthdateValid = validateBirthdate(birthdate);
  const isQuantityValid = validateQuantity(quantity);
  const isLocationValid = validateLocation(location);
  const isCguValid = validateCgu(checkbox1);

  return isFirstnameValid && isLastnameValid && isEmailValid && isBirthdateValid && isQuantityValid && isLocationValid && isCguValid;
};

const handleSubmit = (uiForm) => {
  const isValid = validate(uiForm);

  if (isValid) {
    // submit function should append here
    showConfirmationMessage(uiForm);
  }
};

// Prevent the browser from showing default error and handle the submit process
uiFormReserve.btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const uiForm = e.target.form;
  handleSubmit(uiForm);
});
