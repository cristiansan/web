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
    text: "Texto del Proyecto Actual..."
  },
  previousProjects: {
    title: "Proyectos Anteriores:",
    text: "Texto de Proyectos Anteriores..."
  }
};

// Función para cambiar el texto de las secciones
function changeProjectText(sectionId, newText) {
  const sectionText = document.getElementById(sectionId + 'Text');
  sectionText.textContent = newText.text;
}

// Cambiar el texto al cargar la página
window.onload = function() {
  changeProjectText('currentProject', projectTexts.currentProject);
  changeProjectText('previousProjects', projectTexts.previousProjects);
};

