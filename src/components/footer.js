import React from 'react';

import cv from '../../AlbertoMarinGarciaResume.pdf';

export default props => {
  return (
    <section className="footer">
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h3>{"Let's Connect!"}</h3>
            <hr className="sub" />
            <p className="text-faded contact dark"><strong>Do, or do not. There is no “try”.</strong> Yoda, The Empire Strikes Back</p>
            <div className="row footerRow">
              <div className="footer-links">
                <a className="" target="_blank" rel="noopener noreferrer" href="https://github.com/amar1n"><div style={{ color: 'black' }}><i className="fab fa-github fa-3x"></i></div></a>
              </div>
              <div className="footer-links">
                <a className="" target="_blank" href={cv}><i className="far fa-file-alt fa-3x"></i></a>
              </div>
              <div className="footer-links">
                <a className="" target="_blank" rel="noopener noreferrer" href="https://linkedin.com/in/albertomaringarcia"><div style={{ color: 'black' }}><i className="fab fa-linkedin fa-3x"></i></div></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container">
          © 2018
            <div className="right">Built with React, MaterializeCSS and Font Awesome</div>
        </div>
      </div>
    </section>
  );
}
