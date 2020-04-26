//DOM querries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');  //show message after name update
const rooms = document.querySelector('.chat-rooms');

//add a new chat (message)
newChatForm.addEventListener('submit', e =>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    
    //call the addChat() method from chatroom.js
    chatroom.addChat(message)
        .then(()=> newChatForm.reset())
        .catch((error)=>console.log(error));
});

//update user name
newNameForm.addEventListener('submit', e=>{
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    //call the updateName() from chatroom.js
    chatroom.updateName(newName);

    //reset the form
    newNameForm.reset();
    //show update name message
    updateMssg.innerText = `Your name has been updated to ${newName}`;
    //message dissapears after 3 sec
    setTimeout(()=>{updateMssg.innerText=''}, 3000); 
});

//update the chat room
rooms.addEventListener('click', e=>{
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render());
    }
});

// check local storage for a name
const username = localStorage.username ? localStorage.usrrname : 'Anonymous';

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming', username);

//get chats and render
chatroom.getChats((data) =>{
    chatUI.render(data);
});
