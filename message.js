class Message {
  constructor(messageName,command){
    this.messageName = messageName;
    if(!messageName){
      throw Error ("Message name required")
    }
    this.command = command
  }

}

module.exports = Message;