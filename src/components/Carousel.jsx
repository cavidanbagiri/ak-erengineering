

// CarouselAdvanced.jsx - Alternative with more features
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Link, NavLink, useLocation } from 'react-router-dom'

import photo1 from '../assets/images/photo_1.webp'
import photo2 from '../assets/images/photo_2.jpg'
import photo3 from '../assets/images/photo_1.webp'
import photo4 from '../assets/images/photo_4.jpg'
import photo5 from '../assets/images/photo_5.jpg'

function CarouselAdvanced() {
    const { t } = useTranslation()
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef(null);
    const progressRef = useRef(null);

    // Get slides from translation file
    const slidesData = t('carousel.slides', { returnObjects: true }) || [];

    // Map imported images to slides
    const slides = slidesData.map((slide, index) => ({
        ...slide,
        image: [photo4, photo1, photo2, photo5][index] || photo1
    }));

    // If slides array is empty, provide fallback (prevents errors)
    const hasSlides = slides.length > 0;

    const goToSlide = (index) => {
        setCurrentIndex(index);
        setProgress(0);
    };

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setProgress(0);
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
        setProgress(0);
    };

    // Auto-play with progress bar
    useEffect(() => {
        if (isPlaying && hasSlides) {
            const duration = 5000; // 5 seconds
            const interval = 50; // Update every 50ms

            timerRef.current = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        nextSlide();
                        return 0;
                    }
                    return prev + (interval / duration) * 100;
                });
            }, interval);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isPlaying, nextSlide, hasSlides]);

    // Pause on hover
    const handleMouseEnter = () => setIsPlaying(false);
    const handleMouseLeave = () => setIsPlaying(true);

    // Don't render if no slides
    if (!hasSlides) {
        return null;
    }

    return (
        <div
            className="relative w-full overflow-hidden group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Main Carousel Container */}
            <div className="relative h-[600px] md:h-[700px]">
                {/* Slides */}
                {slides.map((slide, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-700 ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    >
                        {/* Background */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-700"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                transform: idx === currentIndex ? 'scale(1)' : 'scale(1.05)'
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
                        </div>

                        {/* Content */}
                        <div className="relative h-full flex items-center">
                            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                                <div className={`max-w-3xl transition-all duration-700 delay-200 ${idx === currentIndex
                                        ? 'opacity-100 translate-x-0'
                                        : 'opacity-0 -translate-x-10'
                                    }`}>
                                    {/* Slide Number */}
                                    <div className="flex items-center space-x-3 mb-6">
                                        <span className="text-yellow-400 font-mono text-sm tracking-wider">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <div className="w-12 h-px bg-yellow-400" />
                                        <span className="text-white/60 text-sm tracking-wider">
                                            {String(slides.length).padStart(2, '0')}
                                        </span>
                                    </div>

                                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                                        {slide.title}
                                    </h2>
                                    <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-6">
                                        {slide.highlightedText}
                                    </h3>
                                    <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl">
                                        {slide.description}
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link to={'/services'}
                                            className="px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                                            {t('carousel.buttons.explore')}
                                        </Link>
                                        <Link to={'/contact'}
                                            className="px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
                                            {t('carousel.buttons.contact')}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-50 sm:p-3 transition-all duration-300 backdrop-blur-sm shadow-lg active:scale-95"
                    aria-label={t('carousel.ariaLabels.previousSlide')}
                >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-50 sm:p-3 transition-all duration-300 backdrop-blur-sm shadow-lg active:scale-95"
                    aria-label={t('carousel.ariaLabels.nextSlide')}
                >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/20">
                    <div
                        className="h-full bg-yellow-400 transition-all duration-50 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Thumbnail Navigation */}
                <div className="absolute bottom-2 xl:bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                    {slides.map((slide, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            className="group relative"
                            aria-label={t('carousel.ariaLabels.goToSlide', { index: idx + 1 })}
                        >
                            <div className={`w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 ${currentIndex === idx
                                    ? 'ring-2 ring-yellow-400 scale-110'
                                    : 'opacity-60 hover:opacity-100'
                                }`}>
                                <img
                                    src={slide.image}
                                    alt={`Thumbnail ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CarouselAdvanced


