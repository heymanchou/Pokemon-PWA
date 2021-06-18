const pokemonList = document.querySelector("#pokemonList");

const defautlPokemon = "https://pokeapi.co/api/v2/pokemon/1/";
const pokemonCard = document.querySelector("#pokemonCard");

window.addEventListener("load", (e) => {
  getPokemonList().then(() => {
    showPokemonCard(defautlPokemon);
  });

  pokemonList.addEventListener("change", (e) => {
    showPokemonCard(e.target.value);
  });

  registerServiceWorker();
});

async function getPokemonList() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
  const json = await response.json();

  pokemonList.innerHTML = json.results.map(
    (result) => `<option value="${result.url}">${result.name}</option>`
  );
}

async function showPokemonCard(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();

    pokemonCard.innerHTML = createCard(json);
  } catch (error) {
    console.log("Network is unavailable");
    pokemonCard.innerHTML = offlineCard();
  }
}

function offlineCard() {
  return `
    <div class="card-header">
      <p>Network is unavailable</p>
    </div>
  `;
}

function createCard(pokemon) {
  return `
    <div class="card-header">
              <h2>${pokemon.id}</h2>
            </div>
            <img
              src="${pokemon.sprites.other.dream_world.front_default}"
              class="card-img-top"
              width="250"
              height="250"
              alt="${pokemon.name}"
            />
            <div class="card-body">
              <h3 class="card-title" style="text-transform: capitalize">
                ${pokemon.name}
              </h3>
              <div class="badge badge-primary">屬性: ${
                pokemon.types[0].type.name
              }</div>
              <div class="badge badge-warning">身高: ${
                pokemon.height / 10
              }</div>
              <div class="badge badge-danger">體重: ${pokemon.weight / 10}</div>
              <div class="badge badge-secondary">體力: ${
                pokemon.stats[0].base_stat
              }</div>
              <div class="badge badge-info">攻擊力: ${
                pokemon.stats[1].base_stat
              }</div>
              <div class="badge badge-light">防禦力: ${
                pokemon.stats[2].base_stat
              }</div>
              <div class="badge badge-dark">特攻: ${
                pokemon.stats[3].base_stat
              }</div>
              <div class="badge badge-success">速度: ${
                pokemon.stats[5].base_stat
              }</div>
            </div>
    `;
}

async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("sw.js");
    } catch (error) {
      console.log("Failed:", error);
    }
  }
}
