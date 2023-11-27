const btn = document.createElement('button');
const container = document.querySelector('body');
btn.textContent = 'Press Me!'
container.appendChild(btn);

btn.addEventListener( 'click', (e) => {
    e.target.style.background = 'blue';
});

