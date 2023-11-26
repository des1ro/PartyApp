$(document).ready(function () {
  $("#dateOfBirth").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
    yearRange: "-100:+0",
    showButtonPanel: true,
  });
});
