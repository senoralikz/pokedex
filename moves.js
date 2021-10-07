import { moves } from "./api.js";
import { displayMoves } from "./api.js";

export const showMovesTab = () => {
  $("#searchPokemon").val("");
  $(".landing-page").hide();
  $(".pokemon-tab").hide();
  $(".abilities-tab").hide();
  $(".moves-tab").show();

  displayMoves(moves);
};

const sortMoveId = () => {
  moves.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));

  displayMoves(moves);
};

const reverseMoveId = () => {
  sortMoveId();

  moves.reverse();

  displayMoves(moves);
};

const sortMoveName = () => {
  moves.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

  displayMoves(moves);
};

const reverseMoveName = () => {
  sortMoveName();

  moves.reverse();

  displayMoves(moves);
};

const sortingOptions = function () {
  let selValue = $("#sortMoveOptions").val();

  if (selValue === "1") {
    sortMoveId();
  } else if (selValue === "2") {
    reverseMoveId();
  } else if (selValue === "3") {
    sortMoveName();
  } else if (selValue === "4") {
    reverseMoveName();
  }
};

export const damageTypeClassSelection = () => {
  let damageType = $("#damageTypeOptions option:selected").text().toLowerCase();
  let damageClass = $("#damageClassOptions option:selected")
    .text()
    .toLowerCase();
  let filteredMoves;
  let doubleFilteredMoves;

  if ($("#damageTypeOptions").val() > "0") {
    filteredMoves = moves.filter((move) => damageType === move.type);

    displayMoves(filteredMoves);
  } else if ($("#damageClassOptions").val() > "0") {
    filteredMoves = moves.filter((move) => damageClass === move.damage_class);

    displayMoves(filteredMoves);
  }

  if (
    $("#damageTypeOptions").val() > "0" &&
    $("#damageClassOptions").val() > "0"
  ) {
    doubleFilteredMoves = filteredMoves.filter(
      (move) => damageClass === move.damage_class && damageType === move.type
    );

    displayMoves(doubleFilteredMoves);
  } else if (
    $("#damageTypeOptions").val() === "0" &&
    $("#damageClassOptions").val() === "0"
  ) {
    displayMoves(moves);
  }
};

$("#sortMoveOptions").on("change", sortingOptions);
$("#damageTypeOptions").on("change", damageTypeClassSelection);
$("#damageClassOptions").on("change", damageTypeClassSelection);
