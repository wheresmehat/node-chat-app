var expect = require("expect");

var {isRealString} = require("./validation");

describe("isRealString function", () => {

    it("should reject non-string values", () => {

        var boolResult = isRealString(23456);

        expect(boolResult).toBe(false);
    });

     it("should reject strings with only spaces", () => {

        var boolResult = isRealString("    ");

        expect(boolResult).toBe(false);
    });

    it("should allow string with non-space characters (spaces allowed inbetween)", () => {

        var boolResult = isRealString("  Lotr  ");

        expect(boolResult).toBe(true);
    });

});