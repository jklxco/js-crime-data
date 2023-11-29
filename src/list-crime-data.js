const crimeContainer = document.querySelector('#crime-data-container');



function createCrimeTable(crimesArray){

    console.log(crimesArray)
    const tableBody = document.querySelector('#crime-table-body');
    tableBody.replaceChildren()
    
    

    for (let i = 0; i < 20/*crimesArray.length*/; i++) {
        const tableRow = document.createElement('tr');
        tableRow.classList.add('crime-row')
        let crimeObj = {
            category: crimesArray[i].category,
            location: crimesArray[i].location.street.name,
            outcome: crimesArray[i].outcome_status,
        };

        for (const property in crimeObj) {
            const tableCell = document.createElement('td');
            (crimeObj[property] === null) ?
                tableCell.textContent = 'Ongoing' :
                tableCell.textContent = crimeObj[property];
            tableCell.classList.add('crime-cell')
            tableRow.appendChild(tableCell);
        }
        
        tableBody.appendChild(tableRow);
    }
}

function addTableHeaders(table){

    const thead = document.createElement('thead');
    const tRow = document.createElement('tr');
    let td = document.createElement('td');
    td.innerText = 'Category'
    tRow.appendChild(td)
    td = document.createElement('td');
    td.innerText = 'Location'
    tRow.appendChild(td)
    td = document.createElement('td');
    td.innerText = 'Outcome'
    tRow.appendChild(td)
    thead.appendChild(tRow);
    table.appendChild(thead)

}

export default createCrimeTable