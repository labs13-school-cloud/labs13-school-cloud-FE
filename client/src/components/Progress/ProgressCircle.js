import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Logo from '../../img/training-bot.png';
import styled from 'styled-components';

const styles = theme => ({
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: '50%',
    width: '150px',
  },
});

function ProgressCircle(props) {
  const {classes} = props;
  return (
    <div>
      <LogoImage src={Logo} />
      <CircularProgress className={classes.progress} size="50px" />
    </div>
  );
}

ProgressCircle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProgressCircle);

const LogoImage = styled.img`
  width: 25px;
  position: absolute;
  right: 45.8%;
  top: 52.5%;
`;
