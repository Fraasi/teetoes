import React from 'react'
import Fieldsets from './components/Fieldsets.jsx';

export default class App extends React.Component {

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
