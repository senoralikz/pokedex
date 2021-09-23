const pokedex = $("#pokedex");
let startingId = 1;
let endingId = 151;
let pokemon = [];
let pokemonHtml;

const loading = `
  <img class='loading' src='./images/pikachu - loading.gif' alt='pikachu_loading' />
  `;

pokedex.html(loading);

const fetchPokemon = () => {
  // initialize array that will be filled with each pokemons url
  const promises = [];

  // get url for pokemon id
  for (let i = startingId; i <= endingId; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;

    // fetch the information received from the pokemon url and then format it to json
    //  and push it to the promises array
    promises.push(fetch(url).then((res) => res.json()));
  }

  // Using Promise.all to wait to receive all information that is requested from the pokemon url
  Promise.all(promises).then((res) => {
    // then initialize and set the properties we want to use from the response
    pokemon = res.map((res) => ({
      name: res.name,
      id: res.id,
      sprite: res.sprites["front_default"],
      // type is an array so we join each string inside the type array to set it to one type property
      // type: res.types,
      // type: res.types.map((type) => type.type.name).join(", "),
      type: res.types.map((type) => type.type.name),
      abilities: res.abilities.map((ability) => ability),
      stats: res.stats.map((ability) => ability),
    }));
    displayPokemon(pokemon);
    console.log(pokemon);
  });
};

const displayPokemon = (array) => {
  pokemonHtml = array.map(
    (pokemon) =>
      `
      <div class='card pokemon-card' onclick='morePokemonInfo(${pokemon.id})' data-id:'${pokemon.id}' data-bs-toggle='modal' data-bs-target='#exampleModal'>
        <p class='hash d-flex justify-content-end'>#<span class='pokemon-id'>${pokemon.id}</span></p>
        <img class='card-img' src='${pokemon.sprite}' />
        <h5 class='pokemon-name card-title'>${pokemon.name}</h5>
        <div class='d-flex justify-content-start'>
          <span class='type-span type ${pokemon.type[0]}'><span class='type-text'>${pokemon.type[0]}</span></span>
          <span class='type-span type ${pokemon.type[1]}'><span class='type-text'>${pokemon.type[1]}</span></span>
        </div>
      </div>
    `
  );

  for (let i = 0; i < array.length; i++) {
    if (array[i].type.length === 1) {
      pokemonHtml[i] = `
      <div class='card pokemon-card' onclick='morePokemonInfo(${array[i].id})' data-id:'${array[i].id}' data-bs-toggle='modal' data-bs-target='#exampleModal'>
        <p class='hash d-flex justify-content-end'>#<span class='pokemon-id'>${array[i].id}</span></p>
        <img class='card-img' src='${array[i].sprite}' />
        <h5 class='pokemon-name card-title'>${array[i].name}</h5>
        <div class='d-flex justify-content-start'>
          <span class='type-span type ${array[i].type[0]}'><span class='type-text'>${array[i].type[0]}</span></span>
        </div>
      </div>
    `;
    }
  }

  pokedex.html(pokemonHtml);
};

const sortPokemonName = () => {
  pokemon.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

  displayPokemon(pokemon);
};

const reversePokemonName = () => {
  sortPokemonName();

  pokemon.reverse();

  displayPokemon(pokemon);
};

const sortPokemonId = () => {
  pokemon.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));

  displayPokemon(pokemon);
};

const reversePokemonId = () => {
  sortPokemonId();

  pokemon.reverse();

  displayPokemon(pokemon);
};

const sortingOptions = () => {
  let selValue = $("#sortOptions").val();

  if (selValue === "1") {
    sortPokemonName();
  } else if (selValue === "2") {
    reversePokemonName();
  } else if (selValue === "3") {
    sortPokemonId();
  } else if (selValue === "4") {
    reversePokemonId();
  }
};

