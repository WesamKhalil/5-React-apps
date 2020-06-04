import React from 'react'
//Import css to style this component
import '../styles/Markdown.css'
//Import 'marked' node package
import marked from 'marked'

//Default text
let defaultText =
`# H1 element
## H2 element
### H3 element

This is a [link](www.google.com)

\`\`\`
//this is a code block

function helloWorld() {
  alert('hello world')
}
\`\`\`
This is a single line of code \`<div></div>\`

*This text* and _this text_ is italics

**This text** and __this text__ is strong

~~~This text is crossed out~~

> This is a quote

* item 1
* item 2
* item 3
  * Nested item

1. item 1
1. item 2
1. item 3

![logo](https://goo.gl/Umyytc)`

//Our markdown component
class Markdown extends React.Component {
  constructor() {
    super()
    this.state = {
      //Sets dsiplay to defaultText by default
      display: defaultText
    }
    this.update = this.update.bind(this)
  }

  //Updates the text put in the markdown in real time
  update(e) {
    this.setState({display: e.target.value})
  }

  render() {
    //We put a text area with an onChange event that fires the update function and it has a value of display
    //Then we have a div with the className of 'text-output' and an attribute of dangerouslySetInnerHTML equal to the display value
    //We do this because malicious code can be run through here so we have to override safety barriers
    return (
      <div>
        <h1 className='md-title'>Markdown previewer</h1>
        <p>You can enter text to the box on the left with certain symbols and it will convert it to html.
        There are some examples in the input box by default.</p>
        <div className='md-content'>
          <div className='input-box'>
            <h3>Text input</h3>
            <textarea
              className='text-input'
              onChange={this.update}
              value={this.state.display}/>
          </div>
          <div className='output-box'>
            <h3>Text output</h3>
            <div
              className='text-output'
              dangerouslySetInnerHTML={{__html: marked(this.state.display)}}/>
          </div>
        </div>
        <hr />
      </div>
    )
  }
}

export default Markdown
