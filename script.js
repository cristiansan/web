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
