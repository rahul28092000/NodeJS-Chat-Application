const socket = io('http://localhost:5300');
//Gets DOM elements in respective JS variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
//Audio whenever any user receives a message from others in the chat
var audio = new Audio('tone.mp3');
//now this function will append info in the container
const append =(message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
   if(position =='left')
   { 
       audio.play();
    
    }
   
}

// here the app will ask the name of any new user who wants to join
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);
//this will let others know that a new user has joined the chat room
socket.on('user-joined', name =>
{
append(`${name} joined the chat`, 'right')
})
socket.on('receive', data =>
    {
    append(`${data.name}: ${data.message}`, 'left')
    })
socket.on('left', name =>
        {
        append(`${name} left the chat`, 'right')
        })
//if the form gets submitted, server is updated
form.addEventListener('submit', (e)=>
        {
            e.preventDefault();
            const message = messageInput.value;
            append(`You: ${message}`, 'right');
            socket.emit('send', message);
            messageInput.value = ''
        })