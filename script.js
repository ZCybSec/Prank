$(document).ready(function(){
    $('#jokeButton').click(function(){
        // Prevent multiple clicks on the button
        $(this).prop('disabled', true);

        // Messages to be displayed in the pop-up windows
        var hackerMessages = [
            "You can't close this window!",
            "You've been hacked!",
            "System breach detected!",
            "Unauthorized access!",
            "Your system is compromised!"
        ];
        var imageUrl = "giphy.gif";

        // Create a new window every second
        setInterval(function(){
            openMultipleWindows(hackerMessages, imageUrl, 1); // Open 3 windows instead of one
        }, 3000); // 1000 milliseconds equals 1 second

        // Open a new window when the button is clicked
        openMultipleWindows(hackerMessages, imageUrl, 1); // Open 3 windows instead of one

        // Open a fixed window in the center
        openFixedWindow(hackerMessages);
    });

    function openMultipleWindows(messages, imageUrl, count) {
        for (var i = 0; i < count; i++) {
            openMovingWindow(messages[Math.floor(Math.random() * messages.length)], imageUrl);
        }
    }

    function openMovingWindow(message, imageUrl) {
        // Set image size
        var imageWidth = 500; // Image width
        var imageHeight = 300; // Image height

        // Open a new window with the appropriate size
        var newWindow = window.open("", "_blank", `width=${imageWidth},height=${imageHeight + 100}`);
        newWindow.document.write(`
            <style>
                body { background-color: #000; font-family: 'Courier New', Courier, monospace; text-align: center; padding: 20px; color: #0f0; }
                h1 { color: #0f0; }
                p { font-size: 18px; color: #0f0; }
                img { max-width: 100%; }
            </style>
            <h1>Hacker Alert!</h1>
            <p>${message}</p>
            <img src="${imageUrl}" alt="Hacker Image" width="${imageWidth}" height="${imageHeight}">
        `);

        // Play audio
        var audio = document.getElementById("audio");
        audio.play();

        // Continuously move the window
        var x = Math.floor(Math.random() * (window.screen.width - imageWidth));
        var y = Math.floor(Math.random() * (window.screen.height - imageHeight));
        var xDirection = 1;
        var yDirection = 1;
        var speed = 5; // Increased movement speed

        setInterval(function() {
            // Update coordinates
            x += xDirection * speed;
            y += yDirection * speed;

            // Reverse direction when reaching the edge of the screen
            if (x + imageWidth >= window.screen.width || x <= 0) {
                xDirection *= -1;
            }
            if (y + imageHeight >= window.screen.height || y <= 0) {
                yDirection *= -1;
            }

            // Move the window to the new location
            newWindow.moveTo(x, y);
        }, 10); // Update position every 10 milliseconds for faster, more annoying movement
    }

    function openFixedWindow(messages) {
        var fixedWindow = window.open("", "_blank", `width=500,height=200`);
        fixedWindow.document.write(`
            <style>
                body { background-color: #000; font-family: 'Courier New', Courier, monospace; text-align: center; padding: 20px; color: #0f0; }
                h1 { color: #0f0; }
                p { font-size: 18px; color: #0f0; }
            </style>
            <h1>Hacker Alert!</h1>
            <p id="hackerMessage">${messages[0]}</p>
        `);

        var messageIndex = 1;
        setInterval(function() {
            fixedWindow.document.getElementById('hackerMessage').innerText = messages[messageIndex];
            messageIndex = (messageIndex + 1) % messages.length;
        }, 3000); // Change message every 3 seconds

        fixedWindow.onbeforeunload = function() {
            openFixedWindow(messages); // Reopen the fixed window when trying to close it
        };
    }

    // Ask for confirmation when trying to close the page
    window.onbeforeunload = function() {
        return "Are you sure you want to leave this page?";
    };
});
