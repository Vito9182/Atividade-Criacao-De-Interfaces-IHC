// novo: as perguntas do quiz.
// "certa" é a posição da resposta certa na lista de opções (começa no 0)
const perguntas = [
    {
        texto: 'Você clicou em "excluir conta" e ela sumiu na hora, sem nenhuma pergunta. Qual heurística foi quebrada?',
        opcoes: ['Design minimalista', 'Prevenção de erros', 'Mundo real'],
        certa: 1,
        explicacao: 'O site devia perguntar "tem certeza?" antes de uma ação que não dá pra desfazer.'
    },
    {
        texto: 'Você enviou um formulário e a página ficou parada, sem mostrar se carregou ou deu erro. Qual heurística foi quebrada?',
        opcoes: ['Status do sistema', 'Consistência', 'Ajuda'],
        certa: 0,
        explicacao: 'O site precisa mostrar o que está acontecendo, com uma mensagem ou uma barra de carregamento.'
    },
    {
        texto: 'Em uma página o botão verde salva o arquivo, e em outra o mesmo botão verde apaga. Qual heurística foi quebrada?',
        opcoes: ['Flexibilidade', 'Reconhecer, não lembrar', 'Consistência'],
        certa: 2,
        explicacao: 'Elementos iguais precisam fazer a mesma coisa em todas as páginas.'
    }
];

// pega os elementos do quiz no HTML
const quizNumero = document.querySelector('#quiz-numero');
const quizPergunta = document.querySelector('#quiz-pergunta');
const quizOpcoes = document.querySelector('#quiz-opcoes');
const quizResposta = document.querySelector('#quiz-resposta');
const quizProxima = document.querySelector('#quiz-proxima');

let atual = 0;       // qual pergunta está na tela
let acertos = 0;     // quantas a pessoa acertou
let terminou = false;

// mostra a pergunta atual e cria um botão pra cada opção
function mostrarPergunta() {
    const pergunta = perguntas[atual];

    quizNumero.textContent = atual + 1;
    quizPergunta.textContent = pergunta.texto;
    quizResposta.textContent = '';
    quizProxima.hidden = true;
    quizOpcoes.innerHTML = '';

    pergunta.opcoes.forEach((opcao, posicao) => {
        const botao = document.createElement('button');
        botao.className = 'quiz-opcao';
        botao.textContent = opcao;
        botao.addEventListener('click', () => responder(posicao));
        quizOpcoes.appendChild(botao);
    });
}

// confere a resposta, pinta os botões e mostra a explicação
function responder(escolhida) {
    const pergunta = perguntas[atual];
    const botoes = quizOpcoes.querySelectorAll('button');

    // trava os botões pra pessoa não responder duas vezes
    botoes.forEach((botao) => {
        botao.disabled = true;
    });

    botoes[pergunta.certa].classList.add('certa');

    if (escolhida === pergunta.certa) {
        acertos++;
        quizResposta.textContent = 'Acertou! ' + pergunta.explicacao;
    } else {
        botoes[escolhida].classList.add('errada');
        quizResposta.textContent = 'Quase! A resposta é ' + pergunta.opcoes[pergunta.certa] + '. ' + pergunta.explicacao;
    }

    // na última pergunta o botão muda de texto
    const ultima = atual === perguntas.length - 1;
    quizProxima.textContent = ultima ? 'Ver resultado' : 'Próxima →';
    quizProxima.hidden = false;
}

// mostra quantas a pessoa acertou no final
function mostrarResultado() {
    terminou = true;
    quizPergunta.textContent = 'Você acertou ' + acertos + ' de ' + perguntas.length + '!';
    quizOpcoes.innerHTML = '';
    quizResposta.textContent = acertos === perguntas.length
        ? 'Mandou bem, você já sabe reconhecer as heurísticas.'
        : 'Dá uma olhada nas heurísticas acima e tenta de novo.';
    quizProxima.textContent = 'Recomeçar';
}

// o mesmo botão serve pra "Próxima", "Ver resultado" e "Recomeçar"
quizProxima.addEventListener('click', () => {
    if (terminou) {
        atual = 0;
        acertos = 0;
        terminou = false;
        mostrarPergunta();
    } else if (atual < perguntas.length - 1) {
        atual++;
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
});

// começa o quiz quando a página abre
mostrarPergunta();