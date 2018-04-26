import React from 'react';

import awsLogo from '../assets/images/skills/aws.png';
import javaLogo from '../assets/images/skills/java.png';
import psmLogo from '../assets/images/skills/psm-1.png';

import oopLogo from '../assets/images/skills/oop.png';
import toolsLogo from '../assets/images/skills/tools.png';

import htmlLogo from '../assets/images/skills/html_logo.png';
import cssLogo from '../assets/images/skills/css_logo.png';
import jsLogo from '../assets/images/skills/javascript_logo.png';

import responsiveDesign from '../assets/images/skills/responsive-design.png';
import materialDesign from '../assets/images/skills/material-design.png';

import meanLogo from '../assets/images/skills/mean.png';
import gitnpmLogo from '../assets/images/skills/git-npm.png';
import cloudsLogo from '../assets/images/skills/clouds.png';
import mobilesLogo from '../assets/images/skills/mobiles.png';

import reactLogo from '../assets/images/skills/react-logo.png';
import lambdaLogo from '../assets/images/skills/lambda.png';
import cicdLogo from '../assets/images/skills/ci-cd.gif';

export default props => {

  return (
    <section id='skills'>
      <h3>Technical Skills</h3>
      <hr />
      <div className="container">

        <div className="row">
          <div className="col s12 l4 skills">
            <img className="col s12 awsLogo" src={awsLogo} alt="AWS" style={{padding: '25px'}} />
          </div>
          <div className="col s12 l4 skills">
            <img className="col s11 javaLogo" src={javaLogo} alt="JAVA" style={{padding: '25px'}} />
          </div>
          <div className="col s12 l4 skills">
            <img className="col s12 psmLogo" src={psmLogo} alt="Scrum" style={{padding: '25px'}} />
          </div>
        </div>

        <br />
        <hr />
        <br />

        <div className="row">
          <div className="col s12 l5 skills">
            <div className="col s6 push-l6 skillsText"><strong>Object Oriented Programming</strong> and <strong>S.O.L.I.D. principles</strong> are essential in my day-to-day basis</div>
            <img className="col s6 pull-l6 oopLogo" src={oopLogo} alt='OOP' />
          </div>
          <div className="col s12 l7 skills">
            <img className='col s5 toolsLogo' src={toolsLogo} alt="Tools" />
            <div className="col s7 skillsText"><strong>Intellij IDEA, MySQL, CVS, Jenkins,</strong> and <strong>Visual Paradigm</strong> are the tools that I work everyday</div>
          </div>
        </div>

        <div className="row">
          <div className="col s12 l6 skills">
            <img className="col s2 jsLogo" src={jsLogo} alt="JS" />
            <img className="col s2 htmlLogo" src={htmlLogo} alt="HTML" />
            <img className="col s2 cssLogo" src={cssLogo} alt="CSS" />
            <div className="col s6 skillsText"><strong>Javascript, HTML5</strong> and <strong>CSS3</strong> are fundamental skills for any web developer</div>
          </div>
          <div className="col s12 l6 skills">
            <div className="col s6 push-l6 skillsText"><strong>Responsive design</strong> using <strong>Material Design</strong></div>
            <img className='col s3 pull-l6 responsiveLogo' src={responsiveDesign} alt='Responsive Design' />
            <img className='col s3 pull-l6 bootstrapLogo' src={materialDesign} alt='BootStrap Material Design PhotoShop Illustrator' />
          </div>
        </div>

        <div className="row">
          <div className="col skills">
            <img className='col s4 meanLogo' src={meanLogo} alt='MEAN' />
            <img className='col s3 mobilesLogo' src={mobilesLogo} alt='Mobiles' />
            <img className='col s3 cloudsLogo' src={cloudsLogo} alt='Clouds' />
            <img className='col s2 gitnpmLogo' src={gitnpmLogo} alt='GIT-npm' />
          </div>
          <div className="col skills">
            <div className="col s12 skillsText">I{"'"}ve been playing with these technologies since 2014 through various courses, but I was able to go deep enough in 2016 & 2017, in the <strong>3rd Edition</strong> of the <strong>KeepCoding® Mobile Startup Engineer Bootcamp</strong></div>
          </div>
        </div>

        <div className="row">
          <div className="col skills">
            <img className='col s2 reactLogo' src={reactLogo} alt='React' />
            <img className='col s2 lambdaLogo' src={lambdaLogo} alt='Lambda' />
            <img className='col s2 cicdLogo' src={cicdLogo} alt='CI/CD' />
            <div className="col s6 skillsText">Fresh from the oven... this portfolio is a <strong>Serverless SPA</strong> developed with <strong>ReactJS, MaterializeCSS and Continuous Delivery on AWS & Java8</strong></div>
          </div>
        </div>

      </div>
    </section>
  );
}
