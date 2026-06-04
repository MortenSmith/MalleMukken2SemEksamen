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