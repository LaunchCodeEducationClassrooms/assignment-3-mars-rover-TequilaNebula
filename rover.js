class Rover {
   constructor (position, mode = "NORMAL", generatorWatts = 110){
     this.position = position;
     this.mode = mode;
     this.generatorWatts = generatorWatts;
   }

   receiveMessage(message){
     let obj = {
       message: message.name,
       results: []
     }
     if (message.commands != undefined){
       let i = 0;
       while(i < message.commands.length){
         if(message.commands[i].commandType == "MOVE" && this.mode == "LOW_POWER"){
           obj.results[i] = {
             completed: false
           }
         } else if(message.commands[i].commandType == 'MOVE'){
           obj.results[i] = {
             completed: true
           }
           this.position = message.commands[i].value
         } else if(message.commands[i].commandType == 'MODE_CHANGE'){
           obj.results[i] = {
             completed: true
           }
           this.mode = message.commands[i].value
         } else if(message.commands[i].commandType == 'STATUS_CHECK'){
           obj.results[i] = {
           completed: true, 
           roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}
           }
         } else {
          obj.results[i] = message.commands[i];
         }
       i++;
       };
     }
     return obj;
   }
}

module.exports = Rover;