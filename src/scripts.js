import { initMap } from "./map.js";



function showTableBtn(){
    const button = document.querySelector('#show-table-btn');
    button.addEventListener('click',  () => toggleTableBtn(button))

}

function toggleTableBtn(button){
    const table = document.querySelector('#crime-table');
    if(table.classList.contains('hidden')){
        button.innerText = 'Hide Summary'
        table.classList.remove('hidden')
    } else {
        button.innerText = 'Show Summary'
        table.classList.add('hidden')
    }
}

showTableBtn();

window.initMap = initMap();


