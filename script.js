document.addEventListener("DOMContentLoaded", () => {
  const mensagem = document.getElementById("mensagem");
  const container = document.getElementById("replay-container");

  // Lista de vídeos genéricos (IDs do YouTube)
  const replays = [
    "9xwazD5SyVg", // vídeo exemplo
    "dQw4w9WgXcQ", // exemplo 2
    "C0DPdy98e4c"  // exemplo 3
  ];
  let replayAtual = 0;

  function atualizarReplay() {
    container.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${replays[replayAtual]}" 
        title="Replay do Lance" 
        frameborder="0" 
        allowfullscreen></iframe>
    `;
  }

  // Botões principais
  document.getElementById("btn-var").addEventListener("click", () => {
    mensagem.innerText = "VAR chamado! Analisando o lance...";
  });

  document.getElementById("btn-replay").addEventListener("click", () => {
    atualizarReplay();
  });

  document.getElementById("btn-validar").addEventListener("click", () => {
    mensagem.innerText = "GOL VALIDADO ✅";
  });

  document.getElementById("btn-anular").addEventListener("click", () => {
    mensagem.innerText = "GOL ANULADO ❌";
  });

  document.getElementById("btn-penalti").addEventListener("click", () => {
    mensagem.innerText = "PÊNALTI MARCADO ⚽";
  });

  document.getElementById("btn-sem").addEventListener("click", () => {
    mensagem.innerText = "SEM INFRAÇÃO 👍";
  });

  // Controle de replays
  document.getElementById("btn-prev").addEventListener("click", () => {
    replayAtual = (replayAtual - 1 + replays.length) % replays.length;
    atualizarReplay();
  });

  document.getElementById("btn-next").addEventListener("click", () => {
    replayAtual = (replayAtual + 1) % replays.length;
    atualizarReplay();
  });
});
