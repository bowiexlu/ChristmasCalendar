const calendar = document.getElementById('calendar-body');

// Generate 24 doors
let doors = [];
for (let i = 1; i <= 24; i++) {
    let door = `<div class="calendar-door" onclick="openDoor(${i})">${i}</div>`;
    doors.push(door); 
}

// Shuffle the doors array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Shuffle the doors and append them to the calendar-body
const shuffledDoors = shuffleArray(doors);
calendar.innerHTML = shuffledDoors.join(''); 

// Check the date then open the door
function openDoor(day) {
    let today = new Date().getDate();
    
    if(day > today) {
        alert("Tålamod!");
    } else {
        // Popup a new window if the door can be opened
        let popupWindow = window.open("", "popupWindow" + day, `width=500,height=650`);

        // Display a random image
        const randomImage = Math.floor(Math.random() * 3) + 1;
        const imagePath = `img/bild${randomImage}.jpg`;

        // Display the content in the popup window 
        popupWindow.document.write(`
            <html>
            <head>
                <title>Lucka ${day}</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
                    img { max-width: 100%; height: auto; }
                    p { font-size: 1.2rem; margin: 10px 0; }
                    strong { font-size: 1.5rem; color: black; }
                </style>
            </head>
            <body>
                <h2>Grattis! Du har öppnat lucka ${day}!</h2>
                <img src="${imagePath}" alt="Christmas Image for day ${day}">
                <p>Här är en speciell rabatt för dig!</p>
                <p>Kod: <strong>DISCOUNT${day}</strong></p>
            </body>
            </html>
        `);

        // Disable the click function to prevent repeated clicks
        let door = document.querySelector(`.calendar-door:nth-child(${day})`);
        door.onclick = null;
    }
}
