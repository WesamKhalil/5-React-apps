import React from 'react'
//Import css to style this component
import '../styles/Drum.css'

//Create an audio element
let audio = new Audio('')

//Where we store all the information for the drum sounds
//Each object inside the array has a value key, the value is the drum keys value that we see on the button
//We'll be able to switch to a second soundboard so we have two sources one for each soundboard, srcOne and srcTwo
//In each key for the source we have an array, the first value if the source and the second value is the name of the sound which will be displayed after playing that sound
const buttonInfo = [
  {
    value: 'Q',
    srcOne: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', 'Heater-1'],
    srcTwo: ['https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3', 'Chord-1']
  }, {
    value: 'W',
    srcOne: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', 'Heater-2'],
    srcTwo: ['https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3', 'Chord-2']
  }, {
    value: 'E',
    srcOne: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', 'Heater-3'],
    srcTwo: ['https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3', 'Chord-3']
  }, {
    value: 'A',
    srcOne: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', 'Heater-4'],
    srcTwo: ['https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3', 'Shaker']
  }, {
    value: 'S',
    srcOne: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', 'Clap'],
    srcTwo: ['https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3', 'Open-HH']
  }, {
    value: 'D',
    srcOne: ['https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', 'Open-HH'],
    srcTwo: ['https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3', 'Closed-HH']
  }, {
    value: 'Z',
    srcOne: ['https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', "Kick-n'-Hat"],
    srcTwo: ['https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3', 'Punchy-Kick']
  }, {
    value: 'X',
    srcOne: ['https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', 'Kick'],
    srcTwo: ['https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3', 'Side-Stick']
  }, {
    value: 'C',
    srcOne: ['https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', 'Closed-HH'],
    srcTwo: ['https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3', 'Snare']
  }
]




//Our Drum component
class Drum extends React.Component {
  constructor() {
    super()

    this.state = {
      //Power refers to wether the soundboard is switched on or off
      power: true,
      //Display shows the last sound played or new audio volume, by default it's just 'display'
      display: 'Display',
      //Bank tells us if we switched to a new soundboard so true and false will give us access to different soundboards
      bank: true,
      //The volumes value from 0 to 1, it's 0.5 by default
      //The reason that it's 0.5 and not 50 is because when we adjust the audio's volume it takes a number from 0 to 1
      //I don't want to multiply or divide the number and end up with an inaccurate number because of floating point calculations
      volume: 0.5
    }
    this.switch = this.switch.bind(this)
    this.playSound = this.playSound.bind(this)
    this.adjustVolume = this.adjustVolume.bind(this)
  }

  //Switches power/bank on and off/1 and 2, this value will be checked for when firing the playSound function
  switch(e) {
    //Gets the previous value of power/bank and swaps it
    let name = e.target.name
    this.setState({[name]: !this.state[name]})
  }

  //The function called when you press a key on the soundboard
  playSound(e) {
    //We get the source and name of the audio we want to play  as an array and store it in sound
    //Each sound key has an id matching the order of the objects inside of the buttonInfo array
    //Once we select the right object we use a tertiary function to select the right source
    //So true = srcOne and false = srcTwo
    let sound = this.state.bank ? buttonInfo[e.target.id].srcOne : buttonInfo[e.target.id].srcTwo
    //we check that the power is on/true
    if(this.state.power) {
      //sound is an array with the first value being the src and second value being the name
      //So we set display to the name of the sound
      this.setState({display: sound[1]})
      //We set the src of audio to the new source
      audio.setAttribute('src', sound[0])
      //Then we play the sound
      audio.play()
    }
  }

  //Changes the volume from 1 to 100
  adjustVolume(e) {
    this.setState({
      //We set the display to the current volume
      display: 'Volume: ' + Math.round(e.target.value * 100) + '%',
      //Update volume value
      volume: e.target.value
    })
    //Update Audio's volume value to the new states volume value
    audio.volume = this.state.volume
  }

  render() {
    //I created an array of buttons by cycling through buttonInfo and giving them all a className of btn and an onClick event handler that fires the playSound function
    //I gave them an id equal to their index and the inner text is set to each objects value property
    //I could have just wrote the code for the buttons my self but I just wanted to display that I can make multiple elements using an array method
    let buttons = buttonInfo.map((obj, i) => {
      return (
        <button
          className='btn'
          id={i}
          onClick={this.playSound}
        >{obj.value}</button>
      )
    })

    //We include the array of buttons after the p tag
    //In the bank button in the inner text we have a javascript function which will show either on or off depending on the power value
    //We do the same for the bank showing either 1 or 2
    //We also have an input of type calue with the onchange event handler which fires adjustVolume
    return(
      <div>
        <h1 className='dm-heading'>Drum Machine</h1>
        <p>Press the keys to play a sound. The display will show the name of the last sound played or the volume if it was the last thing you adjusted.
         Pressing bank will change the the type of sounds the keys will play.</p>
        <div className='dm-keys'>
          {buttons}
        </div>
        <div className='dm-controls'>
          <button name='power' className='control-button' onClick={this.switch}>Power: {this.state.power ? 'ON' : 'OFF'}</button>
          <div className='dm-display'>
            <p>
              {this.state.display}
            </p>
          </div>
          <div>
            <p>Volume</p>
            <input className='volume' type='range' min='0' max='1' step='0.01' value={this.state.volume} onChange={this.adjustVolume}/>
          </div>
          <button name='bank' className='control-button' onClick={this.switch}>Bank: {this.state.bank ? '1' : '2'}</button>
        </div>
        <hr />
      </div>
    )
  }
}

export default Drum
