export const handleError = (res) => {
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
};

export const pokemonFetchError = () => {
  $(".pokemon-alert")
    .html(
      `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
       Failed to fetch all Pokemon info. Refresh page to try again.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `
    )
    .delay(3000)
    .fadeOut("slow");
};

export const abilitiesFetchError = () => {
  $(".ability-alert")
    .html(
      `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
       Failed to fetch all ability info. Refresh page to try again.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `
    )
    .delay(3000)
    .fadeOut("slow");
};

export const movesFetchError = () => {
  $(".move-alert")
    .html(
      `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
       Failed to fetch all move info. Refresh page to try again.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `
    )
    .delay(3000)
    .fadeOut("slow");
};
