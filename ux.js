const perguntas = [
    {
        texto: 'Qual etapa ajuda a entender as necessidades e dificuldades das pessoas?',
        opcoes: ['Descobrir', 'Prototipar', 'Testar'],
        certa: 0,
        explicacao: 'Na descoberta, a equipe pesquisa e observa as pessoas para entender o problema.'
    },
    {
        texto: 'Por que criar um protótipo antes do produto final?',
        opcoes: ['Para testar uma ideia com baixo custo', 'Para evitar ouvir usuários', 'Para deixar o projeto mais longo'],
        certa: 0,
        explicacao: 'O protótipo permite aprender e melhorar a solução antes de desenvolver tudo.'
    },
    {
        texto: 'O que a jornada do usuário representa?',
        opcoes: ['Apenas as telas de um site', 'As etapas e sentimentos durante uma experiência', 'Somente os erros do sistema'],
        certa: 1,
        explicacao: 'A jornada mostra o caminho da pessoa, suas ações, necessidades e sentimentos.'
    }
];

const quizNumero = document.querySelector('#quiz-numero');
const quizPergunta = document.querySelector('#quiz-pergunta');
const quizOpcoes = document.querySelector('#quiz-opcoes');
const quizResposta = document.querySelector('#quiz-resposta');
const quizProxima = document.querySelector('#quiz-proxima');

let atual = 0;
let acertos = 0;
let terminou = false;

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

function responder(escolhida) {
    const pergunta = perguntas[atual];
    const botoes = quizOpcoes.querySelectorAll('button');
    botoes.forEach((botao) => { botao.disabled = true; });
    botoes[pergunta.certa].classList.add('certa');

    if (escolhida === pergunta.certa) {
        acertos++;
        quizResposta.textContent = 'Acertou! ' + pergunta.explicacao;
    } else {
        botoes[escolhida].classList.add('errada');
        quizResposta.textContent = 'Quase! A resposta é ' + pergunta.opcoes[pergunta.certa] + '. ' + pergunta.explicacao;
    }

    quizProxima.textContent = atual === perguntas.length - 1 ? 'Ver resultado' : 'Próxima →';
    quizProxima.hidden = false;
}

function mostrarResultado() {
    terminou = true;
    quizPergunta.textContent = 'Você acertou ' + acertos + ' de ' + perguntas.length + '!';
    quizOpcoes.innerHTML = '';
    quizResposta.textContent = acertos === perguntas.length
        ? 'Mandou bem, você já sabe reconhecer etapas de UX.'
        : 'Dá uma olhada nas etapas acima e tenta de novo.';
    quizProxima.textContent = 'Recomeçar';
}

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

mostrarPergunta();
