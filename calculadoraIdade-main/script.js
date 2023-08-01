// OK 1. Pegar os valores
// OK 2. Calcular a Idade
//   OK    a. Com base no ano
//       b. Com mês (EXTRA)
//       c. Com dia (EXTRA)

// OK 3. Gerar a faixa etária
   
//     Resultado            Faixa
//     0 à 12                Criança
//     13 à 17                Adolescente
//     18 à 65               Adulto
//     Acima de 65         Idoso
   

// OK 4. Organizar o objeto pessoa para salvar na lista
// OK 5. Cadastrar a pessoa na lista
// OK 6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
// Semi-OK 7. Renderizar o conteúdo da tabela com as pessoas cadastradas
// OK 8. Botão para limpar os registros;

function calcular(event) {
    event.preventDefault()
    console.log("Foi executada a função calcular")

    //Passo 1
    let usuario = receberValores()

    //Passo 2 
    let idadeCalculada = puxandoIdade(usuario.ano)

    //Passo 3
    let faixaEtaria = faixaEtariaGerada(idadeCalculada)

    console.log (faixaEtaria)

  usuario =  organizarDados(usuario,idadeCalculada,faixaEtaria)

  cadastrarUsuario(usuario)

  window.location.reload()

}

//Passo 1 - Criando função para receber os valores do usuário
function receberValores() {
    let nomeRecebido = document.getElementById("nome").value.trim()
    let diaRecebido= document.getElementById("dia-nascimento").value
    let mesRecebido= document.getElementById("mes-nascimento").value
    let anoRecebido= document.getElementById("ano-nascimento").value

    let dadosUsuario = {
        nome: nomeRecebido,
        dia: diaRecebido,
        mes: mesRecebido,
        ano: anoRecebido

    }

    // console.log(dadosUsuario)

    return dadosUsuario;
}

function puxandoIdade(ano) {
let dataAtual = new Date();
let anoAtual = dataAtual.getFullYear();
console.log(anoAtual); // 2023

let idade = anoAtual - ano

console.log(idade)

return idade;
}

function faixaEtariaGerada(idade) {
    
    if (idade <= 12) {
        return "Criança"

    } else if (idade >= 13 && idade <= 17) {
        return "Adolescente"

    } else if (idade >= 18 && idade <= 65) {
        return "Adulto"

    } else {
        return "Idoso"
    }

}

function organizarDados(dadosUsuario,faixaEtaria,idade) {

    let dadosOrganizados = {
        ...dadosUsuario,
        idadeEtaria: idade,
        quantosAnos: faixaEtaria
    }

    return dadosOrganizados;
}


// TESTES //
function cadastrarUsuario(dadosUsuario) {
    let listaUsuarios = [] 

     // SE houver uma lista de usuarios no localStorage, carrega isso para a variavel listaUsuarios
     if (localStorage.getItem("usuariosCadastrados") != null ) {
        listaUsuarios = JSON.parse( localStorage.getItem("usuariosCadastrados") )
    }

    //Adiciona o usuario na lista de usuarios
    listaUsuarios.push(dadosUsuario)

    //Salva a listaUsuarios no localStorage 
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
   
   
}   

function carregarUsuarios() {
    let listaCarregada = []

    if(localStorage.getItem("usuariosCadastrados") != null) {
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    
    if(listaCarregada.length == 0){
        //SE não tiver nenhum usuario cadastrado, mostrar mensagem.
       let tabela = document.getElementById("corpo-tabela")
         tabela.innerHTML = "Nenhum usuário cadastrado"
    } else{
        montarTabela(listaCarregada)
    }
    console.log(listaCarregada)
}

window.addEventListener("DOMContentLoaded",() => carregarUsuarios())

function montarTabela(listaUsuarios) {
    let tabela = document.getElementById ("corpo-tabela")
    let template = ""
    
    // listaUsuarios.forEach(usuario=>{console.log("o usuário é: ", usuario)})
    listaUsuarios.forEach(usuario => {
        template += ` <tr>
        <td data-cell="nome">${usuario.nome}</td>
        <td data-cell="data de nascimento">28/06/1998</td>
        <td data-cell="idade">${usuario.quantosAnos}</td>
        <td data-cell="faixa etária">${usuario.idadeEtaria}</td> 
    </tr> `
    })

    tabela.innerHTML = template;
}

function deletarRegistros() {
    //Remove o item do local storage
    localStorage.removeItem("usuariosCadastrados")

    //Recarrega a página
    window.location.reload()
}