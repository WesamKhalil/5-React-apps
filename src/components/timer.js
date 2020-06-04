import React from 'react'
//Import css to style this component
import '../styles/Timer.css'

//Our timer component
class Timer extends React.Component {
  constructor() {
    super()
    this.state = {
      //Number of seconds
      seconds: 1500,
      //Number of minutes of sessions time
      work: 25,
      //Number of minutes of break time
      break: 5,
      //Whether the timer is on or off
      active: false,
      //wether our current session is work or break
      session: 'work'
    }
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.reset = this.reset.bind(this)
  }

  //Increments our sessions time by 1 (in minutes)
  increment(e) {
    //Name of our session
    let name = e.target.name
    //We check that increasing the current sessions value won't go over 60 since we're only dealing in minutes and not hours
    //We also make sure that the timer is paused saince we don't want to change time while it's in them middle of changing
    if(this.state[name] + 1 <= 60 && !this.state.active) {
      //Check if the current session we're on is the same as the one we're incrementing
      //We do this because we're going to alter the seconds value and seconds should represent the number of seconds left from the current session and not the inactive session
      if(this.state.session == name) {
        //If true we set the new seconds to the session time plus 1 and times by 60
        this.setState((prevState) => {
          return {
            seconds: (prevState[name] + 1) * 60
          }
        })
      }
      //Regardless of the previous 'if' statement we update the current sessions time
      this.setState((prevState) => {
        return {[name]: prevState[name] + 1}
      })
    }
  }

  //Decrements our sessions time by 1 (in minutes)
  decrement(e) {
    //Get name of the session we're decrementing
    let name = e.target.name
    //We check that decreasing the current sessions time won't go below 1 since it won't run if we have 0
    //We also make sure that the timer is paused saince we don't want to change time while it's in them middle of changing
    if(this.state[name] - 1 > 0 && !this.state.active) {
      //Check if the current session we're on is the same as the one we're incrementing
      if(this.state.session == name) {
        //If true we set the new seconds to the session time take away 1 and times by 60
        this.setState((prevState) => {
          return {
            seconds: (prevState[name] - 1) * 60
          }
        })
      }
      //Regardless of the previous 'if' statement we update the current sessions time
      this.setState((prevState) => {
        return {[name]: prevState[name] - 1}
      })
    }
  }

  //Function that starts the timer
  start() {
    //Function thats called when setInterval is called
    //It takes away 1 second from the state.seconds variable
    let begin = () => {
      this.setState((prevState) => {
        return {
          seconds: prevState.seconds - 1,
          active: true
        }
      })
      //Then it checks if the seconds variable is equal to 0
      //If it is then it will call the stop function that will stop the setInterval
      //Then it will play a buzzer to signify the end of a session
      if(this.state.seconds == 0) {
        this.stop()
        let buzzer = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg')
        buzzer.play()
        this.setState((prevState) => {
          //Then we switch the session and reset seconds
          let sessionName = prevState.session == 'work' ? 'break' : 'work'
          return {
            seconds: prevState[sessionName] * 60,
            session: sessionName
          }
        })
        //Then we call start for the new session
        this.start()
      }
    }
    //Checks that state is false since we only want to run the timer when the timer is off
    //Since we could run this interval multiple times at once by pressing the start button multiple times and therefore fire begin more than once each second
    //But this code will only let it run once
    if(!this.state.active) {
      //Fires begin each 1 second so it decrease the state.seconds value by 1 each second
      this.intervalId = setInterval(begin, 1000)
    }
  }

  //Stops the set interval and updates active to false
  stop() {
    clearInterval(this.intervalId)
    this.setState({active: false})
  }

  //Resets the values to the state and stops any current timer and updates active to false
  reset() {
    this.setState({
      seconds: 1500,
      work: 25,
      break: 5
    })
    this.stop()
  }

  render() {
    //Javascript for the time that will be displayed
    let time = '0'.repeat(Math.floor(this.state.seconds / 60) < 10) + Math.floor(this.state.seconds / 60) + ':' + '0'.repeat((this.state.seconds % 60) < 10) + (this.state.seconds % 60)
    //We have a plus and negative button for each session which will incrmeent or decrement by 1 minute with a minimum value of 1 and maximum value of 60
    //Then we have the name of our current session and below it the time remaining
    //Then below that we have the three control buttons 'Start', 'Stop' and 'Reset'.
    return(
      <div>
        <h2 className='timer-title'>Timer</h2>
        <p>This is a pomodoro clock.
        It has a work and break variable, the work variable indicates how long you want to work for and the break variable indicates how long your break is.
        After the work session has finished counting down to 0 it will play a buzzing noise and restart the timer to the break value which by default is 5 minutes.</p>
        <div className='timer-lengths'>
          <div className='session'>
            <p>Work length</p>
            <div className='timer-controls'>
              <button name='work' className='btn' onClick={this.increment}>+</button>
              <p>{this.state.work}</p>
              <button name='work' className='btn' onClick={this.decrement}>-</button>
            </div>
          </div>
          <div className='break'>
            <p>Break length</p>
            <div className='timer-controls'>
              <button name='break' className='btn' onClick={this.increment}>+</button>
              <p>{this.state.break}</p>
              <button name='break'className='btn' onClick={this.decrement}>-</button>
            </div>
          </div>
        </div>
        <div className='timer-title'>
          <h1>{this.state.session}</h1><br />
          <h1>{time}</h1>
        </div>
        <div className='timer-but'>
          <button className='btn btn-success' onClick={this.start}>Start</button>
          <button className='btn btn-warning' onClick={this.stop}>Stop</button>
          <button className='btn btn-danger' onClick={this.reset}>Reset</button>
        </div>
        <hr />
      </div>
    )
  }
}

export default Timer
