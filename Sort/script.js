let array = new Array(20);

for (let i = 0; i < array.length; i++) {
    array[i] = parseInt(40 * Math.random());
}

let maxNumber = array.reduce((acc, cur) => {
    return cur > acc ? cur : acc;
}, 0);

let grid = document.getElementById('grid');

let bar = document.createElement('div');
bar.classList.add('bar');

array.forEach((item) => {
    let newBar = bar.cloneNode();
    newBar.style.height = `${parseInt((item * 100) / maxNumber)}%`;
    grid.appendChild(newBar);
});

let viewArray = document.getElementsByClassName('bar');

const delay = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

async function sort() {
    for (let i = 0; i < viewArray.length; i++) {
        let iElement = viewArray.item(i);
        iElement.classList.add('bar-active');
        console.log(iElement.offsetHeight);
        for (let j = i + 1; j < viewArray.length; j++) {
            let jElement = viewArray.item(j);
            jElement.classList.add('bar-active');
            await delay(1000);
            if (iElement.offsetHeight > jElement.offsetHeight) {
                let temp = iElement;
                grid.insertBefore(iElement, viewArray.item(j + 1));
                grid.insertBefore(jElement, viewArray.item(i));
                iElement = jElement;
                jElement = temp;
                await delay(1000);
            }
            jElement.classList.remove('bar-active');
        }
        iElement.classList.remove('bar-active');
    }
}
