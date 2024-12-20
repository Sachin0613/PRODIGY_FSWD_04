const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const { username, room } = Qs.parse(location.search, {ignoreQueryPrefix: true,});
console.log(username, room);

const socket = io();

socket.emit('joinRoom', { username, room });

socket.on('roomUsers', ({room, users}) =>{
  outputRoomName(room);
  outputUsers(users);
});




socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let msg = e.target.elements.msg.value;

  msg = msg.trim();
  console.log(msg);
  if (!msg) 
  {
    return false;
  }

  socket.emit('chatMessage', msg);

  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  console.log("actual msg is : ", message)

  const p = document.createElement('p');
  p.classList.add('meta');

  p.innerText = message.username;
  p.innerText += " @ ";
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Leave Chatroom ????');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});


function outputRoomName(room)
{
    roomName.innerText = room;
}

function outputUsers(users)
{
    userList.innerHTML = `${users.map(user =>  `<li>${user.username}</li>`).join('')}`
}