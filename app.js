const pokedex = $("#pokedex");

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
    const pokemon = res.map((res) => ({
      name: res.name,
      id: res.id,
      sprite: res.sprites["front_default"],
      // type is an array so we join each string inside the type array to set it to one type property
      type: res.types.map((type) => type.type.name).join(", "),
    }));
    displayPokemon(pokemon);
    console.log(pokemon);
  });
};

const displayPokemon = (pokemon) => {
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

fetchPokemon();
