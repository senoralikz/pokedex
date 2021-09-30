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
