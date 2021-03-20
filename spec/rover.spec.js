const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(200)
    let status;
    if(rover.position == 200 && rover.mode == "NORMAL" && rover.generatorWatts == 110){
      status = "true"
    } else {
      status = "false"
    }
    expect(status).toEqual("true")
  })

  it("response returned by receiveMessage contains name of message", function() {
    let rover = new Rover(200)
    let message = new Message("New Message")
    let response = rover.receiveMessage(message)
    expect(response.message).toEqual("New Message")
  })

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)];
    let message = new Message('Another message!', commands);
    let rover = new Rover(200)
    let response = rover.receiveMessage(message)
    expect(response.results.length).toEqual(2)
  })

  it("responds correctly to status check command", function() {
    let commands = [new Command("STATUS_CHECK")]
    let message = new Message("And another one.", commands)
    let rover = new Rover(200)
    let response = rover.receiveMessage(message)
    expect(response.results[0]).toEqual({completed: true, roverStatus: {mode: 'NORMAL', generatorWatts: 110, position: 200}})
  })

  it("responds correctly to mode change command", function() {
    let commands = [new Command("MODE_CHANGE", "LOW_POWER")]
    let message = new Message("New Message", commands)
    let rover = new Rover(200)
    let response = rover.receiveMessage(message)
    expect(response.results[0]).toEqual({completed: true})
  })

  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("MOVE", 20)]
    let message = new Message("New Message", commands)
    let rover = new Rover(200)
    let response = rover.receiveMessage(message)
    expect(response.results[1]).toEqual({completed: false})
  })

  it("responds with position for move command", function() {
    let commands = [new Command("MOVE", 20)]
    let message = new Message("New Message", commands)
    let rover = new Rover(200)
    let response = rover.receiveMessage(message)
    expect(response.results[0]).toEqual({completed: true})
  })

});
