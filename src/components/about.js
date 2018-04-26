import React from 'react';

import cleverLogo from '../assets/images/about/clever.png';
import wincorNixdorfLogo from '../assets/images/about/wincor-nixdorf.png';
import usbLogo from '../assets/images/about/usb-logo.png';

export default props => {

  return (
    <section id='about'>
      <div className="container">
        <h3>Who Am I?</h3>
        <hr />
        <p className='text-faded'>I am software engineer with over 17 years of full lifecycle development experience of products and custom projects, using agile methodologies, common design patterns and SOLID principles.</p>
        <p className='text-faded'>I have worked extensively in the analysis and design of J2EE Web Applications addressed at automating the business processes in the purchasing department of sectors as diverse as Telecom, Pharma, Steel & Mining, Ventilation, Oil & Gas, Public and Airlines between others.</p>
        <p className='text-faded'>Since 2006, my work has been used by almost 100 companies in 10 countries working with 47,000 suppliers and integrated with several ERPs like Microsoft Dynamics, SAP, Oracle JD Edwards, IBM AS/400 and Movex.</p>
        <p className='text-faded'>&nbsp;</p>

        <h4>Background</h4>
        <hr className='sub' />
        <div className="row">
          <div className="col s12 m4">
            <img src={cleverLogo} alt="LearningFuze" className='bgImg responsive-img' style={{ width: '75%' }} />
            <div className="background-text text-faded">
              Responsible for the development and evolution of <strong>iQuotes Suite®</strong>, a J2EE Web Application for <em>strategic purchasing management</em>.
                </div>
            <div className="background-text text-faded">
              Designed and implemented <strong>iQuotes Suite®</strong> projects that integrates with {"clients'"} <em>ERPs and Marketplaces</em>, including functional APIs, single sign-on, integrated look-and-feel and deployment in multiple platforms like BEA WebLogic, JBoss, Tomcat and IBM WebSphere.
                </div>
          </div>
          <div className="col s12 m4">
            <img src={wincorNixdorfLogo} alt="Kingston" className='bgImg responsive-img' style={{ width: '50%' }} />
            <div className="background-text text-faded">
              Developed a VB6/COM+ windows-based module of <strong>INFINIX TransX</strong> solution related to the <em>banking area for Corp Banca</em>.
                </div>
            <div className="background-text text-faded">
              Designed and implemented several software solutions for the <strong>ProCash Deposit Terminal</strong> and the <strong>ProPrint 2000 Customer Information Printer / Interactive Kiosk Terminal</strong> for <em>Banesco and Banco de Venezuela</em>.
                </div>
          </div>
          <div className="col s12 m4">
            <img src={usbLogo} alt="Cal Poly" className='bgImg responsive-img' style={{ width: '35%' }} />
            <div className="background-text text-faded">
              Earning my bachelor's degree in <strong>Computer Engineering</strong> is how I acquired my logical and analytical skills.
                </div>
          </div>
        </div>
      </div>
    </section>
  );
}
