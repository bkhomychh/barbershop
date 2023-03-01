const bookingForm = document.querySelector('.booking-form-js');
const userPhoneNumber = bookingForm.querySelector('#phone-mask');
const sendBtn = bookingForm.querySelector('.form__btn');
const successNotice = document.querySelector('.success');

let phoneMask = IMask(userPhoneNumber, {
  mask: '+{380}-(00)-000-0000',
});

bookingForm.addEventListener('submit', onBookingFormSubmit);
bookingForm.addEventListener('input', throttle(onBookingFormInput, 300));

fillForm(bookingForm);

function fillForm(formRef) {
  const { name, tel, message } = formRef.elements;
  const data = getDataFromLocalStorage();

  if (!data) {
    return;
  }

  name.value = data.name;
  tel.value = data.tel;
  message.value = data.message;
}

function onBookingFormInput(evt) {
  const data = getFormData();
  const requiredElements = [...evt.currentTarget.querySelectorAll('[required]')];
  const areFieldsEmpty = requiredElements.some(el => el.value.trim() === '');

  updateLocalStorage(data);

  if (!areFieldsEmpty && userPhoneNumber.value.length == 18) {
    enableBtn();
  } else {
    disableBtn();
  }
}

function onBookingFormSubmit(evt) {
  evt.preventDefault();

  const data = getFormData();
  console.log(data);

  evt.target.reset();
  updateLocalStorage();
  disableBtn();
  showSuccess();

  setTimeout(() => {
    hideSuccess();
  }, 1000);
}

function getFormData() {
  const formData = new FormData(bookingForm);
  const data = {};

  for (let [name, value] of formData) {
    data[name] = value.trim();
  }

  return data;
}

function updateLocalStorage(data) {
  try {
    if (!data) {
      localStorage.setItem('formData', '');
      return;
    }

    localStorage.setItem('formData', JSON.stringify(data));
  } catch (error) {
    console.log(error.message);
  }
}

function getDataFromLocalStorage() {
  try {
    const data = localStorage.getItem('formData');
    return data ? JSON.parse(data) : undefined;
  } catch (error) {
    console.log(error.message);
  }
}

function throttle(fn, ms) {
  let isReady = true;

  return evt => {
    if (!isReady) {
      return;
    }

    fn(evt);
    isReady = false;

    setTimeout(() => {
      isReady = true;
    }, ms);
  };
}

function enableBtn() {
  sendBtn.disabled = false;
}

function disableBtn() {
  sendBtn.disabled = true;
}

function showSuccess() {
  successNotice.classList.add('isShown');
}

function hideSuccess() {
  successNotice.classList.remove('isShown');
}
