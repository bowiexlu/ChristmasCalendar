const calendar = document.getElementById('calendar-body');

// Generate 24 doors
for (let i = 1; i <= 24; i++) {
    let door = `<div class="calendar-door" onclick="openDoor(${i})">${i}</div>`;
    calendar.innerHTML += door;
}


// Check the date then open the door
function openDoor(day) {
    let today = new Date().getDate();
    
    if(day > today) {
        alert("Tålamod!")
    } else {
        let door = document.querySelector(`.calendar-door:nth-child(${day})`);

        // Popup a new window if the door can be opened
        let popupWindow = window.open("", "popupWindow" + day, `width=500,height=650`);

        // Display a image randomly
        const randomImage = Math.floor(Math.random() * 3) + 1;
        const imagePath = `img/bild${randomImage}.jpg`;

        // Edit the content of door such as text and image
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

        // Disable click function to prevent repeated clicks
        door.onclick = null;
    }
}

// Randomly shuffle the order of doors
(function($){
 
    $.fn.shuffle = function() {
 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
 
        return $(shuffled);
 
    };
 
})(jQuery);
$('ul#list li').shuffle();

$(document).ready(function() {
    $('#calendar-body .calendar-door').shuffle();
});