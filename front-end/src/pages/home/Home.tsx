import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Home.css';
import { Landing } from './landing/Landing';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Home: React.FC = (): JSX.Element => {
    const images: string[] = [
        '/img/landing/1.png', 
        '/img/landing/2.jpg', 
        '/img/landing/3.jpg', 
        '/img/landing/4.jpg'
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const navigate = useNavigate();

    const nextPage = () => {
        if (currentImageIndex < images.length) {
            setCurrentImageIndex(prevIndex => prevIndex + 1);
        }
    };

    const touchStartY = useRef(0);
    const touchEndY = useRef(0);

    const handleTouchStart = useCallback((e: TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;

        if (e.target && (e.target as HTMLElement).classList.contains('contact-button')) {
            navigate('/contact');
            return;
        }
    }, [navigate]);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        touchEndY.current = e.touches[0].clientY;
    }, []);

    useEffect(() => {

        const handleMobileSwipe = () => {
            if (isScrolling || currentImageIndex === images.length) return;

            setIsScrolling(true);

            const deltaY = touchStartY.current - touchEndY.current;

            if (deltaY > 20) { // Swiping Up
                setCurrentImageIndex(prevIndex => Math.min(prevIndex + 1, images.length));
            } else if (deltaY < -20) { // Swiping Down
                setCurrentImageIndex(prevIndex => Math.max(prevIndex - 1, 0));
            }

            setTimeout(() => {
                setIsScrolling(false);
            }, 1600); // Match the transition time
        };

        const handleScroll = (e: WheelEvent) => {
            if (isScrolling || currentImageIndex === images.length) return;

            setIsScrolling(true);

            if (e.deltaY < 0) {
                setCurrentImageIndex(prevIndex => Math.max(prevIndex - 1, 0));
            } else if (e.deltaY > 0) {
                setCurrentImageIndex(prevIndex => Math.min(prevIndex + 1, images.length));
            }

            setTimeout(() => {
                setIsScrolling(false);
            }, 1600); // Match the transition time
        };

        window.addEventListener('wheel', handleScroll);
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleMobileSwipe);
        window.addEventListener('touchmove', handleTouchMove);

        if (currentImageIndex < images.length) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleMobileSwipe);
            window.removeEventListener('touchmove', handleTouchMove);
            document.body.style.overflow = ''; 
        };
    }, [isScrolling, currentImageIndex, images.length, handleTouchMove, handleTouchStart]);

    return (
        <>
            <Helmet>
                <title>Home | Rose</title>
                <meta name="description" content="Welcome to Rose Club, an exquisite high-end nightclub with a decadent atmosphere. Discover our VIP tables, events, and vibrant happenings." />
                <meta property="og:title" content="Home | Rose Club" />
                <meta property="og:description" content="Welcome to Rose Club, an exquisite high-end nightclub with a decadent atmosphere. Discover our VIP tables, events, and vibrant happenings." />
                <meta property="og:url" content="https://roseclub.se" />
                <meta name="twitter:title" content="Home | Rose Club" />
                <meta name="twitter:description" content="Welcome to Rose Club, an exquisite high-end nightclub with a decadent atmosphere. Discover our VIP tables, events, and vibrant happenings." />
                <meta name="twitter:url" content="https://roseclub.se" />
                <link rel="canonical" href="https://roseclub.se" />
            </Helmet>
            <div className="home-wrap">
                <div className="image-container">
                    {images.map((url, index) => (
                        <img 
                            key={index} 
                            src={url} 
                            alt={`Rose black and white landing cover ${index}`} 
                            className={`image ${index === currentImageIndex ? 'active' : ''}`} 
                        />
                    ))}
                    {currentImageIndex === 0 && (
                        <button className="contact-button btn btn-default box-3d" onClick={() => navigate('/contact')}>
                            Get in Touch
                        </button>
                    )}
                    {currentImageIndex === images.length && <div className={`landing-slide ${currentImageIndex === images.length ? 'active' : ''}`}>
                        <Landing />
                    </div>}
                    {/* Progress Bar */}
                    {currentImageIndex !== images.length &&<div className="progress-bar">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`progress-dot ${index === currentImageIndex ? 'active' : ''}`}
                            />
                        ))}
                    </div>}
                </div>
                {currentImageIndex !== images.length && <div className="animated-arrow" onClick={() => nextPage()}>
                    ↓
                </div>}
            </div>
        </>
    );
};

export default Home;