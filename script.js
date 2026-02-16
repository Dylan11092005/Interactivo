const skills = [
    // Soft Skills
    "Teamwork",
    "Adaptability",
    "Communication Skills",
    "Creativity",
    "Problem-solving Skills",
    "Interpersonal Skills",
    "Public Speaking",
    "Analytical Skills",
    "Time Management",
    "Leadership",
    "Critical Thinking",
    "Emotional Intelligence",
    "Negotiation",
    "Resilience",
    "Conflict Resolution",
    // Hard Skills
    "Project Management",
    "Financial Analysis",
    "Accounting",
    "Market Research",
    "Budget Planning",
    "Programming",
    "Database Management",
    "Cybersecurity",
    "Network Administration",
    "Data Analysis",
    "Machine Learning",
    "Cloud Computing",
    "UI/UX Design",
    "Quality Assurance",
    "Business Intelligence"
];

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

let tombolaList = [...skills];

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
    tombolaList = [...skills];
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
    
    const bingoSkills = [...skills];
    shuffle(bingoSkills);
    const selectedSkills = bingoSkills.slice(0, 16);

    selectedSkills.forEach(skill => {
        const cell = document.createElement("div");
        cell.classList.add("bingo-cell");

        const text = document.createElement("span");
        text.classList.add("cell-text");
        text.textContent = skill;

        cell.appendChild(text);

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
            const selectedSkill = tombolaList[randomIndex];
            
            // Remove from list
            tombolaList.splice(randomIndex, 1);
            
            // Display result
            displayTombolaResult(selectedSkill);
            addDrawnItem(selectedSkill);
            
            // Update button
            if (tombolaList.length === 0) {
                drawBtn.disabled = true;
                drawBtn.textContent = "¡TERMINADO!";
            }
        }
    }, 50);
}

function displayTombolaResult(skill) {
    const nameP = document.createElement("p");
    nameP.textContent = skill;
    nameP.style.fontSize = "32px";
    
    tombolaContent.innerHTML = "";
    tombolaContent.appendChild(nameP);
}

function addDrawnItem(skill) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("drawn-item");
    itemDiv.textContent = skill;
    drawnItems.appendChild(itemDiv);
}
