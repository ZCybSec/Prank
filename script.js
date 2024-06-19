$(document).ready(function(){
    $('#jokeButton').click(function(){
        // منع النقر المتكرر على الزر
        $(this).prop('disabled', true);

        // تحديد النص المطلوب طباعته في النوافذ المنبثقة
        var hackerMessages = [
            "You can't close this window!",
            "You've been hacked!",
            "System breach detected!",
            "Unauthorized access!",
            "Your system is compromised!"
        ];
        var imageUrl = "giphy.gif";

        // إنشاء نافذة جديدة كل 2 ثوانٍ
        setInterval(function(){
            openMultipleWindows(hackerMessages, imageUrl, 3); // فتح 3 نوافذ بدلاً من واحدة
        }, 3000); // 2000 مللي ثانية تعادل 2 ثوانٍ

        // فتح نافذة جديدة عند النقر على الزر
        openMultipleWindows(hackerMessages, imageUrl, 3); // فتح 3 نوافذ بدلاً من واحدة

        // فتح نافذة ثابتة في المنتصف
        openFixedWindow(hackerMessages);
    });

    function openMultipleWindows(messages, imageUrl, count) {
        for (var i = 0; i < count; i++) {
            openMovingWindow(messages[Math.floor(Math.random() * messages.length)], imageUrl);
        }
    }

    function openMovingWindow(message, imageUrl) {
        // تحديد حجم الصورة
        var imageWidth = 500; // عرض الصورة
        var imageHeight = 300; // ارتفاع الصورة

        // فتح نافذة جديدة بالحجم المناسب
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

        // تشغيل الصوت
        var audio = document.getElementById("audio");
        audio.play();

        // تحريك النافذة بشكل مستمر
        var x = Math.floor(Math.random() * (window.screen.width - imageWidth));
        var y = Math.floor(Math.random() * (window.screen.height - imageHeight));
        var xDirection = 1;
        var yDirection = 1;
        var speed = 10; // زيادة سرعة الحركة

        setInterval(function() {
            // تحديث الإحداثيات
            x += xDirection * speed;
            y += yDirection * speed;

            // عكس الاتجاه عند الوصول إلى حافة الشاشة
            if (x + imageWidth >= window.screen.width || x <= 0) {
                xDirection *= -1;
            }
            if (y + imageHeight >= window.screen.height || y <= 0) {
                yDirection *= -1;
            }

            // تحريك النافذة إلى الموقع الجديد
            newWindow.moveTo(x, y);
        }, 10); // تحديث الموقع كل 10 مللي ثانية لتحقيق حركة أسرع وأكثر إزعاجًا
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
        }, 3000); // تغيير العبارة كل 3 ثوانٍ

        fixedWindow.onbeforeunload = function() {
            openFixedWindow(messages); // إعادة فتح النافذة الثابتة عند محاولة إغلاقها
        };
    }

    // طلب تأكيد عند محاولة إغلاق الصفحة
    window.onbeforeunload = function() {
        return "Are you sure you want to leave this page?";
    };
});
