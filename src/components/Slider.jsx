import React, { useEffect } from 'react';
import $ from 'jquery';
import 'slick-carousel/slick/slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slider = () => {
    useEffect(() => {
        const initializeSliders = () => {
            // Initialize sliders if there are elements with class 'slid-inn'
            var $lis = $('.slid-inn');
            if ($lis.length > 0) {
                // COMMON SLIDER
                $('.slider3').slick({
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    responsive: [{
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: false
                        }
                    }]
                });

                // HOME PAGE WRECENT COUPLES
                $('.couple-sli').slick({
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    responsive: [{
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            centerMode: false
                        }
                    },
                    {
                        breakpoint: 550,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: false
                        }
                    }
                    ]
                });

                // HOME PAGE BANNER SLIDER
                $('.ban-sli').slick({
                    infinite: true,
                    fade: true,
                    cssEase: 'linear',
                    autoplay: true,
                    autoplaySpeed: 6000
                });

                // HOME PAGE WRECENT COUPLES
                $('.hom-qui-acc-sli').slick({
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    autoplay: true,
                    dots: true,
                    autoplaySpeed: 3000,
                    responsive: [{
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            centerMode: false
                        }
                    },
                    {
                        breakpoint: 550,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: false,
                            arrows: false
                        }
                    }
                    ]
                });
            }
        };

        // Call the initialization function when the component mounts
        initializeSliders();

        // Clean up the sliders when the component unmounts
        return () => {
            $('.slider3, .couple-sli, .ban-sli, .hom-qui-acc-sli').slick('unslick');
        };
    }, []);

    return (
        <div className="slid-inn cus-revi">
            <ul className="slider3">
                {/* Your slider content goes here */}
            </ul>
        </div>
    );
};

export default Slider;
