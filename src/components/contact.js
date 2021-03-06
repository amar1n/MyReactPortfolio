import React, { Component } from 'react';
import axios from 'axios';
import Recaptcha from 'react-recaptcha';

export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVerified: false,
            name: '',
            message: '',
            email: '',
            subject: '',
            response: '',
            submit: false,
            redMsg: false,
            emailValid: true
        }
        this.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
        this.recaptchaVerifyCallback = this.recaptchaVerifyCallback.bind(this);
        this.sendData = this.sendData.bind(this);
        this.validEmail = this.validEmail.bind(this);
    }

    recaptchaLoaded() {
        console.log('Recaptcha successfully loaded!!!');
    }

    recaptchaVerifyCallback(response) {
        if (response) {
            this.setState({
                isVerified: true
            });
        }
    }

    sendData(event) {
        event.preventDefault();

        const { name, email, subject, message } = this.state;
        let response = '';
        let sendToServer = true;

        if (!this.state.isVerified) {
            this.setState({
                response: 'Please verify that you are a human',
                redMsg: true
            });
            sendToServer = false;
        } else if (!/\S/.test(name)) {
            this.setState({
                response: 'Please enter a name',
                redMsg: true
            });
            sendToServer = false;
        } else if (this.emailRegex.test(email) === false) {
            this.setState({
                response: 'Please enter a valid email',
                redMsg: true,
                emailValid: false
            });
            sendToServer = false;
        } else if (!/\S/.test(subject)) {
            this.setState({
                response: 'Please enter a subject',
                redMsg: true
            });
            sendToServer = false;
        } else if (!/\S/.test(message)) {
            this.setState({
                response: 'Please enter a message',
                redMsg: true
            });
            sendToServer = false;
        }

        if (sendToServer) {
            let data = { name, email, subject, message }
            axios.post('https://tjjvf0wus3.execute-api.us-east-1.amazonaws.com/prod/', JSON.stringify(data),
                { headers: { 'Content-Type': 'text/plain', 'x-api-key': 'jaTpFWG8fW5OAYfBV8gHb9sAHi5PuLLa8eJJVgoM' } })
                .then(resp => {
                    this.updateState(resp);
                }).catch(err => {
                    this.errorResponse(err);
                });

            this.setState({
                submit: true
            });
        }
    }

    errorResponse(error) {
        this.setState({
            response: 'There was an issue sending the email. Please try again!',
            submit: false,
            redMsg: true
        });
    }

    updateState(response) {
        if (response.data.success) {
            this.setState({
                name: '',
                message: '',
                email: '',
                subject: '',
                response: response.data.message,
                submit: false,
                redMsg: false
            });
        } else {
            this.setState({
                response: response.data.message,
                submit: false,
                redMsg: true
            });
        }

    }

    validEmail(e) {
        let email = e.target.value;
        if (this.emailRegex.test(email) === false) {
            this.setState({
                email: email,
                emailValid: false
            });
        } else {
            this.setState({
                email: email,
                emailValid: true
            });
        }
    }

    render() {
        const { name, subject, email, message, response, submit, redMsg, emailValid } = this.state;
        let submitResult = {};
        let emailStyle = {};

        if (emailValid === false) {
            emailStyle = {
                borderBottom: '1px solid #F44336',
                boxShadow: '0 1px 0 0 #F44336'
            }
        }

        if (submit) {
            submitResult = (
                <div className="preloader-wrapper contact-response active">
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            );
        } else {
            submitResult = <div className={`${redMsg ? "red-text" : "black-color"} contact-response`}>{response}</div>;
        }

        return (
            <section id='contact'>
                <div className="container">
                    <h3>Contact Me</h3>
                    <hr />
                    <p className='text-faded contact dark'><strong>Remember, all I'm offering is the truth. Nothing more.</strong> Morpheus, The Matrix</p>
                    <div className="row">

                        <form className="col s12" onSubmit={this.sendData}>
                            <div className="row">
                                <div className="input-field col s12 m6">
                                    <i className="material-icons prefix">account_circle</i>
                                    <input id="icon_prefix" type="text" className="validate" placeholder="Name" name="name" value={name} onChange={e => this.setState({ name: e.target.value })} />
                                </div>
                                <div className="input-field col s12 m6">
                                    <i className="material-icons prefix">email</i>
                                    <input id="icon_email" type="text" style={emailStyle} className="validate" placeholder="Email" name="email" value={email} onChange={e => this.validEmail(e)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">mode_edit</i>
                                    <input id="icon_prefix2" className="validate" type="text" placeholder="Subject" name="subject" value={subject} onChange={e => this.setState({ subject: e.target.value })} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <textarea id="textArea1" className="materialize-textarea validate" type="text" placeholder="Message" value={message} name="message" onChange={e => this.setState({ message: e.target.value })} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <button className="btn waves-effect waves-light" type="submit" name="action">Submit<i className="material-icons right">send</i></button>
                                    {submitResult}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <Recaptcha
                                        sitekey="6LfZYmEUAAAAAGC8r5vwi1P6-Ebibv53Nz83twNv"
                                        render="explicit"
                                        verifyCallback={this.recaptchaVerifyCallback}
                                        onloadCallback={this.recaptchaLoaded} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}