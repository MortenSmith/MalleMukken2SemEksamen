// Navbar

function myFunction() {
    const links = document.getElementById("myLinks");
    links.classList.toggle("open");
}


// Tilbud

const baseUrl = "https://eksamen.twotone.dk/wp-json/wp/v2/posts";

const tilbudContainer = document.querySelector(".tilbud-grid");

getTilbud(49);


// Hent tilbud

async function getTilbud(categoryId) {

    try {

        tilbudContainer.innerHTML = "<p>Indlæser tilbud...</p>";

        const response = await fetch(
            `${baseUrl}?categories=${categoryId}&acf_format=standard&per_page=100`
        );

        const posts = await response.json();

        console.log(posts);

        renderTilbud(posts);

    } catch (error) {

        console.log("Fejl ved hentning af tilbud:", error);

        tilbudContainer.innerHTML =
            "<p>Kunne ikke hente tilbud.</p>";

    }

}


// Billede

function getTilbudImage(post) {

    if (post.acf?.tilbud_billede?.sizes?.medium) {
        return post.acf.tilbud_billede.sizes.medium;
    }

    if (post.acf?.tilbud_billede?.url) {
        return post.acf.tilbud_billede.url;
    }

    return "";

}


// Vis tilbud

function renderTilbud(posts) {

    tilbudContainer.innerHTML = "";

    if (posts.length === 0) {

        tilbudContainer.innerHTML =
            "<p>Ingen tilbud fundet.</p>";

        return;

    }

    posts.forEach(post => {

        const image = getTilbudImage(post);

        tilbudContainer.innerHTML += `

            <article class="tilbud-card">

                <img
                    class="tilbud-img"
                    src="${image}"
                    alt="${post.acf?.tilbud_overskrift || post.title.rendered}"
                >

                <div class="tilbud-content">

                    <h3>
                        ${post.acf?.tilbud_overskrift || post.title.rendered}
                    </h3>

                    <p class="tilbud-pris">
                        ${post.acf?.["ret_+_pris"] || ""}
                    </p>

                    <p class="tilbud-pris">
                        ${post.acf?.["ret_+_pris_ex"] || ""}
                    </p>

                    <p class="tilbud-text">
                        ${post.acf?.tilbud_beskrivelse || ""}
                    </p>

                    <a href="#" class="book-bord">
                        Bestil tilbud
                    </a>

                </div>

            </article>

        `;

    });

}

// Animation loader

window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").classList.add("hide");
    }, 700);
});