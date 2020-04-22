//add new chat documents
//setting up a real-time listener to get new chats
//updating the username
//updating the room

class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
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
        this.unsub = this.chats  //to unsbscribe from changes
        //complex queries
            .where('room','==', this.room) //return documents of a particular room + firestore uses double equals instead of triple
            // .orderBy('created_at') // to order documents by time created
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change =>{
                    if(change.type === 'added'){
                        //update ui
                        callback(change.doc.data());
                    }
                });
            });
    }

    //updating usernames
    updateName(username){
        this.username = username;
        localStorage.setItem('username',username);
    }

    //updating room
    updateRoom(room){
        this.room = room;
        console.log('room updated');
        if(this.unsub){
            this.unsub;
        }
    }

}
// setTimeout(()=>{
//     chatroom.updateRoom('cybersec');
//     chatroom.updateName('elon');
//     chatroom.addChat('tesla is a meme');
//     chatroom.getChats((data) =>{
//         console.log(data);
//     });
// },3000); //after 3 seconds

// chatroom.addChat('Been there')
//     .then(()=>console.log('chat added'))
//     .catch(error => console.log(error));