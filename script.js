const campoInput = document.getElementById("campo");
const dataInput = document.getElementById("data");
const horaInput = document.getElementById("hora");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaJogos = document.getElementById("listaJogos");

function carregarJogos() {
  const jogos = JSON.parse(localStorage.getItem("jogos")) || [];
  listaJogos.innerHTML = "";
  jogos.forEach((jogo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${jogo.campo} - ${jogo.data} às ${jogo.hora}</span>
      <button onclick="removerJogo(${index})">X</button>
    `;
    listaJogos.appendChild(li);
  });
}

btnAdicionar.addEventListener("click", () => {
  const campo = campoInput.value.trim();
  const data = dataInput.value;
  const hora = horaInput.value;

  if (!campo || !data || !hora) {
    alert("Preencha todos os campos!");
    return;
  }

  const novoJogo = { campo, data, hora };
  const jogos = JSON.parse(localStorage.getItem("jogos")) || [];
  jogos.push(novoJogo);
  localStorage.setItem("jogos", JSON.stringify(jogos));

  campoInput.value = "";
  dataInput.value = "";
  horaInput.value = "";
  carregarJogos();
});

function removerJogo(index) {
  const jogos = JSON.parse(localStorage.getItem("jogos")) || [];
  jogos.splice(index, 1);
  localStorage.setItem("jogos", JSON.stringify(jogos));
  carregarJogos();
}

window.onload = carregarJogos;
