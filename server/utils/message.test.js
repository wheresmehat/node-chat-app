var expect = require("expect");

var {generateMessage} = require("./message");

describe("generateMessage", () => {

    it("should generate a correct message object", () => {

        var from = "Alex";
        var text = "Drinking milk gives me no headaches";

        var message = generateMessage(from, text);

        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA("number");

    });

});