let showUser = 1;

function toggleUser() {
  const userList = document.getElementById("userList");

  if (showUser === 1) {
    fetch("get-users.php")
      .then((response) => response.json())
      .then((data) => {
        userList.style.display = "inline";

        // Build list with click handlers
        const html = data.map(user => `<li onclick="selectUser('${user}')">${user}</li>`).join("");
        userList.innerHTML = `<ul>${html}</ul>`;
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  } else {
    userList.style.display = "none";
  }

  showUser *= -1;
}

function selectUser(username) {
  // Update form hidden input and visible text
  document.getElementById("usernameInput").value = username;
  document.getElementById("displayUsername").textContent = username;
  document.getElementById("userList").style.display = "none";
  showUser = -1;
}


let showPower = 1;

function togglePower() {
  if (showPower === 1) {
    document.getElementById("powerList").style.display = "block";
  } else {
    document.getElementById("powerList").style.display = "none";
  }

  showPower = showPower * -1;
}
