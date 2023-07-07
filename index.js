const fs = require('fs');

function getRandomMark(nomFichier, minNote, maxNote) {
  fs.readFile(nomFichier, 'utf8', (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture du fichier :", err);
      return;
    }

    const lignes = data.trim().split('\n');

    const notes = [];

    for (let i = 1; i < lignes.length; i++) {
      const colonnes = lignes[i].split(';');
      const noteAleatoire = Math.floor(Math.random() * (maxNote - minNote + 1)) + minNote;
      colonnes[3] = noteAleatoire.toString();
      notes.push(noteAleatoire);
      lignes[i] = colonnes.join(';');
    }

    const sommeNotes = notes.reduce((acc, note) => acc + note, 0);
    const moyenneNotes = sommeNotes / notes.length;

    lignes.push(`;Moyenne;;;${moyenneNotes.toFixed(2)}`);

    const contenuMaj = lignes.join('\n');
    fs.writeFile(nomFichier, contenuMaj, 'utf8', (err) => {
      if (err) {
        console.error("Erreur lors de l'écriture dans le fichier :", err);
        return;
      }
      console.log("Les notes ont été ajoutées avec succès.");
    });
  });
}

module.exports = getRandomMark;

//TEST
const fichierCSV = 'student.csv';
const noteMin = 0;
const noteMax = 20;
getRandomMark(fichierCSV, noteMin, noteMax);