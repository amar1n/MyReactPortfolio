import efimerum from '../images/work/efimerum.png';
import portfolio from '../images/work/portfolio.png';
import portfolioArchitecture from '../images/work/myPortfolioArchitecture.png';
import elCatalejo from '../images/work/elCatalejo.png';

export default [
    {
        name: 'elCatalejo\'s App',
        info: ' is the App for LEGO® fans of all ages!!!\n\nEverything you need for your hobby, news, ideas and great offers selected for you. We track the main stores and find you the best prices. You can also create alarms to define how much you want to pay for the sets and we will notify you when it happens.\n\nDeveloped in 2020 using React Native, Expo 37, React Navigation 5, React Redux, Auth0 and NativeBase.',
        img: elCatalejo,
        alt: 'elCatalejo',
        codeLink: '',
        demoLink: '',
        youtubeLink: '',
        imgLarge: '',
        appleStore: '<a target="_blank" href="https://apps.apple.com/es/app/elcatalejo/id1515539037?mt=8" style="display:inline-block;overflow:hidden;background:url(https://linkmaker.itunes.apple.com/es-es/badge-lrg.svg?releaseDate=2020-06-05&kind=iossoftware&bubble=ios_apps) no-repeat;width:135px;height:40px;"></a>',
        googlePlay: '<a target="_blank" href="https://play.google.com/store/apps/details?id=dev.albertomarin.elcatalejo&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"><img width="155" alt="Disponible en Google Play" src="https://play.google.com/intl/en_us/badges/static/images/badges/es_badge_web_generic.png"/></a>'
    },
    {
        name: 'Serverless Portfolio',
        info: ' is an excuse to show my skills, qualifications, education and experience.\n\nDeveloped in 2018 using Git, GitHub, AWS (API Gateway, Lambda, S3, CloudFront, IAM, Route 53, SNS, CodeBuild, CodePipeline), Java8, ReactJS, Material Design, Font Awesome, Webpack and Babel.',
        img: portfolio,
        alt: 'Portfolio',
        codeLink: 'https://github.com/amar1n/MyReactPortfolio',
        demoLink: '',
        youtubeLink: '',
        imgLarge: portfolioArchitecture,
        appleStore: '',
        googlePlay: ''
    },
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
