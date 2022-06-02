// setting up a real time listener to get new chats

// update username

// update room

class ChatRoom {
  constructor(room, userName) {
    this.room = room;
    this.userName = userName;
    this.chats = db.collection("chats");
    this.unSub;
  }

  // add new chat documents
  async addChat(message) {
    //format chat object
    const now = new Date(); //message sent time
    const chat = {
      message,
      username: this.userName,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };
    //save the chat document
    const response = await this.chats.add(chat);
    return response;
  }
  getChats(callback) {
    this.unSub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            //update ui
            callback(change.doc.data());
          }
        });
      });
  }
  updateName(username) {
    this.userName = username;
    localStorage.setItem("username", username);
  }
  updateRoom(room) {
    this.room = room;
    console.log("room updated");
    if (this.unSub) {
      this.unSub();
    }
  }
}
