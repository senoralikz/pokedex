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
    }));
    ability.push(...galarAbility);
    for (let i = 0; i < ability.length; i++) {
      ability[i].name = ability[i].name.replaceAll("-", " ");
    }
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
    sortPokemonId();
  } else if (selValue === "2") {
    reversePokemonId();
  } else if (selValue === "3") {
    sortPokemonName();
  } else if (selValue === "4") {
    reversePokemonName();
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
  $("#sortOptions").val(1);
  $("#typeOptions1").val(0);
  $("#typeOptions2").val(0);
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
        <div class='pokemon-info d-sm-flex justify-content-between'>
          <div class='type-stats'>
            <div class='type-area justify-content-start'>
              <span class='modal-type type-span ${pokemon[i].type[0]}'><span class='modal-type-text'>${pokemon[i].type[0]}</span></span>
            </div>
            <div class='modal-stats'>
              <p class='hp-caps'><b>${pokemon[i].stats[0].stat.name}:</b> ${pokemon[i].stats[0].base_stat}&emsp;</p>
              <p><b>${pokemon[i].stats[1].stat.name}:</b> ${pokemon[i].stats[1].base_stat}&emsp;</p>
              <p><b>${pokemon[i].stats[2].stat.name}:</b> ${pokemon[i].stats[2].base_stat}&emsp;</p>
              <p><b>${pokemon[i].stats[3].stat.name}:</b> ${pokemon[i].stats[3].base_stat}&emsp;</p>
              <p><b>${pokemon[i].stats[4].stat.name}:</b> ${pokemon[i].stats[4].base_stat}&emsp;</p>
              <p><b>${pokemon[i].stats[5].stat.name}:</b> ${pokemon[i].stats[5].base_stat}&emsp;</p>
            </div>
          </div>
          <div class='sprite-id'>
            <p class='modal-hash d-flex justify-content-end'>#<span class='modal-pokemon-id'>${pokemon[i].id}</span></p>

            <div class='modal-pokemon-img'>

              <div id="carouselExampleCaptions" class="carousel slide" data-bs-interval="false">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src="${pokemon[i].sprite}" class="d-block w-100" alt="${pokemon[i].name}_default">
                    <p class='d-flex justify-content-center'>Regular</p>
                  </div>
                  <div class="carousel-item">
                    <img src="${pokemon[i].sprite_shiny}" class="d-block w-100" alt="${pokemon[i].name}_shiny">
                    <p class='d-flex justify-content-center'>Shiny</p>
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>

            </div>

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
            $(".ability-divider").html(
              "<div class='horizontal-divider'></div>"
            );
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
            $(".ability-divider").html(
              "<div class='horizontal-divider'></div>"
            );
            $(".third-ability-divider").html(
              "<div class='horizontal-divider'></div>"
            );
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

function burgerMenu() {
  var x = document.getElementById("section-buttons");
  if (x.className === "section-pages") {
    x.className += " responsive";
  } else {
    x.className = "section-pages";
  }
}

// function burgerMenu() {
//   var x = document.getElementById("section-buttons");
//   if (x.className === "section-pages") {
//     x.className += " responsive";
//   } else {
//     x.className = "section-pages";
//   }
// }

fetchPokemon();
fetchAbilities();
burgerMenu();
$("#sortOptions").on("change", sortingOptions);
$("#genOptions").on("change", genSelection);
$("#typeOptions1").on("change", typeSelection);
$("#typeOptions2").on("change", typeSelection);
