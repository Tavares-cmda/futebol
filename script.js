function decisaoGol() {
  document.getElementById("resultadoFinal").innerText = 
    "⚽ Gol confirmado! O VAR não encontrou irregularidades.";
}

function decisaoCartao() {
  document.getElementById("resultadoFinal").innerText = 
    "🟥 Revisão concluída: Cartão vermelho confirmado.";
}

function decisaoImpedimento() {
  document.getElementById("resultadoFinal").innerText = 
    "🚩 Gol anulado por impedimento detectado no VAR.";
}
