var expect = require("expect");

var {Users} = require("./users");

describe("Users class", () => {

    var users;

    beforeEach(() => {

        users = new Users();

        users.users = [
            
            {id: 1, name: "Alex", room: "robots"},
            {id: 2, name: "Brian", room: "Node course"},
            {id: 3, name: "Mike", room: "Node course"}
        ];
    });

    it("should add a new user", () => {

        var users = new Users();

        var user = {id: 1234, name: "Alex", room: "robots"};
        users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it("should remove a user", () => {

        var removedUser = users.removeUser(2);

        expect(users.users).toEqual([
            {id: 1, name: "Alex", room: "robots"}, 
            {id: 3, name: "Mike", room: "Node course"}
        ]);

        expect(removedUser).toEqual({id: 2, name: "Brian", room: "Node course"});

    });

    it("should not remove a user if nonexistent id", () => {

        var removedUser = users.removeUser(33);

        expect(users.users).toEqual([
            {id: 1, name: "Alex", room: "robots"},
            {id: 2, name: "Brian", room: "Node course"}, 
            {id: 3, name: "Mike", room: "Node course"}
        ]);

        expect(removedUser).toBe(undefined);

    });

    it("should find user", () => {

        var user = users.getUser(2);

        expect(user).toEqual({id: 2, name: "Brian", room: "Node course"});
    });

    it("should not find user if nonexistent id", () => {

        var user = users.getUser(33);

        expect(user).toBe(undefined);
    });

    it("should return names for Node course room", () => {

        var userList = users.getUserList("Node course");

        expect(userList).toEqual(["Brian", "Mike"]);
    });

    it("should return names for robots room", () => {

        var userList = users.getUserList("robots");

        expect(userList).toEqual(["Alex"]);
    });

});