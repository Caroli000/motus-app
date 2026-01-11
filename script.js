
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