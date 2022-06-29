// Création des miniatures
const miniatureHTML = (el) => {
  const i = Math.floor(Math.random() * 8 + 1);

  return `<div class="outer">
            <div class="card">
              <img class="bg" src="../static/img/screenshots/test.png">

              <section class="description">
                <p class="title bg-${i}"> ${el.title} </p>
                <div class="details">
                <span>${el.description}</span>
                  <div class="buttons">
                    <button class="psp">En savoir plus</button>
                    ${
                      el.prev
                        ? `<button class="prev"><a href=${el.prev} target="_blank"></a></button>`
                        : ""
                    }
                 </div>
                </div>
              </section>

              <div class="overlay"></div>

            </div>
          </div>`;
};

const miniaturesInfos = {
  projets: [
    {
      title: "Statcraft",
      description:
        "Statcraft est une application web qui fournit des statistiques de consultation sur le site insee.fr",
      prev: "",
    },

    {
      title: "Tout sur ma ville",
      description:
        "Tout sur ma ville est une application web et mobile pour obtenir des informations sur n'importe quelle ville française",
    },

    {
      title: "Sisam",
      description:
        "Sisam est une application pour gérer l'allocation des bureaux",
    },

    {
      title: "Frustration",
      description:
        "Frustration est un média en ligne indépendant dont j'ai assuré la refonte sur Wordpress",
    },

    {
      title: "Classico",
      description:
        "Classico est une application mobile pour lire des classiques de la littérature française libres de droit",
    },

    {
      title: "Truc de dev",
      description:
        "Mon blog personnel où je documente mes apprentissages et mes découvertes récentes dans le milieu du web",
    },
  ],

  maquettes: [
    {
      title: "Reservia",
      description: "Page d'accueil d'un site de réservations",
      prev: "https://thibautizard.github.io/book_reservia/",
    },

    {
      title: "Oh my food",
      description:
        "Une application pour sélectionner un restaurant et comparer divers menus",
    },

    {
      title: "Groupomania",
      description: "Un réseau social d'entreprise pour échanger des memes",
    },

    {
      title: "La Chouette Agence",
    },
  ],
};

document
  .querySelectorAll(".carroussel:nth-child(1) .container")
  .forEach(
    (container) =>
      (container.innerHTML = miniaturesInfos.projets
        .map(miniatureHTML)
        .join("\n"))
  );

document
  .querySelectorAll(".carroussel:nth-child(2) .container")
  .forEach(
    (container) =>
      (container.innerHTML = miniaturesInfos.maquettes
        .map(miniatureHTML)
        .join("\n"))
  );

// ROTATION CONTROL

//  const imgs = document.querySelectorAll(".rotate");
//  const intensity = 10;

//  imgs.forEach((img) => {
//    const overlay = img.querySelector(".overlay");

//    // Survol
//    img.addEventListener("mousemove", (e) => {
//      const rect = img.getBoundingClientRect();

//      const [x, y] = [e.clientX - rect.left, e.clientY - rect.top];

//      const [overlay_x, overlay_y] = [
//        -((x * 50) / rect.width - 25),
//        -((y * 50) / rect.height - 25),
//      ];

//      const [img_rotation_x, img_rotation_y] = [
//        -(y / (rect.height / 2) - 1) * intensity,
//        (x / (rect.width / 2) - 1) * intensity,
//      ];

//      img.style.transform = `rotateX(${img_rotation_x}deg) rotateY(${img_rotation_y}deg)`;
//      overlay.style.transform = `translate3d(${overlay_x}%,${overlay_y}%,0)`;
//      overlay.style.opacity =
//        Math.abs(rect.width / 2 - x) / rect.width +
//        Math.abs(rect.height / 2 - y) / rect.height;
//    });

//    // Sortie du survol
//    img.addEventListener("mouseout", (_) => {
//      img.style.transform = "none";
//      overlay.style.opacity = "0";
//    });
//  });

const cards = Array.from(document.querySelectorAll(".card"));

const rotationIntensity = getComputedStyle(
  document.documentElement
).getPropertyValue("--rotation-intensity");

const overlayFactor = getComputedStyle(
  document.documentElement
).getPropertyValue("--overlay-factor");

cards.forEach((card) => {
  card.addEventListener("mousemove", animateCard);
  card.addEventListener("mouseout", restoreCardDimensions);
});

function animateCard(e) {
  let card = e.currentTarget;
  let overlay = card.querySelector(".overlay");
  let image = card.querySelector("img");
  card.style.transitionDuration = "0ms";
  overlay.style.transitionDuration = "0ms";
  image.style.transitionDuration = "0ms";

  let rect = card.getBoundingClientRect();

  const [x, y] = [e.clientX - rect.left, e.clientY - rect.top];

  overlay.style.transform = `translate3d(${-(
    (x * (100 / overlayFactor)) / rect.width -
    50 / overlayFactor
  )}%,
                                          ${-(
                                            (y * (100 / overlayFactor)) /
                                              rect.height -
                                            50 / overlayFactor
                                          )}%,
                                          0)`;

  overlay.style.opacity =
    Math.abs(rect.width / 2 - x) / rect.width +
    Math.abs(rect.height / 2 - y) / rect.height;

  card.style.transform = `rotateX(${
    -(y / (rect.height / 2) - 1) * rotationIntensity
  }deg)
                           rotateY(${
                             (x / (rect.width / 2) - 1) * rotationIntensity
                           }deg)`;

  image.style.transform = `scale(1.1)
                            translateX(${
                              ((rect.width - x) / rect.width - 0.5) * 25
                            }px)
                            translateY(${
                              ((rect.height - y) / rect.height - 0.5) * 25
                            }px)`;
}

function restoreCardDimensions(e) {
  let card = e.currentTarget;
  let overlay = card.querySelector(".overlay");
  let image = card.querySelector("img");

  card.style.transitionDuration = "500ms";
  overlay.style.transitionDuration = "500ms";
  image.style.transitionDuration = "500ms";
  card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  image.style.transform = "scale(1.05)";
  overlay.style.opacity = "0";
}
