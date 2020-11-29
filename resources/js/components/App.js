import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NewDashBoard from './NewDashBoard'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path='/' component={NewDashBoard} />
      </div>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
