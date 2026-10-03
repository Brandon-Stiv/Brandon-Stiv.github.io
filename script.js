const fechaInicio = new Date("2026-04-11T00:00:00");
const tiempo = document.getElementById("tiempo");
const carta = document.getElementById("textoCarta");
const popup = document.getElementById("popup");
const modalTitle = document.getElementById("modalTitle");
const mensajeFoto = document.getElementById("mensajeFoto");
const closePopup = document.getElementById("closePopup");
const openLetter = document.getElementById("openLetter");
const heroVideo = document.getElementById("heroVideo");
const welcomeScreen = document.getElementById("welcomeScreen");
const enterSite = document.getElementById("enterSite");
const progress = document.querySelector(".reading-progress span");
let lastTrigger = null;

document.body.classList.add("welcome-open");

function repararTexto(texto) {
    if (!/[ÃÂð]/.test(texto)) return texto;
    try { return decodeURIComponent(escape(texto)); } catch { return texto; }
}

function crearTiempo(valor, etiqueta) {
    return `<div class="time-box"><strong>${valor}</strong><span>${etiqueta}</span></div>`;
}

function actualizarTiempo() {
    const diferencia = Math.max(0, new Date() - fechaInicio);
    const dias = Math.floor(diferencia / 86400000);
    const horas = Math.floor((diferencia / 3600000) % 24);
    const minutos = Math.floor((diferencia / 60000) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);
    tiempo.innerHTML = [crearTiempo(dias, "días"), crearTiempo(horas, "horas"), crearTiempo(minutos, "minutos"), crearTiempo(segundos, "segundos")].join("");
}

function abrirCarta() {
    carta.classList.remove("revealed");
    void carta.offsetWidth;
    carta.innerHTML = `<h3>Mi niña preciosa</h3><p>Desde el día en que apareciste en mi vida todo cambió. Cada risa, cada enojo de mentiritas y cada mirada entre nosotros son cosas que me hacen muy feliz, y quiero hacerte sentir igual de feliz cada día.</p><p>A veces trato de expresarte todo lo que siento por ti, pero las palabras no alcanzan para decir lo mucho que te quiero. Por eso esta página existe: para que tengas un pedacito de mi amor guardado aquí.</p><span class="signature">Con amor eterno, Brandon</span>`;
    carta.classList.add("revealed");
}

function abrirPopup(titulo, mensaje, trigger) {
    modalTitle.textContent = titulo;
    mensajeFoto.textContent = mensaje;
    lastTrigger = trigger;
    popup.classList.add("is-open");
    popup.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closePopup.focus();
}

function cerrarPopup() {
    popup.classList.remove("is-open");
    popup.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    lastTrigger?.focus();
}

document.querySelectorAll(".memory-card").forEach((card, index) => {
    card.dataset.title = repararTexto(card.dataset.title || "");
    card.dataset.message = repararTexto(card.dataset.message || "");
    const heading = card.querySelector("h3");
    if (heading) heading.textContent = repararTexto(heading.textContent);
    card.style.setProperty("--card-index", index);
    card.classList.add("reveal-item");

    const abrirCard = () => {
        const redirect = card.dataset.redirect || (card.tagName.toLowerCase() === "a" ? card.href : "");
        if (redirect) { window.location.href = redirect; return; }
        abrirPopup(card.dataset.title, card.dataset.message, card);
    };
    card.addEventListener("click", abrirCard);
    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); abrirCard(); }
    });
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
});

document.querySelectorAll("section > .section-heading, .letter-copy, .letter-panel, .song-card").forEach((element, index) => {
    element.classList.add("reveal-item");
    element.style.setProperty("--card-index", index % 5);
});

const songsTitle = document.querySelector("#canciones h2");
if (songsTitle) songsTitle.textContent = "Canciones que te dedico";

openLetter.addEventListener("click", abrirCarta);
closePopup.addEventListener("click", cerrarPopup);
popup.addEventListener("click", (event) => { if (event.target === popup) cerrarPopup(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && popup.classList.contains("is-open")) cerrarPopup(); });

document.querySelectorAll("audio").forEach((audio) => {
    audio.addEventListener("play", () => document.querySelectorAll("audio").forEach((other) => { if (other !== audio) other.pause(); }));
});

if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.play().catch(() => { heroVideo.controls = true; });
}

function actualizarProgreso() {
    const recorrido = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${recorrido > 0 ? window.scrollY / recorrido : 0})`;
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal-item").forEach((item) => observer.observe(item));

function crearDestellos() {
    const cantidad = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 18;
    for (let i = 0; i < cantidad; i += 1) {
        const sparkle = document.createElement("i");
        sparkle.className = "sparkle";
        sparkle.style.setProperty("--x", `${Math.random() * 100}%`);
        sparkle.style.setProperty("--y", `${20 + Math.random() * 70}%`);
        sparkle.style.setProperty("--delay", `${Math.random() * -7}s`);
        sparkle.style.setProperty("--duration", `${5 + Math.random() * 5}s`);
        document.querySelector(".hero").appendChild(sparkle);
    }
}

function entrar() {
    welcomeScreen.classList.add("is-hidden");
    document.body.classList.remove("welcome-open");
    setTimeout(() => welcomeScreen.remove(), 750);
}

enterSite.addEventListener("click", entrar);
window.addEventListener("scroll", actualizarProgreso, { passive: true });
actualizarTiempo();
actualizarProgreso();
crearDestellos();
setInterval(actualizarTiempo, 1000);
