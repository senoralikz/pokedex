import { showPokemonTab } from "./pokemon.js";
import { showAbilitiesTab } from "./abilities.js";
import { showMovesTab } from "./moves.js";

$(() => {
  $(".pokemon-tab").hide();
  $(".abilities-tab").hide();
  $(".moves-tab").hide();

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
