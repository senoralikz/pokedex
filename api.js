import { handleError } from "./ui-message.js";
import { pokemonFetchError } from "./ui-message.js";
import { abilitiesFetchError } from "./ui-message.js";
import { movesFetchError } from "./ui-message.js";

export let genId = {
  startingId: 1,
  endingId: 151,
};
export let pokemon = [];
export let pokemonSpecies = [];
export let ability = [];
export let moves = [];
export let items = [];
export let berries = [];
let pokemonHtml;

export const fetchPokemon = () => {
  // initialize array that will be filled with each pokemons url
  let promises = [];

  // get url for pokemon id
  for (let i = genId.startingId; i <= genId.endingId; i++) {
    const url = `https://pokeapi.co/api/v2/pokemo/${i}/`;

    // fetch the information received from the pokemon url and then format it to json
    //  and push it to the promises array
    promises.push(
      fetch(url)
        // .then((res) => console.log(res))
        .then(handleError)
        // .then((data) => promises.push(data))
        .catch(pokemonFetchError)
    );
  }

  // Using Promise.all to wait to receive all information that is requested from the pokemon url
  Promise.all(promises).then((res) => {
    // then initialize and set the properties we want to use from the response
    pokemon = res.map((res) => ({
      name: res.species.name,
      form_name: res.forms.map((form) => form.name).join(" "),
      // alt_forms: [],
      id: res.id,
      sprite: "",
      sprite_shiny: "",
      // type is an array so we join each string inside the type array to set it to one type property
      // type: res.types,
      // type: res.types.map((type) => type.type.name).join(", "),
      type: res.types.map((type) => type.type.name),
      abilities: res.abilities.map((ability) => ability),
      stats: res.stats.map((stat) => stat),
    }));
    for (let i = 0; i < pokemon.length; i++) {
      pokemon[i].name = pokemon[i].name.replaceAll("-", " ");
      pokemon[i].form_name = pokemon[i].form_name.replaceAll("-", " ");
      pokemon[i].sprite = `./images/pokemon-3d-sprites/${pokemon[i].id}.png`;
      pokemon[
        i
      ].sprite_shiny = `./images/pokemon-3d-shiny/${pokemon[i].id}.png`;
      if (
        pokemon[i].form_name ===
        "unown a unown b unown c unown d unown e unown f unown g unown h unown i unown j unown k unown l unown m unown n unown o unown p unown q unown r unown s unown t unown u unown v unown w unown x unown y unown z unown exclamation unown question"
      ) {
        pokemon[i].form_name = "unown";
      } else if (
        pokemon[i].form_name === "burmy plant burmy sandy burmy trash"
      ) {
        pokemon[i].form_name = "burmy";
      } else if (
        pokemon[i].form_name ===
        "arceus normal arceus bug arceus dark arceus dragon arceus electric arceus fighting arceus fire arceus flying arceus ghost arceus grass arceus ground arceus ice arceus poison arceus psychic arceus rock arceus steel arceus water arceus unknown arceus fairy"
      ) {
        pokemon[i].form_name = "arceus";
      } else if (pokemon[i].form_name === "xerneas active xerneas neutral") {
        pokemon[i].form_name = "xerneas";
      } else if (
        pokemon[i].form_name ===
        "silvally normal silvally fighting silvally flying silvally poison silvally ground silvally rock silvally bug silvally ghost silvally steel silvally fire silvally water silvally grass silvally electric silvally psychic silvally ice silvally dragon silvally dark silvally fairy"
      ) {
        pokemon[i].form_name = "silvally";
      } else if (
        pokemon[i].form_name ===
        "deerling spring deerling summer deerling autumn deerling winter"
      ) {
        pokemon[i].form_name = "deerling";
      } else if (
        pokemon[i].form_name ===
        "sawsbuck spring sawsbuck summer sawsbuck autumn sawsbuck winter"
      ) {
        pokemon[i].form_name = "sawsbuck";
      } else if (
        pokemon[i].form_name === "cramorant cramorant gulping cramorant gorging"
      ) {
        pokemon[i].form_name = "cramorant";
      } else if (pokemon[i].form_name === "morpeko full belly morpeko hangry") {
        pokemon[i].form_name = "morpeko";
      } else if (pokemon[i].form_name === "zarude zarude dada") {
        pokemon[i].form_name = "zarude";
      }
      for (let j = 0; j < pokemon[i].abilities.length; j++) {
        pokemon[i].abilities[j].ability.name = pokemon[i].abilities[
          j
        ].ability.name.replaceAll("-", " ");
      }
      for (let x = 0; x < pokemon[i].stats.length; x++) {
        pokemon[i].stats[x].stat.name = pokemon[i].stats[
          x
        ].stat.name.replaceAll("-", " ");
      }
    }
  });

  promises = [];

  // get url for pokemon id
  for (let i = 10001; i <= 10220; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;

    // fetch the information received from the pokemon url and then format it to json
    //  and push it to the promises array
    promises.push(fetch(url).then(handleError).catch(pokemonFetchError));
  }

  // Using Promise.all to wait to receive all information that is requested from the pokemon url
  Promise.all(promises).then((res) => {
    // then initialize and set the properties we want to use from the response
    pokemonSpecies = res.map((res) => ({
      name: res.species.name,
      form_name: res.forms.map((form) => form.name).join(" "),
      id: res.id,
      sprite: "",
      sprite_shiny: "",
      type: res.types.map((type) => type.type.name),
      abilities: res.abilities.map((ability) => ability),
      stats: res.stats.map((stat) => stat),
    }));
    for (let i = 0; i < pokemonSpecies.length; i++) {
      pokemonSpecies[i].name = pokemonSpecies[i].name.replaceAll("-", " ");
      pokemonSpecies[i].form_name = pokemonSpecies[i].form_name.replaceAll(
        "-",
        " "
      );
      pokemonSpecies[
        i
      ].sprite = `./images/pokemon-3d-sprites/${pokemonSpecies[i].id}.png`;
      pokemonSpecies[
        i
      ].sprite_shiny = `./images/pokemon-3d-shiny/${pokemonSpecies[i].id}.png`;
      if (pokemonSpecies[i].form_name.includes("totem")) {
        pokemonSpecies.splice(i, 1);
      }
      for (let j = 0; j < pokemonSpecies[i].abilities.length; j++) {
        pokemonSpecies[i].abilities[j].ability.name = pokemonSpecies[
          i
        ].abilities[j].ability.name.replaceAll("-", " ");
      }
      for (let x = 0; x < pokemonSpecies[i].stats.length; x++) {
        pokemonSpecies[i].stats[x].stat.name = pokemonSpecies[i].stats[
          x
        ].stat.name.replaceAll("-", " ");
      }
    }
    for (let h = 0; h < pokemon.length; h++) {
      let y = 0;
      let newPokemon = {};

      if (pokemon[h].name === "unown") {
        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " a",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-a.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-a.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " b",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-b.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-b.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " c",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-c.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-c.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " d",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-d.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-d.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " e",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-e.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-e.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " f",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-f.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-f.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " g",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-g.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-g.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " h",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-h.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-h.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " i",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-i.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-i.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " j",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-j.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-j.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " k",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-k.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-k.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " l",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-l.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-l.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " m",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-m.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-m.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " n",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-n.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-n.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " o",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-o.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-o.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " p",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-p.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-p.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " q",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-q.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-q.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " r",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-r.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-r.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " s",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-s.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-s.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " t",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-t.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-t.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " u",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-u.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-u.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " v",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-v.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-v.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " w",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-w.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-w.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " x",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-x.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-x.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " y",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-y.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-y.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " z",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-z.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-z.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " exclamation",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-exclamation.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-exclamation.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " question",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-question.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-question.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;
      } else if (pokemon[h].name === "burmy") {
        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " plant",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-plant.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-plant.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " sandy",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-sandy.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-sandy.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " trash",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-trash.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-trash.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;
      } else if (pokemon[h].name === "cherrim") {
        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " overcast",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-overcast.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-overcast.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " sunshine",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-sunshine.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-sunshine.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;
      } else if (pokemon[h].name === "shellos") {
        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " east",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-east.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-east.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " west",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-west.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-west.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;
      } else if (pokemon[h].name === "gastrodon") {
        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " east",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-east.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-east.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " west",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-west.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-west.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;
      } else if (pokemon[h].name === "arceus") {
        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " bug",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-bug.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-bug.png`,
          type: ["bug"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " dark",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-dark.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-dark.png`,
          type: ["dark"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " dragon",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-dragon.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-dragon.png`,
          type: ["dragon"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " electric",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-electric.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-electric.png`,
          type: ["electric"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " fairy",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-fairy.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-fairy.png`,
          type: ["fairy"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " fighting",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-fighting.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-fighting.png`,
          type: ["fighting"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " fire",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-fire.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-fire.png`,
          type: ["fire"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " flying",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-flying.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-flying.png`,
          type: ["flying"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " ghost",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-ghost.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-ghost.png`,
          type: ["ghost"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " grass",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-grass.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-grass.png`,
          type: ["grass"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " ground",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-ground.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-ground.png`,
          type: ["ground"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " ice",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-ice.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-ice.png`,
          type: ["ice"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " poison",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-poison.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-poison.png`,
          type: ["poison"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " psychic",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-psychic.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-psychic.png`,
          type: ["psychic"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " steel",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-steel.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-steel.png`,
          type: ["steel"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " rock",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-rock.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-rock.png`,
          type: ["rock"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " normal",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-normal.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-normal.png`,
          type: ["normal"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " water",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-water.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-water.png`,
          type: ["water"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;
      } else if (pokemon[h].name === "xerneas") {
        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " active",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-active.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-active.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " neutral",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-neutral.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-neutral.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;
      } else if (pokemon[h].name === "silvally") {
        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " bug",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-bug.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-bug.png`,
          type: ["bug"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " dark",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-dark.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-dark.png`,
          type: ["dark"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " dragon",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-dragon.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-dragon.png`,
          type: ["dragon"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " electric",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-electric.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-electric.png`,
          type: ["electric"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " fairy",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-fairy.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-fairy.png`,
          type: ["fairy"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " fighting",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-fighting.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-fighting.png`,
          type: ["fighting"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " fire",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-fire.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-fire.png`,
          type: ["fire"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " flying",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-flying.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-flying.png`,
          type: ["flying"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " ghost",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-ghost.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-ghost.png`,
          type: ["ghost"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " grass",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-grass.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-grass.png`,
          type: ["grass"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " ground",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-ground.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-ground.png`,
          type: ["ground"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " ice",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-ice.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-ice.png`,
          type: ["ice"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " poison",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-poison.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-poison.png`,
          type: ["poison"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " psychic",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-psychic.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-psychic.png`,
          type: ["psychic"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " steel",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-steel.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-steel.png`,
          type: ["steel"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " rock",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-rock.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-rock.png`,
          type: ["rock"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " normal",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-normal.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-normal.png`,
          type: ["normal"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " water",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-water.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-water.png`,
          type: ["water"],
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;
      } else if (pokemon[h].name === "cramorant") {
        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " gorging",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-gorging.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-gorging.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " gulping",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-gulping.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-gulping.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;
      } else if (pokemon[h].name === "morpeko") {
        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " full belly",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites/${pokemon[h].id}.png`,
          sprite_shiny: `images/pokemon-3d-shiny/${pokemon[h].id}.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;

        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " hangry",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-hangry.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-hangry.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;
      } else if (pokemon[h].name === "zarude") {
        newPokemon = {
          name: pokemon[h].name,
          form_name: pokemon[h].name + " dada",
          id: 20000 + pokemon[h].id + y,
          sprite: `./images/pokemon-3d-sprites-alt/${pokemon[h].id}-dada.png`,
          sprite_shiny: `images/pokemon-3d-shiny-alt/${pokemon[h].id}-dada.png`,
          type: pokemon[h].type,
          abilities: pokemon[h].abilities,
          stats: pokemon[h].stats,
        };
        pokemonSpecies.push(newPokemon);

        y++;
      }
    }
    displayPokemon(pokemon);
    console.log(pokemon);
    console.log(pokemonSpecies);
  });
};

export const fetchAbilities = () => {
  let galarAbility = [];

  // initialize array that will be filled with each abilities url
  let promises = [];

  // get url for ability id
  for (let i = 1; i <= 233; i++) {
    const url = `https://pokeapi.co/api/v2/ability/${i}/`;

    // fetch the information received from the ability url and then format it to json
    //  and push it to the promises array
    promises.push(fetch(url).then(handleError).catch(abilitiesFetchError));
  }

  // Using Promise.all to wait to receive all information that is requested from the ability url
  Promise.all(promises).then((res) => {
    // then initialize and set the properties we want to use from the response
    ability = res.map((res) => ({
      name: res.name,
      id: res.id,
      effect: res.effect_entries
        .filter((effect) => effect.language.name === "en")
        .map((effect) => effect.effect)
        .join(" "),
      pokemon: res.pokemon.map((pokemon) => pokemon.pokemon.name).join(", "),
    }));
  });

  promises = [];

  for (let i = 234; i <= 267; i++) {
    const url = `https://pokeapi.co/api/v2/ability/${i}/`;

    // fetch the information received from the ability url and then format it to json
    //  and push it to the promises array
    promises.push(fetch(url).then(handleError).catch(abilitiesFetchError));
  }

  Promise.all(promises).then((res) => {
    // then initialize and set the properties we want to use from the response
    galarAbility = res.map((res) => ({
      name: res.name,
      id: res.id,
      effect: res.flavor_text_entries
        .map((text_entry) => text_entry.flavor_text)
        .join(" "),
      pokemon: res.pokemon.map((pokemon) => pokemon.pokemon.name).join(", "),
    }));

    ability.push(...galarAbility);

    for (let i = 0; i < ability.length; i++) {
      ability[i].name = ability[i].name.replaceAll("-", " ");
      ability[i].pokemon = ability[i].pokemon.replaceAll("-", " ");
    }

    displayAbilities();
  });
};

export const fetchMoves = () => {
  // initialize array that will be filled with each abilities url
  let promises = [];

  // get url for ability id
  for (let i = 1; i <= 826; i++) {
    const url = `https://pokeapi.co/api/v2/move/${i}/`;

    // fetch the information received from the ability url and then format it to json
    //  and push it to the promises array
    promises.push(fetch(url).then(handleError).catch(movesFetchError));
  }

  // Using Promise.all to wait to receive all information that is requested from the ability url
  Promise.all(promises).then((res) => {
    // then initialize and set the properties we want to use from the response
    moves = res.map((res) => ({
      name: res.name,
      id: res.id,
      type: res.type.name,
      accuracy: res.accuracy,
      effect_chance: res.effect_chance,
      pp: res.pp,
      power: res.power,
      damage_class: res.damage_class,
      effect: res.effect_entries.map((effect) => effect.effect).join(" "),
      pokemon: res.learned_by_pokemon.map((pokemon) => pokemon.name).join(", "),
    }));

    for (let i = 756; i <= 773; i++) {
      moves[i].accuracy = "-";
      moves[i].damage_class = "-";
      moves[i].power = "-";
      moves[i].pp = "-";
    }

    for (let i = 0; i < moves.length; i++) {
      moves[i].name = moves[i].name.replaceAll("-", " ");
      moves[i].pokemon = moves[i].pokemon.replaceAll("-", " ");
      moves[i].effect = moves[i].effect.replaceAll(
        "$effect_chance",
        moves[i].effect_chance
      );
      if (moves[i].damage_class !== "-") {
        moves[i].damage_class = moves[i].damage_class.name;
      }
    }

    moves.forEach((obj) => {
      for (let i in obj) {
        if (obj[i] === null || obj[i] === "") {
          obj[i] = "-";
        }
      }
    });

    displayMoves(moves);

    // for (let i = 0; i < moves.length; i++) {
    //   if (moves[i].pokemon === "-" || moves[i].pokemon === "") {
    //   }
    // }
  });
};

export const displayPokemon = (array) => {
  pokemonHtml = array.map(
    (pokemon) =>
      `
      <div class='p-0 card pokemon-card pokemon-bg-type-one-${pokemon.type[0]} specificPokemon${pokemon.id}' data-id='${pokemon.id}' data-bs-toggle='modal' data-bs-target='#exampleModal'>
        <div class='pokemon-bg-type-two-${pokemon.type[1]}'>
          <p class='hash d-flex justify-content-end'>#<span class='pokemon-id'>${pokemon.id}</span></p>
          <div class='spotlight'>
            <img class='card-img' src='${pokemon.sprite}' />
          </div>
          <h5 class='pokemon-name card-title'><strong>${pokemon.name}</strong></h5>
          <div class='pokemon-card-type d-flex justify-content-start'>
            <span class='type-span type ${pokemon.type[0]}'><span class='type-text'>${pokemon.type[0]}</span></span>
            <span class='type-span type ${pokemon.type[1]}'><span class='type-text'>${pokemon.type[1]}</span></span>
          </div>
        </div>
      </div>
    `
  );

  for (let i = 0; i < array.length; i++) {
    if (array[i].type.length === 1) {
      pokemonHtml[i] = `
      <div class='p-0 card pokemon-card pokemon-bg-type-one-${array[i].type[0]} specificPokemon${array[i].id}' data-id='${array[i].id}' data-bs-toggle='modal' data-bs-target='#exampleModal'>
        <div class='pokemon-bg-type-two-${array[i].type[0]}'>
          <p class='hash d-flex justify-content-end'>#<span class='pokemon-id'>${array[i].id}</span></p>
          <div class='spotlight'>
            <img class='card-img' src='${array[i].sprite}' />
          </div>
          <h5 class='pokemon-name card-title'><strong>${array[i].name}</strong></h5>
          <div class='pokemon-card-type d-flex justify-content-start'>
            <span class='type-span type ${array[i].type[0]}'><span class='type-text'>${array[i].type[0]}</span></span>
          </div>
        </div>
      </div>
    `;
    }
  }

  $("#pokedex").html(pokemonHtml);
};

export const displayAbilities = () => {
  let abilitiesHtml = ability.map(
    (ability) =>
      `
    <tr>
      <td class='ability-id'><b>${ability.id}</b></td>
      <td class='ability-name'>${ability.name}</td>
      <td>${ability.effect}</td>
      <td class='ability-name pokemon-with-ability'>${ability.pokemon}</td>
    </tr>
    `
  );

  $(".ability-table-body").html(abilitiesHtml);
};

export const displayMoves = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].name === "v create") {
      array[i].effect =
        "Deals damage, then lowers the user's Defense, Special Defense, and Speed stats by one stage each.";
      array[i].pokemon = "victini";
    } else if (array[i].name === "happy hour") {
      array[i].effect =
        "Doubles the amount of prize money earned at the end of battle. It stacks with the Amulet Coin or Luck Incense, such that the prize money will be quadrupled if both are used. It can be stacked with the Prize Money O-Powers. It does not stack with itself. If powered up by a Normalium Z into Z-Happy Hour, the user's Attack, Defense, Special Attack, Special Defense, and Speed are raised by one stage each. Happy Hour can be used as a part of a Contest Spectacular combination, causing Bestow, Fling and Present to give an extra three appeal points if any of them is used in the next turn.";
      array[i].pokemon = "-";
    } else if (array[i].name === "celebrate") {
      array[i].effect =
        "Celebrate has no effect in battle. When a Pokémon uses this move, it will disappear and a present will drop down from above and unfold to reveal the Pokémon that used it inside. If powered up by a Normalium Z into Z-Celebrate, the user's Attack, Defense, Special Attack, Special Defense, and Speed are raised by one stage each.";
      array[i].pokemon = "-";
    } else if (array[i].name === "hold hands") {
      array[i].effect =
        "Hold Hands has no effect in battle. When a Pokémon uses this move in a Double Battle or Triple Battle, it and its target ally will perform a brief animation together. It will fail if used in a Single Battle or Horde Encounter (even if used by one of the five opposing Pokémon). In a Battle Royal, the user is allowed to select any opponent as the target of the move, but it will fail regardless. Hold Hands ignores the target's use of Protect, Detect, or Spiky Shield, but will fail if the target is protected by Crafty Shield or in the semi-invulnerable turn of a move like Fly or Dig. If powered up by a Normalium Z into Z-Hold Hands, the user's Attack, Defense, Special Attack, Special Defense, and Speed are raised by one stage each.";
      array[i].pokemon = "-";
    } else if (array[i].name === "max flare") {
      array[i].effect =
        "Inflicts damage and creates harsh sunlight. Its power and whether it is a special or physical move depends on the move it is based on.";
      array[i].pokemon =
        "Any Dynamax Pokémon can use Max Flare if it knows a damaging Fire-type move.";
    } else if (array[i].name === "max flutterby") {
      array[i].effect =
        "Inflicts damage and then decreases the target's and its ally's Special Attack by one stage. Its power and whether it is a special or physical move depends on the move it is based on.";
      array[i].pokemon =
        "Any Dynamax Pokémon can use Max Flutterby if it knows a damaging Bug-type move.";
    } else if (array[i].name === "max Lightning") {
      array[i].effect =
        "Inflicts damage and causes the battlefield to become Electric Terrain. Its power and whether it is a special or physical move depends on the move it is based on.";
      array[i].pokemon =
        "Any Dynamax Pokémon can use Max Lightning if it knows a damaging Electric-type move.";
    } else if (array[i].name === "max strike") {
      array[i].effect =
        "Inflicts damage to a target and lowers the Speed of all opponents by one stage. Its power and whether it is a special or physical move depends on the move it is based on. If Max Strike is used with Multi-Attack or Techno Blast as its base move while the user is holding a Memory or a Drive, respectively, Max Strike turns into the Max Move of the type corresponding to the type of Memory or Drive held by the user. If Max Strike is used during weather with Weather Ball as its base move, it turns into the Max Move of the type corresponding to the type Weather Ball would be in that weather. In a similar way, if Max Strike is used during terrain with Terrain Pulse as its base move, it turns into the Max Move of the type corresponding to the type Terrain Pulse would be in that terrain. If Max Strike is used by a Pokémon with Aerilate, Galvanize, Pixilate, or Refrigerate, it turns into the Max Move of the type corresponding to the Pokémon's Ability.";
      array[i].pokemon =
        "Any Dynamax Pokémon can use Max Strike if it knows a damaging Normal-type move.";
    } else if (array[i].name === "max knuckle") {
      array[i].effect =
        "Inflicts damage and increases the Attack of the user and its allies by one stage. Its power and whether it is a special or physical move depends on the move it is based on. Compared to other Max Moves, it usually has less power.";
      array[i].pokemon =
        "Any Dynamax Pokémon can use Max Knuckle if it knows a damaging Fighting-type move.";
    } else if (array[i].name === "max phantasm") {
      array[i].effect =
        "Inflicts damage and lowers the target's and its ally's Defense by one stage. Its power and whether it is a special or physical move depends on the move it is based on.";
      array[i].pokemon =
        "Any Dynamax Pokémon can use Max Phantasm if it knows a damaging Ghost-type move.";
    } else if (array[i].name === "max hailstorm") {
      array[i].effect =
        "Inflicts damage and creates hail. Its power and whether it is a special or physical move depends on the move it is based on.";
      array[i].pokemon =
        "Any Dynamax Pokémon can use Max Hailstorm if it knows a damaging Ice-type move.";
    } else if (array[i].name === "max ooze") {
      array[i].effect =
        "Inflicts damage and then raises the user's and its ally's Special Attack by one stage. Its power and whether it is a special or physical move depends on the move it is based on. Compared to the other Max Moves, it usually has less power.";
      array[i].pokemon =
        "Any Dynamax Pokémon can use Max Ooze if it knows a damaging Poison-type move.";
    } else if (array[i].name === "max geyser") {
      array[i].effect =
        "Inflicts damage and creates rain. Its power and whether it is a special or physical move depends on the move it is based on.";
      array[i].pokemon =
        "Any Dynamax Pokémon can use Max Geyser if it knows a damaging Water-type move.";
    } else if (array[i].name === "max airstream") {
      array[i].effect =
        "Inflicts damage and raises the user's and its ally's Speed by one stage. Its power and whether it is a special or physical move depends on the move it is based on.";
      array[i].pokemon =
        "Any Dynamax Pokémon can use Max Airstream if it knows a damaging Flying-type move.";
    } else if (array[i].name === "max starfall") {
      array[i].effect =
        "Inflicts damage and causes the battlefield to become Misty Terrain. Its power and whether it is a special or physical move depends on the move it is based on.";
      array[i].pokemon =
        "Any Dynamax Pokémon can use Max Starfall if it knows a damaging Fairy-type move.";
    } else if (array[i].name === "max wyrmwind") {
      array[i].effect =
        "Inflicts damage and lowers the target's and its ally's Attack by one stage. Its power and whether it is a special or physical move depends on the move it is based on.";
      array[i].pokemon =
        "Any Dynamax Pokémon can use Max Wyrmwind if it knows a damaging Dragon-type move.";
    } else if (array[i].name === "max mindstorm") {
      array[i].effect =
        "Inflicts damage and causes the battlefield to become Psychic Terrain. Its power and whether it is a special or physical move depends on the move it is based on.";
      array[i].pokemon =
        "Any Dynamax Pokémon can use Max Mindstorm if it knows a damaging Psychic-type move.";
    } else if (array[i].name === "max rockfall") {
      array[i].effect =
        "Inflicts damage and creates a sandstorm. Its power and whether it is a special or physical move depends on the move it is based on.";
      array[i].pokemon =
        "Any Dynamax Pokémon can use Max Rockfall if it knows a damaging Rock-type move.";
    } else if (array[i].name === "max quake") {
      array[i].effect =
        "Inflicts damage and raises the user's and its ally's Special Defense by one stage. Its power and whether it is a special or physical move depends on the move it is based on.";
      array[i].pokemon =
        "Any Dynamax Pokémon can use Max Quake if it knows a damaging Ground-type move.";
    } else if (array[i].name === "max darkness") {
      array[i].effect =
        "Inflicts damage and lowers the target's and its ally's Special Defense by one stage. Its power and whether it is a special or physical move depends on the move it is based on.";
      array[i].pokemon =
        "Any Dynamax Pokémon can use this move if it knows a damaging Dark-type move.";
    } else if (array[i].name === "max overgrowth") {
      array[i].effect =
        "Inflicts damage and causes the battlefield to become Grassy Terrain. Its power and whether it is a special or physical move depends on the move it is based on.";
      array[i].pokemon =
        "Any Dynamax Pokémon can use Max Overgrowth if it knows a damaging Grass-type move.";
    } else if (array[i].name === "max steelspike") {
      array[i].effect =
        "Inflicts damage and raises the user's and its ally's Defense by one stage. Its power and whether it is a special or physical move depends on the move it is based on.";
      array[i].pokemon =
        "Any Dynamax Pokémon can use Max Steelspike if it knows a damaging Steel-type move.";
    } else if (array[i].name === "clangorous soul") {
      array[i].effect =
        "Raises the user's Attack, Defense, Special Attack, Special Defense and Speed by one stage each, at the cost of 1/3 of its maximum HP. If all of the user's stats mentioned above are at +6 stages, or its remaining HP is less than or equal to 1/3 of its maximum, Clangorous Soul fails. Clangorous Soul will become a Water-type move when used by a Pokémon with the Ability Liquid Voice. If the user is affected by Throat Chop, it will be unable to use this move for two turns.If the user is holding a Throat Spray, the item will be consumed and the user's Special Attack stat will raise by one stage.";
      array[i].pokemon = "kommo-o";
    } else if (array[i].name === "body press") {
      array[i].effect =
        "Inflicts damage, but it uses the user's Defense stat instead of its Attack stat to calculate damage. Defense stat stage-modifiers are applied (rather than Attack stage-modifiers), but otherwise Attack modifiers are used (including held item, Ability, and burn). For example, Huge Power or a held Choice Band will increase the stat used in calculation, whereas Fur Coat or a held Eviolite will not.";
      array[i].pokemon = "regigigas";
    } else if (array[i].name === "decorate") {
      array[i].effect =
        "Raises the target's Attack and Special Attack stat by two stages. Unlike most moves, it bypasses moves like Protect and Detect to affect the target, but is blocked by Crafty Shield.";
      array[i].pokemon = "alcremie";
    } else if (array[i].name === "drum beating") {
      array[i].effect =
        "Inflicts damage and lowers the target's Speed stat by one stage.";
      array[i].pokemon = "rillaboom";
    } else if (array[i].name === "snap trap") {
      array[i].effect =
        "In addition to dealing damage, Snap Trap inflicts 1/8 of the target's maximum HP as damage per turn for four to five turns upon use. It also traps the target, preventing switching and escape. If the user switches out, the target will be freed. If the user of Snap Trap is holding a Grip Claw, the duration will always be 7 turns. If a Binding Band is held by the user, the damage done at the end of each turn will increase from 1/8 of the target's maximum HP to 1/6.";
      array[i].pokemon = "stunfisk galar";
    } else if (array[i].name === "pyro ball") {
      array[i].effect =
        "Will thaw out the user if it is frozen, and then inflict damage on the target. Pyro Ball also has a 10% chance of burning the target. It has no effect on Pokémon with the Bulletproof Ability.";
      array[i].pokemon = "cinderace";
    } else if (array[i].name === "behemoth blade") {
      array[i].effect =
        "Deals damage. If the target is Dynamaxed or Gigantamaxed, its base power is doubled to 200. The bonus does not apply to Eternamax Eternatus, despite its similarities to a Gigantamaxed Pokémon.";
      array[i].pokemon =
        "zacian crowned (If Zacian knows Iron Head while entering battle in its Crowned Sword form, Iron Head will become Behemoth Blade for the duration of the battle.)";
    } else if (array[i].name === "behemoth bash") {
      array[i].effect =
        "Deals damage. If the target is Dynamaxed or Gigantamaxed, its base power is doubled to 200. The bonus does not apply to Eternamax Eternatus, despite its similarities to a Gigantamaxed Pokémon.";
      array[i].pokemon =
        "zamazenta crowned (If Zamazenta knows Iron Head while entering battle in its Crowned Shield form, Iron Head will become Behemoth Bash for the duration of the battle.)";
    } else if (array[i].name === "aura wheel") {
      array[i].effect =
        "Aura Wheel inflicts damage and raises the user's Speed stat by one stage. Its type changes depending on Morpeko's current mode. Electric-type in Full Belly Mode. Dark-type in Hangry Mode. The user's Speed stat will not be raised if the attack misses or the target is immune to or protected from the move. Aura Wheel can only be successfully used by Morpeko (or a Pokémon that has transformed into Morpeko). If this move is used by any other Pokémon, the move will fail. Any Pokémon can learn Aura Wheel via Mimic, but it fails when used.";
      array[i].pokemon = "morpeko";
    } else if (array[i].name === "breaking swipe") {
      array[i].effect =
        "Breaking Swipe deals damage to all opponents. It lowers the Attack of all hit targets by one stage.";
      array[i].pokemon = "duraludon";
    } else if (array[i].name === "branch poke") {
      array[i].effect = "Deals damage and has no secondary effect.";
      array[i].pokemon = "phantump, trevenant, grookey, thwackey, rillaboom";
    } else if (array[i].name === "overdrive") {
      array[i].effect =
        "Inflicts damage to all opponents. Pokémon with the Ability Soundproof are not affected by this move. Overdrive will become a Water-type move when used by a Pokémon with the Ability Liquid Voice. If the user is affected by Throat Chop, it will be unable to use this move for two turns. Overdrive will have its power boosted by 30% when used by a Pokémon with the Ability Punk Rock. The damage dealt by Overdrive will also be halved when used against a Pokémon with Punk Rock. If the user is holding a Throat Spray, the item will be consumed and the user's Special Attack stat will raise by one";
      array[i].pokemon = "toxtricity amped, toxtricity low key";
    } else if (array[i].name === "apple acid") {
      array[i].effect =
        "Inflicts damage and lowers the target's Special Defense stat by one stage.";
      array[i].pokemon = "appletun";
    } else if (array[i].name === "grav apple") {
      array[i].effect =
        "Inflicts damage and lowers the target's Defense stat by one stage. If Gravity is in effect, Grav Apple's base power increases to 120.";
      array[i].pokemon = "flapple";
    } else if (array[i].name === "spirit break") {
      array[i].effect =
        "Inflicts damage and lowers the target's Special Attack stat by one stage.";
      array[i].pokemon = "grimmsnarl";
    } else if (array[i].name === "strange steam") {
      array[i].effect =
        "Deals damage and has a 20% chance of confusing the target.";
      array[i].pokemon = "weezing galar";
    } else if (array[i].name === "life dew") {
      array[i].effect =
        "Restores the HP of the user and its allies by 25% of their maximum HP.";
      array[i].pokemon =
        "clefairy, clefable, chansey, lapras, mewtwo, mew, togepi, togetic, corsola, blissey, ho-oh, celebi, ralts, kirlia, gardevoir, milotic, jirachi, lucario, togekiss, gallade, audino, hatenna, hattrem, hatterene, calyrex, calyrex ice rider, calyrex shadow rider";
    } else if (array[i].name === "obstruct") {
      array[i].effect =
        "Protects the user from any moves except status moves for that turn. Additionally, if Obstruct blocks an attack that would make contact with the user, the attacker's Defense stat drops by 2 stages. If Sucker Punch is used on a Pokémon that has used Obstruct, the move fails and the Pokémon's Defense does not drop. Obstruct causes the Defense stat to drop even if the user of Obstruct was immune to that contact move. Using Obstruct, Protect, Detect, Endure, Spiky Shield, King's Shield, Baneful Bunker, Wide Guard, Quick Guard, or Max Guard consecutively divides the chance of success of Protect, Detect, Endure, Spiky Shield, King's Shield, Baneful Bunker, Obstruct, and Max Guard by 3 for each consecutive use, with a minimum (1/3)^6 (1/729 or ~0.1%) chance.";
      array[i].pokemon = "obstagoon";
    } else if (array[i].name === "false surrender") {
      array[i].effect =
        "Inflicts damage and bypasses accuracy checks to always hit, unless the target is in the semi-invulnerable turn of a move such as Dig or Fly.";
      array[i].pokemon = "morgrem, grimmsnarl";
    } else if (array[i].name === "meteor assault") {
      array[i].effect =
        "Inflicts damage and then forces the user to recharge during the next turn.";
      array[i].pokemon = "sirfetch'd";
    } else if (array[i].name === "eternabeam") {
      array[i].effect =
        "Inflicts damage and then forces the user to recharge during the next turn, unless the move fails due to missing, type immunity, or being blocked by a protection move.";
      array[i].pokemon = "eternatus";
    } else if (array[i].name === "steel beam") {
      array[i].effect =
        "Inflicts damage, and the user takes damage equal to half of its maximum HP rounded up (unless it has Magic Guard). The user of Steel Beam will take damage even if the target is protected from it, if it hits a substitute, or if the move misses. If Steel Beam fails due to there being no targets (i.e. if all Pokémon in range fainted before the move was used), the user does not take damage. Rock Head and Reckless do not affect Steel Beam.";
      array[i].pokemon =
        "sandshrew alola, sandslash alola, diglett alola, dugtrio alola, meowth galar, magnemite, magneton, steelix, scizor, skarmory, mawile, aron, lairon, aggron, beldum, metang, metagross, registeel, jirachi, bronzor, bronzong, lucario, magnezone, dialga, heatran, excadrill, escavalier, ferroseed, ferrothorn, klink, klang, klinklang, stunfisk galar, pawniard, bisharp, durant, cobalion, genesect, honedge, doublade, aegislash, klefki, silvally, togedemaru, solgaleo, celesteela, kartana, magearna, stakataka, meltan, melmetal, corviknight, perrserker, cufant, copperajah, duraludon, zacian, zamazenta";
    } else if (array[i].name === "expanding force") {
      array[i].effect =
        "Inflicts damage. It normally targets a single Pokémon. If Psychic Terrain is in effect and the user is grounded upon its execution, this move gets a 1.5× power increase (in addition to the usual 1.3× bonus from terrain) and it becomes a move that targets both opponents.";
      array[i].pokemon = "";
    } else if (array[i].name === "steel roller") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "scale shot") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "meteor beam") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "shell side arm") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "misty explosion") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "grassy glide") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "rising voltage") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "terrain pulse") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "skitter smack") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "burning jealousy") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "lash out") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "poltergeist") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "corrosive gas") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "coaching") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "flip turn") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "triple axel") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "dual wingbeat") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "scorching sands") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "jungle healing") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "wicked blow") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "surging strikes") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "thunder cage") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "dragon energy") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "freezing glare") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "fiery wrath") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "thunderous kick") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "glacial lance") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "astral barrage") {
      array[i].effect = "-";
      array[i].pokemon = "-";
    } else if (array[i].name === "eerie spell") {
      array[i].effect =
        "Deals damage and decreases the PP of the last move the target used by 3. Pokémon with the Ability Soundproof are not affected by this move. Eerie Spell will become a Water-type move when used by a Pokémon with the ability Liquid Voice. If the user is affected by Throat Chop, it will be unable to use this move for two turns. Eerie Spell will have its power boosted by 30% when used by a Pokémon with the ability Punk Rock. The damage dealt by Eerie Spell will also be halved when used against a Pokémon with Punk Rock. If the user is holding a Throat Spray, the item will be consumed and the user's Special Attack stat will raise by one stage.";
      array[i].pokemon = "slowking galar";
    }
  }

  let movesHtml = array.map(
    (move) =>
      `
    <tr class='pokemon-bg-${move.type}'>
      <td class='move-table-font-size move-id'><b>${move.id}</b></td>
      <td class='move-table-font-size move-caps'>${move.name}</td>
      <td class='move-table-font-size col-3'>
        <ol class='move-stats'>
          <li class='move-caps'><b>Type:</b> <span class='type-span type ${move.type}'><span class='type-text'>${move.type}</span></span></li>
          <li class='move-caps'><b>Damage Class:</b> ${move.damage_class}</li>
          <li><b>Power:</b> ${move.power}</li>
          <li><b>Accuracy:</b> ${move.accuracy}</li>
          <li><b>PP:</b> ${move.pp}</li>
          <li><b>Effect Chance:</b> ${move.effect_chance}</li>
        </ol>
      </td>
      <td class='move-table-font-size '>${move.effect}</td>
      <td class='move-table-font-size move-caps pokemon-with-move'>${move.pokemon}</td>
    </tr>
    `
  );

  $(".move-table-body").html(movesHtml);
};

fetchPokemon();
fetchAbilities();
fetchMoves();
