import React from "react";
import backgroundImage from '../../img/back.png';
import ball1 from '../../img/ball1.png';
import ball2 from '../../img/ball2.png';
import ball3 from '../../img/ball3.png';
import santa from '../../img/santa.png';
import trail from '../../img/trail.png';
import present1 from '../../img/present1.png';
import present2 from '../../img/present2.png';
import deer from '../../img/deer.png';
import light from '../../img/light.png';
import logo1 from '../../img/FozzyGroup_w.svg';
import logo2 from '../../img/Silpo_o.svg';
import logo3 from '../../img/TemaBit_w.svg';
import title from '../../img/title.svg';
import './banner.scss'; // Імпорт стилів

const Banner = () => {
    return (
<div className="banner" style={{ backgroundImage: `url(${backgroundImage})` }}>
<div className="logoContainer">
        <img src={logo1} alt="Logo 1" className="logo" />
        <img src={logo2} alt="Logo 2" className="logo" />
        <img src={logo3} alt="Logo 3" className="logo" />
    </div>
    <img src={ball1} alt="ball1" className="banner-element ball" style={{top: '-1%', left: '33%'}} />
    <img src={ball2} alt="ball2" className="banner-element ball" style={{top: '-1%', left: '65%'}} />
    <img src={ball3} alt="ball3" className="banner-element ball" style={{top: '-3%', left: '64%'}}/>
    <img src={trail} alt="Trail" className="banner-element trail" />
    <img src={santa} alt="Santa" className="banner-element santa" />
    <img src={present1} alt="Present 1" className="banner-element present first"  style={{left: '55%', top: '64%', width: 'clamp(50px, 15vw, 200px)'}}/>
    <img src={present2} alt="Present 2" className="banner-element present second" style={{left: '40%', top: '70%', width: 'clamp(50px, 15vw, 200px)'}}/>
    <img src={deer} alt="Deer" className="banner-element deer" />
    {/* <img src={light} alt="Light" className="banner-element light" /> */}
    <div className="text">
        <div className="textContainer">
        <img src={title} alt="Добровершники" className="title" />
        {/* <h1 className="title">Добровершники</h1> */}
        <h3 className="subtitle">2024</h3>
        <h3 className="description">Здійснюємо мрії малечі</h3>
    </div>
    </div>

</div>


    );
};

export default Banner;
