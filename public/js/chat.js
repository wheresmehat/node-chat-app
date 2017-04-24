var socket = io();


function scrollToBottom() {

    // selectors
    var $messages = jQuery("#messages");
    var $newMessage = $messages.find("li").last();

    // heights
    var clientHeight = $messages.prop("clientHeight");
    var scrollTop = $messages.prop("scrollTop");
    var scrollHeight = $messages.prop("scrollHeight");
    var newMessageHeight = $newMessage.innerHeight();
    var lastMessageHeight = $newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {

        $messages.scrollTop(scrollHeight);
    }
}


socket.on("connect", function() {

    var params = jQuery.deparam(window.location.search);

    socket.emit("join", params, function(err) {

        if (err) {
            
            alert(err);
            window.location.href = "/";
        }
        else {

            console.log("No error.");
        }
    });
});

socket.on("disconnect", function() {

    console.log("Disconnected from server");
});

socket.on("updateUserList", function(userNames) {

    var $ol = jQuery("<ol></ol>");

    userNames.forEach(function(userName) {

        $ol.append(jQuery("<li></li>").text(userName));
    });

    jQuery("#users").html($ol);

});

socket.on("newMessage", function(message) {

    var formattedTime = moment(message.createdAt).format("h:mm a");

    var $template = jQuery("#message-template").html();
    
    var html = Mustache.render($template, {

        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });

    jQuery("#messages").append(html);
    scrollToBottom();

});

socket.on("newLocationMessage", function(message) {

    var formattedTime = moment(message.createdAt).format("h:mm a");

    var $template = jQuery("#location-message-template").html();
    
    var html = Mustache.render($template, {

        from: message.from,
        url: message.locationUrl,
        createdAt: formattedTime
    });

    jQuery("#messages").append(html);
    scrollToBottom();
    
});


jQuery(function() {

    jQuery("#message-form").on("submit", function(e) {

        e.preventDefault();
        
        var $messageInput = jQuery("#message-input");

        socket.emit("createMessage", {

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


