async function atualizarEndereco() {
    const cepText = document.querySelector("#cep").value;
    const cep = cepText.replace(/\D/g, '');
    if (String(cep).length != 8 || !/^[0-9]{8}$/.test(cep)) {
        alert("Erro: CEP inválido!");
        return;
    }

    await fetch(`https://viacep.com.br/ws/${cep}/json/`, {method: "GET"})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        document.querySelector("#rua").value = data.logradouro;
        document.querySelector("#cidade").value = data.localidade;
        document.querySelector("#estado").value = data.uf;
    })
    .catch((error) => {
        console.error(error);
    })
}

function salvarDados() {
    const nome = document.querySelector("#nome").value
    const idade = document.querySelector("#idade").value
    const serie = document.querySelector("#serie").value
    const escola = document.querySelector("#escola").value
    const materia = document.querySelector("#materia").value
    const cep = document.querySelector("#cep").value
    const rua = document.querySelector("#rua").value
    const cidade = document.querySelector("#cidade").value
    const estado = document.querySelector("#estado").value

    if (!(nome && idade && serie && escola && materia && cep && rua && cidade && estado)) {
        alert("Erro: Formulário incompleto!");
        return;
    }

    localStorage.setItem("usuario-nome", nome)
    localStorage.setItem("usuario-idade", idade)
    localStorage.setItem("usuario-serie", serie)
    localStorage.setItem("usuario-escola", escola)
    localStorage.setItem("usuario-materia", materia)
    localStorage.setItem("usuario-cep", cep)
    localStorage.setItem("usuario-rua", rua)
    localStorage.setItem("usuario-cidade", cidade)
    localStorage.setItem("usuario-estado", estado)

    window.location = "index.html";
}
