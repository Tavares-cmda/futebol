// Lista de lances possíveis
const lances = [
  "Possível impedimento no ataque",
  "Checagem de mão na bola dentro da área",
  "Revisão de possível pênalti",
  "Entrada dura – possível cartão vermelho",
  "Disputa de bola considerada perigosa",
  "Gol duvidoso em posição legal",
  "Empurrão dentro da grande área",
  "Verificação de gol após toque de mão",
  "Jogador em posição irregular recebendo a bola",
  "Contato leve avaliado pelo árbitro"
];

// Função para pegar lance aleatório
function lanceAleatorio() {
  const index = Math.floor(Math.random() * lances.length);
  return lances[index];
}

// Função de suspense (3..2..1..)
function mostrarComSuspense(func) {
  const descricao = document.getElementById("descricaoLance");
  descricao.classList.add("suspense");
  descricao.innerText = "Revisando lance... 3";
  setTimeout(() => { descricao.innerText = "Revisando lance... 2"; }, 500);
  setTimeout(() => { descricao.innerText = "Revisando lance... 1"; }, 1000);
  setTimeout(() => {
    descricao.classList.remove("suspense");
    func();
  }, 1500);
}

// Sorteia lance sem decisão
function novoLance() {
  mostrarComSuspense(() => {
    const lance = lanceAleatorio();
    document.getElementById("descricaoLance").innerText = "Lance: " + lance;
  });
}

// Decisão final do VAR
function decisao(texto, detalhe) {
  mostrarComSuspense(() => {
    const lance = lanceAleatorio();
    const descricao = document.getElementById("descricaoLance");
    descricao.innerText = "Lance: " + lance;

    // Atualiza resultado final com animação
    const resultado = document.getElementById("resultadoFinal");
    resultado.innerText = texto;
    resultado.classList.remove("show");
    void resultado.offsetWidth; // reinicia animação
    resultado.classList.add("show");

    // Toca apito
    document.getElementById("apito").play();

    // Adiciona ao histórico
    const historico = document.getElementById("listaHistorico");
    const item = document.createElement("li");
    const data = new Date().toLocaleTimeString();
    item.textContent = `[${data}] ${texto} → Lance: ${lance} | Detalhe: ${detalhe}`;
    historico.prepend(item);

    // Reinicia replay automaticamente
    const video = document.getElementById("videoReplay");
    video.currentTime = 0;
    video.play();
  });
}

// Mostra um lance inicial ao carregar a página
window.onload = () => {
  novoLance();
};
