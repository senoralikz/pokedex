export const showItemsTab = () => {
  $("#searchPokemon").val("");
  $(".landing-page").hide();
  $(".pokemon-tab").hide();
  $(".abilities-tab").hide();
  $(".moves-tab").hide();
  $(".items-tab").show();
};
