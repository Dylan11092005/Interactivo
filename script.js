const images = [
    "wakeUp.jpg",
    "brushTeeth.jpg",
    "takeAShower.jpg",
    "getDressed.jpg",
    "haveBreakfast.jpg",
    "takeBus.jpg",
    "goToSchool.jpg",
    "study.jpg",
    "haveLunch.jpg",
    "playGames.jpg",
    "watchTV.jpg",
    "listenMusic.jpg",
    "readBook.jpg",
    "cleanRoom.jpg",
    "walkDog.jpg",
    "exercise.jpg",
    "washDishes.jpg",
    "takeABath.jpg",
    "prepareBackpack.jpg",
    "relax.jpg",
    "goToBed.jpg",
    "sleep.png"
];

const imageNames = {
    "wakeUp.jpg": "Wake Up",
    "brushTeeth.jpg": "Brush Your Teeth",
    "takeAShower.jpg": "Take a Shower",
    "getDressed.jpg": "Get Dressed",
    "haveBreakfast.jpg": "Have Breakfast",
    "takeBus.jpg": "Take the Bus",
    "goToSchool.jpg": "Go to School",
    "study.jpg": "Study",
    "haveLunch.jpg": "Have Lunch",
    "playGames.jpg": "Play Games",
    "watchTV.jpg": "Watch Television",
    "listenMusic.jpg": "Listen to Music",
    "readBook.jpg": "Read a Book",
    "cleanRoom.jpg": "Clean Your Room",
    "walkDog.jpg": "Walk the Dog",
    "exercise.jpg": "Do Exercise",
    "washDishes.jpg": "Wash the Dishes",
    "takeABath.jpg": "Take a Bath",
    "prepareBackpack.jpg": "Prepare Your Backpack",
    "relax.jpg": "Relax",
    "goToBed.jpg": "Go to Bed",
    "sleep.png": "Sleep"
};

// Menu elements
const menuContainer = document.getElementById("menu-container");
const bingoContainer = document.getElementById("bingo-container");
const tombolaContainer = document.getElementById("tombola-container");
const bingoBtnMenu = document.getElementById("bingo-btn");
const tombolaBtnMenu = document.getElementById("tombola-btn");
const backBingoBtn = document.getElementById("back-bingo");
const backTombolaBtn = document.getElementById("back-tombola");

// Tombola elements
const drawBtn = document.getElementById("draw-btn");
const tombolaContent = document.getElementById("tombola-content");
const drawnItems = document.getElementById("drawn-items");

let tombolaList = [...images];

// Mezclar array (Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Menu navigation
bingoBtnMenu.addEventListener("click", () => {
    menuContainer.classList.add("hidden");
    bingoContainer.classList.remove("hidden");
    generateBingo();
});

tombolaBtnMenu.addEventListener("click", () => {
    menuContainer.classList.add("hidden");
    tombolaContainer.classList.remove("hidden");
    tombolaList = [...images];
    shuffle(tombolaList);
});

backBingoBtn.addEventListener("click", () => {
    bingoContainer.classList.add("hidden");
    menuContainer.classList.remove("hidden");
    document.getElementById("bingo-board").innerHTML = "";
});

backTombolaBtn.addEventListener("click", () => {
    tombolaContainer.classList.add("hidden");
    menuContainer.classList.remove("hidden");
    drawnItems.innerHTML = "";
    tombolaContent.innerHTML = "<p>Presiona para sortear</p>";
});

// BINGO FUNCTIONS
function generateBingo() {
    const board = document.getElementById("bingo-board");
    board.innerHTML = "";
    
    const bingoImages = [...images];
    shuffle(bingoImages);
    const selectedImages = bingoImages.slice(0, 16);

    selectedImages.forEach(imgName => {
        const cell = document.createElement("div");
        cell.classList.add("bingo-cell");

        const img = document.createElement("img");
        img.src = `img/${imgName}`;
        img.alt = imgName;

        cell.appendChild(img);

        cell.addEventListener("click", () => {
            cell.classList.toggle("marked");
        });

        board.appendChild(cell);
    });
}

// TOMBOLA FUNCTIONS
drawBtn.addEventListener("click", drawRoutine);

function drawRoutine() {
    if (tombolaList.length === 0) {
        drawBtn.disabled = true;
        drawBtn.textContent = "¡SIN ITEMS!";
        return;
    }

    drawBtn.classList.add("drawing");
    drawBtn.disabled = true;

    let rotations = 0;
    const maxRotations = 20;
    const interval = setInterval(() => {
        rotations++;
        
        if (rotations >= maxRotations) {
            clearInterval(interval);
            drawBtn.classList.remove("drawing");
            drawBtn.disabled = false;
            
            // Get random item
            const randomIndex = Math.floor(Math.random() * tombolaList.length);
            const selectedImage = tombolaList[randomIndex];
            
            // Remove from list
            tombolaList.splice(randomIndex, 1);
            
            // Display result
            displayTombolaResult(selectedImage);
            addDrawnItem(selectedImage);
            
            // Update button
            if (tombolaList.length === 0) {
                drawBtn.disabled = true;
                drawBtn.textContent = "¡TERMINADO!";
            }
        }
    }, 50);
}

function displayTombolaResult(imageName) {
    const nameP = document.createElement("p");
    nameP.textContent = imageNames[imageName] || imageName;
    nameP.style.fontSize = "32px";
    
    tombolaContent.innerHTML = "";
    tombolaContent.appendChild(nameP);
}

function addDrawnItem(imageName) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("drawn-item");
    itemDiv.textContent = imageNames[imageName] || imageName;
    drawnItems.appendChild(itemDiv);
}
