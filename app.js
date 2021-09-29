import { showPokemonTab } from "./pokemon.js";
import { showAbilitiesTab } from "./abilities.js";
import { showItemsTab } from "./items.js";

const homePage = () => {
  $(".landing-page").show();
  $(".pokemon-tab").hide();
  $(".abilities-tab").hide();
  $(".items-tab").hide();
};

$(() => {
  $(".pokemon-tab").hide();
  $(".abilities-tab").hide();
  $(".items-tab").hide();

  $(".pokedex-logo").on("click", homePage);
  $(".pokemon-section").on("click", showPokemonTab);
  $(".abilities-section").on("click", showAbilitiesTab);
  $(".items-section").on("click", showItemsTab);
});
