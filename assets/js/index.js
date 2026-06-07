// Arrangementer

const baseUrl = "https://eksamen.twotone.dk/wp-json/wp/v2/posts";

const container = document.querySelector(".nyheder-grid");

// Hent alle arrangementer som standard
getArrangementer(44);

// Hent data 

async function getArrangementer(categoryId) {

    try {

        container.innerHTML = "<p>Indlæser arrangementer...</p>";

        const response = await fetch(
            `${baseUrl}?categories=${categoryId}&acf_format=standard&per_page=3`
        );

        const posts = await response.json();

        console.log(posts);

        renderArrangementer(posts);

    } catch (error) {

        console.log(error);

        container.innerHTML =
            "<p>Kunne ikke hente arrangementer.</p>";

    }

}

// Ikoner

function getIcon(post) {

    if (post.categories.includes(45)) {
        return "fa-music";
    }

    if (post.categories.includes(46)) {
        return "fa-palette";
    }

    if (post.categories.includes(47)) {
        return "fa-fish";
    }

    if (post.categories.includes(48)) {
        return "fa-calendar";
    }

    return "fa-star";

}

// Katergorinavne

function getCategoryName(post) {

    if (post.categories.includes(45)) {
        return "Koncert";
    }

    if (post.categories.includes(46)) {
        return "Workshop";
    }

    if (post.categories.includes(47)) {
        return "Mad";
    }

    if (post.categories.includes(48)) {
        return "Årets tider";
    }

    return "Arrangement";

}

// Billeder

function getImage(post) {

    if (post.acf?.billede_af_arrangement?.sizes?.medium) {
        return post.acf.billede_af_arrangement.sizes.medium;
    }

    if (post.acf?.billede_af_arrangement?.url) {
        return post.acf.billede_af_arrangement.url;
    }

    return "./assets/img/placeholder.jpg";

}

// Vis cards

function renderArrangementer(posts) {

    container.innerHTML = "";

    if (posts.length === 0) {

        container.innerHTML =
            "<p>Ingen arrangementer fundet.</p>";

        return;

    }

    posts.forEach(post => {

        const icon = getIcon(post);

        const categoryName = getCategoryName(post);

        const image = getImage(post);

        container.innerHTML += `

        <article class="event-card">

            <div class="event-icon">
                <i class="fa-solid ${icon}"></i>
            </div>

            <img
                class="event-image"
                src="${image}"
                alt="${post.acf?.titel || post.title.rendered}"
            >

            <div class="event-content">

                <p class="event-category">
                    ${categoryName}
                </p>

                <h3>
                    ${post.acf?.titel || post.title.rendered}
                </h3>

                <p class="event-text">
                    ${post.acf?.beskrivelse_af_arrangement ||
            post.acf?.tekst_om_arrangement ||
            ""}
                </p>

                <div class="event-info">

                    <p>
                        <i class="fa-solid fa-calendar"></i>
                        ${post.acf?.dato_for_arrangement ||
            "Dato kommer"}
                    </p>

                    <p>
                        <i class="fa-solid fa-ticket"></i>
                        ${post.acf?.pris_ ||
            "Gratis entré"}
                    </p>

                    <p>
                        <i class="fa-solid fa-clock"></i>
                        ${post.acf?.klokkeslaet_for_arrangement ||
            "Varierende"}
                    </p>

                </div>

                <div class="event-buttons">

                    <a href="#" class="book-bord">
                        Køb billet
                    </a>

                    <a href="arrangement.html?id=${post.id}"
                       class="book-bord1">
                        Læs mere
                    </a>

                </div>

            </div>

        </article>

    `;

    });

}