import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const MaterialApp = (props) => {
  return(
    <React.Fragment>
      <CssBaseline>
        <App />
      </CssBaseline>
    </React.Fragment>
  )
}

ReactDOM.render(<MaterialApp />, document.getElementById('root'));
registerServiceWorker();
