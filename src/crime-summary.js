function createCrimeSummary(crimesArray){

    let relationTable = {
        'anti-social-behaviour' : 'Anti-social Behavior',
        'bicycle-theft' : 'Bicycle Theft',
        'burglary' : 'Burglary',
        'criminal-damage-arson': 'Criminal Damage & Arson',
        'other-theft': 'Other Theft',
        'drugs' : 'Drugs',
        'public-order': 'Public Order Offence',
        'possession-of-weapons': 'Possession of Weapon',
        'shoplifting' : 'Shoplifting',
        'robbery' : 'Robbery',
        'vehicle-crime' : 'Vehicular Crime',
        'theft-from-the-person': 'Personal Theft',
        'other-crime' : 'Other Crime',
        'violent-crime' : 'Violent Crime',
    }

    let counts = {};
    crimesArray.forEach(el => counts[el.category] = 1  + (counts[el.category] || 0))
    const tableBody = document.querySelector('#crime-table-body');
    tableBody.replaceChildren()
    for (const property in counts) { 
        const tableRow = document.createElement('tr');
        tableRow.classList.add('crime-row')
        const tableCell = document.createElement('td');
        tableCell.textContent = relationTable[property]
        tableRow.appendChild(tableCell);
        const tableCell2 = document.createElement('td');
        tableCell2.textContent = counts[property]
        tableRow.appendChild(tableCell2);
        tableBody.appendChild(tableRow);
    };
};

export default createCrimeSummary