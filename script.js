
const botaoMenu = document.querySelector('.botao-menu');
const menuLista = document.querySelector('.menu-lista');
const menuFundo = document.querySelector('.menu-fundo');
const linksMenu = document.querySelectorAll('.menu-lista a');

// abre ou fecha o menu.
function abrirFecharMenu(abrir) {
    menuLista.classList.toggle('aberto', abrir);
    menuFundo.classList.toggle('aberto', abrir);
    botaoMenu.classList.toggle('aberto', abrir);
    botaoMenu.setAttribute('aria-expanded', abrir);
    botaoMenu.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
}

// clicar no botão abre se estiver fechado, e fecha se estiver aberto
botaoMenu.addEventListener('click', () => {
    const estaAberto = menuLista.classList.contains('aberto');
    abrirFecharMenu(!estaAberto);
});

// clicar no fundo escuro, fora do painel, fecha o menu
menuFundo.addEventListener('click', () => {
    abrirFecharMenu(false);
});

// clicar em qualquer link do menu também fecha
linksMenu.forEach((link) => {
    link.addEventListener('click', () => {
        abrirFecharMenu(false);
    });
});

// apertar a tecla Esc fecha o menu
document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
        abrirFecharMenu(false);
    }
});