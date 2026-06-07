// Navbar
function myFunction() {
    if (window.innerWidth < 768) {
        const links = document.getElementById("myLinks");
        links.classList.toggle("open");
    }
}

// Active class underline 
document.querySelectorAll('#myLinks a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('#myLinks a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        sessionStorage.setItem('activeLink', this.getAttribute('href'));
    });
});

// Gendan active class når siden loader
const activeLink = sessionStorage.getItem('activeLink');
if (activeLink) {
    const link = document.querySelector(`#myLinks a[href="${activeLink}"]`);
    if (link) link.classList.add('active');
}

// Accordions 
let acc = document.querySelectorAll(".accordion");

for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        
        // Luk alle andre
        acc.forEach(function(otherAcc) {
            if (otherAcc !== this) {
                otherAcc.classList.remove("active1");
                otherAcc.nextElementSibling.style.display = "none";
            }
        }.bind(this));

        // Toggle den klikkede
        this.classList.toggle("active1");
        let panel = this.nextElementSibling;
        panel.style.display = panel.style.display === "block" ? "none" : "block";
    });
}

document.addEventListener("click", function(e) {
    if (!e.target.closest(".accordion-item")) {
        acc.forEach(function(otherAcc) {
            otherAcc.classList.remove("active1");
            otherAcc.nextElementSibling.style.display = "none";
        });
    }
});

// slideshow
let slideIndex = 0;
const slides = document.querySelectorAll(".myslides");
const progressBar = document.getElementById("progressBar");

function showSlide(n) {
    slides.forEach(s => s.classList.remove("active"));
    slideIndex = (n + slides.length) % slides.length;
    slides[slideIndex].classList.add("active");
    progressBar.style.width = ((slideIndex + 1) / slides.length * 100) + "%";
}

function changeSlide(n) {
    showSlide(slideIndex + n);
}

if (window.innerWidth < 768) {
    showSlide(0);
    setInterval(() => changeSlide(1), 10000);
} else {
    slides.forEach(s => s.classList.add("active"));
}

// Start på første slide
// showSlide(0);

// Auto-skift hvert 4. sekund
// setInterval(() => changeSlide(1), 10000);


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

if (window.innerWidth < 768) {
    showOplevelseSlide(0);
    setInterval(() => showOplevelseSlide(oplevelseIndex + 1), 5000);
} else {
    oplevelseCards.forEach(c => c.classList.add("active"));
}

// Auto-skift hvert 5. sekund
setInterval(() => showOplevelseSlide(oplevelseIndex + 1), 8000);

// Start
showOplevelseSlide(0);


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
