import React from "react";
import mainTheme from '../../img/main.jpg';
import logo1 from '../../img/FozzyGroup_w.svg';
import logo2 from '../../img/Silpo_o.svg';
import logo3 from '../../img/TemaBit_w.svg';
import './banner.scss'; // Імпорт стилів

const Banner = () => {
    return (
        <div className="banner">
            {/* Основне зображення банера */}
            <img src={mainTheme} alt="Banner" className="bannerImage" />
            
            {/* Логотипи внизу банера */}
            <div className="logoContainer">
                <img src={logo1} alt="Logo 1" className="logo" />
                <img src={logo2} alt="Logo 2" className="logo" />
                <img src={logo3} alt="Logo 3" className="logo" />
            </div>
        </div>
    );
};

export default Banner;
