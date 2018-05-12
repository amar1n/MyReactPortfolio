import React, { Component } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll'

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            open: false,
            closeHover: false
        }

        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
        window.addEventListener('scroll', this.handleScroll);
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
        window.removeEventListener('scroll', this.handleScroll);
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    scrollToTop() {
        scroll.scrollToTop();
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    }

    handleScroll = () => {
        this.setState({
            open: false
        });
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                open: false
            });
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    openNav() {
        this.setState({
            open: true
        });
    }

    closeNav() {
        this.setState({
            open: false
        });
    }

    closeHover() {
        this.setState({
            closeHover: true
        });
    }

    closeNotHover() {
        this.setState({
            closeHover: false
        });
    }

    render() {
        const { width, closeHover } = this.state;
        const isMobile = width <= 991;
        let navbar = {};

        if (isMobile) {
            navbar = (
                <nav>
                    <div ref={this.setWrapperRef} className="nav-wrapper container">
                        <a className='nav-text-name center brand-logo' onClick={() => scroll.scrollToTop()}>Alberto</a>
                        <a className="button-collapse" onClick={this.openNav}><i className="material-icons">menu</i></a>
                        <ul className={`side-nav ${this.state.open ? 'visible' : 'hidden'}`} tabIndex="0" onBlur={this.closeNav}>
                            <li><a className='nav-text' onClick={this.closeNav} onMouseEnter={this.closeHover.bind(this)} onMouseLeave={this.closeNotHover.bind(this)}><i className={`${closeHover ? "white-color" : "black-color"} material-icons left sideNavClose`}>close</i></a></li>
                            <li><Link activeClass="active" className="nav-text" to="work" smooth={true} duration={500}>Work</Link></li>
                            <li><Link activeClass="active" className="nav-text" to="about" smooth={true} duration={500}>About</Link></li>
                            <li><Link activeClass="active" className="nav-text" to="skills" smooth={true} duration={500}>Skills</Link></li>
                            <li><Link activeClass="active" className="nav-text" to="courses" smooth={true} duration={500}>Courses</Link></li>
                            <li><Link activeClass="active" className="nav-text" to="contact" smooth={true} duration={500}>Contact</Link></li>
                        </ul>
                    </div>
                </nav>
            );
        } else {
            navbar = (
                <nav>
                    <div className="nav-wrapper container">
                        <a className='nav-text-name' onClick={() => scroll.scrollToTop()}>Alberto</a>
                        <ul className="right hide-on-sm-and-down">
                            <li><Link activeClass="active" className="nav-text" to="work" smooth={true} duration={500}>Work</Link></li>
                            <li><Link activeClass="active" className="nav-text" to="about" smooth={true} duration={500}>About</Link></li>
                            <li><Link activeClass="active" className="nav-text" to="skills" smooth={true} duration={500}>Skills</Link></li>
                            <li><Link activeClass="active" className="nav-text" to="courses" smooth={true} duration={500}>Courses</Link></li>
                            <li><Link activeClass="active" className="nav-text" to="contact" smooth={true} duration={500}>Contact</Link></li>
                        </ul>
                    </div>
                </nav>
            );
        }

        return (
            <div className="navbar-fixed">
                {navbar}
            </div>
        );
    }
}
