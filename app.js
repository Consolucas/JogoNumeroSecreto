let listaNumeros = [];
let numeroLimite = 10
let numeroSecreto = gerarNumero();
let tentativas = 1;

// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
// maneira menos performática por conta de repetição de código

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // responsive voice sendo usado pela biblioteca do html
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
};

function mensagemInicial() {
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', 'Escolha um número entre 1 e 10');
};
mensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto){
        exibirTexto('h1', 'Parabéns, você acertou!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Parabens, você acertou o número secreto ${numeroSecreto} em ${tentativas} ${palavraTentativas}`;
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else if(chute > 10 || chute < 0){
        exibirTexto('p', 'Você deve digitar um número entre 1 e 10');
    }else{
        if (chute < numeroSecreto){
            exibirTexto('p', 'O número secreto é maior');
        }
        else{
            exibirTexto('p', 'O número secreto é menor');
        }
        tentativas++;
        limparCampo();
    }
};

function gerarNumero(){
    let numeroEscolhido = parseInt(Math.random() * 10) + 1;
    let elementosLista = listaNumeros.length;

    if (elementosLista == numeroLimite){
        listaNumeros = [];
    };

    if (listaNumeros.includes(numeroEscolhido)){
        return gerarNumero();
    }
    else {
        listaNumeros.push(numeroEscolhido);
        console.log(listaNumeros);
        return numeroEscolhido;
    }
};

function limparCampo(){
    document.querySelector('input').value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumero();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    limparCampo();
};