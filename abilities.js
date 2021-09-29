import { ability } from "./api.js";
import { displayAbilities } from "./api.js";

export const showAbilitiesTab = () => {
  $("#searchPokemon").val("");
  $(".landing-page").hide();
  $(".pokemon-tab").hide();
  $(".abilities-tab").show();
  $("#abilities-list").show();
  $(".items-tab").hide();
  displayAbilities();

  console.log(ability);
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

const sortAbilityId = () => {
  ability.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));

  displayAbilities();
};

const reverseAbilityId = () => {
  sortAbilityId();

  ability.reverse();

  displayAbilities();
};

const sortAbilityName = () => {
  ability.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

  displayAbilities();
};

const reverseAbilityName = () => {
  sortAbilityName();

  ability.reverse();

  displayAbilities();
};

const sortingOptions = function () {
  let selValue = $("#sortAbilityOptions").val();

  if (selValue === "1") {
    sortAbilityId();
  } else if (selValue === "2") {
    reverseAbilityId();
  } else if (selValue === "3") {
    sortAbilityName();
  } else if (selValue === "4") {
    reverseAbilityName();
  }
};

$("#sortAbilityOptions").on("change", sortingOptions);
