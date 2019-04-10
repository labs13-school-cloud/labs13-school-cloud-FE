import React, {Component} from 'react';
//Loading SVG that gets displayed
import loading from './loading.svg';

//Auth
import {setAccessToken, setIdToken} from '../../Auth/Auth';
import history from '../../history';

class Callback extends Component {
  componentDidMount() {
    setAccessToken();
    setIdToken();
    history.push('/home');
  }
  render() {
    //Customized styling
    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    };

    return (
      <div style={style}>
        <img src={loading} alt="loading" />
      </div>
    );
  }
}

export default Callback;
