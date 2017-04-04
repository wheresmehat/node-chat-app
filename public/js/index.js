var socket = io();

socket.on("connect", function() {

    console.log("Connected to server");

    socket.emit("createMessage", {

        to: "gus@lard",
        text: "Oh yeah! I want two buckets delivered"
    });

});

socket.on("disconnect", function() {

    console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {

    console.log("newMessage", message);
});

