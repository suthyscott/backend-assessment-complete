const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortune-btn");
const gifBtn = document.getElementById("gif-btn");
const gifSection = document.getElementById("gif-section");
const wishlistForm = document.getElementById("wishlist-form");
const priority = document.getElementById("priority-dropdown");
const itemName = document.getElementById("item-name");
const wishlistSection = document.getElementById("wishlist-section");

import { apiKeys } from "../config.js";

// Compliment Button
complimentBtn.addEventListener("click", () => {
  console.log("hit");
  axios.get("http://localhost:4000/api/compliment/").then(function (response) {
    const data = response.data;
    alert(data);
  });
});

// Fortune button
fortuneBtn.addEventListener("click", () => {
  axios.get("http://localhost:4000/api/fortunes").then((res) => {
    alert(res.data);
  });
});

// Delete an item
const deleteitem = (id) => {
  axios.delete(`http://localhost:4000/api/wishlist/${id}`)
    .then((res) => {
      displayItems(res.data);
    });
};

// makes the cards to display the items. 
const displayItems = (arr) => {
  console.log(arr);
  while (wishlistSection.firstChild) {
    wishlistSection.removeChild(wishlistSection.firstChild);
  }

  for (let i = 0; i < arr.length; i++) {
    const newItem = document.createElement("div");

    newItem.className = "new-item";

    newItem.innerHTML = `<h1 class='item-title'>${arr[i].name}</h1>
        <p>priority: ${arr[i].priority}</p>
        <button onclick="deleteitem(${arr[i].id})" class='delete-btn' value="${arr[i].id}">delete</button>`;

    wishlistSection.appendChild(newItem);

    // let deleteBtns = document.getElementsByClassName("delete-btn");

    // for (let i = 0; i < deleteBtns.length; i++) {
    //   deleteBtns[i].addEventListener("click", deleteItem);
    // }
  }
};



// Adding a wishlist item
wishlistForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newItem = {
    name: itemName.value,
    priority: priority.value
  };

  axios.post("http://localhost:4000/api/wishlist", newItem)
    .then((res) => {
        displayItems(res.data);
    });

  itemName.value = "";
  priority.selectedIndex = 0;
});

// Gif button
gifBtn.addEventListener("click", () => {
  while (gifSection.firstChild) {
    gifSection.removeChild(gifSection.firstChild);
  }
  axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${apiKeys.gif_api_key}&tag=funny&rating=g`)
    .then((res) => {
      console.log(res.data.data);
      const gif = document.createElement("img");
      gif.setAttribute("src", res.data.data.images.original.url);
      gif.setAttribute("alt", "Whassup");
      gif.setAttribute("id", "gif");
      gifSection.appendChild(gif);
    });
});