const genSelection = () => {
  let genValue = $("#genOptions").val();

  if (genValue === "1") {
    startingId = 1;
    endingId = 151;

    pokedex.html(loading);

    fetchPokemon();
  } else if (genValue === "2") {
    startingId = 152;
    endingId = 251;

    pokedex.html(loading);

    fetchPokemon();
  } else if (genValue === "3") {
    startingId = 252;
    endingId = 386;

    pokedex.html(loading);

    fetchPokemon();
  } else if (genValue === "4") {
    startingId = 387;
    endingId = 493;

    pokedex.html(loading);

    fetchPokemon();
  } else if (genValue === "5") {
    startingId = 494;
    endingId = 649;

    pokedex.html(loading);

    fetchPokemon();
  } else if (genValue === "6") {
    startingId = 650;
    endingId = 721;

    pokedex.html(loading);

    fetchPokemon();
  } else if (genValue === "7") {
    startingId = 722;
    endingId = 809;

    pokedex.html(loading);

    fetchPokemon();
  } else if (genValue === "8") {
    startingId = 810;
    endingId = 898;

    pokedex.html(loading);

    fetchPokemon();
  } else if (genValue === "9") {
    startingId = 1;
    endingId = 898;

    pokedex.html(loading);

    fetchPokemon();
  }
  $(".dropdown").not("#genOptions").val(0).not("#genOptions");
};

const typeSelection = () => {
  let typeValue1 = $("#typeOptions1 option:selected").text().toLowerCase();
  let typeValue2 = $("#typeOptions2 option:selected").text().toLowerCase();
  let filteredPokemon;
  let doubleFilteredPokemon;

  if ($("#typeOptions1").val() > "0") {
    filteredPokemon = pokemon.filter(
      (pokemon) =>
        typeValue1 === pokemon.type[0] || typeValue1 === pokemon.type[1]
    );

    displayPokemon(filteredPokemon);
  } else if ($("#typeOptions2").val() > "0") {
    filteredPokemon = pokemon.filter(
      (pokemon) =>
        typeValue2 === pokemon.type[0] || typeValue2 === pokemon.type[1]
    );

    displayPokemon(filteredPokemon);
  }

  if ($("#typeOptions1").val() > "0" && $("#typeOptions2").val() > "0") {
    doubleFilteredPokemon = filteredPokemon.filter(
      (pokemon) =>
        typeValue2 === pokemon.type[0] || typeValue2 === pokemon.type[1]
    );

    displayPokemon(doubleFilteredPokemon);
  } else if (
    $("#typeOptions1").val() === "0" &&
    $("#typeOptions2").val() === "0"
  ) {
    displayPokemon(pokemon);
  }
};

$(document).ready(function () {
  $("#searchPokemon").on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $("#pokedex div").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

$(document).ready(() => {
  console.log("document ready");
});

console.log("ready!");

const morePokemonInfo = (x) => {
  console.log("finally");
  // let id = $(this).data("id");
  console.log(x);

  $(".modal-title").html(pokemon[x - 1].name);
  $(".modal-body").html(`
  <p class='hash d-flex justify-content-end'>#<span class='pokemon-id'>${
    pokemon[x - 1].id
  }</span></p>
  <img class='card-img' src='${pokemon[x - 1].sprite}' />
  <div class='d-flex justify-content-start'>
    <span class='type-span type ${
      pokemon[x - 1].type[0]
    }'><span class='type-text'>${pokemon[x - 1].type[0]}</span></span>
    <span class='type-span type ${
      pokemon[x - 1].type[1]
    }'><span class='type-text'>${pokemon[x - 1].type[1]}</span></span>
  </div>
  `);

  for (let i = 0; i < pokemon.length; i++) {
    if (pokemon[x - 1].type.length === 1) {
      $(".modal-body").html(`
  <p class='hash d-flex justify-content-end'>#<span class='pokemon-id'>${
    pokemon[x - 1].id
  }</span></p>
  <img class='card-img' src='${pokemon[x - 1].sprite}' />
  <div class='d-flex justify-content-start'>
    <span class='type-span type ${
      pokemon[x - 1].type[0]
    }'><span class='type-text'>${pokemon[x - 1].type[0]}</span></span>
  </div>
  `);
    }
  }
};

fetchPokemon();
$("#sortOptions").on("change", sortingOptions);
$("#genOptions").on("change", genSelection);
$("#typeOptions1").on("change", typeSelection);
$("#typeOptions2").on("change", typeSelection);
// $(".more-info").on("click", morePokemonInfo);
// $("#pokedex").on("click", ".pokemon-card", morePokemonInfo);
// $("#pokedex").on("click", ".pokemon-card", function () {
//   let dataId = $(this).data("id");
//   console.log(dataId);
// });
