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
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0
    }
};

Modal.setAppElement('#root')

class CardWork extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {
        let demoBtn = null;
        let youtubeBtn = null;
        let imgModalBtn = null;

        if (this.props.demo !== "") {
            demoBtn = (<a className="waves-effect waves-light btn" target="_blank" href={this.props.demo}><i className="fab fa-empire pull-right"></i>demo&nbsp;&nbsp;</a>);
        }

        if (this.props.youtube !== "") {
            youtubeBtn = (
                <span>
                    <a className="waves-effect waves-light btn" onClick={this.openModal}><i className="fab fa-youtube pull-right"></i></a>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Youtube Modal"
                    >
                        <h5>{this.props.title}</h5>
                        <ReactPlayer url={this.props.youtube} controls />
                    </Modal>
                </span>
            );
        }

        if (this.props.imgLarge !== "") {
            imgModalBtn = (
                <span>
                    <a className="waves-effect waves-light btn" onClick={this.openModal}><i className="fas fa-expand-arrows-alt pull-right"></i></a>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Image Modal"
                    >
                        <h5>{this.props.title}</h5>
                        <img src={this.props.imgLarge} alt="Description" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '70%' }} />
                    </Modal>
                </span>
            );
        }

        return (
            <div className="card col m6 s12 l4">
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator work-img" src={this.props.src} alt={this.props.alt} style={{ width: '89%' }} />
                </div>
                <div className="card-content">
                    <span className="card-title activator">{this.props.title}<i className="fas fa-plus pull-right fa-xs"></i></span>
                    <a className="waves-effect waves-light btn" target="_blank" href={this.props.code}><i className="fab fa-rebel pull-right"></i>code&nbsp;&nbsp;</a>
                    {demoBtn}
                    {youtubeBtn}
                    {imgModalBtn}
                </div>

                <div className="card-reveal">
                    <span className="card-title card-open">{this.props.title}<i className="fas fa-times pull-right fa-xs"></i></span>
                    <p>{this.props.info}</p>
                    <a className="waves-effect waves-light btn" target="_blank" href={this.props.code}><i className="fab fa-rebel pull-right"></i>code&nbsp;&nbsp;</a>
                    {demoBtn}
                    {youtubeBtn}
                    {imgModalBtn}
                </div>
            </div>
        )
    };
}

export default CardWork;