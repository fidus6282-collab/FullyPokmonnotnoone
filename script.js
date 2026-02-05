import pokemons from "./pokemons.js";
console.log(pokemons);

let kartochki = document.querySelector(".kartochki");
let inpuSearch = document.querySelector(".inpuSearch");
let sortSelect = document.querySelector(".sortSelect");
let selectCategory = document.querySelector(".selectCategory");
let toggleBtn = document.querySelector(".toggle");

function generator(massiv) {
  kartochki.textContent = "";

  massiv.forEach((element) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("card");
    newDiv.innerHTML = `
            <h2>${element.name}</h2>
            <img src=${element.img} alt="">
            <span class="type">${element.type}</span>
            <span class="ves">${element.weight}</span>
            <span class="id">${element.id}</span>
             <span class="spawn_time">${element.spawn_time}</span>
                     <span class="weaknesses">${element.weaknesses}</span>



        `;
    kartochki.appendChild(newDiv);
  });
}

generator(pokemons);

inpuSearch.addEventListener("input", () => {
  let inputSearchValue = inpuSearch.value.toLowerCase().trim();

  let filteredPokemons = pokemons.filter((element) =>
    element.name.toLowerCase().trim().includes(inputSearchValue),
  );
  generator(filteredPokemons);
});

selectCategory.addEventListener("change", () => {
  console.log(selectCategory.value);

  if (selectCategory.value === "all") {
    generator(pokemons);
  } else {
    let categoryFilter = pokemons.filter((element) => {
      return element.type.some(
        (t) => t.toLowerCase() === selectCategory.value.toLowerCase(),
      );
    });
    generator(categoryFilter);
  }
});

sortSelect.addEventListener("change", () => {
  let sortedPokemons = [...pokemons];

  if (sortSelect.value === "ABC") {
    sortedPokemons.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortSelect.value === "CBA") {
    sortedPokemons.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortSelect.value === "BIG") {
    sortedPokemons.sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight));
  } else if (sortSelect.value === "SMALL") {
    sortedPokemons.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));
  }

  generator(sortedPokemons);
});


toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
    if(document.body.classList.contains("dark-mode")) {
        toggleBtn.textContent = "Light Mode";
    } else {
        toggleBtn.textContent = "Dark Mode";
    }
})