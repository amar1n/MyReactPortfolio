import React from 'react';
import Modal from 'react-modal';
import ReactPlayer from 'react-player'

const customStyles = {
    overlay: {
        zIndex: '1000'
    },
    content: {
        top: '50%',
        left: '50%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0
    }
};

class CardWork extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeCard = this.closeCard.bind(this);

        this.myCardTitleRef = React.createRef();
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    closeCard() {
        this.myCardTitleRef.current.click();
    }

    render() {
        let codeBtn = null;
        let demoBtn = null;
        let youtubeBtn = null;
        let imgModalBtn = null;
        let appleStoreBtn = null;
        let googlePlayBtn = null;

        if (this.props.code !== "") {
            codeBtn = (<a className="waves-effect waves-light btn" target="_blank" href={this.props.code}><i className="fab fa-rebel pull-right"></i>code&nbsp;&nbsp;</a>);
        }

        if (this.props.demo !== "") {
            demoBtn = (<a className="waves-effect waves-light btn" target="_blank" href={this.props.demo}><i className="fab fa-empire pull-right"></i>demo&nbsp;&nbsp;</a>);
        }

        if (this.props.youtube !== "") {
            youtubeBtn = (
                <span>
                    <a className="waves-effect waves-light btn" onClick={this.openModal}><i className="fab fa-youtube pull-right"></i></a>
                    <Modal
                        appElement={document.getElementById('root')}
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Youtube Modal"
                    >
                        <span style={{ cursor: 'pointer' }} onClick={this.closeModal}><i className="fas fa-times pull-right fa-xs"></i></span>
                        <h5>{this.props.title}</h5>
                        <ReactPlayer url={this.props.youtube} controls width="100%" />
                    </Modal>
                </span>
            );
        }

        if (this.props.imgLarge !== "") {
            imgModalBtn = (
                <span>
                    <a className="waves-effect waves-light btn" onClick={this.openModal}><i className="fas fa-expand-arrows-alt pull-right"></i></a>
                    <Modal
                        appElement={document.getElementById('root')}
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Image Modal"
                    >
                        <span style={{ cursor: 'pointer' }} onClick={this.closeModal}><i className="fas fa-times pull-right fa-xs"></i></span>
                        <h5>{this.props.title}</h5>
                        <img src={this.props.imgLarge} alt="Description" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50%' }} />
                    </Modal>
                </span>
            );
        }

        if (this.props.appleStore !== "") {
          appleStoreBtn = (
              <span
                dangerouslySetInnerHTML={{ __html: this.props.appleStore }}
              ></span>
          );
        }

        if (this.props.googlePlay !== "") {
          googlePlayBtn = (
              <span
                dangerouslySetInnerHTML={{ __html: this.props.googlePlay }}
              ></span>
          );
        }

        let myStyle = {};
        if (this.props.index !== 0) {
            myStyle = {
                marginTop: '5%'
            }
        }

        return (
            <div style={myStyle} className="card hoverable col s10 offset-s1 m6 offset-m3 l6 offset-l3">
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator work-img" src={this.props.src} alt={this.props.alt} style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
                <div className="card-content">
                    <span className="card-title activator">{this.props.title}<i className="fas fa-plus pull-right fa-xs"></i></span>
                    {codeBtn}
                    {demoBtn}
                    {youtubeBtn}
                    {imgModalBtn}
                    <div style={{display:"flex", alignItems:"center", justifyContent:"flex-start"}}>
                        {appleStoreBtn}
                        {googlePlayBtn}
                    </div>
                </div>

                <div style={{ whiteSpace: 'pre-wrap' }}  className="card-reveal">
                    <span className="card-title card-open" ref={this.myCardTitleRef}></span>
                    <p style={{ cursor: "pointer" }} onClick={this.closeCard}><b><span style={{ fontSize: "medium" }}>{this.props.title}</span></b>{this.props.info}</p>
                    {codeBtn}
                    {demoBtn}
                    {youtubeBtn}
                    {imgModalBtn}
                    <div style={{display:"flex", alignItems:"center", justifyContent:"flex-start"}}>
                        {appleStoreBtn}
                        {googlePlayBtn}
                    </div>
                </div>
            </div>
        )
    };
}

export default CardWork;