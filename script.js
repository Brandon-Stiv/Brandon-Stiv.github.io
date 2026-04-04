const fechaInicio = new Date("2024-01-01")

function actualizarTiempo(){

const ahora = new Date()

const diferencia = ahora - fechaInicio

const dias = Math.floor(diferencia / (1000*60*60*24))

const horas = Math.floor((diferencia/(1000*60*60))%24)

const minutos = Math.floor((diferencia/(1000*60))%60)

document.getElementById("tiempo").innerHTML =
dias+" días "+horas+" horas "+minutos+" minutos"

}

setInterval(actualizarTiempo,1000)



function abrirCarta(){

document.getElementById("textoCarta").innerHTML =
`
Sol,

Desde el día que apareciste en mi vida
todo empezó a sentirse diferente.

Tus sonrisas, nuestras conversaciones,
cada momento contigo se volvió un recuerdo
que quiero guardar para siempre.

A veces intento explicar lo que siento,
pero las palabras no alcanzan.

Solo sé que contigo soy feliz
y que te amo muchísimo.
`

}



function final(){

document.getElementById("finalTexto").innerHTML =
"Gracias por cada momento, cada sonrisa y cada recuerdo. Te amo muchísimo ❤️"

}



function playMusic(){

document.getElementById("music").play()

}


/* MENSAJES EN FOTOS */

const polaroids = document.querySelectorAll(".polaroid")

polaroids.forEach(p => {

p.addEventListener("click", () => {

document.getElementById("mensajeFoto").innerText =
p.dataset.mensaje

document.getElementById("popup").style.display = "flex"

})

})

function cerrarPopup(){

document.getElementById("popup").style.display = "none"

}



/* ESTRELLAS INTERACTIVAS */

const canvas = document.getElementById("particles")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let mouse = {

x:undefined,
y:undefined

}

window.addEventListener("mousemove", e => {

mouse.x = e.x
mouse.y = e.y

})


let particles = []

for(let i=0;i<250;i++){   // MAS ESTRELLAS

particles.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*2+0.5,
dx:(Math.random()-0.5)*0.3,
dy:(Math.random()-0.5)*0.3

})

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

particles.forEach(p=>{

let distX = p.x - mouse.x
let distY = p.y - mouse.y

let distance = Math.sqrt(distX*distX + distY*distY)

if(distance < 120){

p.x += distX/20
p.y += distY/20

}

ctx.beginPath()
ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
ctx.fillStyle="white"
ctx.fill()

p.x += p.dx
p.y += p.dy

})

requestAnimationFrame(draw)

}

draw()