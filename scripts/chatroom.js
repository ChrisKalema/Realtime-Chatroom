//add new chat documents
//setting up a real-time listener to get new chats
//updating the username
//updating the room

class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
    }

    async addChat(message){
        // format a chat object
        const now = new Date();
        const chat = {
        message: this.message,
        username: this.username,
        room: this.room,
        created_at: firebase.firestore.Timestamp.fromDate(now)
        };

    };
}

const chatroom = new Chatroom('general', 'Chris');
console.log(chatroom);