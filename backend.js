function convertToJson(res) {
  if (res.ok) {
    return res.json(); //json() is a method inside the response object. It returns the data as a json object.
  } else {
    throw new Error(res.statusText);
  }
}

async function postRatings(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function getItem() {
  const url = "https://api.lib.byu.edu/leaflet/item";
  let item = await fetch(url).then(convertToJson);
  console.log(item);
  displayItem(item);
}

function thankYouAndCheckMarck(opposite, addClass) {
  document.getElementById("thanks").innerHTML = "";
  setTimeout(() => {
    document.getElementById("thanks").innerHTML = "Thank you for your rating!";
  }, 100);
  document.getElementById(opposite).classList.remove("bi-check");
  document.getElementById(addClass).classList.add("bi-check");
}

//display outcome to the user
function displayItem(item) {
  const showItem = document.getElementById("item");
  let icon;
  item.type == "BOOK" ? (icon = "bi bi-book") : (icon = "bi bi-film");
  item.author = item.author || "Not Found";
  showItem.innerHTML = `
  <div class="container paper">  
    <h1 id="question">Would you read this?</h1>
    <hr>
    <div class="card">
      <img src="${item.thumbnail} "alt="item image">
      <div class="text">
        <h2>${item.title}</h2>
        <h3>${item.author}</h3>
        <h4 class="${icon} icon"> ${item.type}</h4>
        <p>${item.description}</p>
      </div>
    </div>
    <div class="buttons">
      <button id="no" class="bi">No</button>  
      <button id="yes" class="bi">Yes</button>
      <button id="next" class="bi bi-arrow-right"></button>
    </div> 
    <span id="thanks"></span> 
  </div>
      `;
  document.getElementById("no").addEventListener("click", () => {
    postRatings("https://api.lib.byu.edu/leaflet/users/5/ratings", {
      itemId: item.id,
      rating: "false",
    }).then((data) => {
      console.log(data);
      thankYouAndCheckMarck("yes", "no");
    });
  });
  document.getElementById("yes").addEventListener("click", () => {
    postRatings("https://api.lib.byu.edu/leaflet/users/5/ratings", {
      itemId: item.id,
      rating: "true",
    }).then((data) => {
      console.log(data);
      thankYouAndCheckMarck("no", "yes");
    });
  });
  document.getElementById('next').onclick = getItem;
}
