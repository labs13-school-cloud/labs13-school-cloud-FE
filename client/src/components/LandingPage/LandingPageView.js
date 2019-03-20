// contains all components for landing page
import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

const LandingPageView = props => {
    return (
        <>
            <Link to="/training-series"><Button color="primary" variant="contained">Register</Button></Link>
        </>
    )
}

export default LandingPageView;