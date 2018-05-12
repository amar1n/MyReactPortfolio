import efimerum from '../images/work/efimerum.png';
import portfolio from '../images/work/portfolio.png';
import portfolioArchitecture from '../images/work/myPortfolioArchitecture.png';

export default [
    {   
        name: 'Efimerum\'s backend',
        info: 'EFIMERUM is an App that allows you to share photos without ornaments in an ephemeral way, where the life of the photo is not decided by the user who publishes it, but rather by the community through its "Likes". The Backend was developed with Express.js, Firebase and Google Cloud Platform (Vision, Storage, Compute Engine).',
        img: efimerum,
        alt: 'Contact List',
        codeLink: 'https://github.com/amar1n/efimerum-backend',
        demoLink: '',
        youtubeLink: 'https://youtu.be/S3Vpv01AwRc',
        imgLarge: ''
    },
    {
        name: 'Serverless Portfolio',
        info: 'My serverless portfolio using Git, GitHub, AWS (API Gateway, Lambda, S3, CloudFront, IAM, Route 53, SNS, CodeBuild, CodePipeline), Java8, ReactJS, Material Design, Font Awesome, NPM, Webpack and Babel.',
        img: portfolio,
        alt: 'Portfolio',
        codeLink: 'https://github.com/amar1n/MyReactPortfolio',
        demoLink: '',
        youtubeLink: '',
        imgLarge: portfolioArchitecture
    },
];
