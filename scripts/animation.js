let isOk = true;

// Création des miniatures
const miniatureHTML = (el) => `<div class="miniature">${el.title}</div>`;

const miniaturesInfos = {
  projets: [
    {
      title: "Statcraft",
    },

    {
      title: "Tout sur ma ville",
    },

    {
      title: "Classico",
    },

    {
      title: "Truc de dev",
    },
  ],

  maquettes: [
    {
      title: "Reservia",
    },

    {
      title: "Oh my food",
    },

    {
      title: "Groupomania",
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
