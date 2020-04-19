//class instances
const chatroom = new Chatroom('general', 'marty');

//get chats and render
chatroom.getChats((data) =>{
    console.log(data);
});