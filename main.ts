/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: Jet Lu
 * Created on: Apr 2026
 * This program determines if its too close to an object and sends out a message to another micro bit. 
*/

// variable
let numberDistance: number = 0

// setup
basic.showIcon(IconNames.Happy)
radio.setGroup(5)

// start tracking distance with button a
input.onButtonPressed(Button.A , function() {
  while (true) {

    // find the distance with sonar
    basic.clearScreen()
    numberDistance = sonar.ping(
      DigitalPin.P1, // trigger
      DigitalPin.P2, // echo
      PingUnit.Centimeters
    )
    basic.showString((numberDistance) + " cm")
    basic.showIcon(IconNames.Square)

    if (numberDistance <= 5) {
      basic.showIcon(IconNames.Triangle)
      radio.sendString("Too Close")             
    } else {
      basic.showIcon(IconNames.Triangle)
      radio.sendString("We Good")
    }
  pause(5000)
  }
})

radio.onReceivedString(function (receivedString) {
  basic.clearScreen()
  basic.showString(receivedString)
  basic.showIcon(IconNames.Happy)
})
