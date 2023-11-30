function createCrimeSummary(crimesArray){

    let counts = {};
    crimesArray.forEach(el => counts[el.category] = 1  + (counts[el.category] || 0))
    const tableBody = document.querySelector('#crime-table-body');
    tableBody.replaceChildren()
    for (const property in counts) { 
        const tableRow = document.createElement('tr');
        tableRow.classList.add('crime-row')
        const tableCell = document.createElement('td');
        tableCell.textContent = property
        tableRow.appendChild(tableCell);
        const tableCell2 = document.createElement('td');
        tableCell2.textContent = counts[property]
        tableRow.appendChild(tableCell2);
        tableBody.appendChild(tableRow);
    };
};

export default createCrimeSummary