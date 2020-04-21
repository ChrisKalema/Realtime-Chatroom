//class to render chat templates to the DOM
//clear list of chats when you switch to another room

class ChatUI{
    constructor(list){
        this.list = list;

    }
    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            { addSuffix:true }
        );
        const html = `
            <li class="list-group-item">
                <span class = "username">${data.username}</span>
                <span class = "message">${data.message}</span>
                <div class="time">${when}</div>
            </li>
        `;
        
        this.list.innerHTML += html;
    }
}

