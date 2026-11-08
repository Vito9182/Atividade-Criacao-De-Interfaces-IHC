const perguntasAcessibilidade = [
    { texto: 'Qual recurso ajuda uma pessoa surda a acompanhar um vídeo?', opcoes: ['Legenda', 'Mais animações', 'Texto menor'], certa: 0, explicacao: 'A legenda oferece uma alternativa textual para o conteúdo falado e os sons.' },
    { texto: 'Uma interface acessível deve funcionar...', opcoes: ['Apenas com mouse', 'Com teclado e tecnologias assistivas', 'Somente em telas grandes'], certa: 1, explicacao: 'A navegação precisa oferecer caminhos compatíveis com diferentes formas de interação.' },
    { texto: 'Por que imagens importantes precisam de texto alternativo?', opcoes: ['Para decorar o código', 'Para carregar mais devagar', 'Para que seu conteúdo seja percebido por leitores de tela'], certa: 2, explicacao: 'O texto alternativo comunica o significado da imagem para quem não consegue enxergá-la.' }
];
const quizNumeroAcesso = document.querySelector('#quiz-numero');
const quizPerguntaAcesso = document.querySelector('#quiz-pergunta');
const quizOpcoesAcesso = document.querySelector('#quiz-opcoes');
const quizRespostaAcesso = document.querySelector('#quiz-resposta');
const quizProximaAcesso = document.querySelector('#quiz-proxima');
let atualAcesso = 0;
let acertosAcesso = 0;
let terminouAcesso = false;

function mostrarPerguntaAcesso() {
    const pergunta = perguntasAcessibilidade[atualAcesso];
    quizNumeroAcesso.textContent = atualAcesso + 1;
    quizPerguntaAcesso.textContent = pergunta.texto;
    quizRespostaAcesso.textContent = '';
    quizProximaAcesso.hidden = true;
    quizOpcoesAcesso.innerHTML = '';
    pergunta.opcoes.forEach((opcao, posicao) => {
        const botao = document.createElement('button');
        botao.className = 'quiz-opcao';
        botao.textContent = opcao;
        botao.addEventListener('click', () => responderAcesso(posicao));
        quizOpcoesAcesso.appendChild(botao);
    });
}
function responderAcesso(escolhida) {
    const pergunta = perguntasAcessibilidade[atualAcesso];
    const botoes = quizOpcoesAcesso.querySelectorAll('button');
    botoes.forEach((botao) => { botao.disabled = true; });
    botoes[pergunta.certa].classList.add('certa');
    if (escolhida === pergunta.certa) {
        acertosAcesso++;
        quizRespostaAcesso.textContent = 'Acertou! ' + pergunta.explicacao;
    } else {
        botoes[escolhida].classList.add('errada');
        quizRespostaAcesso.textContent = 'Quase! ' + pergunta.explicacao;
    }
    quizProximaAcesso.textContent = atualAcesso === perguntasAcessibilidade.length - 1 ? 'Ver resultado' : 'Próxima →';
    quizProximaAcesso.hidden = false;
}
function mostrarResultadoAcesso() {
    terminouAcesso = true;
    quizPerguntaAcesso.textContent = 'Você acertou ' + acertosAcesso + ' de ' + perguntasAcessibilidade.length + '!';
    quizOpcoesAcesso.innerHTML = '';
    quizRespostaAcesso.textContent = acertosAcesso === perguntasAcessibilidade.length
        ? 'Muito bem! Acessibilidade começa com atenção às diferentes formas de participar.'
        : 'Revise os princípios acima e tente identificar as barreiras antes de criar a solução.';
    quizProximaAcesso.textContent = 'Recomeçar';
}
quizProximaAcesso.addEventListener('click', () => {
    if (terminouAcesso) {
        atualAcesso = 0; acertosAcesso = 0; terminouAcesso = false; mostrarPerguntaAcesso();
    } else if (atualAcesso < perguntasAcessibilidade.length - 1) {
        atualAcesso++; mostrarPerguntaAcesso();
    } else {
        mostrarResultadoAcesso();
    }
});
mostrarPerguntaAcesso();
