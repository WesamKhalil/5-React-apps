import React from 'react'
import '../styles/navbar.css'

export default (props) =>  {
  return (
      <nav>
        <input type="checkbox" className="toggler" />
        <div className="burger">
          <div className="first-bar"></div>
          <div className="second-bar"></div>
          <div className="third-bar"></div>
        </div>
        <div className="menu-box">
          <div className="menu">
            <h1><a href="#intro">Intro</a></h1>
            <h1><a href="">Experience</a></h1>
            <h1><a href="">Skills</a></h1>
            <h1><a href="">Projects</a></h1>
            <h1><a href="">Contact</a></h1>
          </div>
        </div>
      </nav>
  )
}
