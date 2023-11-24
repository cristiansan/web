// Función para cambiar el tema
const darkBtn = document.getElementById('darkBtn');
const lightBtn = document.getElementById('lightBtn');
const body = document.body;

darkBtn.addEventListener('click', () => {
  body.classList.add('dark-theme');
  body.classList.remove('light-theme');
});

lightBtn.addEventListener('click', () => {
  body.classList.add('light-theme');
  body.classList.remove('dark-theme');
});

// Array de textos para los proyectos
const projectTexts = {
  currentProject: {
    title: "Proyecto Actual:",
    text: "- Validación de identidad de las personas usando un ORBs ganando tokens WLD"
  },
  previousProjects: {
    title: "Proyectos Anteriores:",
    text: "- Stake Farming de distintos tokens<br>" +
          "- Minería de criptomonedas (eth, rvn, etc) usando rigs<br>" +
          "- Armado de rigs con placas de video<br>" +
          "- Housing de rigs (de clientes) en nuestras instalaciones"
  }
};

// Función para cambiar el texto de las secciones
function changeProjectText(sectionId, newText) {
  const sectionText = document.getElementById(sectionId);
  sectionText.innerHTML = `<h2>${newText.title}</h2><div class="project-text">${newText.text}</div>`;
}

// Cambiar el texto al cargar la página
window.onload = function() {
  changeProjectText('currentProject', projectTexts.currentProject);
  changeProjectText('previousProjects', projectTexts.previousProjects);
};
