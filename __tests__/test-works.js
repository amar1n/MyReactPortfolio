'use strict';

import React from 'react';
import { shallow } from 'enzyme';
import Works from '../src/components/works';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import efimerum from '../src/assets/images/work/efimerum.png';

const myWork = [
    {   
        name: 'Efimerum\'s backend',
        info: ' is the heart of EFIMERUM, the App that allows you to share photos without ornaments in an ephemeral way, where the life of the photo is not decided by the user who publishes it, but rather by the community through its "Likes".\n\nDeveloped in 2017 using Express.js, Firebase and Google Cloud Platform (Vision, Storage, Compute Engine).',
        img: efimerum,
        alt: 'Efimerum',
        codeLink: 'https://github.com/amar1n/efimerum-backend',
        demoLink: '',
        youtubeLink: 'https://youtu.be/S3Vpv01AwRc',
        imgLarge: '',
        appleStore: '',
        googlePlay: ''
    },
];

describe("Works component", () => {
    let component = shallow(<Works data={myWork} />);
    let innerComponent = component.find("CardWork").dive().instance();

    it("Should be a 'section' element", () => {
        expect(component.type()).toEqual('section');
    });

    it("Should contain as many children as there are work data", () => {
        expect(component.find("CardWork").length).toEqual(myWork.length);
    });

    it("Should allow the modal to open and close", () => {
        innerComponent.openModal();
        expect(innerComponent.state.modalIsOpen).toBe(true);
        innerComponent.closeModal();
        expect(innerComponent.state.modalIsOpen).toBe(false);
    });

    it("Should have the youtube link set correctly", () => {
        expect(component.find("CardWork").prop('youtube')).toEqual(myWork[0].youtubeLink);
    });
});