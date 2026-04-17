const fechaInicio = new Date("2026-04-11")  // ✅ CAMBIADO

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
    // ✅ ANIMACIÓN + LETRAS CURSIVAS
    document.getElementById("textoCarta").style.opacity = "0"
    document.getElementById("textoCarta").style.transform = "scale(0.8)"
    
    setTimeout(() => {
        document.getElementById("textoCarta").innerHTML =
        `
        <div style="text-align: center; animation: fadeInUp 0.8s ease forwards;">
            <h3 style="font-family: 'Great Vibes', cursive; font-size: 2.8rem; color: #ff6b9d; margin-bottom: 25px; text-shadow: 0 0 20px rgba(255,107,157,0.5);">Mi niña preciosa 💕</h3>
            <div style="font-family: 'Poppins', sans-serif; font-size: 1.25rem; line-height: 1.7; color: #ffffff; max-width: 550px; margin: 0 auto;">
                <p>Desde el día en que apareciste en mi vida todo cambió. Cada risa, cada enojo de mentiritas y cada mirada entre nosotros son cosas que me hacen muy feliz, y quiero hacerte sentir igual de feliz cada día.</p>
                <br>
                <p>A veces trato de expresarte todo lo que siento por ti, pero las palabras no alcanzan para expresar lo mucho que te quiero.</p>
                <br>
                <p style="font-weight: 600; color: #ff6b9d; font-size: 1.3rem;">
                    Con amor eterno,<br>
                    <span style="font-family: 'Great Vibes', cursive; font-size: 1.8rem;">Brandon 💕</span>
                </p>
            </div>
        </div>
        `
        document.getElementById("textoCarta").style.opacity = "1"
        document.getElementById("textoCarta").style.transform = "scale(1)"
    }, 300)
}

/* POLAROID */
document.addEventListener('DOMContentLoaded', () => {
    const polaroids = document.querySelectorAll(".polaroid")
    polaroids.forEach(p => {
        p.addEventListener("click", () => {
            document.getElementById("mensajeFoto").innerText = p.dataset.mensaje
            document.getElementById("popup").style.display = "flex"
        })
    })
})

function cerrarPopup(){
    document.getElementById("popup").style.display = "none"
}

/* ESTRELLAS OPTIMIZADAS (nunca se acaban) */
const canvas = document.getElementById("particles")
const ctx = canvas.getContext("2d")

let w = canvas.width = window.innerWidth
let h = canvas.height = window.innerHeight

window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
})

let mouseX = 0, mouseY = 0
window.addEventListener("mousemove", e => {
    mouseX = e.clientX
    mouseY = e.clientY
})

const stars = []
for(let i = 0; i < 120; i++) {  // ✅ Más estrellas
    stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.8 + Math.random() * 1.5,
        speed: 0.02 + Math.random() * 0.03
    })
}

function animate() {
    ctx.fillStyle = 'rgba(10,10,21,0.25)'  // Más suave
    ctx.fillRect(0, 0, w, h)
    
    stars.forEach(star => {
        // ✅ NUNCA SE ACABAN - respawn automático
        star.x += star.speed
        if(star.x > w + 20) {
            star.x = -20
            star.y = Math.random() * h
        }
        
        const dx = mouseX - star.x
        const dy = mouseY - star.y
        const dist = Math.sqrt(dx*dx + dy*dy)
        
        if(dist < 100) {
            star.x += dx * 0.04
            star.y += dy * 0.04
        }
        
        ctx.save()
        ctx.globalAlpha = 0.95
        ctx.shadowBlur = 6
        ctx.shadowColor = 'white'
        
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI*2)
        ctx.fillStyle = "white"
        ctx.fill()
        ctx.restore()
    })
    
    requestAnimationFrame(animate)
}

animate()

// AGREGAR ESTO al final del JS
document.getElementById("popup").addEventListener("click", (e) => {
    if(e.target.id === "popup") {
        cerrarPopup()
    }
})

// ✅ Cierra popup click fuera
document.getElementById("popup").addEventListener("click", (e) => {
    if(e.target.id === "popup") cerrarPopup()
})