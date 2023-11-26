document.addEventListener("DOMContentLoaded", function () {
  const newAttractionInput = document.getElementById("newAttraction");
  const addAttractionButton = document.getElementById("addAttraction");
  const usersToAddSelect = document.getElementById("usersToAdd");
  const friendsList = document.getElementById("friendsList");
  const attractionsList = document.getElementById("attractions-Container");
  addAttractionButton.addEventListener("click", function () {
    const newattractionValue = newAttractionInput.value.trim();
    if (newattractionValue !== "") {
      const attractionItem = document.createElement("div");
      attractionItem.className = "mb-2 d-flex justify-content-between align-items-center";

      const attractionText = document.createElement("span");
      attractionText.textContent = newattractionValue;
      attractionItem.appendChild(attractionText);

      const removeButton = document.createElement("button");
      removeButton.className = "btn btn-danger btn-sm";
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", function () {
        attractionsList.removeChild(attractionItem);
      });

      attractionItem.appendChild(removeButton);
      attractionsList.appendChild(attractionItem);
      newAttractionInput.value = "";
    }
  });

  usersToAddSelect.addEventListener("change", function () {
    const selectedOptions = Array.from(usersToAddSelect.selectedOptions);

    selectedOptions.forEach((option) => {
      // Sprawdź, czy użytkownik już nie istnieje na liście znajomych
      const existingFriend = Array.from(friendsList.children).find(
        (friend) => friend.dataset.uuid === option.value,
      );

      if (!existingFriend) {
        // Stworzenie elementu dla znajomego
        const friendItem = document.createElement("div");
        friendItem.className = "mb-2 d-flex justify-content-between align-items-center";

        // Dodanie obrazka użytkownika
        const userImage = document.createElement("img");
        userImage.src = option.dataset.picture || "/blank-profile.png";
        userImage.className = "image";
        friendItem.appendChild(userImage);
        userImage.onerror = function () {
          // Obsługa błędu ładowania obrazu użytkownika
          console.error("Failed to load user image, loading blank profile image.");

          // Ustaw obraz blank-profile.png
          userImage.src = "/blank-profile.png";
          userImage.className = "image";
          friendItem.appendChild(userImage);
        };
        // Dodanie imienia użytkownika
        const friendText = document.createElement("span");
        friendText.textContent = option.text;
        friendItem.appendChild(friendText);

        friendItem.dataset.uuid = option.value;

        // Dodanie przycisku usuwania
        const removeButton = document.createElement("button");
        removeButton.className = "btn btn-danger btn-sm";
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
          friendsList.removeChild(friendItem);

          // Przywrócenie opcji do listy wyboru
          const newOption = document.createElement("option");
          newOption.value = option.value;
          newOption.innerHTML = option.innerHTML;
          newOption.dataset.picture = option.dataset.picture;
          usersToAddSelect.appendChild(newOption);
        });

        friendItem.appendChild(removeButton);
        friendsList.appendChild(friendItem);

        // Usunięcie opcji z listy wyboru
        usersToAddSelect.removeChild(option);
      }
    });
  });
});
