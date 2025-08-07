// Array que irá guardar a lista de amigos adicionados.
let amigos = [];

/**
 * Adiciona um novo amigo à lista, validando para não ter nomes vazios ou repetidos.
 */
function adicionarAmigo() {
    const amigoInput = document.getElementById('amigo');
    const nomeAmigo = amigoInput.value.trim();

    // Validação: Verifica se o campo não está vazio.
    if (nomeAmigo === '') {
        alert("Por favor, digite o nome do seu amigo.");
        return;
    }


    // Verifica se o nome contém algum número usando uma Expressão Regular.
    // /\d/ testa se existe qualquer dígito (0-9) no texto.
    if (/\d/.test(nomeAmigo)) {
        alert("O nome não pode conter números. Por favor, digite um nome válido.");
        amigoInput.value = ''; // Limpa o campo com o nome inválido.
        amigoInput.focus();
        return; // Para a execução da função.
    }

    // Validação: Verifica se o nome já existe na lista (ignorando maiúsculas/minúsculas).
    if (amigos.map(amigo => amigo.toLowerCase()).includes(nomeAmigo.toLowerCase())) {
        alert("Este nome já foi adicionado! Por favor, insira um nome diferente.");
        amigoInput.value = '';
        return;
    }

    // Adiciona o nome ao array de amigos.
    amigos.push(nomeAmigo);

    // Atualiza a lista de participantes na tela.
    atualizarListaAmigos();

    // Limpa o campo de input para o próximo nome e coloca o foco nele.
    amigoInput.value = '';
    amigoInput.focus();
}

/**
 * Realiza o sorteio dos amigos.
 */
function sortearAmigo() {
    if (amigos.length < 4) {
        alert("Você precisa de pelo menos 4 amigos para fazer o sorteio!");
        return;
    }

    embaralhar(amigos);
    
    // Mapeia quem tirou quem e guarda em um objeto para consulta.
    const sorteio = new Map();
    for (let i = 0; i < amigos.length; i++) {
        const tirou = amigos[i];
        // O último tira o primeiro, os outros tiram o próximo da lista.
        const tirado = (i === amigos.length - 1) ? amigos[0] : amigos[i + 1];
        sorteio.set(tirou, tirado);
    }x

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '<p>Sorteio realizado! Clique no seu nome para descobrir quem você tirou:</p>';

    // Cria uma lista de "botões" com os nomes dos participantes.
    for (const amigo of amigos) {
        // Usamos um link estilizado como botão para ser clicável.
        const linkAmigo = document.createElement('a');
        linkAmigo.href = '#';
        linkAmigo.textContent = amigo;
        linkAmigo.className = 'botao-revelar'; // Adicione um estilo para '.botao-revelar' no seu CSS se quiser.
        
        linkAmigo.onclick = (e) => {
            e.preventDefault(); // Impede o link de pular a página.
            const amigoSecreto = sorteio.get(amigo);
            alert(`Olá, ${amigo}! O seu amigo secreto é... ${amigoSecreto}!`);
        };
        
        resultado.appendChild(linkAmigo);
        resultado.appendChild(document.createElement('br')); // Quebra de linha
    }
}

/**
 * Atualiza a lista de participantes visível na tela.
 */
function atualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = ''; // Limpa a lista antiga antes de atualizar.

    for (let amigo of amigos) {
        lista.innerHTML += `<li>${amigo}</li>`;
    }
}

/**
 * Função para embaralhar os itens de um array (algoritmo Fisher-Yates).
 * @param {Array} array O array a ser embaralhado.
 */
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Limpa todos os dados e reinicia a brincadeira.
 */
function reiniciar() {
    amigos = [];
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('amigo').focus();
}