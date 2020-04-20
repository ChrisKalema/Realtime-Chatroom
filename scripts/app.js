//DOM querries
const chatList = document.querySelector('.chat.list');

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming', 'Voss');

//get chats and render
chatroom.getChats((data) =>{
    console.log(data);
    chatUI.render(data);
});