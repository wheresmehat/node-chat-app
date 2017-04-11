var socket = io();

socket.on("connect", function() {

    console.log("Connected to server");
});

socket.on("disconnect", function() {

    console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {

    console.log("newMessage", message);

    var $li = jQuery("<li></li>");
    $li.text(message.from + ": " + message.text);

    jQuery("#messages").append($li);
});

socket.on("newLocationMessage", function(message) {

    console.log("newMessage", message);

    var $li = jQuery("<li></li>");
    $li.text(message.from + ": ");

    var $a = jQuery("<a target='_blank'>My current location</a>")
    $a.attr("href", message.locationUrl);

    $li.append($a);

    jQuery("#messages").append($li);
});


jQuery(function() {

    jQuery("#message-form").on("submit", function(e) {

        e.preventDefault();
        
        var $messageInput = jQuery("#message-input");

        socket.emit("createMessage", {

            from: "User",
            text: $messageInput.val()
        }, function(data) {

            console.log("jQuery test", data)
        });

        $messageInput.val("");
    });


    var $locationButton = jQuery("#send-location");

    $locationButton.on("click", function() {

        if (!navigator.geolocation) {

            return alert("Geolocation not supported by your browser.");
        }

        navigator.geolocation.getCurrentPosition(function(position) {

            socket.emit("createLocationMessage", {

                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });

        }, function() {

            alert("Unable to fetch location.");
        });

    });

});


