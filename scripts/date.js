const currentYear = document.getElementById('currentyear');
const lastModified = document.getElementById('lastModified');

const today = new Date();

currentYear.textContent = today.getFullYear();
lastModified.textContent = `Last modified ${document.lastModified} by Andrew Burnah`;