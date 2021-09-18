import React from 'react'
import Fieldsets from './components/Fieldsets.jsx';

export default class App extends React.Component {

  componentDidMount() {
    // window.speechSynthesis.getVoices()
  }
  // constructor() {
  //   this.state = {
  //     voices: []
  //   }
  //   this.voices = []
  //   window.addEventListener("load", () => {
  //     this.voices = window.speechSynthesis.getVoices();
  //     if (window.localStorage) {
  //       if (!localStorage.getItem('refresh')) {
  //         localStorage['refresh'] = true;
  //         location.reload(true);
  //       } else {
  //         localStorage.removeItem('refresh');
  //         console.log('refresh:', refresh)
  //         this.state({
  //           voices: this.voices
  //         })
  //       }
  //     }
  //   })

  //   if (!localStorage.getItem('refresh')) {
  //     localStorage['refresh'] = true;
  //     location.reload(true);
  //   } else {
  //     localStorage.removeItem('refresh');
  //   }
  // }

  componentDidCatch(err, info) {
    console.log('app componentDidCatch');
    console.log('err', err);
    console.log('info', info);
  }

  render() {
    return (
      <div className="app">
        <Fieldsets />
      </div>);
  }
}
