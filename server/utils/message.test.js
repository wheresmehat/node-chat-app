var expect = require("expect");

var {generateMessage, generateLocationMessage} = require("./message");

describe("generateMessage", () => {

    it("should generate a correct message object", () => {

        var from = "Alex";
        var text = "Drinking milk gives me no headaches";

        var message = generateMessage(from, text);

        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA("number");

    });

});

describe("generateLocationMessage", () => {

    it("should generate a correct location object", () => {

        var from = "Alex";
        var lat = 20;
        var long = 10;
        var url = `https://www.google.com/maps?q=${lat},${long}`;

        var message = generateLocationMessage(from, lat, long);

        expect(message).toInclude({from, locationUrl: url});
        expect(message.createdAt).toBeA("number");

    });

});