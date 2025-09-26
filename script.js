// Lista de aulas por dia da semana
const aulas = {
  "Domingo": ["Descanso 😴"],
  "Segunda-feira": ["Matemática", "Português", "História"],
  "Terça-feira": ["Geografia", "Ciências", "Educação Física"],
  "Quarta-feira": ["Inglês", "Matemática", "Arte"],
  "Quinta-feira": ["História", "Ciências", "Português"],
  "Sexta-feira": ["Matemática", "Educação Física", "Geografia"],
  "Sábado": ["Revisão Geral 📖"]
};

// Mostrar dia e aulas
const hoje = new Date();
const diaSemana = hoje.toLocaleDateString("pt-BR", { weekday: "long" });
document.getElementById("diaSemana").innerText = `Hoje é ${diaSemana}`;

const listaAulas = document.getElementById("listaAulas");
aulas[diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)].forEach(aula => {
  let li = document.createElement("li");
  li.textContent = aula;
  listaAulas.appendChild(li);
});

// Função para adicionar tarefas
function adicionarTarefa() {
  const input = document.getElementById("novaTarefa");
  const tarefa = input.value.trim();

  if (tarefa !== "") {
    let li = document.createElement("li");
    li.textContent = tarefa;

    // Botão de remover
    let btn = document.createElement("button");
    btn.textContent = "❌";
    btn.style.marginLeft = "10px";
    btn.onclick = () => li.remove();

    li.appendChild(btn);
    document.getElementById("listaTarefas").appendChild(li);
    input.value = "";
  }
}
