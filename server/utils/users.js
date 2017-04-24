class Users {

    constructor() {

        this.users = [];
    }

    addUser(id, name, room) {

        var user = {id, name, room};
        this.users.push(user);
        
        return user;
    }

    removeUser(id) {

        var removedUser;

        this.users = this.users.filter((user) => {

            if (user.id === id) {

                removedUser = user;
            }

            return user.id !== id;
        });

        return removedUser;
    }

    getUser(id) {

        return this.users.find((user) => user.id === id);
    }

    getUserList(room) {

        var roomUsers = this.users.filter((user) => user.room === room);

        var roomNames = roomUsers.map((user) => user.name);

        return roomNames;
    }

}


module.exports = {Users};