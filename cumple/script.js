/*==================================================
                    ELEMENTOS
==================================================*/

const music = document.getElementById("music");

const startButton = document.getElementById("start-button");

const musicToggle = document.getElementById("music-toggle");

const envelope = document.querySelector(".envelope");

const typewriter = document.getElementById("typewriter");

const years = document.getElementById("years");
const months = document.getElementById("months");
const days = document.getElementById("days");

const cursorGlow = document.getElementById("cursor-glow");

const confetti = document.getElementById("confetti");
const particles = document.getElementById("particles");
const petals = document.getElementById("petals");
const hearts = document.getElementById("hearts");

/*==================================================
                    CARTA
==================================================*/

const letter = `

Mi querida niña 💕

Hoy es un día muy especial.

Tal vez para muchas personas sea simplemente otro cumpleaños.

Pero para mí...

es el día en el que nació la mujer que cambió completamente mi vida.

Gracias por cada sonrisa.

Gracias por cada abrazo.

Gracias por cada palabra.

Gracias por estar conmigo.

Quiero que recuerdes algo.

Nunca estarás sola.

Cuando estés feliz...

quiero celebrar contigo.

Cuando estés triste...

quiero abrazarte.

Cuando tengas miedo...

quiero darte mi mano.

Y cuando la vida se vuelva difícil...

quiero ser ese lugar donde siempre puedas sentirte tranquila.

Sé que hoy también recuerdas muchísimo a tu abuelita.

Y aunque nadie podrá llenar ese vacío...

estoy seguro de que ella estaría muy orgullosa de la mujer tan hermosa que eres.

Espero que, donde esté,

esté sonriendo al verte cumplir un año más.

Yo prometo cuidar de esa sonrisa que tanto amo.

Prometo seguir creando recuerdos contigo.

Prometo seguir eligiéndote todos los días.

Y prometo amarte con todo mi corazón.

Feliz cumpleaños.

Te amo infinitamente.

💕

Con muchísimo amor,

Stiven.

`;

/*==================================================
                TYPEWRITER
==================================================*/

let index = 0;
let typingTimer = null;

function writeLetter(){ 

    if(index >= letter.length)
        return;

    typewriter.innerHTML += letter.charAt(index);

    index++;

    typingTimer = setTimeout(writeLetter,25);
}


/*==================================================
                ABRIR SOBRE
==================================================*/

startButton.addEventListener("click", () => {

    envelope.classList.add("open");

    clearTimeout(typingTimer);

    typewriter.innerHTML = "";

    index = 0;

    setTimeout(() => {

        music.play().catch(() => {});

    }, 1800);

   setTimeout(()=>{

        writeLetter();

        launchConfetti();

    },2200);

    document
        .getElementById("envelope-section")
        .scrollIntoView({

            behavior: "smooth"

        });

});
/*==================================================
                CONTADOR
==================================================*/

const startDate = new Date(2026, 3, 11);

function updateCounter() {

    const now = new Date();

    let y = now.getFullYear() - startDate.getFullYear();
    let m = now.getMonth() - startDate.getMonth();
    let d = now.getDate() - startDate.getDate();

    if (d < 0) {
        m--;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        d += lastMonth.getDate();
    }

    if (m < 0) {
        y--;
        m += 12;
    }

    years.textContent = y;
    months.textContent = m;
    days.textContent = d;

}

updateCounter();

setInterval(updateCounter, 60000);
/*==================================================
                BOTÓN MÚSICA
==================================================*/

musicToggle.addEventListener("click", () => {

    if (music.paused) {

        music.play();

        musicToggle.textContent = "♫";

    } else {

        music.pause();

        musicToggle.textContent = "♪";

    }

});
/*==================================================
                FADE AL HACER SCROLL
==================================================*/

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(
    "section, .photo, .love-card, .timeline-card"
).forEach(element=>{

    element.classList.add("fade-up");

    observer.observe(element);

});
/*==================================================
                CURSOR
==================================================*/

document.addEventListener("mousemove",(e)=>{

    cursorGlow.style.left=e.clientX-10+"px";

    cursorGlow.style.top=e.clientY-10+"px";

});
/*==================================================
                PARTÍCULAS
==================================================*/

function createParticle(){

    const particle=document.createElement("div");

    particle.className="particle";

    particle.style.left=Math.random()*100+"vw";

    const size=Math.random()*8+3;

    particle.style.width=size+"px";

    particle.style.height=size+"px";

    particle.style.animationDuration=(Math.random()*8+6)+"s";

    particles.appendChild(particle);

    setTimeout(()=>{

        particle.remove();

    },15000);

}

setInterval(createParticle,250);
/*==================================================
                CORAZONES
==================================================*/

const heartList=[

    "❤",
    "💖",
    "💕",
    "💗"

];

function createHeart(){

    const heart=document.createElement("div");

    heart.className="heart";

    heart.innerHTML=heartList[
        Math.floor(Math.random()*heartList.length)
    ];

    heart.style.left=Math.random()*100+"vw";

    heart.style.fontSize=(18+Math.random()*20)+"px";

    heart.style.animationDuration=(5+Math.random()*5)+"s";

    hearts.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },10000);

}

setInterval(createHeart,900);
/*==================================================
                PÉTALOS
==================================================*/

function createPetal(){

    const petal=document.createElement("div");

    petal.className="petal";

    petal.style.left=Math.random()*100+"vw";

    petal.style.animationDuration=(8+Math.random()*8)+"s";

    petals.appendChild(petal);

    setTimeout(()=>{

        petal.remove();

    },17000);

}

setInterval(createPetal,700);
/*==================================================
                CONFETI
==================================================*/

const confettiColors=[

    "#ff6fae",
    "#ffb6d9",
    "#ffffff",
    "#ffd166",
    "#c084fc"

];

function launchConfetti(){

    for(let i=0;i<120;i++){

        const piece=document.createElement("div");

        piece.className="confetti";

        piece.style.left=Math.random()*100+"vw";

        piece.style.background=
            confettiColors[
                Math.floor(Math.random()*confettiColors.length)
            ];

        piece.style.animationDuration=
            (4+Math.random()*4)+"s";

        piece.style.transform=
            "rotate("+Math.random()*360+"deg)";

        confetti.appendChild(piece);

        setTimeout(()=>{

            piece.remove();

        },9000);

    }

}