document.addEventListener("DOMContentLoaded", function () {
  const usersToAddSelect = document.getElementById("usersToAdd");
  const friendsList = document.getElementById("friendsList");
  const users = document.getElementById("users");
  // Wypełnij listę wyboru dostępnymi użytkownikami
  console.log(users);
  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.uuid;
    option.text = `${user.firstName} ${user.lastName}`;
    option.dataset.picture = user.picture || "/blank-profile.png";
    usersToAddSelect.appendChild(option);
  });

  // ...

  usersToAddSelect.addEventListener("change", function () {
    // ...

    // Iteruj przez dostępnych użytkowników z parametru data
    users.forEach((user) => {
      // Sprawdź, czy użytkownik już nie istnieje na liście znajomych
      const existingFriend = Array.from(friendsList.children).find(
        (friend) => friend.dataset.uuid === user.uuid,
      );

      if (!existingFriend) {
        // Stworzenie elementu dla znajomego
        const friendItem = document.createElement("div");
        friendItem.className = "mb-2 d-flex justify-content-between align-items-center";

        // Dodanie obrazka użytkownika
        const userImage = document.createElement("img");
        userImage.src = user.picture || "/blank-profile.png";
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
        friendText.textContent = `${user.firstName} ${user.lastName}`;
        friendItem.appendChild(friendText);

        friendItem.dataset.uuid = user.uuid;

        // Dodanie przycisku usuwania
        const removeButton = document.createElement("button");
        removeButton.className = "btn btn-danger btn-sm";
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
          friendsList.removeChild(friendItem);

          // Przywrócenie opcji do listy wyboru
          const newOption = document.createElement("option");
          newOption.value = user.uuid;
          newOption.innerHTML = `${user.firstName} ${user.lastName}`;
          newOption.dataset.picture = user.picture || "/blank-profile.png";
          usersToAddSelect.appendChild(newOption);
        });

        friendItem.appendChild(removeButton);
        friendsList.appendChild(friendItem);

        // Usunięcie opcji z listy wyboru
        const optionToRemove = Array.from(usersToAddSelect.options).find(
          (option) => option.value === user.uuid,
        );
        usersToAddSelect.removeChild(optionToRemove);
      }
    });
  });
});
