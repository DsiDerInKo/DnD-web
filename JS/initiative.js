document.addEventListener('submit', function (e) {
    e.preventDefault();


    const saveFormData = () => {
        const formData = {
            participants: e.target.elements.participants.value,
            diceType: e.target.elements.initiativeDice.value,
            includeHealth: e.target.elements.includeHealth.value,
        };
        localStorage.setItem('initiativeFormData', JSON.stringify(formData));
        return formData
    };

    const saveTable = () => {
        localStorage.setItem('initiativeTable', tableContainer.innerHTML);
    };

    const formData = saveFormData();
    const participants = parseInt(formData.participants, 10);
    const diceType = formData.diceType;
    const includeHealth = formData.includeHealth;

    let tableContainer;
    tableContainer.innerHTML = '';

    const table = document.createElement('table');
    table.classList.add('table_section');

    const headerRow = document.createElement('tr');
    //headerRow.innerHTML = `
    //<th style="width: 40%;">Имя участника</th>
    //<th style="width: 30%;">Инициатива (${diceType})</th>
    //  ${includeHealth ? '<th style="width: 30%;">Здоровье</th>' : ''}
    //`;
    const namePart = document.createElement('th');
    namePart.textContent= 'Имя участника';
    namePart.style.width="40%"
    const dice = document.createElement('th');
    dice.textContent= 'Инициатива';
    dice.style.width="30%"
    const health = document.createElement('th');
    health.textContent= includeHealth ? 'Здоровье' : '';
    health.style.width="30%"
    headerRow.appendChild(namePart);
    headerRow.appendChild(dice);
    headerRow.appendChild(health);
    console.log(headerRow);
    table.appendChild(headerRow);



    const rollDice = (type) => Math.floor(Math.random() * type) + 1;
    for (let i = 1; i <= participants; i++) {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = `Участник ${i}`;
        row.appendChild(nameCell);

        const initiativeCell = document.createElement('td');
        const diceMax = parseInt(diceType.slice(1));
        initiativeCell.textContent = rollDice(diceMax);
        row.appendChild(initiativeCell);

        if (includeHealth) {
            const healthCell = document.createElement('td');
            healthCell.textContent = `${rollDice(20) * 5} HP`;
            row.appendChild(healthCell);
        }

        table.appendChild(row);
    }

    tableContainer.appendChild(table);

    saveFormData();
    saveTable();

});

window.addEventListener('load', function () {

    const loadFormData = () => {
        const savedData = JSON.parse(localStorage.getItem('initiativeFormData'));
        if (savedData) {
            document.getElementById('participants').value = savedData.participants || '';
            document.getElementById('initiativeDice').value = savedData.diceType || 'd20';
            document.getElementById('includeHealth').checked = savedData.includeHealth || false;
        }
    };
    const loadTable = () => {
        const savedTable = localStorage.getItem('initiativeTable');
        if (savedTable) {
            document.getElementById('tableContainer').innerHTML = savedTable;
        }
    };

    loadFormData();
    loadTable();
});