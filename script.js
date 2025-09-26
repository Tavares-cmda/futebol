// --- Grade semanal de aulas (2º Ano) ---
const aulasSemana = {
  "Segunda-feira": ["📐 Matemática", "📖 Português", "🏺 História", "🧪 Química"],
  "Terça-feira": ["🌍 Geografia", "🔬 Biologia", "⚽ Educação Física", "📖 Português"],
  "Quarta-feira": ["🇬🇧 Inglês", "📐 Matemática", "🔭 Física", "🎨 Arte"],
  "Quinta-feira": ["🏺 História", "📖 Português", "🔬 Biologia", "🧪 Química"],
  "Sexta-feira": ["📐 Matemática", "🌍 Geografia", "🔭 Física", "⚽ Educação Física"]
};

// --- Mostrar aulas na tela ---
const grade = document.getElementById("gradeAulas");
const hoje = new Date();
const diaSemana = hoje.toLocaleDateString("pt-BR", { weekday: "long" });

for (let dia in aulasSemana) {
  let div = document.createElement("div");
  div.classList.add("dia");

  if (dia.toLowerCase() === diaSemana.toLowerCase()) {
    div.classList.add("hoje"); // destaca o dia atual
  }

  let titulo = document.createElement("h3");
  titulo.textContent = dia;
  div.appendChild(titulo);

  let ul = document.createElement("ul");
  aulasSemana[dia].forEach(aula => {
    let li = document.createElement("li");
    li.textContent = aula;
    ul.appendChild(li);
  });

  div.appendChild(ul);
  grade.appendChild(div);
}

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
  btnConcluir.onclick = () => concluirTarefa(li);

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

function concluirTarefa(li) {
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
