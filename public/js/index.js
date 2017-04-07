var socket = io();

socket.on("connect", function() {

    console.log("Connected to server");
});

socket.on("disconnect", function() {

    console.log("Disconnected from server");
});

socket.on("newMessage", function(message) {

    console.log("newMessage", message);
});

socket.emit("createMessage", {

    from: "Frank",
    text: "No! I am you father."
}, function(data) {

    console.log("Got it!", data)
});