const fechaInicio = new Date("2026-02-21")

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
Mi niña,

Desde el día en que apareciste en mi vida todo cambió. Cada risa, cada enojo de mentiritas y cada mirada entre nosotros son cosas que me hacen muy feliz, y quiero hacerte sentir igual de feliz cada día.

A veces trato de expresarte todo lo que siento por ti, pero las palabras no alcanzan para expresar lo mucho que te quiero.

Con amor Brandon.
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