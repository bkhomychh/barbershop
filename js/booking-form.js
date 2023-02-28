const bookingForm = document.querySelector('.booking-form-js');

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

function onBookingFormInput() {
  const data = getFormData();
  updateLocalStorage(data);
}

function onBookingFormSubmit(evt) {
  evt.preventDefault();

  const data = getFormData();
  console.log(data);

  evt.target.reset();
  updateLocalStorage();
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

  return () => {
    if (!isReady) {
      return;
    }

    fn();
    isReady = false;

    setTimeout(() => {
      isReady = true;
    }, ms);
  };
}
