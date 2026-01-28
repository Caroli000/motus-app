const words = [
  "POMME","ARBRE","CHAIR","LIVRE","FLEUR","TIGRE","ROUGE","TABLE",
  "PLAGE","NEIGE","JOUER","BRUIT","PETIT","CHANT","FORCE","GRACE",
  "NUAGE","ECRAN","ROUTE","SABLE"
];

const gridContainer = document.getElementById('grid-container');

const createGrid = () => {

    gridContainer.innerHTML = '';

    for (let i = 0; i < 6 * 5; i++) {

        const cell = document.createElement('div');

        cell.classList.add('cell');

        gridContainer.appendChild(cell);

    }

};

createGrid()

