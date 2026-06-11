const baseUrl = "https://eksamen.twotone.dk/wp-json/wp/v2/posts";

const container = document.querySelector(".menu-container");
const filterButtons = document.querySelectorAll(".filter-btn");
const time = document.querySelector(".menuTid");

const subButtons = document.querySelectorAll(".sub-btn");
const drikkelseKategori = document.querySelector(".drikkelseKategori");

const tider = {
    9: "Frokost menu fra 11:30-15:00",
    10: "Aften menu fra 17:30-20:00",
    11: "Børnemenu hele dagen",
    12: "Drikkevarer hele dagen",
    13: "Dessert hele dagen"
};

// Fanger vores feltgruppe id for ret
getRet(10);

// de øverste tabs, frokost, aften, børn osv. når du klikker på dem skal knappen passe med (id) indholdet. id er fastlagt i html, så den passer med det korrekte indhold. 
filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        //kilde: dataset.category. -->
        const categoryId = button.dataset.category;

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        // Der er flere kategorier ved drikkelse, så under tabs som øl, vin og drinks skal passe med hoved id(drikkevarer === 12), så den skal kun komme frem når man klikker på drikkevarer. 
        if (categoryId === "12") {
            drikkelseKategori.classList.remove("hidden");
        } else {
            drikkelseKategori.classList.add("hidden");
        }

        getRet(categoryId);
        //den "const time" skal skrives frem med den id som passer. 
        time.textContent = tider[categoryId];
    });
});


// 
subButtons.forEach(button => {
    button.addEventListener("click", () => {

        const categoryId = button.dataset.category;

        subButtons.forEach(btn => btn.classList.remove("hidden"));
        button.classList.add("hidden");

        getRet(categoryId);
    });
});


// henter alle vores "retter", med async function, med 
async function getRet(categoryId) {

    //try --> skal udføres ellers catch, 
    try {
        container.innerHTML = "<p>Indlæser retter...</p>";

        //venter på svar fra server
        const res = await fetch(`${baseUrl}?categories=${categoryId}&acf_format=standard&per_page=100`);

        // omdanner json formattet
        const posts = await res.json();
        renderRetter(posts, categoryId);

        // Hvis der sker en fejl ved indlæsning, så skal der komme en fejlmeldning. 
    } catch (err) {
        console.log("Kunne ikke hente retter.", err)
    }
}


// Definere underkategorier til hovedkategorier, så underkategorierne skal passe med hovedkategorien (=== lig med 9 under 14, 15, 16 osv.)
function getUnderkategorier(categoryId) {


    let underkategorier = {};

    if (Number(categoryId) === 9) {
        underkategorier = {
            14: "Populære retter",
            15: "Fiskemadder",
            16: "Burger m. pommes frites",
            17: "Fiskeretter",
            18: "Sandwich m. grønt",
            19: "Salat",
            20: "Nachos",
            21: "Ekstra"
        };
    }

    if (Number(categoryId) === 10) {
        underkategorier = {
            22: "Forretter",
            23: "Burger m. pommes frites",
            24: "Hovedretter"
        };
    }

    if (Number(categoryId) === 11) {
        underkategorier = {
            11: "Børnemenu"
        };
    }

    if (Number(categoryId) === 12) {
        underkategorier = {
            32: "Cocktails",
            31: "Iste",
            29: "Saft",
            26: "Sodavand",
            30: "Vand",
            39: "Varme drikke"
        };
    }

    if (Number(categoryId) === 13) {
        underkategorier = {
            13: "Dessert"
        };
    }

    if (Number(categoryId) === 27) {
        underkategorier = {
            27: "Øl",
            28: "Alkoholfrie øl"

        }
    };


    if (Number(categoryId) === 33) {
        underkategorier = {
            34: "Hvidvin",
            35: "Rødvin",
            36: "Rosévin",
            37: "Dessertvin",
            38: "Mousserende vine"
        }
    }



    if (Number(categoryId) === 40) {
        underkategorier = {
            41: "Råstoff favoritter",
            42: "Klassikere",
            43: "Original tender"

        }
    };


    return underkategorier;
};


// 

function renderRetter(posts, categoryId) {

    container.innerHTML = "";

    const kategorier = getUnderkategorier(categoryId);


    // kilde:https://www.w3schools.com/JSREF/jsref_object_entries.asp ,object entries bruges til at lave det til et array, så vi kan tage hver enkelte kategori og lave vores opstilling af, hvilke retter som skal være i sin egen sektion (f.eks. populære retter, skal have sine samlet id under sig.)

    Object.entries(kategorier).forEach(([id, navn]) => {

        // sectionen for retterene bliver lavet med createElement og dens overskrift for de forskellige sektioner
        const section = document.createElement("section");
        section.classList.add("menu-section");

        const title = document.createElement("h2");
        title.classList.add("menu-gruppe");
        title.textContent = navn;

        section.appendChild(title);

        //kilde: 
        const retter = posts.filter(post =>
            post.categories?.includes(Number(id))
        );

        retter.forEach(post => {
            section.appendChild(createCardElement(post));
        });

        container.appendChild(section);
    });
}

// skaber vores feltgruppe fra wordpress "ret", 
function createCardElement(post) {

    const card = document.createElement("section");
    card.classList.add("menu-card");

    card.innerHTML = `
    <article class="menu-content">
    <h3>${post.acf.titel} </h3>
    <p class="ret-text">${post.acf.beskrivelse}</p>
    <p>${post.acf.pris}</p>
    <p>${post.acf.pris_Kopier}</p>
    <p>${post.acf.pris_3}</p>
    </article>
    `;
    return card;
}

