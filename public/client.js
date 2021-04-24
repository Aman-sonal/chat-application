const socket= io(); // io is coming from client library

let name1;
let messageArea=document.querySelector('.message_area');
let textarea= document.querySelector('#textarea');
do{
    name1 = prompt('Enter your name');
}while(!name1);

textarea.addEventListener('keyup', (e) =>{
    if(e.key === 'Enter')
    {
        sendMessage(e.target.value);
    }
})
function sendMessage(msg1)
{
    let msg= {
        user:name1,
        message: msg1.trim()
    }
    // msg append
    appendMessage(msg, 'outgoing');
    textarea.value='';
    scrollArea();

    //send to server
    socket.emit('message', msg);
}

function appendMessage(msg, type)
{
    let mainDiv= document.createElement('div');
    let className= type;
    mainDiv.classList.add(className,'message');
    let markup= `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML= markup;
    messageArea.appendChild(mainDiv);
}


//Receive msges 
socket.on('message', (msg) =>{
    appendMessage(msg,'incoming');
    scrollArea();
});

function scrollArea(){
    messageArea.scrollTop= messageArea.scrollHeight;
}