import React from 'react'
import ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify';
import Overview from './Dashboard/Overview';
import "react-toastify/dist/ReactToastify.css";


if (module.hot) {
    module.hot.accept();
  }

class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <Overview />
            <ToastContainer></ToastContainer>
            </div>


    }
}

const wrapper = document.getElementById('root')
wrapper ? ReactDOM.render(<Main />, wrapper) : console.log('Unable to locate root')
