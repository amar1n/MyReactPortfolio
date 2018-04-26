import React from 'react';
import splash from '../assets/images/landing/splash.jpg';

export default props => {
    return (
        <div className='landing-img' id="landing">
            <img src={splash} alt="Landing" />
        </div>
    );
}
