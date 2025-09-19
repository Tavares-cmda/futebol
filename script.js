// Lista de lances com vídeo correspondente
const lances = [
  { descricao: "Possível impedimento no ataque", video: "https://www.youtube.com/embed/ID1?rel=0&showinfo=0" },
  { descricao: "Checagem de mão na bola dentro da área", video: "https://www.youtube.com/embed/ID2?rel=0&showinfo=0" },
  { descricao: "Revisão de possível pênalti", video: "https://www.youtube.com/embed/ID3?rel=0&showinfo=0" },
  { descricao: "Entrada dura – possível cartão vermelho", video: "https://www.youtube.com/embed/ID4?rel=0&showinfo=0" },
  { descricao: "Disputa de bola considerada perigosa", video: "https://www.youtube.com/embed/ID5?rel=0&showinfo=0" },
  { descricao: "Gol duvidoso em posição legal", video: "https://www.youtube.com/embed/ID6?rel=0&showinfo=0" },
  { descricao: "Empurrão dentro da grande área", video: "https://www.youtube.com/embed/ID7?rel=0&showinfo=0" },
  { descricao: "Verificação de gol após toque de mão", video: "https://www.youtube.com/embed/ID8?rel=0&showinfo=0" },
  { descricao: "Jogador em posição irregular recebendo a bola", video: "https://www.youtube.com/embed/ID9?rel=0&showinfo=0" },
  { descricao: "Contato leve avaliado pelo árbitro", video: "https://www.youtube.com/embed/ID10?rel=0&showinfo=0" }
];

// Função de suspense realista
function mostrarComSuspense(func) {
  const descricao = document.getElementById("descricaoLance");
  const beep = document.getElementById("somBeep");
  descricao.classList.add("suspense");

  descricao.innerText = "Revisando lance... 3";
  beep.play();
  setTimeout(() => { descricao.innerText = "Revisando lance... 2"; beep.play(); }, 500);
  setTimeout(() => { descricao.innerText = "Revisando lance... 1"; beep.play(); }, 1000);
  setTimeout(() => {
    descricao.classList.remove("suspense");
    func();
  }, 1500);
}

// Sorteia novo lance + vídeo
function novoLance() {
  mostrarComSuspense(() => {
    const lance = lances[Math.floor(Math.random() * lances.length)];
    document.getElementById("descricaoLance").innerText = "Lance: " + lance.descricao;
    document.getElementById("videoReplay").src = lance.video;
  });
}

// Decisão final do VAR
function decisao(texto, detalhe) {
  mostrarComSuspense(() => {
    const lance = lances[Math.floor(Math.random() * lances.length)];
    document.getElementById("descricaoLance").innerText = "Lance: " + lance.descricao;
    document.getElementById("videoReplay").src = lance.video;

    // Resultado com animação
    const resultado = document.getElementById("resultadoFinal");
    resultado.innerText = texto;
    resultado.classList.remove("show");
    void resultado.offsetWidth;
    resultado.classList.add("show");

    // Toca apito longo
    document.getElementById("apito").play();

    // Histórico
    const historico = document.getElementById("listaHistorico");
    const item = document.createElement("li");
    const data = new Date().toLocaleTimeString();
    item.textContent = `[${data}] ${texto} → Lance: ${lance.descricao} | Detalhe: ${detalhe}`;
    historico.prepend(item);
  });
}

// Lance inicial ao carregar a página
window.onload = () => {
  novoLance();
};
