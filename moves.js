import { moves } from "./api.js";
import { fetchMoves } from "./api.js";
import { displayMoves } from "./api.js";

export const showMovesTab = () => {
  $("#searchPokemon").val("");
  $(".landing-page").hide();
  $(".pokemon-tab").hide();
  $(".abilities-tab").hide();
  $("#abilities-list").hide();
  $(".items-tab").hide();
  $(".moves-tab").show();

  displayMoves();

  console.log(moves);
};

// search bar functionality
$(document).ready(function () {
  $("#searchPokemon").on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $(".move-table-body tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});
