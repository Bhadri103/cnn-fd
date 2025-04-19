import React from 'react';
import { IoLogoWhatsapp } from "react-icons/io";

const Whatsapp = () => {
    const handleWhatsappClick = () => {
        const phoneNumber = '+919445943928'; 
        window.open(`https://wa.me/${phoneNumber}`, '_blank');
    };

    return (
        <div>
            <div
                className="whatsappCont"
                onClick={handleWhatsappClick}
                
            >
                <IoLogoWhatsapp />
            </div>
        </div>
    );
};

export default Whatsapp;
