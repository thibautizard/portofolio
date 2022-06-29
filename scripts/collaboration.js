const inputs = document.querySelectorAll("[data-input='collaboration']");

let id;
const labels = {
  "Je veux faire ou améliorer un site web": [
    "Je veux créer un site pour un événement (anniversaire, mariage, festival, spectacle etc.)",
    "J'ai besoin d'un site web pour mon activité professionnelle ou associative",
  ],

  "J'ai besoin de recruter un développeur pour travailler en équipe": [
    "Site ou application web",
    "Application mobile",
  ],

  "Site ou application web": ["Frontend, UI/UX Design", "Backend"],

  "Application mobile": ["Frontend, UI/UX Design", "Backend"],

  "Frontend, UI/UX Design": ["CDI", "Freelance"],
  Backend: ["CDI", "Freelance"],
};

const rythme = 700;

inputs.forEach((input, index) => {
  input.nextElementSibling.textContent = Object.keys(labels)[index];

  input.addEventListener("click", (e) => {
    const inputChoisi = e.currentTarget;
    clearTimeout(id);
    id = setTimeout(() => {
      inputs.forEach((input, index) => {
        let dir = index == 0 ? "Left" : "Right";
        let animation = `fadeOut${dir}`;
        const [bloc, label] = [input.parentElement, input.nextElementSibling];

        bloc.classList.add(animation);
        let newLabel =
          labels[inputChoisi.nextElementSibling.textContent][index];
        bloc.addEventListener("animationiteration", () => {
          label.textContent = newLabel;
          inputs.forEach((input) => (input.checked = false));
        });

        bloc.addEventListener("animationend", () =>
          bloc.classList.remove(animation)
        );
      });
    }, rythme);
  });
});
