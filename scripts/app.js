//DOM querries
const chatList = document.querySelector('.chat.list');

//class instances
const chatroom = new Chatroom('general', 'marty');

//get chats and render
chatroom.getChats((data) =>{
    console.log(data);
});