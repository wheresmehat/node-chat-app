var socket = io();

socket.on("connect", function() {

    console.log("Connected to server");
});

socket.on("disconnect", function() {

    console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {

    var formattedTime = moment(message.createdAt).format("h:mm a");

    var $li = jQuery("<li></li>");
    $li.text(message.from + " " + formattedTime + ": " + message.text);

    jQuery("#messages").append($li);
});

socket.on("newLocationMessage", function(message) {

    var formattedTime = moment(message.createdAt).format("h:mm a");

    var $li = jQuery("<li></li>");
    $li.text(message.from + " " + formattedTime +  ": ");

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
        }, function() {

            $messageInput.val("");
        });
  
    });


    var $locationButton = jQuery("#send-location");

    $locationButton.on("click", function() {

        if (!navigator.geolocation) {

            return alert("Geolocation not supported by your browser.");
        }

        $locationButton.prop("disabled", true).text("Sending location...");

        navigator.geolocation.getCurrentPosition(function(position) {

            $locationButton.prop("disabled", false).text("Send location");

            socket.emit("createLocationMessage", {

                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });

        }, function() {

            $locationButton.prop("disabled", false).text("Send location");
            alert("Unable to fetch location.");
        });

    });

});


