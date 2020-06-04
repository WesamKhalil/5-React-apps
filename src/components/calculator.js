import React from 'react'
//Import css to style this component
import '../styles/Calculator.css'

//Our calculator component
class Calculator extends React.Component {
  constructor() {
    super()
    this.state = {
      //What will be displayed on the calc by default
      display: '0'
    }
    this.inputOpr = this.inputOpr.bind(this)
    this.inputNum = this.inputNum.bind(this)
    this.decrement = this.decrement.bind(this)
    this.result = this.result.bind(this)
    this.period = this.period.bind(this)
    this.reset = this.reset.bind(this)
  }

  //The input operator function that adds arithmetic operations to the state.display
  inputOpr(e) {
    //e.persist() allows the event to update to the current value before running the code
    e.persist()
    //We can't have one operator after another, only an operator after a number
    //When we add an operator we also add a space before and after the operator
    //So if we check for a space at the end of state.display then we'll know if it has an operator on the end
    //This code only works if there's a number at the end of state.display, it doesn't work with a space/operator on the end
    if(this.state.display.slice(-1) != ' ') {
      //Gets the previous value for state.display and adds the operator to the end
      this.setState((prevState) => {
        return {display: prevState.display + e.target.name}
      })
    }
  }

  //Adds number to the end of state.display
  inputNum(e) {
    //Again e.persist() allows the event to update to the current value before running the code
    e.persist()
    //Checks if display is the initial value or since we don't want to have a number starting with zero
    if(this.state.display == '0') {
      //Display becomes whatever number we pressed
      this.setState({display: e.target.name})
      //Checks if display ends with a number and not a space/operator
      //We do this to avoid starting numbers with zeros, also don't miss the exclamation
      //If we get the scenario where display ends with a space and the input number is zero then the code won't run, if either one differs the code will run
    } else if(!(this.state.display.slice(-1) == ' ' && e.target.name == '0')) {
      this.setState((prevState) => {
        //We append a number to the end of display
        return {display: prevState.display + e.target.name}
      })
    }
  }


  //Handles putting periods/dots  like this --> . <--
  period() {
    //We get the last number from disaply and store it as lastStr
    let lastStr = this.state.display.split(' ').slice(-1)[0];
    //We check if this number already has a period because we don't want to add a second one
    //lastStr can only be a number or an empty string so we also check that it isn't an empty string
    if(lastStr.indexOf('.') == -1 && lastStr.length > 0) {
      this.setState((prevState) => {
        //If the string doesn't have a period and isn't empty we add a period to the end of it
        return {display: prevState.display + '.'}
      })
    }
  }

  //Function to take away values
  decrement() {
    //Length represents the number of characters we remove
    //By default it's one which is for taking away numbers
    let length = 1
    //But if the last charcter is an operator then we have to change length to three to take away the spaces before and after an operator
    if(this.state.display.slice(-1) == ' ') {
      length = 3
    }
    //Checks if we're removing the only character left
    if(this.state.display.length == 1) {
      //If it is the last character we set it to zero which is the default value, we don't want an empty calculator
      this.setState({
        display: '0'
      })
    //If it isn't the last character then we proceed to remove the last character normally
    } else {
      this.setState(function(prevState) {
        //We take away length number of characters depending if the last character was a number (one) or an operator (three)
        return {display: prevState.display.slice(0, -length)}
      })
    }
  }

  //produces the result of our arithmetic calculations, we use the eval function to do the arithmetics
  result() {
    //We get the display string and replace any 'X' with a '*', because we use the eval function which uses '*' for multiplication and doesn't recognize 'x'
    let product = this.state.display.replace('x', '*')
    //If display ends with a space/operator then run the code
    if(this.state.display.slice(-1) == ' ') {
      //We run eval but remove the operator (last three characters) from product and pass the new string as the argument to eval
      //Product is set to the answer we get
      product = eval(product.slice(0, -3))
      //If there's no operator at the end of display then we pass product as it is into eval
    } else {
      //Product is set to the answer we get
      product = eval(product)
    }
    //You can't divide by zero, if you do eval will give back a value of infinite so we check for it
    if(isFinite(product)) {
      //If product is finite then we update display to equal product
      this.setState({display: String(product)})
    } else {
      //If it isn't finite we send an alert  with a message
      alert("Erro! Number is not finite!")
    }
  }


  //Resets display value to zero
  reset() {
    this.setState({display: '0'})
  }

  render() {
    /* We have a title telling us what the component is, then a paragraph explaining what the component is.
    Then we have fourteen button elements which are organised using CSS grid in the parent div.
    We have reset, ce, period, equal sign and ten number buttons all with a name and an onclick event which the name is passed down to through the target value.
    Each of these buttons fire their own function respective to their roles, so numbers fire inputNum, reset fires reset, ce fires decrement, period fires period and equal sign fires result.
    Then we have the four operators which are organised using flex box and is to the right of the rest of the buttons.
    They all fire inputOpr and pass the name through the target value.
    */
    return(
      <div className="calc-container">
        <div className="calc-center">
          <h2 className='calc-title'>Calculator</h2>
          <p>Calculator that performs basic arithmetic. If you divide by zero you'll get an alert "Error! Number is not finite!".</p>
          <input className='calc-input' type='text' readOnly value={this.state.display} />
          <div className='calc-prime'>
            <button className='btn btn-primary' name='7' onClick={this.inputNum}>7</button>
            <button className='btn btn-primary' name='8' onClick={this.inputNum}>8</button>
            <button className='btn btn-primary' name='9' onClick={this.inputNum}>9</button>
            <button className='btn btn-primary' name='4' onClick={this.inputNum}>4</button>
            <button className='btn btn-primary' name='5' onClick={this.inputNum}>5</button>
            <button className='btn btn-primary' name='6' onClick={this.inputNum}>6</button>
            <button className='btn btn-primary' name='1' onClick={this.inputNum}>1</button>
            <button className='btn btn-primary' name='2' onClick={this.inputNum}>2</button>
            <button className='btn btn-primary' name='3' onClick={this.inputNum}>3</button>
            <button className='btn btn-primary' name='0' onClick={this.inputNum}>0</button>
            <button className='btn btn-danger' onClick={this.reset}>RESET</button>
            <button className='btn btn-danger' onClick={this.decrement}>CE</button>
            <button className='btn btn-primary' name='.' onClick={this.period}>.</button>
            <button className='calc-sec-double btn btn-warning' onClick={this.result}>=</button>
          </div>
          <div className='calc-opr'>
            <button className='btn btn-success' name=' + ' onClick={this.inputOpr}>+</button>
            <button className='btn btn-success' name=' - ' onClick={this.inputOpr}>-</button>
            <button className='btn btn-success' name=' x 'onClick={this.inputOpr}>x</button>
            <button className='btn btn-success' name=' / ' onClick={this.inputOpr}>/</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Calculator
