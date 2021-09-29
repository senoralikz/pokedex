let pokemonHtml;
export let genId = {
  startingId: 1,
  endingId: 151,
};
export let pokemon = [];
export let ability = [];

export const fetchPokemon = () => {
  let pokemonSpecies = [];
  // initialize array that will be filled with each pokemons url
  let promises = [];

  // get url for pokemon id
  for (let i = genId.startingId; i <= genId.endingId; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;

    // fetch the information received from the pokemon url and then format it to json
    //  and push it to the promises array
    promises.push(fetch(url).then((res) => res.json()));
  }

  // Using Promise.all to wait to receive all information that is requested from the pokemon url
  Promise.all(promises).then((res) => {
    // then initialize and set the properties we want to use from the response
    pokemon = res.map((res) => ({
      name: res.species.name,
      form_name: res.forms.map((form) => form.name).join(" "),
      id: res.id,
      sprite: res.sprites["front_default"],
      sprite_shiny: res.sprites["front_shiny"],
      // type is an array so we join each string inside the type array to set it to one type property
      // type: res.types,
      // type: res.types.map((type) => type.type.name).join(", "),
      type: res.types.map((type) => type.type.name),
      abilities: res.abilities.map((ability) => ability),
      stats: res.stats.map((stat) => stat),
    }));
    for (let i = 0; i < pokemon.length; i++) {
      for (let j = 0; j < pokemon[i].abilities.length; j++) {
        pokemon[i].abilities[j].ability.name = pokemon[i].abilities[
          j
        ].ability.name.replaceAll("-", " ");
      }
      for (let x = 0; x < pokemon[i].stats.length; x++) {
        pokemon[i].stats[x].stat.name = pokemon[i].stats[
          x
        ].stat.name.replaceAll("-", " ");
      }
    }

    displayPokemon(pokemon);
    console.log(pokemon);
  });

  promises = [];

  // get url for pokemon id
  for (let i = 10001; i <= 10220; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;

    // fetch the information received from the pokemon url and then format it to json
    //  and push it to the promises array
    promises.push(fetch(url).then((res) => res.json()));
  }

  // Using Promise.all to wait to receive all information that is requested from the pokemon url
  Promise.all(promises).then((res) => {
    // then initialize and set the properties we want to use from the response
    pokemonSpecies = res.map((res) => ({
      name: res.species.name,
      form_name: res.forms.map((form) => form.name).join(" "),
      id: res.id,
      sprite: res.sprites["front_default"],
      sprite_shiny: res.sprites["front_shiny"],
      // type is an array so we join each string inside the type array to set it to one type property
      // type: res.types,
      // type: res.types.map((type) => type.type.name).join(", "),
      type: res.types.map((type) => type.type.name),
      abilities: res.abilities.map((ability) => ability),
      stats: res.stats.map((stat) => stat),
    }));
    for (let i = 0; i < pokemonSpecies.length; i++) {
      // pokemonSpecies[i].form_name = pokemonSpecies[i].form_name.replaceAll(
      //   "-",
      //   " "
      // );
      for (let j = 0; j < pokemonSpecies[i].abilities.length; j++) {
        pokemonSpecies[i].abilities[j].ability.name = pokemonSpecies[
          i
        ].abilities[j].ability.name.replaceAll("-", " ");
      }
      for (let x = 0; x < pokemonSpecies[i].stats.length; x++) {
        pokemonSpecies[i].stats[x].stat.name = pokemonSpecies[i].stats[
          x
        ].stat.name.replaceAll("-", " ");
      }
    }
    console.log(pokemonSpecies);
    let testPokeI;
    let testPokeJ;
    for (let i = 0; i < pokemon.length; i++) {
      for (let j = 0; j < pokemonSpecies.length; j++) {
        if (pokemon[i].name === pokemonSpecies[j].name) {
          testPokeI = pokemon[i];
          testPokeJ = pokemon[j];
        }
      }
    }
    console.log(testPokeI);
    console.log(testPokeJ);
  });
};

export const fetchAbilities = () => {
  let galarAbility = [];

  // initialize array that will be filled with each abilities url
  let promises = [];

  // get url for ability id
  for (let i = 1; i <= 233; i++) {
    const url = `https://pokeapi.co/api/v2/ability/${i}/`;

    // fetch the information received from the ability url and then format it to json
    //  and push it to the promises array
    promises.push(fetch(url).then((res) => res.json()));
  }

  // Using Promise.all to wait to receive all information that is requested from the ability url
  Promise.all(promises).then((res) => {
    // then initialize and set the properties we want to use from the response
    ability = res.map((res) => ({
      name: res.name,
      id: res.id,
      effect: res.effect_entries
        .filter((effect) => effect.language.name === "en")
        .map((effect) => effect.effect)
        .join(" "),
      pokemon: res.pokemon.map((pokemon) => pokemon.pokemon.name).join(", "),
    }));
    for (let i = 0; i < ability.length; i++) {
      ability[i].name = ability[i].name.replaceAll("-", " ");
    }
  });

  promises = [];

  for (let i = 234; i <= 267; i++) {
    const url = `https://pokeapi.co/api/v2/ability/${i}/`;

    // fetch the information received from the ability url and then format it to json
    //  and push it to the promises array
    promises.push(fetch(url).then((res) => res.json()));
  }

  Promise.all(promises).then((res) => {
    // then initialize and set the properties we want to use from the response
    galarAbility = res.map((res) => ({
      name: res.name,
      id: res.id,
      effect: res.flavor_text_entries
        .map((text_entry) => text_entry.flavor_text)
        .join(" "),
      pokemon: res.pokemon.map((pokemon) => pokemon.pokemon.name).join(", "),
    }));
    ability.push(...galarAbility);
    for (let i = 0; i < ability.length; i++) {
      ability[i].name = ability[i].name.replaceAll("-", " ");
    }
    displayAbilities();
    console.log(ability);
  });
};

export const displayPokemon = (array) => {
  pokemonHtml = array.map(
    (pokemon) =>
      `
      <div class='card pokemon-card specificPokemon${pokemon.id}' data-id='${pokemon.id}' data-bs-toggle='modal' data-bs-target='#exampleModal'>
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
      <div class='card pokemon-card' data-id='${array[i].id}' data-bs-toggle='modal' data-bs-target='#exampleModal'>
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

  $("#pokedex").html(pokemonHtml);
};

export const displayAbilities = () => {
  let abilitiesHtml = ability.map(
    (ability) =>
      `
    <tr>
      <td><b>${ability.id}</b></td>
      <td class='ability-name'>${ability.name}</td>
      <td>${ability.effect}</td>
      <td class='ability-name pokemon-with-ability'>${ability.pokemon}</td>
    </tr>
    `
  );

  $(".ability-table-body").html(abilitiesHtml);
};

fetchPokemon();
fetchAbilities();
