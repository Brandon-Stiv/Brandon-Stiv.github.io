const fechaInicio = new Date("2026-04-11T00:00:00");
const tiempo = document.getElementById("tiempo");
const carta = document.getElementById("textoCarta");
const popup = document.getElementById("popup");
const modalTitle = document.getElementById("modalTitle");
const mensajeFoto = document.getElementById("mensajeFoto");
const closePopup = document.getElementById("closePopup");
const openLetter = document.getElementById("openLetter");
const heroVideo = document.getElementById("heroVideo");

function crearTiempo(valor, etiqueta) {
    return `
        <div class="time-box">
            <strong>${valor}</strong>
            <span>${etiqueta}</span>
        </div>
    `;
}

function actualizarTiempo() {
    const ahora = new Date();
    const diferencia = Math.max(0, ahora - fechaInicio);

    const dias = Math.floor(diferencia / 86400000);
    const horas = Math.floor((diferencia / 3600000) % 24);
    const minutos = Math.floor((diferencia / 60000) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    tiempo.innerHTML = [
        crearTiempo(dias, "d&iacute;as"),
        crearTiempo(horas, "horas"),
        crearTiempo(minutos, "minutos"),
        crearTiempo(segundos, "segundos")
    ].join("");
}

function abrirCarta() {
    carta.classList.remove("revealed");
    void carta.offsetWidth;

    carta.innerHTML = `
        <h3>Mi ni&ntilde;a preciosa</h3>
        <p>
            Desde el d&iacute;a en que apareciste en mi vida todo cambi&oacute;. Cada risa,
            cada enojo de mentiritas y cada mirada entre nosotros son cosas que
            me hacen muy feliz, y quiero hacerte sentir igual de feliz cada d&iacute;a.
        </p>
        <p>
            A veces trato de expresarte todo lo que siento por ti, pero las
            palabras no alcanzan para decir lo mucho que te quiero. Por eso esta
            p&aacute;gina existe: para que tengas un pedacito de mi amor guardado aqu&iacute;.
        </p>
        <span class="signature">Con amor eterno, Brandon</span>
    `;

    carta.classList.add("revealed");
}

function abrirPopup(titulo, mensaje) {
    modalTitle.innerHTML = titulo;
    mensajeFoto.innerHTML = mensaje;
    popup.classList.add("is-open");
    popup.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closePopup.focus();
}

function cerrarPopup() {
    popup.classList.remove("is-open");
    popup.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

document.querySelectorAll(".memory-card").forEach((card) => {
    const abrirCard = () => {
        const redirect = card.dataset.redirect || (card.tagName.toLowerCase() === "a" ? card.href : "");

        if (redirect) {
            window.location.href = redirect;
            return;
        }

        abrirPopup(card.dataset.title, card.dataset.message);
    };

    card.addEventListener("click", abrirCard);
    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            abrirCard();
        }
    });
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
});

openLetter.addEventListener("click", abrirCarta);
closePopup.addEventListener("click", cerrarPopup);

if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.loop = true;

    heroVideo.play().catch(() => {
        heroVideo.controls = true;
    });

    heroVideo.addEventListener("ended", () => {
        heroVideo.currentTime = 0;
        heroVideo.play();
    });
}

popup.addEventListener("click", (event) => {
    if (event.target === popup) {
        cerrarPopup();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && popup.classList.contains("is-open")) {
        cerrarPopup();
    }
});

actualizarTiempo();
setInterval(actualizarTiempo, 1000);

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
const stars = [];
let width = 0;
let height = 0;
let mouseX = 0;
let mouseY = 0;

function resizeCanvas() {
    const ratio = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function crearEstrellas() {
    stars.length = 0;
    const cantidad = Math.min(150, Math.floor((width * height) / 9000));

    for (let i = 0; i < cantidad; i += 1) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 0.6 + Math.random() * 1.6,
            speed: 0.08 + Math.random() * 0.22,
            alpha: 0.35 + Math.random() * 0.55
        });
    }
}

function dibujarEstrellas() {
    ctx.clearRect(0, 0, width, height);

    stars.forEach((star) => {
        star.x += star.speed;

        if (star.x > width + 8) {
            star.x = -8;
            star.y = Math.random() * height;
        }

        const dx = mouseX - star.x;
        const dy = mouseY - star.y;
        const distancia = Math.sqrt(dx * dx + dy * dy);

        if (distancia < 90) {
            star.x -= dx * 0.006;
            star.y -= dy * 0.006;
        }

        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#fffaf3";
        ctx.fillStyle = "#fffaf3";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });

    requestAnimationFrame(dibujarEstrellas);
}

window.addEventListener("resize", () => {
    resizeCanvas();
    crearEstrellas();
});

window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

resizeCanvas();
crearEstrellas();
dibujarEstrellas();
