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
        message,    
        username: this.username,
        room: this.room,
        created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        //save the chat document to the firebase database
        const response = await this.chats.add(chat);
        return response;
    };

    //set-up realtime listener
    getChats(callback){
        this.chats
        //complex queries
            .where('room','==', this.room) //firestore uses double equals instead of triple
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change =>{
                    if(change.type === 'added'){
                        //update ui
                        callback(change.doc.data());
                    }
                });
            });
    }

}

const chatroom = new Chatroom('general', 'marty');
console.log(chatroom);

// chatroom.getChats((data) =>{
//     console.log(data);
// });

chatroom.addChat('Been there')
    .then(()=>console.log('chat added'))
    .catch(error => console.log(error));