/* LabScore pt.1 - Exercício 1 */
let listaNotas = [8, 10, 7, 5];

/**
 * Calcula a média aritmética dos valores do array notas.
 * @param {number[]} notas Array de notas numéricas 
 * @returns {number} A média de todas as notas
 */
function calcularMedia(notas) {
  let soma = 0;
  for (let i = 0; i < notas.length; i++) {
    soma += notas[i];
  }
  let media = soma / notas.length;
  return media;
}

let mediaNotas = calcularMedia(listaNotas);

/* LabScore pt.1 - Exercício 2 */

/**
 * Processa o desempenho através da media e retorna um elemento HTML de resposta para esse aluno.
 * @param {number} media Média a ser verificada para processar o resultado final.
 * @returns {string} Elemento HTML em texto.
 */
function resultadoFinal(media) {
  return media >= 7
    ? `<p>Média: <strong>${media}</strong>.<br> Parabéns, você passou na média!</p>`
    : `<p>Média: <strong>${media}</strong>.<br> Infelizmente você está de recuperação.</p>`;
}

/* LabScore pt.1 - Exercício 3 */
let listaAlunos = ["Pedro", "Maria", "João", "Paula"];

/**
 * Escreve na tela o conteúdo de cada elemento do array nomes.
 * @param {array} nomes Array de nomes a serem escritos na tela.
 */
function escreverNomes(nomes) {
  nomes.forEach((aluno) => {
    document.write(`${aluno}<br>`);
  });
}

/* LabScore pt.1 - Exercício 4 */

/**
 * Calcula e exibe na tela através de um document.write(...) a tabuada do número informado com os primeiros 10 múltiplos.
 * @param {number} numero Utilizado para calcular os 10 primeiros múltiplos dele.
 */
function tabuada(numero) {
  for (let i = 0; i <= 10; i++) {
    let resultado = numero * i;
    document.write(`${numero} x ${i} = ${resultado}<br>`);
  }
}

/* LabScore pt.1 - Exercício 5 */

/**
 * Faz a requisição dos dados de um aluno e exibe-os na tela do usuário
 */
function entrevistarAluno() {
  let nome = localStorage.getItem("usuario-nome");
  let idade = localStorage.getItem("usuario-idade");
  let serie = localStorage.getItem("usuario-serie");
  let escola = localStorage.getItem("usuario-escola");
  let materia = localStorage.getItem("usuario-materia");

  let spanNome = document.getElementById("nome");
  let spanIdade = document.getElementById("idade");
  let spanSerie = document.getElementById("serie");
  let spanEscola = document.getElementById("escola");
  let spanMateria = document.getElementById("materia");

    spanNome.innerText = nome;
    spanIdade.innerText = idade;
    spanSerie.innerText = serie;
    spanEscola.innerText = escola;
    spanMateria.innerText = materia;
}

/* LabScore pt.1 - Exercício 6 */
let materiasMedia = [];

/**
 * Requisita os dados necessários para inserir uma nova linha na tabela HTML através do window.prompt(...)
 * e adiciona através da função adicionarLinhaTabela(...).  
 * 
 * Adiciona ao array materiasMedia[] a média de uma matéria a cada chamada
 * e chama a função exibirMediaGeral() para atualizar o HTML.
 */
function notasMateria() {
  let materia = window.prompt("Qual o nome da matéria?");
  let notas = [];
  let i = 0;
  while (i < 4) {
    let nota = parseFloat(window.prompt("Informe a nota " + (i + 1) + ":"));
    if (!nota) nota = null;
    notas.push(nota);
    i++;
  }

  let dadosMateria = {
    nomeMateria: materia,
    notas: notas
  };

  const dadosStorage = {
    nome: materia,
    nota1: notas[0],
    nota2: notas[1],
    nota3: notas[2],
    nota4: notas[3]
  }
  let notasStorage;
  try {
    notasStorage = JSON.parse(localStorage.getItem("notas"))
  } catch {
    notasStorage = []
  }
  if (!notasStorage) notasStorage = []
  notasStorage.push(dadosStorage);

  localStorage.setItem("notas", JSON.stringify(notasStorage));

  let media = calcularMedia(dadosMateria.notas);

  materiasMedia.push(media);
  localStorage.setItem("mediasMateria", JSON.stringify(materiasMedia))

  adicionarLinhaTabela(dadosMateria, media);

  exibirMediaGeral();
  exibirMaiorMedia();
}

/* LabScore pt.1 - Exercício 7 */

/**
 * Retorna o maior elemento do array.  
 * Um elemento é considerado o maior se `ele > qualquer outro elemento do array`.
 * @param {array} array Array de elementos a ser verificado.
 * @returns  {any} O maior elemento do array numeros.
 */
function encontrarMaior(array) {
  let maiorElemento = array[0];

  for (let i = 1; i < array.length; i++) {
    if (array[i] > maiorElemento) {
      maiorElemento = array[i];
    }
  }

  return maiorElemento;
}



//------------------ Mini-projeto ------------------//

// LabScore pt.2 - Exercício 2
entrevistarAluno();

// LabScore pt.2 - Exercício 4

const botao = document.getElementById("add-notas");
botao.addEventListener("click", notasMateria);

/**
 * Adiciona uma nova linha na tabela com querySelector `section.notas tbody` baseado nos dados recebidos.
 * @param {{nomeMateria: string, notas: number[]}} dadosMateria Objeto utilizado para criar a nova linha da tabela.
 * @param {number} media Média da matéria para adicionar na tabela.
 */
function adicionarLinhaTabela(dadosMateria, media) {
  let tagTbody = document.querySelector("section.notas tbody");
  tagTbody.innerHTML += `
  <tr>
  <td>${dadosMateria.nomeMateria}</td>
  <td>${dadosMateria.notas[0]}</td>
  <td>${dadosMateria.notas[1]}</td>
  <td>${dadosMateria.notas[2]}</td>
  <td>${dadosMateria.notas[3]}</td>
  <td>${media}</td>
  </tr>
  `;
}

// LabScore pt.2 - Exercício 5 e 6

/**
 * Altera o conteúdo de texto do elemento HTML de id `media-geral` para exibir a média geral entre as matérias.
 */
function exibirMediaGeral() {
  const mediaGeral = calcularMedia(materiasMedia);

  document.getElementById("media-geral").textContent = `A média geral do aluno é ${mediaGeral}`;
}

// LabScore pt.2 - Exercício 7
/**
 * Altera o conteúdo de texto do elemento HTML de id `maior-media` para exibir a maior média entre as matérias.
 */
function exibirMaiorMedia() {
  const maiorMedia = encontrarMaior(materiasMedia);

  document.getElementById("maior-media")
  .textContent = `A maior média entre as matérias é ${maiorMedia}`;
}

// LabScore pt.3
notasPadrao()
function notasPadrao() {
  let notas;
  try {
  notas = JSON.parse(localStorage.getItem("notas"))
  } catch {}
  if (notas) {
  notas.forEach((nota) => {
    const dados = {
      nomeMateria: nota.nome,
      notas: [nota.nota1, nota.nota2, nota.nota3, nota.nota4]
    }
    adicionarLinhaTabela(dados, calcularMedia(dados.notas))
  })
  }

  const materiasMediaStorage = JSON.parse(localStorage.getItem("mediasMateria"))
  if (materiasMediaStorage) {
    materiasMedia = materiasMediaStorage;
  }
  exibirMediaGeral()
  exibirMaiorMedia()
}

function removeAllNotas() {
  localStorage.removeItem("notas")
  localStorage.removeItem("mediasMateria")
  window.location = window.location
}
