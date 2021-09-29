import { ability } from "./api.js";

export const showAbilitiesTab = () => {
  $(".landing-page").hide();
  $(".pokemon-tab").hide();
  $(".abilities-tab").show();
  $("#abilities-list").show();
  $(".items-tab").hide();
};

// search bar functionality
$(document).ready(function () {
  $("#searchPokemon").on("keyup", function () {
    let value = $(this).val().toLowerCase();
    $(".ability-table-body tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});
