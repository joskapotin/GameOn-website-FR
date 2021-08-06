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
// select the form
const uiFormReserve = document.forms.reserve;
// select the confirmation message
const uiConfirmationMessage = document.querySelector(".confirmation-message");
// select the close-form button
const uiCloseFormBtn = document.querySelector(".close-form");

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

// html5 validation API function
const validateHtmlApi = (uiElements) => {
  // set a validation token for this function and default true
  let inputsAreValid = true;

  uiElements.forEach((uiElement) => {
    if (!uiElement.checkValidity()) {
      showError(uiElement, "true");
      inputsAreValid = false;
    } else {
      showError(uiElement, "false");
    }
  });

  return inputsAreValid;
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

// Reset function
const resetForm = () => {
  uiFormReserve.reset();
  toggleVisible(uiFormReserve);
  toggleVisible(uiConfirmationMessage);
};

// Exit function
const exitForm = () => {
  uiCloseFormBtn.addEventListener("click", () => {
    resetForm();
    closeModal();
  });
};

// Hide the form and show the confirmation message
const showConfirmationMessage = () => {
  toggleVisible(uiFormReserve);
  toggleVisible(uiConfirmationMessage);
  exitForm();
};

// Form validation function
const validate = ({ first, last, email, birthdate, quantity, location, checkbox1 }) => {
  // Let's use html5 validation API for those inputs
  const inputs = [first, last, birthdate, quantity, checkbox1];

  // console.log("html " + validateHtmlApi(inputs));
  // console.log("email " + validateEmail(email));
  // console.log("location " + validateLocation(location));

  return validateLocation(location) && validateHtmlApi(inputs) && validateEmail(email);
};

const handleSubmit = (form) => {
  const isValid = validate(form);
  if (isValid) {
    // submit
    showConfirmationMessage();
  }
};

// Prevent the browser from showing default error and handle the submit process
uiFormReserve.btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const form = e.target.form;
  handleSubmit(form);
});
