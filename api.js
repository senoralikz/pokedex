export let genId = {
  startingId: 1,
  endingId: 151,
};
export let pokemon = [];
export let pokemonSpecies = [];
export let ability = [];
export let moves = [];
let pokemonHtml;

export const fetchPokemon = () => {
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
      alt_forms: [],
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
      pokemon[i].name = pokemon[i].name.replaceAll("-", " ");
      pokemon[i].form_name = pokemon[i].form_name.replaceAll("-", " ");
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
      pokemonSpecies[i].name = pokemonSpecies[i].name.replaceAll("-", " ");
      pokemonSpecies[i].form_name = pokemonSpecies[i].form_name.replaceAll(
        "-",
        " "
      );
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

    // ARRAY WITH POKEMON ALT FORMS DATA!
    // for (let i = 0; i < pokemon.length; i++) {
    //   for (let j = 0; j < pokemonSpecies.length; j++) {
    //     if (pokemon[i].name === pokemonSpecies[j].name) {
    //       console.log(pokemon[i]);
    //       console.log(pokemonSpecies[j]);

    //       pokemon[i].alt_forms.push(pokemonSpecies[j]);
    //     }
    //   }
    // }

    // console.log(pokemon);

    // testing to merge both pokemon and pokemonSpecies array
    // let testPokemon = pokemon;
    // let testSpecies = pokemonSpecies;
    // let testArray = [];

    // // testArray = testPokemon.map((obj) => Object.values(obj));

    // for (let i = 0; i < testPokemon.length; i++) {
    //   for (let j = 0; j < testSpecies.length; j++) {
    //     if (testPokemon[i].name === testSpecies[j].name) {
    //       console.log(testPokemon[i]);
    //       console.log(testSpecies[j]);

    //       // testPokemon[i] += testSpecies[j];
    //     }
    //   }
    // }

    // console.log(pokemon);
    // console.log(testPokemon);
    // console.log(testArray);

    // let mergedArrays;

    // for (let i = 0; i < pokemon.length; i++) {
    //   for (let j = 0; j < pokemonSpecies.length; j++) {
    //     if (pokemon[i].name === pokemonSpecies[j].name) {
    //       console.log(pokemon[i]);
    //       console.log(pokemonSpecies[j]);

    //       mergedArrays = pokemon.concat(pokemonSpecies);
    //     }
    //   }
    // }

    // console.log(mergedArrays);

    // for (let i = 0; i < mergedArrays.length - 220; i++) {
    //   for (let j = mergedArrays.length - 220; j < mergedArrays.length; j++) {
    //     if (mergedArrays[i].name === mergedArrays[j].name) {
    //       // console.log(mergedArrays[i].name);
    //       // console.log(mergedArrays[j].name);

    //       mergedArrays.splice(i, 0, mergedArrays[j]);
    //     }
    //   }
    // }
    // console.log(mergedArrays);
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

export const fetchMoves = () => {
  // initialize array that will be filled with each abilities url
  let promises = [];

  // get url for ability id
  for (let i = 1; i <= 826; i++) {
    const url = `https://pokeapi.co/api/v2/move/${i}/`;

    // fetch the information received from the ability url and then format it to json
    //  and push it to the promises array
    promises.push(fetch(url).then((res) => res.json()));
  }

  // Using Promise.all to wait to receive all information that is requested from the ability url
  Promise.all(promises).then((res) => {
    // then initialize and set the properties we want to use from the response
    moves = res.map((res) => ({
      name: res.name,
      id: res.id,
      type: res.type.name,
      accuracy: res.accuracy,
      pp: res.pp,
      power: res.power,
      priority: res.priority,
      damage_class: res.damage_class,
      effect: res.effect_entries.map((effect) => effect.effect).join(" "),
      pokemon: res.learned_by_pokemon.map((pokemon) => pokemon.name).join(", "),
    }));

    for (let i = 756; i <= 773; i++) {
      moves[i].accuracy = "-";
      moves[i].damage_class = "-";
      moves[i].power = "-";
      moves[i].pp = "-";
    }

    for (let i = 0; i < moves.length; i++) {
      moves[i].name = moves[i].name.replaceAll("-", " ");
      moves[i].pokemon = moves[i].pokemon.replaceAll("-", " ");
      if (moves[i].damage_class !== "-") {
        moves[i].damage_class = moves[i].damage_class.name;
      }
      // moves[i].forEach(function(obj) {

      // })
    }

    moves.forEach((obj) => {
      for (let i in obj) {
        if (obj[i] === null || obj[i] === "") {
          obj[i] = "-";
        }
      }
    });

    console.log(moves);

    displayMoves();

    console.log(moves);
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

export const displayMoves = () => {
  for (let i = 0; i < moves.length; i++) {
    if (moves[i].name === "max flare") {
      moves[i].effect =
        "Inflicts damage and creates harsh sunlight. Its power and whether it is a special or physical move depends on the move it is based on.";
      moves[i].pokemon =
        "Any Dynamax Pokémon can use Max Flare if it knows a damaging Fire-type move.";
    } else if (moves[i].name === "max flutterby") {
      moves[i].effect =
        "Inflicts damage and then decreases the target's and its ally's Special Attack by one stage. Its power and whether it is a special or physical move depends on the move it is based on.";
      moves[i].pokemon =
        "Any Dynamax Pokémon can use Max Flutterby if it knows a damaging Bug-type move.";
    } else if (moves[i].name === "max Lightning") {
      moves[i].effect =
        "Inflicts damage and causes the battlefield to become Electric Terrain. Its power and whether it is a special or physical move depends on the move it is based on.";
      moves[i].pokemon =
        "Any Dynamax Pokémon can use Max Lightning if it knows a damaging Electric-type move.";
    } else if (moves[i].name === "max strike") {
      moves[i].effect =
        "Inflicts damage to a target and lowers the Speed of all opponents by one stage. Its power and whether it is a special or physical move depends on the move it is based on. If Max Strike is used with Multi-Attack or Techno Blast as its base move while the user is holding a Memory or a Drive, respectively, Max Strike turns into the Max Move of the type corresponding to the type of Memory or Drive held by the user. If Max Strike is used during weather with Weather Ball as its base move, it turns into the Max Move of the type corresponding to the type Weather Ball would be in that weather. In a similar way, if Max Strike is used during terrain with Terrain Pulse as its base move, it turns into the Max Move of the type corresponding to the type Terrain Pulse would be in that terrain. If Max Strike is used by a Pokémon with Aerilate, Galvanize, Pixilate, or Refrigerate, it turns into the Max Move of the type corresponding to the Pokémon's Ability.";
      moves[i].pokemon =
        "Any Dynamax Pokémon can use Max Strike if it knows a damaging Normal-type move.";
    } else if (moves[i].name === "max knuckle") {
      moves[i].effect =
        "Inflicts damage and increases the Attack of the user and its allies by one stage. Its power and whether it is a special or physical move depends on the move it is based on. Compared to other Max Moves, it usually has less power.";
      moves[i].pokemon =
        "Any Dynamax Pokémon can use Max Knuckle if it knows a damaging Fighting-type move.";
    } else if (moves[i].name === "max phantasm") {
      moves[i].effect =
        "Inflicts damage and lowers the target's and its ally's Defense by one stage. Its power and whether it is a special or physical move depends on the move it is based on.";
      moves[i].pokemon =
        "Any Dynamax Pokémon can use Max Phantasm if it knows a damaging Ghost-type move.";
    } else if (moves[i].name === "max hailstorm") {
      moves[i].effect =
        "Inflicts damage and creates hail. Its power and whether it is a special or physical move depends on the move it is based on.";
      moves[i].pokemon =
        "Any Dynamax Pokémon can use Max Hailstorm if it knows a damaging Ice-type move.";
    } else if (moves[i].name === "max ooze") {
      moves[i].effect =
        "Inflicts damage and then raises the user's and its ally's Special Attack by one stage. Its power and whether it is a special or physical move depends on the move it is based on. Compared to the other Max Moves, it usually has less power.";
      moves[i].pokemon =
        "Any Dynamax Pokémon can use Max Ooze if it knows a damaging Poison-type move.";
    } else if (moves[i].name === "max geyser") {
      moves[i].effect =
        "Inflicts damage and creates rain. Its power and whether it is a special or physical move depends on the move it is based on.";
      moves[i].pokemon =
        "Any Dynamax Pokémon can use Max Geyser if it knows a damaging Water-type move.";
    } else if (moves[i].name === "max airstream") {
      moves[i].effect =
        "Inflicts damage and raises the user's and its ally's Speed by one stage. Its power and whether it is a special or physical move depends on the move it is based on.";
      moves[i].pokemon =
        "Any Dynamax Pokémon can use Max Airstream if it knows a damaging Flying-type move.";
    } else if (moves[i].name === "max starfall") {
      moves[i].effect =
        "Inflicts damage and causes the battlefield to become Misty Terrain. Its power and whether it is a special or physical move depends on the move it is based on.";
      moves[i].pokemon =
        "Any Dynamax Pokémon can use Max Starfall if it knows a damaging Fairy-type move.";
    } else if (moves[i].name === "max wyrmwind") {
      moves[i].effect =
        "Inflicts damage and lowers the target's and its ally's Attack by one stage. Its power and whether it is a special or physical move depends on the move it is based on.";
      moves[i].pokemon =
        "Any Dynamax Pokémon can use Max Wyrmwind if it knows a damaging Dragon-type move.";
    } else if (moves[i].name === "max mindstorm") {
      moves[i].effect =
        "Inflicts damage and causes the battlefield to become Psychic Terrain. Its power and whether it is a special or physical move depends on the move it is based on.";
      moves[i].pokemon =
        "Any Dynamax Pokémon can use Max Mindstorm if it knows a damaging Psychic-type move.";
    } else if (moves[i].name === "max rockfall") {
      moves[i].effect =
        "Inflicts damage and creates a sandstorm. Its power and whether it is a special or physical move depends on the move it is based on.";
      moves[i].pokemon =
        "Any Dynamax Pokémon can use Max Rockfall if it knows a damaging Rock-type move.";
    } else if (moves[i].name === "max quake") {
      moves[i].effect =
        "Inflicts damage and raises the user's and its ally's Special Defense by one stage. Its power and whether it is a special or physical move depends on the move it is based on.";
      moves[i].pokemon =
        "Any Dynamax Pokémon can use Max Quake if it knows a damaging Ground-type move.";
    } else if (moves[i].name === "max darkness") {
      moves[i].effect =
        "Inflicts damage and lowers the target's and its ally's Special Defense by one stage. Its power and whether it is a special or physical move depends on the move it is based on.";
      moves[i].pokemon =
        "Any Dynamax Pokémon can use this move if it knows a damaging Dark-type move.";
    } else if (moves[i].name === "max overgrowth") {
      moves[i].effect =
        "Inflicts damage and causes the battlefield to become Grassy Terrain. Its power and whether it is a special or physical move depends on the move it is based on.";
      moves[i].pokemon =
        "Any Dynamax Pokémon can use Max Overgrowth if it knows a damaging Grass-type move.";
    } else if (moves[i].name === "max steelspike") {
      moves[i].effect =
        "Inflicts damage and raises the user's and its ally's Defense by one stage. Its power and whether it is a special or physical move depends on the move it is based on.";
      moves[i].pokemon =
        "Any Dynamax Pokémon can use Max Steelspike if it knows a damaging Steel-type move.";
    } else if (moves[i].name === "clangorous soul") {
      moves[i].effect =
        "Raises the user's Attack, Defense, Special Attack, Special Defense and Speed by one stage each, at the cost of 1/3 of its maximum HP. If all of the user's stats mentioned above are at +6 stages, or its remaining HP is less than or equal to 1/3 of its maximum, Clangorous Soul fails. Clangorous Soul will become a Water-type move when used by a Pokémon with the Ability Liquid Voice. If the user is affected by Throat Chop, it will be unable to use this move for two turns.If the user is holding a Throat Spray, the item will be consumed and the user's Special Attack stat will raise by one stage.";
      moves[i].pokemon = "Kommo-o";
    }
  }

  let movesHtml = moves.map(
    (move) =>
      `
    <tr>
      <td><b>${move.id}</b></td>
      <td class='move-caps'>${move.name}</td>
      <td>
        <ol class='move-stats'>
          <li class='move-caps'><b>Type:</b> <span class='type-span type ${move.type}'><span class='type-text'>${move.type}</span></span></li>
          <li class='move-caps'><b>Damage Class:</b> ${move.damage_class}</li>
          <li><b>Power:</b> ${move.power}</li>
          <li><b>Accuracy:</b> ${move.accuracy}</li>
          <li><b>PP:</b> ${move.pp}</li>
          <li><b>Priority:</b> ${move.priority}</li>
        </ol>
      </td>
      <td>${move.effect}</td>
      <td class='move-caps pokemon-with-move'>${move.pokemon}</td>
    </tr>
    `
  );

  $(".move-table-body").html(movesHtml);
};

fetchPokemon();
fetchAbilities();
fetchMoves();
