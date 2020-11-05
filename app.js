// Declaration of global variables.
let numberOfBoxes = 16;
let colorString = "#000000";

(function() {
    // Declare variables for HTML elements.
    const boxContainerEl = document.querySelector('.box-container');
    const boxNumberEl = document.querySelector('.box-number');
    const colorCodeEl = document.querySelector('.color-code');
    
    // Function to create boxes based on the global numberOfBoxes variable.
    const createColorBoxes = () => {
        boxContainerEl.style.gridTemplateColumns = `repeat(${Math.ceil(Math.sqrt(numberOfBoxes))}, 1fr)`;
        for(count = 0; count  < numberOfBoxes; count++){
            const colorBoxEl = document.createElement('div');
            colorBoxEl.classList.add('color-box', `box-${count+1}`);
            boxContainerEl.append(colorBoxEl);
        }
    }

    // Runs the function to generate new boxes.
    createColorBoxes();

    // Event listener on generate new boxes button.
    document.querySelector('.new-boxes').addEventListener('click', (e) => {
        if(numberOfBoxes > 10000) return;
        boxContainerEl.innerHTML = "";
        createColorBoxes();
        const event = new CustomEvent('random-color', {detail: {colorCode: "none", boxNumber: "none"},});
        document.dispatchEvent(event);
    });

    // Function to generate a random color.
    const randomizeColor = () => {
        colorString = '#';
        while(colorString.length < 7) colorString += Math.floor(Math.random()*16).toString(16);
        return colorString;
    }

    // Adds event listener to the 
    boxContainerEl.addEventListener('click', (e)=>{
        if(!e.target.classList.contains('color-box')) return;
        const boxNumber = e.target.className.split(' ')[1].slice(4);
        const randomColor = randomizeColor();
        e.target.style.backgroundColor = randomColor;

        // Sends out a Custom event on document.
        const event = new CustomEvent('random-color', {detail: {colorCode: randomColor, boxNumber: boxNumber},});
        document.dispatchEvent(event);
    });
    
    // Listens to the custom event.
    document.addEventListener('random-color', (e) => {
        boxNumberEl.innerText = `Box: ${e.detail.boxNumber}`;
        colorCodeEl.innerText = `Color: ${e.detail.colorCode}`;
    });
})();