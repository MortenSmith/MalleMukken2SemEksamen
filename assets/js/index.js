// Arrangementer

const baseUrl = "https://eksamen.twotone.dk/wp-json/wp/v2/posts"; // Erklær en variable, henter API-key og gemmer den i variablen

const container = document.querySelector(".nyheder-grid"); // Fanger nyheder-grid med querySelector og gemmer den i variablen

// Hent alle arrangementer som standard
getArrangementer(44);

// Hent data 

async function getArrangementer(categoryId) { // Definerer en async funktion ved navn getArrangementer. Den tager parameteren categoryId (den henter id der fortæller hvilken kategori vi vil).
    // async betyder at funktionen kan bruge await indeni 

    try {

        container.innerHTML = "<p>Indlæser arrangementer...</p>"; // Vises en loading besked, til brugeren, mens vi venter på data fra serveren

        const response = await fetch( // Sender en HTTP-forespørgsel til URL, await betyder at JS venter på svaret før den går videre.
            `${baseUrl}?categories=${categoryId}&acf_format=standard&per_page=3` // URL er bygget op af ?categories=${categoryId} = filtrerer på den kategori vi vil have, &ach_format=standard = beder API'et om at retunere ACF-felter i et læsbar format, &per_page=3 = henter kun 3 indlæg af gangen.
        );

        const posts = await response.json(); // Konverterer data fra rå JSON-tekst til et JavaScript-objekt, som vi kan arbejde med. await bruges fordi det også er en asynkron operation

        console.log(posts);

        renderArrangementer(posts);

    } catch (error) { // Udskriver en fejlbesked til konsollen hvis noget går galt.

        console.log(error);

        container.innerHTML =
            "<p>Kunne ikke hente arrangementer.</p>";

    }

}

// Ikoner
// Her tjekker den om post.categories (et array af kategori-ID'er) indeholder tallet 45. hvis ja returneres stregen "fa-music" (ikon) 
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
// Her tjekker den om post.categories (et array af kategori-ID'er) indeholder tallet 45. hvis ja returneres ordet "koncert"
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
    // Tjekker om billedet findes i ACF 
    if (post.acf?.billede_af_arrangement?.sizes?.medium) {
        return post.acf.billede_af_arrangement.sizes.medium;
    }
    // Hvis medium-størrelsen ikke fandtes, prøver den i stedet at hente billedets fulde URL direkte. Det er altså en fallback til et større/originalt billede.
    if (post.acf?.billede_af_arrangement?.url) {
        return post.acf.billede_af_arrangement.url;
    }

    return "./assets/img/placeholder.jpg";

}

// Vis cards

function renderArrangementer(posts) {

    container.innerHTML = ""; // "" tømmer containeren først
    // Tjekker om arrayet er tomt. Hvis der ingen arrangementer er, vises en besked og funktionen stopper med return — resten af koden køres ikke.
    if (posts.length === 0) {

        container.innerHTML =
            "<p>Ingen arrangementer fundet.</p>";

        return;

    }
    // Looper igennem hvert arrangement i arrayet.
    posts.forEach(post => {

        const icon = getIcon(post);

        const categoryName = getCategoryName(post);

        const image = getImage(post);

        // += tilføjer en ny artikel-blok til containeren for hvert arrangement (i stedet for at overskrive). Alt inden i er et template literal (backtick-streng) der blander HTML og JavaScript-værdier med ${}
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