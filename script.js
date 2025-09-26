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
 
