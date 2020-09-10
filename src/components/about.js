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
        <p className='text-faded'>I'm a Software Engineer since 2001 with extensive experience in the SLDC of products and custom projects, using agile methodologies, common design patterns and SOLID principles.</p>
        <p className='text-faded'>I've worked extensively in the analysis and design of Java Web Applications addressed at automating the business processes in the purchasing department of sectors as diverse as Telecom, Pharma, Steel & Mining, Ventilation, Oil & Gas, Public and Airlines between others.</p>
        <p className='text-faded'>Between 2006 and 2020, my work was used by almost 100 companies in 10 countries working with 47K suppliers and it has integrated with ERPs like Microsoft Dynamics, SAP, Oracle JD Edwards, IBM AS / 400 and Movex.</p>
        <p className='text-faded'>Since 2019 I enjoy developing Mobile Apps using Expo, React Native, React Navigation and React Redux.</p>
        <p className='text-faded'>&nbsp;</p>

        <h4>Background</h4>
        <hr className='sub' />
        <div className="row">
          <div className="col s12 m4" style={{ paddingTop: '50px' }} >
            <img src={cleverLogo} alt="Clever Global" className='bgImg responsive-img' style={{ width: '80%' }} />
            <div className="background-text text-faded">
              Responsible for the development and evolution of <strong>iQuotes Suite®</strong>, a Java Web Application for <em>strategic purchasing management</em>.
            </div>
            <div className="background-text text-faded">
              Designed and implemented <strong>iQuotes Suite®</strong> projects that integrates with {"clients'"} <em>ERPs and Marketplaces</em>, including functional APIs, single sign-on, integrated look-and-feel and deployment in multiple platforms like BEA WebLogic, JBoss, Tomcat and IBM WebSphere.
            </div>
          </div>
          <div className="col s12 m4" style={{ paddingTop: '50px' }} >
            <img src={wincorNixdorfLogo} alt="Wincor Nixdorf" className='bgImg responsive-img' style={{ width: '80%' }} />
            <div className="background-text text-faded">
              Developed a VB6/COM+ windows-based module of <strong>INFINIX TransX</strong> solution related to the <em>banking area for Corp Banca</em>.
            </div>
            <div className="background-text text-faded">
              Designed and implemented several software solutions for the <strong>ProCash Deposit Terminal</strong> and the <strong>ProPrint 2000 Customer Information Printer / Interactive Kiosk Terminal</strong> for <em>Banesco and Banco de Venezuela</em>.
            </div>
          </div>
          <div className="col s12 m4" style={{ paddingTop: '50px' }} >
            <img src={usbLogo} alt="USB" className='bgImg responsive-img' style={{ width: '80%' }} />
            <div className="background-text text-faded">
              Earning my bachelor's degree in <strong>Computer Engineering</strong> is how I acquired my logical and analytical skills.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
