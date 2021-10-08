import { showPokemonTab } from "./pokemon.js";
import { showAbilitiesTab } from "./abilities.js";
import { showMovesTab } from "./moves.js";

const homePage = () => {
  $("#searchPokemon").val("");
  $(".landing-page").show();
  $(".pokemon-tab").hide();
  $(".abilities-tab").hide();
  $(".moves-tab").hide();
  $(".items-tab").hide();
};

$(document).ready(function () {
  $("#searchPokemon").on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $("#pokedex div.pokemon-card").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
    $(".ability-table-body tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
    $(".move-table-body tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});

$(() => {
  $(".pokemon-tab").hide();
  $(".abilities-tab").hide();
  $(".moves-tab").hide();

  $(".pokedex-logo").on("click", homePage);
  $(".pokemon-section").on("click", showPokemonTab);
  $(".abilities-section").on("click", showAbilitiesTab);
  $(".moves-section").on("click", showMovesTab);
  $("#hamburger").on("click", function () {
    $(".section-pages").toggleClass("show");
  });
  $(".section-pages li").on("click", function () {
    $(".section-pages").removeClass("show");
  });
});
