import React from 'react'
import ReactDOM from 'react-dom'
import Overview from './Dashboard/Overview';

if (module.hot) {
    module.hot.accept();
  }

class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Overview />


    }
}

const wrapper = document.getElementById('root')
wrapper ? ReactDOM.render(<Main />, wrapper) : console.log('Unable to locate root')
