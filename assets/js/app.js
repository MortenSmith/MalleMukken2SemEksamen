// Navbar
function myFunction() { // definerer en funktion med ingen parametre. den kaldes i html direkte fra et onclick. 
    if (window.innerWidth < 768) { // Tjekker om skærmbredden er under 768px. Window.innerWidth returnerer browservinduets aktuelle bredde. 
        const links = document.getElementById("myLinks"); // fanger "mylinks" og gemmer den i variablen
        links.classList.toggle("open"); // Skifter CSS-klassen "open" på elementet. toggle betyder, har elementet ikke klassen "open" tilføj den og har elementet allerede klassen "open" fjern den. 
        // Dette gør at hamburger menu kan åbnes og lukkes.
    }
}

// Navbar shrink scroll 
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Active class underline 
document.querySelectorAll('#myLinks a').forEach(link => { // fanger alle #myLinks a og looper dem igennem.
    link.addEventListener('click', function() { // bruger addEventListener på link og lytter efter et klik. Hver gang der klikkes på et link, så kører koden i funktionen
        document.querySelectorAll('#myLinks a').forEach(l => l.classList.remove('active')); // Når et link klikkes, fjernes klassen "active" fra alle andre links. Her sikre vi at kun ét link kan være aktivt ad gangen.
        this.classList.add('active'); // Tilføjer klassen "active" 
        sessionStorage.setItem('activeLink', this.getAttribute('href')); // Gemmer det aktive links href (fx "#arrangementer") i sessionStorage under nøglen 'activeLink'. sessionStorage husker data så længe browserfanen er åben. 
    });
});
// Fjerner active links, når logoet klikkes
document.querySelector('.mallemukkenlogo').closest('a').addEventListener('click', function() {
    document.querySelectorAll('#myLinks a').forEach(l => l.classList.remove('active'));
    sessionStorage.removeItem('activeLink');
});

// Gendan active class når siden loader
const activeLink = sessionStorage.getItem('activeLink');
if (activeLink) {
    const link = document.querySelector(`#myLinks a[href="${activeLink}"]`);
    if (link) link.classList.add('active');
}

// Accordions 
let acc = document.querySelectorAll(".accordion");

// looper igennem hvert accordion-element og lytter efter et klik på dem alle
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        
        // Luk alle andre
        // Når et accordion klikkes, loopes der igennem alle andre accordions (otherAcc !== this). Dem der ikke blev klikket på får fjernet "active1"-klassen og deres panel skjules med display: none. .bind(this) sikrer at this stadig refererer til det klikkede element inde i forEach-loopet.
        acc.forEach(function(otherAcc) {
            if (otherAcc !== this) {
                otherAcc.classList.remove("active1");
                otherAcc.nextElementSibling.style.display = "none";
            }
        }.bind(this));

        // Toggle den klikkede
        this.classList.toggle("active1"); // Skifter "active1"-klassen på det klikkede accordion — åbner det hvis det er lukket, lukker det hvis det er åbent.

        // Henter det næste HTML-element efter knappen (selve indholdsfeltet/panelet). Tjekker derefter om det allerede vises som "block" — hvis ja sættes det til "none", hvis nej sættes det til "block". Det er her panelet foldes ud eller ind
        let panel = this.nextElementSibling;
        panel.style.display = panel.style.display === "block" ? "none" : "block";
    });
}

// Sætter en klik-lytter på hele dokumentet. element.target.closest(".accordion-item") tjekker om det der blev klikket på er inden i et accordion-item. ! vender det om — så koden inden i køres kun hvis man klikker uden for et accordion.
document.addEventListener("click", function(element) {
    if (!element.target.closest(".accordion-item")) {
        acc.forEach(function(otherAcc) {
            // lukker og fjerner "active1" fra alle accordions, når man klikker et andet sted. 
            otherAcc.classList.remove("active1");
            otherAcc.nextElementSibling.style.display = "none";
        });
    }
});

// slideshow
let slideIndex = 0; // Holder styr på hvilket slide vi er på, starter med 0/det første 
const slides = document.querySelectorAll(".myslides");
const progressBar = document.getElementById("progressBar");

// Definerer funktionen der skifter til et bestemt slide. Første skridt er at fjerne "active"-klassen fra alle slides, så ingen af dem vises
function showSlide(n) {
    slides.forEach(s => s.classList.remove("active"));

    slideIndex = (n + slides.length) % slides.length;
    slides[slideIndex].classList.add("active");
    // Opdaterer progressbar bredde i procent. Fx er vi på slide 2 af 4: (2/4 * 100) = 50%. slideIndex + 1 bruges fordi slideIndex starter på 0.
    progressBar.style.width = ((slideIndex + 1) / slides.length * 100) + "%";
}

// Funktion der kalder showSlide for nuværende slide. derefter changeSlide for næste slide.
function changeSlide(n) {
    showSlide(slideIndex + n);
}

// På mobil (under 768px) vises kun ét slide ad gangen. showSlide(0) starter på det første. setInterval skifter automatisk til næste slide hvert 10. sekund.
if (window.innerWidth < 768) {
    showSlide(0);
    setInterval(() => changeSlide(1), 10000);
} else {
    slides.forEach(s => s.classList.add("active")); // I større skærme vises alle slides på én gang, ingen slideshow på desktop.
}

// slideshow for oplevelsecard
// Oplevelse slideshow
let oplevelseIndex = 0;
const oplevelseCards = document.querySelectorAll(".oplevelse-card");
const dots = document.querySelectorAll(".dot");

function showOplevelseSlide(n) {
    oplevelseCards.forEach(c => c.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active-dot"));
    oplevelseIndex = (n + oplevelseCards.length) % oplevelseCards.length;
    oplevelseCards[oplevelseIndex].classList.add("active");
    dots[oplevelseIndex].classList.add("active-dot");
}

function currentslide(n) {
    showOplevelseSlide(n - 1);
}

// På mobil (under 768px) vises kun ét slide ad gangen. showoplevelseSlide(0) starter på det første. setInterval skifter automatisk til næste slide hvert 5. sekund.
if (window.innerWidth < 768) {
    showOplevelseSlide(0);
    setInterval(() => showOplevelseSlide(oplevelseIndex + 1), 5000);
} else {
    // I større skærme vises alle slides på én gang, ingen slideshow på desktop.
    oplevelseCards.forEach(c => c.classList.add("active"));
}

// Til top knap https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
// Hent id'et
let mytopbutton = document.getElementById("mytopbtn");

// Når brugeren scroller ned med 20px fra toppen, vis knappen
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    const scrolledToButton = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2000;

    if (scrolledToButton) {
        mytopbutton.style.display = "block"
    } else {
        mytopbutton.style.display = "none";
    }
}

// Når brugeren klikker på knappen, gå til toppen
function topFunction() {
    document.body.scrollTop = 0; // til Safari
    document.documentElement.scrollTop = 0; // til Chrome, firefox og Opera
}
