import React from 'react';

import CardCourse from './course_card';
import courseDataArray from '../assets/data/courses_data';


export default props => {

    const courseList = courseDataArray.map((item, index) => {
        return (
            <CardCourse
                key={index}
                name={item.name}
                startDate={item.startDate}
                endDate={item.endDate}
                school={item.school}
                duration={item.duration}
                url={item.url}
                highlight={item.highlight}
                loved={item.loved}
            />
        );
    });

    return (
        <section id='courses'>
            <div className="container">
                <h3>My Courses</h3>
                <hr />
                <div className="row">
                    {courseList}
                </div>
            </div>
        </section>
    );
}