let quantidadeCartas = prompt("Com quantas cartas você quer jogar?")

if (quantidadeCartas < 4 || quantidadeCartas > 14 || quantidadeCartas % 2 !== 0) {
    while (quantidadeCartas < 4 || quantidadeCartas > 14 || quantidadeCartas % 2 !== 0){
    if (quantidadeCartas < 4 || quantidadeCartas > 14) {
        alert("Necessário inserir um valor entre 4 e 14")
    } else if (isNaN(quantidadeCartas)){
        alert("Necessário inserir um valor numérico")
    } else if (quantidadeCartas % 2 !== 0){
        alert("Não são aceitos números ímpares")
    }
    quantidadeCartas = prompt("Com quantas cartas você quer jogar?")
    }
}

function comparador() { 
	return Math.random() - 0.5; 
}

let listaCartas = []
let cartas = ""

function distribuirCartas() {
    cartas = document.querySelector(".cartas")

    let listaImagens = ["bobrossparrot.gif", "bobrossparrot.gif", "explodyparrot.gif", "explodyparrot.gif","fiestaparrot.gif", "fiestaparrot.gif", "metalparrot.gif", "metalparrot.gif", "revertitparrot.gif", "revertitparrot.gif", "tripletsparrot.gif", "tripletsparrot.gif", "unicornparrot.gif", "unicornparrot.gif"]

    for (let i = 0; i < quantidadeCartas; i++){
        listaCartas[i] = `
            <div class="carta" id="${i}" onclick="cliqueCarta(this)">
                <div class="front-face face">
                    <img src="images/front.png">
                </div>
                <div class="back-face face">
                    <img src="images/${listaImagens[i]}">
                </div>
            </div>
        `
    }

    listaCartas.sort(comparador)

    for (let j = 0; j < listaCartas.length; j++){
        cartas.innerHTML += listaCartas[j]
    }
}

distribuirCartas();

let contadorTempo = 0
let minutos = 0
let segundos = 0

function contador(){
    contadorTempo++

    if (contadorTempo < 60){
        minutos = 0
        segundos = contadorTempo
    } else {
        minutos = (contadorTempo/60).toFixed(0)
        segundos = contadorTempo - (minutos*60)
    }

    if (segundos < 10){
        document.querySelector(".contador").innerHTML = `0${minutos}:0${segundos}`
    } else {
        document.querySelector(".contador").innerHTML = `0${minutos}:${segundos}`
    }
}

setInterval(contador,1000)

let parDeCarta = []
let imagemCarta1
let imagemCarta2
let cartasViradas = []
let contJogadas = 0

function virarCarta(elemento) {
    elemento.querySelector(".back-face").classList.add("girar1")
    elemento.querySelector(".front-face").classList.add("girar2")
}

function compararCartas(){
    imagemCarta1 = parDeCarta[0].querySelector(".back-face img").src
    imagemCarta2 = parDeCarta[1].querySelector(".back-face img").src

        if (parDeCarta.length === 2) {
            if (imagemCarta1 === imagemCarta2){
                cartasViradas.push(imagemCarta1)
                cartasViradas.push(imagemCarta2)
            } else {
                parDeCarta[0].querySelector(".back-face").classList.remove("girar1")
                parDeCarta[0].querySelector(".front-face").classList.remove("girar2")
                parDeCarta[1].querySelector(".back-face").classList.remove("girar1")
                parDeCarta[1].querySelector(".front-face").classList.remove("girar2")
            }
        }

        parDeCarta = []

        if (cartasViradas.length == quantidadeCartas) {
            alert(`Parabéns, você ganhou!! Foram necessárias ${contJogadas} jogadas. Você terminou o jogo em: ${minutos}min e ${segundos}s.`)
            let novoJogo = prompt("Você quer jogar novamente? [sim] [nao]")
            if (novoJogo === "sim"){
                quantidadeCartas = 0
                listaCartas = []
                cartas.innerHTML = ""
                quantidadeCartas = prompt("Com quantas cartas você quer jogar?")
                distribuirCartas()
                contadorTempo = 0
                contJogadas = 0
                parDeCarta = []
                cartasViradas = []
            } else if (novoJogo === "nao"){
                alert("Obrigada por jogar!")
                listaCartas = []
                cartas.innerHTML = ""
                contJogadas = 0
                parDeCarta = []
                cartasViradas = []
                contadorTempo = 0
                document.querySelector(".contador").classList.add("escondido")
            } else if (novoJogo !== "sim" && novoJogo !== "nao"){
                alert("Informe um valor válido (sim ou nao)")
                novoJogo = prompt("Você quer jogar novamente? [sim] [nao]")
            } 
        }
}

function cliqueCarta(elemento) {
    if (parDeCarta.length < 2){
        contJogadas ++
        virarCarta(elemento)
        parDeCarta.push(elemento)
    }
    if (parDeCarta.length === 2){
        setTimeout(compararCartas, 1000)
    }
}