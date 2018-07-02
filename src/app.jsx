import React from 'react'
import Header from './components/Header.jsx'
import Textarea from './components/Textarea.jsx';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      playing: false,
    }
  }


	// handleControllerClicks() {	}

  render() {
    return (<div>
      <Header />
      <Textarea />
    </div>);
  }
}
