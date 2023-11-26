function validatePhoneNumber(input) {
  input.value = input.value.replace(/\D/g, "");
  if (input.value.length > 9) {
    input.value = input.value.slice(0, 9);
  }
}
