import { showPokemonTab } from "./pokemon.js";
import { showAbilitiesTab } from "./abilities.js";
import { showItemsTab } from "./items.js";
import { showMovesTab } from "./moves.js";

const homePage = () => {
  $("#searchPokemon").val("");
  $(".landing-page").show();
  $(".pokemon-tab").hide();
  $(".abilities-tab").hide();
  $(".items-tab").hide();
  $(".moves-tab").hide();
};

$(() => {
  $(".pokemon-tab").hide();
  $(".abilities-tab").hide();
  $(".items-tab").hide();
  $(".moves-tab").hide();

  $(".pokedex-logo").on("click", homePage);
  $(".pokemon-section").on("click", showPokemonTab);
  $(".abilities-section").on("click", showAbilitiesTab);
  $(".items-section").on("click", showItemsTab);
  $(".moves-section").on("click", showMovesTab);
  $("#hamburger").on("click", function () {
    $("#section-buttons").toggleClass("show");
  });
});
