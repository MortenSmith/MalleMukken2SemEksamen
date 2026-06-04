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