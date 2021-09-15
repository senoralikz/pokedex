const pokedex = $("#pokedex");

let pokemon = [];

const fetchPokemon = () => {
  // initialize array that will be filled with each pokemons url
  const promises = [];

  // get url for pokemon id up to 151
  for (let i = 1; i <= 151; i++) {
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
      type: res.types.map((type) => type.type.name).join(", "),
    }));
    displayPokemon();
    console.log(pokemon);
  });
};

const displayPokemon = () => {
  const pokemonHtml = pokemon
    .map(
      (pokemon) =>
        `
      <div class='card'>
        <p class='pokemon-id'>#${pokemon.id}</p>
        <img class='card-img' src='${pokemon.sprite}' />
        <h5 class='card-title'>${pokemon.name}</h5>
        <p class='card-text'>Type: ${pokemon.type}</p>
      </div>
    `
    )
    .join("");
  pokedex.html(pokemonHtml);
};

const sortPokemonName = () => {
  pokemon.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

  displayPokemon();
};

const reversePokemonName = () => {
  sortPokemonName();

  pokemon.reverse();

  displayPokemon();
};

const sortPokemonId = () => {
  pokemon.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));

  displayPokemon();
};

const reversePokemonId = () => {
  sortPokemonId();

  pokemon.reverse();

  displayPokemon();
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

$(document).ready(function () {
  $("#searchPokemon").on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $("#pokedex div").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

fetchPokemon();
$("#sortOptions").on("change", sortingOptions);
