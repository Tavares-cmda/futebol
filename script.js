// --- Tarefas ---
const listaTarefas = document.getElementById("listaTarefas");
const listaConcluidas = document.getElementById("tarefasConcluidas");

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
  if (!concluida) {
    let btnConcluir = document.createElement("button");
    btnConcluir.textContent = "✔";
    btnConcluir.classList.add("concluir");
    btnConcluir.onclick = () => {
      listaConcluidas.appendChild(li);
      btnConcluir.remove();
      salvarTarefas();
    };
    li.appendChild(btnConcluir);
  }

  // Botão editar
  let btnEditar = document.createElement("button");
  btnEditar.textContent = "✏";
  btnEditar.classList.add("editar");
  btnEditar.onclick = () => editarItem(li, "tarefa");
  li.appendChild(btnEditar);

  // Botão remover
  let btnRemover = document.createElement("button");
  btnRemover.textContent = "❌";
  btnRemover.classList.add("remover");
  btnRemover.onclick = () => {
    li.remove();
    salvarTarefas();
  };
  li.appendChild(btnRemover);

  if (concluida) {
    listaConcluidas.appendChild(li);
  } else {
    listaTarefas.appendChild(li);
  }
}

function salvarTarefas() {
  let tarefas = [];
  document.querySelectorAll("#listaTarefas li").forEach(li => {
    tarefas.push({ texto: li.firstChild.textContent, concluida: false });
  });
  document.querySelectorAll("#tarefasConcluidas li").forEach(li => {
    tarefas.push({ texto: li.firstChild.textContent, concluida: true });
  });
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// --- Avisos ---
const listaAvisos = document.getElementById("listaAvisos");

function adicionarAviso() {
  const input = document.getElementById("novoAviso");
  const aviso = input.value.trim();
  if (aviso !== "") {
    criarAviso(aviso);
    salvarAvisos();
    input.value = "";
  }
}

function criarAviso(texto) {
  let li = document.createElement("li");
  li.textContent = texto;

  // Botão editar
  let btnEditar = document.createElement("button");
  btnEditar.textContent = "✏";
  btnEditar.classList.add("editar");
  btnEditar.onclick = () => editarItem(li, "aviso");
  li.appendChild(btnEditar);

  // Botão remover
  let btnRemover = document.createElement("button");
  btnRemover.textContent = "❌";
  btnRemover.classList.add("remover");
  btnRemover.onclick = () => {
    li.remove();
    salvarAvisos();
  };
  li.appendChild(btnRemover);

  listaAvisos.appendChild(li);
}

function salvarAvisos() {
  let todos = [];
  document.querySelectorAll("#listaAvisos li").forEach(li => {
    todos.push(li.firstChild.textContent);
  });
  localStorage.setItem("avisos", JSON.stringify(todos));
}

// --- Função Editar (para tarefas e avisos) ---
function editarItem(li, tipo) {
  let textoAtual = li.firstChild.textContent;
  let novoTexto = prompt("Edite o texto:", textoAtual);
  if (novoTexto && novoTexto.trim() !== "") {
    li.firstChild.textContent = novoTexto.trim();
    if (tipo === "tarefa") salvarTarefas();
    if (tipo === "aviso") salvarAvisos();
  }
}

// --- Aulas da semana ---
const horario = {
  "Segunda": ["Matemática", "Português", "História", "Inglês"],
  "Terça": ["Física", "Química", "Biologia", "Geografia"],
  "Quarta": ["Matemática", "Português", "Ed. Física", "Sociologia"],
  "Quinta": ["Química", "História", "Artes", "Inglês"],
  "Sexta": ["Matemática", "Física", "Biologia", "Filosofia"]
};

const dias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const hoje = new Date().getDay();

const divHorario = document.getElementById("horario");
for (let dia in horario) {
  let div = document.createElement("div");
  div.innerHTML = `<h3>${dia}</h3><p>${horario[dia].join("<br>")}</p>`;
  if (dias[hoje] === dia) div.classList.add("hoje");
  divHorario.appendChild(div);
}

// --- Carregar dados salvos ---
window.onload = () => {
  // tarefas
  const salvas = JSON.parse(localStorage.getItem("tarefas")) || [];
  salvas.forEach(tarefa => criarTarefa(tarefa.texto, tarefa.concluida));

  // avisos
  const avisosSalvos = JSON.parse(localStorage.getItem("avisos")) || [];
  avisosSalvos.forEach(aviso => criarAviso(aviso));
};
