import React from 'react';
import CardWork from './work_card';

class Works extends React.Component {
    render() {
        let workDataArray = this.props.data;

        const workList = workDataArray.map((item, index) => {
            return (
                <CardWork
                    title={item.name}
                    info={item.info}
                    src={item.img}
                    key={index}
                    alt={item.alt}
                    code={item.codeLink}
                    demo={item.demoLink}
                    youtube={item.youtubeLink}
                    imgLarge={item.imgLarge}
                />
            );
        });

        return (
            <section id='work'>
                <h3>My Work</h3>
                <hr />
                <div className="row">
                    {workList}
                </div>
            </section>
        );
    }
}

export default Works;