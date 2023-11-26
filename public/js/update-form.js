const userForm = document.getElementById("userForm");
const editSwitch = document.getElementById("editSwitch");
const updateButton = document.getElementById("updateButton");
const dateOfBirth = document.getElementById("dateOfBirth");
const image = document.getElementById("image");
editSwitch.addEventListener("change", () => {
  const formInputs = userForm.querySelectorAll("input");
  formInputs.forEach((input) => {
    input.readOnly = !editSwitch.checked;
  });

  updateButton.style.display = editSwitch.checked ? "block" : "none";
  dateOfBirth.style.display = editSwitch.checked ? "block" : "none";
  image.style.display = editSwitch.checked ? "block" : "none";
});
