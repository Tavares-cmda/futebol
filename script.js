// Dicas de ações
const acoes = [
    "Recicle papel, plástico e vidro.",
    "Evite jogar lixo nas ruas e rios.",
    "Economize água e energia elétrica.",
    "Use transporte público ou bicicleta.",
    "Plante árvores na sua comunidade.",
    "Compre produtos sustentáveis.",
    "Evite produtos descartáveis.",
    "Participe de mutirões de limpeza."
];

const listaAcoes = document.getElementById("lista-acoes");
const botaoAcao = document.getElementById("nova-acao");

botaoAcao.addEventListener("click", () => {
    const indice = Math.floor(Math.random() * acoes.length);
    const li = document.createElement("li");
    li.textContent = acoes[indice];
    listaAcoes.appendChild(li);
});

// Jogo de lixo
const cenario = document.querySelector(".cenario");
const lixeira = document.getElementById("lixeira");
const botaoLixo = document.getElementById("gerar-lixo");
let pontuacao = 0;
const pontuacaoElem = document.getElementById("pontuacao");

botaoLixo.addEventListener("click", () => {
    const lixo = document.createElement("div");
    lixo.classList.add("lixo");
    lixo.style.left = Math.random() * (cenario.offsetWidth - 40) + "px";
    lixo.style.top = "0px";
    cenario.appendChild(lixo);

    lixo.draggable = true;

    lixo.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", null);
    });

    lixo.addEventListener("dragend", (e) => {
        const rectLixeira = lixeira.getBoundingClientRect();
        const rectLixo = lixo.getBoundingClientRect();

        if (
            rectLixo.bottom >= rectLixeira.top &&
            rectLixo.left + rectLixo.width / 2 >= rectLixeira.left &&
            rectLixo.right - rectLixo.width / 2 <= rectLixeira.right
        ) {
            pontuacao++;
            pontuacaoElem.textContent = pontuacao;
            lixo.remove();
        } else {
            // Caiu fora da lixeira, volta para o topo
            lixo.style.top = "0px";
        }
    });

    // Movimento automático para descer
    let descendo = setInterval(() => {
        const topAtual = parseInt(lixo.style.top);
        if (topAtual + 5 < cenario.offsetHeight - 40) {
            lixo.style.top = topAtual + 5 + "px";
        } else {
            lixo.remove();
            clearInterval(descendo);
        }
    }, 50);
});

