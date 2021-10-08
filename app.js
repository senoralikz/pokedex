import { showPokemonTab } from "./pokemon.js";
import { showAbilitiesTab } from "./abilities.js";
import { showMovesTab } from "./moves.js";

$(() => {
  $(".pokemon-tab").hide();
  $(".abilities-tab").hide();
  $(".moves-tab").hide();

  // search bar function
  $(document).ready(function () {
    // select search bar element
    $("#searchPokemon").on("keyup", function () {
      // grab input value of search bar and save it to value variable
      let value = $(this).val().toLowerCase();
      // select where and what you want to search and filter results to match key being pressed
      $("#pokedex div.pokemon-card").filter(function () {
        // set input value to lowercase to match values in array and return any index value that matches key being pressed
        // if index value returns -1 then there is nothing that matches the keys pressed and search will return empty array
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

  $(".section-button").on("click", function () {
    $(".section-pages").removeClass("show");
    $(".section-button.active").removeClass("active");
    $(this).addClass("active");
  });

  $(".pokedex-logo").on("click", function () {
    $(".section-button.active").removeClass("active");
    $(".section-pages").removeClass("show");
    $("#searchPokemon").val("");
    $(".landing-page").show();
    $(".pokemon-tab").hide();
    $(".abilities-tab").hide();
    $(".moves-tab").hide();
    $(".items-tab").hide();
  });
  $(".pokemon-section").on("click", showPokemonTab);
  $(".abilities-section").on("click", showAbilitiesTab);
  $(".moves-section").on("click", showMovesTab);
  $("#hamburger").on("click", function () {
    $(".section-pages").toggleClass("show");
  });
  $(".section-pages li").on("click", function () {
    $(".section-pages").removeClass("show");
  });
  $(".poke-data").on("click", function () {
    $(".section-pages").removeClass("show");
  });
});
