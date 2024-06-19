$(document).ready(function(){
    $('#jokeButton').click(function(){
        // منع النقر المتكرر على الزر
        $(this).prop('disabled', true);

        // تحديد النص المطلوب طباعته في النوافذ المنبثقة
        var hackerMessages = [
            "لا يمكنك إغلاق هذه النافذة!",
            "تم اختراقك!",
            "تم اكتشاف خرق للنظام!",
            "الوصول غير مصرح!",
            "نظامك معرض للخطر!"
        ];
        var imageUrl = "giphy.gif";
        var audioUrl = "alert.mp3"; // رابط الصوت المزعج

        // إنشاء نافذة جديدة كل 1 ثانية
        setInterval(function(){
            openMultipleWindows(hackerMessages, imageUrl, 3); // فتح 3 نوافذ بدلاً من واحدة
        }, 1000); // 1000 مللي ثانية تعادل 1 ثانية

        // فتح نافذة جديدة عند النقر على الزر
        openMultipleWindows(hackerMessages, imageUrl, 3); // فتح 3 نوافذ بدلاً من واحدة

        // فتح نافذة ثابتة في المنتصف
        openFixedWindow(hackerMessages);

        // تشغيل الصوت المزعج بشكل مستمر
        playAudio(audioUrl);
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
                h1 { color: #f00; }
                p { font-size: 18px; color: #0f0; }
                img { max-width: 100%; }
                .glitch {
                    color: #0f0;
                    font-size: 30px;
                    position: relative;
                    animation: glitch 1s infinite;
                }
                @keyframes glitch {
                    0% {
                        text-shadow: 2px 2px #ff00ff, -2px -2px #00ffff;
                    }
                    25% {
                        text-shadow: -2px 2px #ff00ff, 2px -2px #00ffff;
                    }
                    50% {
                        text-shadow: 2px -2px #ff00ff, -2px 2px #00ffff;
                    }
                    75% {
                        text-shadow: -2px -2px #ff00ff, 2px 2px #00ffff;
                    }
                    100% {
                        text-shadow: 2px 2px #ff00ff, -2px -2px #00ffff;
                    }
                }
            </style>
            <h1 class="glitch">تنبيه من المخترق!</h1>
            <p>${message}</p>
            <img src="${imageUrl}" alt="Hacker Image" width="${imageWidth}" height="${imageHeight}">
        `);

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

        // طلب تأكيد عند محاولة إغلاق النافذة
        newWindow.onbeforeunload = function() {
            return "هل أنت متأكد أنك تريد إغلاق هذه النافذة؟";
        };
    }

    function openFixedWindow(messages) {
        var fixedWindow = window.open("", "_blank", `width=500,height=200`);
        fixedWindow.document.write(`
            <style>
                body { background-color: #000; font-family: 'Courier New', Courier, monospace; text-align: center; padding: 20px; color: #0f0; }
                h1 { color: #f00; }
                p { font-size: 18px; color: #0f0; }
                .glitch {
                    color: #0f0;
                    font-size: 30px;
                    position: relative;
                    animation: glitch 1s infinite;
                }
                @keyframes glitch {
                    0% {
                        text-shadow: 2px 2px #ff00ff, -2px -2px #00ffff;
                    }
                    25% {
                        text-shadow: -2px 2px #ff00ff, 2px -2px #00ffff;
                    }
                    50% {
                        text-shadow: 2px -2px #ff00ff, -2px 2px #00ffff;
                    }
                    75% {
                        text-shadow: -2px -2px #ff00ff, 2px 2px #00ffff;
                    }
                    100% {
                        text-shadow: 2px 2px #ff00ff, -2px -2px #00ffff;
                    }
                }
            </style>
            <h1 class="glitch">تنبيه من المخترق!</h1>
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

    function playAudio(audioUrl) {
        var audio = new Audio(audioUrl);
        audio.loop = true; // تكرار الصوت بشكل مستمر
        audio.play();
    }

    // طلب تأكيد عند محاولة إغلاق الصفحة
    window.onbeforeunload = function() {
        return "هل أنت متأكد أنك تريد مغادرة هذه الصفحة؟";
    };
});
