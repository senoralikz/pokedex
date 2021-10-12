export const handleFetch = (res) => {
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
};

const fetchErrorImage = `
  <div class='d-flex justify-content-center'>
    <img class='error-image' src='./images/ghastly-loading.gif' alt='ghastly-error-image' />
  </div>
  <div class='d-flex justify-content-center'>
    <p>Error fetching data. Please refresh the page and try again.</p>
  </div>`;

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
  $(".fetch-pokemon-image").html(fetchErrorImage);
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
  $(".fetch-abilities-image").html(fetchErrorImage);
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
  $(".fetch-moves-image").html(fetchErrorImage);
};
