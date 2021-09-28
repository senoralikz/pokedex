const pokedex = $("#pokedex");
let startingId = 1;
let endingId = 151;
let ability = [];
let galarAbility = [];
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
      stats: res.stats.map((stat) => stat),
    }));
    displayPokemon(pokemon);
    console.log(pokemon);
  });
};

const fetchAbilities = () => {
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
    }));
    ability.push(...galarAbility);
    console.log(ability);
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

const morePokemonInfo = (x) => {
  for (let i = 0; i < pokemon.length; i++) {
    if (pokemon[i].id === x) {
      $(".modal-title").html(pokemon[i].name);
      $(".modal-body").html(`
        <div class='d-flex justify-content-between'>
          <div>
            <div class='type-area justify-content-start'>
              <span class='modal-type type-span ${pokemon[i].type[0]}'><span class='modal-type-text'>${pokemon[i].type[0]}</span></span>
            </div>
            <div class='modal-stats'>
              <p>${pokemon[i].stats[0].stat.name}: ${pokemon[i].stats[0].base_stat}</p>
              <p>${pokemon[i].stats[1].stat.name}: ${pokemon[i].stats[1].base_stat}</p>
              <p>${pokemon[i].stats[2].stat.name}: ${pokemon[i].stats[2].base_stat}</p>
              <p>${pokemon[i].stats[3].stat.name}: ${pokemon[i].stats[3].base_stat}</p>
              <p>${pokemon[i].stats[4].stat.name}: ${pokemon[i].stats[4].base_stat}</p>
              <p>${pokemon[i].stats[5].stat.name}: ${pokemon[i].stats[5].base_stat}</p>
            </div>
          </div>
          <div class='sprite-id'>
            <p class='modal-hash d-flex justify-content-end'>#<span class='modal-pokemon-id'>${pokemon[i].id}</span></p>
            <img class='modal-pokemon-img card-img' src='${pokemon[i].sprite}' />
          </div>
        </div>
        <div class="modal-ability-info">
          <p class="abilities-heading d-flex justify-content-center"><b>Abilities</b></p>
          <div class="ability">
            <div class='first-ability justify-content-center'>
            </div>
            <div class='ability-divider'></div>
            <div class='second-ability justify-content-center'>
            </div>
            <div class='third-ability-divider'></div>
            <div class='third-ability justify-content-center'>
            </div>
          </div>
        </div>
      `);
      if (pokemon[i].type.length === 2) {
        $(".type-area").append(
          `<span class='modal-type type-span ${pokemon[i].type[1]}'><span class='modal-type-text'>${pokemon[i].type[1]}</span></span>`
        );
      }

      for (let j = 0; j < ability.length; j++) {
        if (pokemon[i].abilities[0].ability.name === ability[j].name) {
          $(".first-ability").html(`
          <p class="ability-name d-flex justify-content-center"><b>${ability[j].name}</b></p>
          <p class='ability-description'>${ability[j].effect}</p>
          `);
        }
        if (pokemon[i].abilities.length === 2) {
          if (pokemon[i].abilities[1].ability.name === ability[j].name) {
            $(".ability-divider").html("<hr>");
            $(".second-ability").html(`
          <p class="ability-name d-flex justify-content-center"><b>${ability[j].name}</b></p>
          <p id='hidden-ability-slot-2' class='hidden-ability d-flex justify-content-center'></p>
          <p class='ability-description'>${ability[j].effect}</p>
          `);
          }
          if (pokemon[i].abilities[1].is_hidden === true) {
            $("#hidden-ability-slot-2").html("(Hidden Ability)");
          }
        } else if (pokemon[i].abilities.length === 3) {
          if (pokemon[i].abilities[1].ability.name === ability[j].name) {
            $(".ability-divider").html("<hr>");
            $(".third-ability-divider").html("<hr>");
            $(".second-ability").html(`
          <p class="ability-name d-flex justify-content-center"><b>${ability[j].name}</b></p>
          <p class='ability-description'>${ability[j].effect}</p>
          `);
          }
          if (pokemon[i].abilities[2].ability.name === ability[j].name) {
            $(".third-ability").html(`
          <p class="ability-name d-flex justify-content-center"><b>${ability[j].name}</b></p>
          <p id='hidden-ability-slot-3' class='hidden-ability d-flex justify-content-center'></p>
          <p class='ability-description'>${ability[j].effect}</p>
          `);
          }
          if (pokemon[i].abilities[2].is_hidden === true) {
            $("#hidden-ability-slot-3").html("(Hidden Ability)");
          }
        }
      }
    }
  }
};

fetchPokemon();
fetchAbilities();
$("#sortOptions").on("change", sortingOptions);
$("#genOptions").on("change", genSelection);
$("#typeOptions1").on("change", typeSelection);
$("#typeOptions2").on("change", typeSelection);

// {
//   <div class="d-flex justify-content-between">
//   <div class="first-ability">
//     <p class="d-flex justify-content-center align-self-start">
//       ${pokemon[i].abilities[0].ability.name}
//     </p>
//     <p>
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//       tempor incididunt ut labore et dolore magna aliqua. Ac orci phasellus
//       egestas tellus rutrum. Arcu bibendum at varius vel pharetra vel turpis.
//       Lacus luctus accumsan tortor posuere ac ut consequat. Praesent tristique
//       magna sit amet purus gravida quis blandit. Integer feugiat scelerisque
//       varius morbi enim nunc faucibus a pellentesque. Volutpat ac tincidunt
//       vitae semper quis lectus nulla at volutpat. Eu ultrices vitae auctor eu
//       augue ut lectus. Risus sed vulputate odio ut enim. Elit scelerisque mauris
//       pellentesque pulvinar. Sem integer vitae justo eget magna fermentum
//       iaculis.
//     </p>
//   </div>
//   <div class="vertical-line"></div>
//   <div class="second-ability">
//     <p class="d-flex justify-content-center align-self-start">
//       ${pokemon[i].abilities[1].ability.name}
//     </p>
//     <p>
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//       tempor incididunt ut labore et dolore magna aliqua. Ac orci phasellus
//       egestas tellus rutrum. Arcu bibendum at varius vel pharetra vel turpis.
//       Lacus luctus accumsan tortor posuere ac ut consequat. Praesent tristique
//       magna sit amet purus gravida quis blandit. Integer feugiat scelerisque
//       varius morbi enim nunc faucibus a pellentesque. Volutpat ac tincidunt
//       vitae semper quis lectus nulla at volutpat. Eu ultrices vitae auctor eu
//       augue ut lectus. Risus sed vulputate odio ut enim. Elit scelerisque mauris
//       pellentesque pulvinar. Sem integer vitae justo eget magna fermentum
//       iaculis.
//     </p>
//   </div>
// </div>;
// }
