const form = document.getElementById("gameForm");
const listaJogos = document.getElementById("listaJogos");
const btnLimpar = document.getElementById("btnLimpar");

function carregarJogos() {
  const jogos = JSON.parse(localStorage.getItem("jogos")) || [];
  listaJogos.innerHTML = "";

  if (jogos.length === 0) {
    listaJogos.innerHTML = "<p style='text-align:center;'>Nenhum jogo agendado ainda ⚽</p>";
  } else {
    jogos.forEach((jogo, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span><strong>${jogo.timeA}</strong> vs <strong>${jogo.timeB}</strong><br>
        ${new Date(jogo.data).toLocaleString("pt-BR")} — ${jogo.campo}</span>
        <button class="btn-del" onclick="removerJogo(${index})">Excluir</button>
      `;
      listaJogos.appendChild(li);
    });
  }
}

function salvarJogo(jogo) {
  const jogos = JSON.parse(localStorage.getItem("jogos")) || [];

  // 🚫 Verifica se já existe jogo no mesmo campo e horário
  const conflito = jogos.some(
    (j) => j.campo === jogo.campo && j.data === jogo.data
  );

  if (conflito) {
    alert("⚠️ Já existe um jogo marcado neste mesmo horário e campo!");
    return false;
  }

  jogos.push(jogo);
  localStorage.setItem("jogos", JSON.stringify(jogos));
  carregarJogos();
  return true;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const timeA = document.getElementById("timeA").value.trim();
  const timeB = document.getElementById("timeB").value.trim();
  const data = document.getElementById("dataJogo").value;
  const campo = document.getElementById("campo").value;

  if (!timeA || !timeB || !data || !campo) {
    alert("Preencha todos os campos!");
    return;
  }

  const novoJogo = { timeA, timeB, data, campo };
  const salvo = salvarJogo(novoJogo);

  if (salvo) form.reset();
});

function removerJogo(index) {
  const jogos = JSON.parse(localStorage.getItem("jogos")) || [];
  jogos.splice(index, 1);
  localStorage.setItem("jogos", JSON.stringify(jogos));
  carregarJogos();
}

btnLimpar.addEventListener("click", () => {
  if (confirm("Tem certeza que deseja apagar todos os jogos?")) {
    localStorage.removeItem("jogos");
    carregarJogos();
  }
});

window.onload = carregarJogos;
