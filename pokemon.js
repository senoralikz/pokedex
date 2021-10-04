import { genId } from "./api.js";
import { pokemon } from "./api.js";
import { pokemonSpecies } from "./api.js";
import { ability } from "./api.js";
import { displayPokemon } from "./api.js";
import { fetchPokemon } from "./api.js";
// import variables from "./styles/_export.scss";

export const showPokemonTab = () => {
  $("#searchPokemon").val("");
  $(".landing-page").hide();
  $(".pokemon-tab").show();
  $(".abilities-tab").hide();
  $(".moves-tab").hide();
  $(".items-tab").hide();

  displayPokemon(pokemon);
};

const loading = `
  <img class='loading' src='./images/pikachu - loading.gif' alt='pikachu_loading' />
  `;

$("#pokedex").html(loading);

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

export const sortingOptions = () => {
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

export const genSelection = () => {
  let genValue = $("#genOptions").val();

  if (genValue === "1") {
    genId.startingId = 1;
    genId.endingId = 151;

    $("#pokedex").html(loading);

    fetchPokemon();
  } else if (genValue === "2") {
    genId.startingId = 152;
    genId.endingId = 251;

    $("#pokedex").html(loading);

    fetchPokemon();
  } else if (genValue === "3") {
    genId.startingId = 252;
    genId.endingId = 386;

    $("#pokedex").html(loading);

    fetchPokemon();
  } else if (genValue === "4") {
    genId.startingId = 387;
    genId.endingId = 493;

    $("#pokedex").html(loading);

    fetchPokemon();
  } else if (genValue === "5") {
    genId.startingId = 494;
    genId.endingId = 649;

    $("#pokedex").html(loading);

    fetchPokemon();
  } else if (genValue === "6") {
    genId.startingId = 650;
    genId.endingId = 721;

    $("#pokedex").html(loading);

    fetchPokemon();
  } else if (genValue === "7") {
    genId.startingId = 722;
    genId.endingId = 809;

    $("#pokedex").html(loading);

    fetchPokemon();
  } else if (genValue === "8") {
    genId.startingId = 810;
    genId.endingId = 898;

    $("#pokedex").html(loading);

    fetchPokemon();
  } else if (genValue === "9") {
    genId.startingId = 1;
    genId.endingId = 898;

    $("#pokedex").html(loading);

    fetchPokemon();
  }
  $("#sortOptions").val(1);
  $("#typeOptions1").val(0);
  $("#typeOptions2").val(0);
};

export const typeSelection = () => {
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

// search bar functionality
$(document).ready(function () {
  $("#searchPokemon").on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $("#pokedex div").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

export const morePokemonInfo = (x) => {
  let specificPokemon = $(x).data("id");
  console.log("clicking pokemon card");
  console.log(specificPokemon);

  for (let i = 0; i < pokemon.length; i++) {
    if (pokemon[i].id === specificPokemon) {
      $(".modal-title").html(pokemon[i].name);
      $(".modal-body").html(`
        <div class='pokemon-modal-body pokemon-bg-${pokemon[i].type[0]}'>
          <div class='pokemon-info d-sm-flex justify-content-between p-2'>
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
                      <p class='form-names d-flex justify-content-center'>${pokemon[i].form_name}</p>
                    </div>
                    <div class="carousel-item">
                      <img src="${pokemon[i].sprite_shiny}" class="d-block w-100" alt="${pokemon[i].name}_shiny">
                      <p class='form-names d-flex justify-content-center'>${pokemon[i].form_name} (Shiny)</p>
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
        </div>
        <div class="modal-ability-info">
          <p class="abilities-heading d-flex justify-content-center"><b>Abilities</b></p>
          <div class="ability">
            <div class='first-ability justify-content-center'>
            </div>
          </div>
        </div>
      `);

      if (pokemon[i].type.length === 2) {
        $(".pokemon-modal-body").removeClass(
          `pokemon-bg-${pokemon[i].type[0]}`
        );
        $(".pokemon-modal-body").addClass(
          `pokemon-bg-type-one-${pokemon[i].type[0]}`
        );
        $(".pokemon-info").addClass(
          `pokemon-bg-type-two-${pokemon[i].type[1]}`
        );
        $(".type-area").append(
          `<span class='modal-type type-span ${pokemon[i].type[1]}'><span class='modal-type-text'>${pokemon[i].type[1]}</span></span>`
        );
        // $("div.pokemon-info").removeClass(
        //   `pokemon-bg-${pokemon[i].type[0]}`
        // );
        // $("div.pokemon-info").css(
        //   "background",
        //   `linear-gradient(135deg, ${fireTypeBg} 50%, ${waterTypeBg} 50%);`
        // );
      }

      for (let j = 0; j < ability.length; j++) {
        if (pokemon[i].abilities[0].ability.name === ability[j].name) {
          $(".first-ability").html(`
          <p class="ability-name d-flex justify-content-center"><b>${ability[j].name}</b></p>
          <p class='ability-description'>${ability[j].effect}</p>
          `);
        }
        if (pokemon[i].abilities.length > 1) {
          for (let h = 1; h < pokemon[i].abilities.length; h++) {
            if (pokemon[i].abilities[h].ability.name === ability[j].name) {
              $(".ability").append(`
                <div class='horizontal-divider'></div>
                <div>
                  <p class="ability-name d-flex justify-content-center"><b>${ability[j].name}</b></p>
                  <p  class='hidden-ability d-flex justify-content-center' id='hidden-ability-slot-${j}'></p>
                  <p class='ability-description'>${ability[j].effect}</p>
                </div>
              `);
              if (pokemon[i].abilities[h].is_hidden === true) {
                $("#hidden-ability-slot-" + j).html("(Hidden Ability)");
              }
            }
          }
        }
      }

      for (let j = 0; j < pokemonSpecies.length; j++) {
        if (pokemon[i].name === pokemonSpecies[j].name) {
          $(".carousel-inner").append(`
            <div class="carousel-item">
              <img src="${pokemonSpecies[j].sprite}" class="d-block w-100" alt="${pokemonSpecies[j].form_name}">
              <p class='form-names d-flex justify-content-center'>${pokemonSpecies[j].form_name}</p>
            </div>
            <div class="carousel-item">
              <img src="${pokemonSpecies[j].sprite_shiny}" class="d-block w-100" alt="${pokemonSpecies[j].form_name}_shiny">
              <p class='form-names d-flex justify-content-center'>${pokemonSpecies[j].form_name} (Shiny)</p>
            </div>
          `);
        }
      }
    }
  }
};

$("#sortOptions").on("change", sortingOptions);
$("#genOptions").on("change", genSelection);
$("#typeOptions1").on("change", typeSelection);
$("#typeOptions2").on("change", typeSelection);
$("#pokedex").on("click", ".pokemon-card", function () {
  morePokemonInfo(this);
});
