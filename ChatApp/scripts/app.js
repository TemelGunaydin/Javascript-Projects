const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMsg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms ");
//add a new chat
newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = newChatForm.message.value.trim();
  chatRoom
    .addChat(message)
    .then(() => {
      newChatForm.reset();
    })
    .catch((err) => console.log(err));
});

newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   update name via chatroom
  const newName = newNameForm.name.value.trim();
  chatRoom.updateName(newName);
  //   reset the form
  newNameForm.reset();

  // show then hide the update message
  updateMsg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => {
    updateMsg.innerText = "";
  }, 3000);
});

//update checkroom
rooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUI.clear();
    chatRoom.updateRoom(e.target.getAttribute("id"));
    chatRoom.getChats((chat) => {
      chatUI.render(chat);
    });
  }
});

//check local storage for a name
const username = localStorage.username
  ? localStorage.getItem("username")
  : "anonymous";

const chatUI = new ChatUI(chatList);
const chatRoom = new ChatRoom("general", username);

chatRoom.getChats((data) => chatUI.render(data));
