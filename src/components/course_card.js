import React from 'react';

export default props => {

    let courseName = props.name;
    let lovedIcon = null;
    let highlightIcon = null;

    if (props.url !== "") {
        courseName = (<a href={props.url} target="_blank">{props.name}</a>);
    }

    if (props.loved !== "") {
        lovedIcon = (<span>&nbsp;&nbsp;<i className="fa fa-heart fa-5" aria-hidden="true" title="I really love it!!!"></i></span>);
    }

    if (props.highlight !== "") {
        highlightIcon = (<span>&nbsp;&nbsp;<i className="fa fa-diamond" aria-hidden="true" title="It is a jewel!!!"></i></span>);
    }

    return (
        <div className="card hoverable col s10 offset-s1 m6 l3">
            <p>
                {courseName}
                {lovedIcon}
                {highlightIcon}
                <br />
                <i>{props.duration} - {props.endDate}</i>
                <br />
                <strong>{props.school}</strong></p>
        </div>
    );
}
