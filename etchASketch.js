// Declaring consts
const body = document.getElementById("main-body");
const resetButton = document.getElementById("resetButton");
const allBoxes = document.getElementsByClassName("gridArea");
const resizeButton = document.getElementById("resizeButton");
const wholeBody = document.getElementsByTagName("BODY")[0];

// Call default box
createBox(16);

// Event listeners for buttons and resizing 
resizeButton.addEventListener('mousedown', resizeGrid)
resetButton.addEventListener('mousedown', () => {
    for(let j = 0; j < allBoxes.length; j++)
    {
        allBoxes[j].style.backgroundColor = 'white';
    }
})
window.addEventListener("resize", debounce(resizeContent, 300));

// Debounce for resizing
function debounce (func, time) {
    var time = time || 100; // 100 by default if no param
    var timer;
    return function(event) {
        if(timer) clearTimeout(timer);
        timer = setTimeout(func, time, event);
    };
}

// Activates once re-size event occurs
function resizeContent() {
    body.textContent = '';
    body.style.height = `${window.innerHeight * 0.60}px`;
    console.log(body.style.height);
    body.style.width = `${body.style.height}`;
    createBox(16);
}

//Dynamically create grid, default and based on user input
function createBox(size) {
    for (let i = 1; i < size*size + 1; i++) {
        let temp = document.createElement("div");
        temp.setAttribute("id", `div${i}`);
        temp.classList.add("gridArea");
        temp.style.height = `calc(${body.offsetHeight - 3}px / ${size})`
        temp.style.width = `calc(${body.offsetWidth - 3}px / ${size})`
        temp.addEventListener('mouseover', () => {temp.style.backgroundColor = random_rgba();});
        body.appendChild(temp);
    }
    return;
}

// Re-sizer for the grid
function resizeGrid() {
    let userAmount = prompt("How many squares? - ");
    if (isNaN(parseInt(userAmount)))
    {
        return;
    }
    if (userAmount > 100)
    {
        alert("Max number 100, try again");
        resizeGrid();
    }
    // Clear the main-body div and call new grid
    body.textContent = ''; 
    createBox(parseInt(userAmount))
    return;
}

// Get random RGB colour
function random_rgba() {
    let o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}