// Lista de aulas por dia da semana
const aulas = {
  "Domingo": ["Descanso 😴"],
  "Segunda-feira": ["📐 Matemática", "📖 Português", "🏺 História"],
  "Terça-feira": ["🌍 Geografia", "🔬 Ciências", "⚽ Educação Física"],
  "Quarta-feira": ["🇬🇧 Inglês", "📐 Matemática", "🎨 Arte"],
  "Quinta-feira": ["🏺 História", "🔬 Ciências", "📖 Português"],
  "Sexta-feira": ["📐 Matemática", "⚽ Educação Física", "🌍 Geografia"],
  "Sábado": ["📖 Revisão Geral"]
};

// --- Mostrar dia e aulas ---
const hoje = new Date();
const diaSemana = hoje.toLocaleDateString("pt-BR", { weekday: "long" });
document.getElementById("diaSemana").innerText = `Hoje é ${diaSemana}`;

const listaAulas = document.getElementById("listaAulas");
const diaFormatado = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
aulas[diaFormatado].forEach(aula => {
  let li = document.createElement("li");
  li.textContent = aula;
  listaAulas.appendChild(li);
});

// --- Gerenciar Tarefas ---
const listaTarefas = document.getElementById("listaTarefas");
const tarefasConcluidas = document.getElementById("tarefasConcluidas");

// Carregar tarefas salvas
window.onload = () => {
  const salvas = JSON.parse(localStorage.getItem("tarefas")) || [];
  salvas.forEach(tarefa => criarTarefa(tarefa.texto, tarefa.concluida));
};

function adicionarTarefa() {
  const input = document.getElementById("novaTarefa");
  const tarefa = input.value.trim();
  if (tarefa !== "") {
    criarTarefa(tarefa, false);
    salvarTarefas();
    input.value = "";
  }
}

function criarTarefa(texto, concluida) {
  let li = document.createElement("li");
  li.textContent = texto;

  // Botão concluir
  let btnConcluir = document.createElement("button");
  btnConcluir.textContent = "✔";
  btnConcluir.onclick = () => concluirTarefa(li, texto);

  // Botão remover
  let btnRemover = document.createElement("button");
  btnRemover.textContent = "❌";
  btnRemover.onclick = () => {
    li.remove();
    salvarTarefas();
  };

  li.appendChild(btnConcluir);
  li.appendChild(btnRemover);

  if (concluida) {
    li.classList.add("concluida");
    tarefasConcluidas.appendChild(li);
  } else {
    listaTarefas.appendChild(li);
  }
}

function concluirTarefa(li, texto) {
  li.classList.add("concluida");
  tarefasConcluidas.appendChild(li);
  salvarTarefas();
}

// Salvar no localStorage
function salvarTarefas() {
  let todas = [];
  document.querySelectorAll("#listaTarefas li").forEach(li => {
    todas.push({ texto: li.firstChild.textContent, concluida: false });
  });
  document.querySelectorAll("#tarefasConcluidas li").forEach(li => {
    todas.push({ texto: li.firstChild.textContent, concluida: true });
  });
  localStorage.setItem("tarefas", JSON.stringify(todas));
}
