
let participantes = [
  {
  nome: "Nossir Reis",
  email: "nossirbro@gmail.com",
  dataInscricao: new Date(2024,2,22,19,20),
  dataCheckIn: new Date(2024,2,25,22,00)
  },
  {
    nome: "Diego Fernandes",
    email: "Diego@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Maria Silva",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 10, 30),
    dataCheckIn: new Date(2024, 2, 26, 15, 45)
  },
  {
    nome: "João Oliveira",
    email: "joao123@hotmail.com",
    dataInscricao: new Date(2024, 2, 23, 14, 0),
    dataCheckIn: new Date(2024, 2, 27, 9, 30)
  },
  {
    nome: "Ana Santos",
    email: "ana_santos@yahoo.com",
    dataInscricao: new Date(2024, 2, 24, 8, 45),
    dataCheckIn: null
  },
  {
    nome: "Pedro Almeida",
    email: "pedro_almeida@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 17, 15),
    dataCheckIn: new Date(2024, 2, 29, 16, 0)
  },
  {
    nome: "Carla Lima",
    email: "carla_lima@hotmail.com",
    dataInscricao: new Date(2024, 2, 25, 9, 30),
    dataCheckIn: new Date(2024, 2, 30, 13, 45)
  },
  {
    nome: "Rafaela Costa",
    email: "rafaela_costa@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 14, 20),
    dataCheckIn: new Date(2024, 3, 1, 10, 15)
  },
  {
    nome: "Lucas Martins",
    email: "lucas_martins@yahoo.com",
    dataInscricao: new Date(2024, 2, 26, 11, 0),
    dataCheckIn: null
  },
  {
    nome: "Fernanda Oliveira",
    email: "fernanda_oliveira@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 18, 30),
    dataCheckIn: null
  }
];

const criarNovoParticipante = (participante) => {

  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null){
    dataCheckIn =`
      <button data-email="${participante.email}" onclick="fazerCheckIn(event)">
      Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
  <td>
  <strong>${participante.nome}</strong>
  <br>
  <small>${participante.email}</small>
  </td>
  <td>${dataInscricao}</td>
  <td>${dataCheckIn}</td>
  </tr>
`
}
const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
  }

  // substituir informação do HTML
  document.querySelector("tbody").innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get("nome"),
    email: dadosDoFormulario.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find((p) =>{
    return p.email == participante.email
  })
  if(participanteExiste){
    alert("Email já cadastrado!")
    return
  }
  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) =>{
  const mensagemConfirmacao = "Tem certeza que deseja fazer o check-in?"
  if(confirm(mensagemConfirmacao) == false){
    return 
  }

  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email})
  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}