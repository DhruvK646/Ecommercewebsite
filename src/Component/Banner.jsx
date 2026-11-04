
import { useEffect, useState } from "react";
import bannerData from "./Data/BannerData.json";
import "./Banner.css";

const slides = [...bannerData]
    .filter((slide) => slide.isActive)
    .sort((first, second) => first.order - second.order);

function Banner() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const activeSlide = slides[activeIndex];

    useEffect(() => {
        if (!isPlaying || slides.length < 2) {
            return undefined;
        }

        const timerId = window.setInterval(() => {
            setActiveIndex((index) => (index + 1) % slides.length);
        }, 5000);

        return () => window.clearInterval(timerId);
    }, [isPlaying]);

    if (!activeSlide) {
        return null;
    }

    const showSlide = (index) => {
        setActiveIndex((index + slides.length) % slides.length);
    };

    return (
        <section
            className="banner"
            aria-label="Featured collections"
            aria-roledescription="carousel"
        >
            <article
                className="banner-slide"
                aria-roledescription="slide"
                aria-label={`${activeIndex + 1} of ${slides.length}: ${activeSlide.title}`}
                style={{ backgroundColor: activeSlide.backgroundColor }}
            >
                <picture className="banner-slide__picture">
                    {activeSlide.mobileImage && (
                        <source
                            media="(max-width: 640px)"
                            srcSet={activeSlide.mobileImage}
                        />
                    )}
                    <img
                        className="banner-slide__image"
                        src={activeSlide.image}
                        alt={activeSlide.imageAlt}
                    />
                </picture>

                <div
                    className="banner-slide__overlay"
                    style={{ backgroundColor: activeSlide.overlayColor }}
                />

                <div
                    className={`banner-slide__content banner-slide__content--${activeSlide.textAlignment}`}
                    style={{ color: activeSlide.textColor }}
                >
                    <p className="banner-slide__subtitle">{activeSlide.subtitle}</p>
                    <h1 className="banner-slide__title">{activeSlide.title}</h1>
                    <p className="banner-slide__description">
                        {activeSlide.description}
                    </p>
                    <a className="banner-slide__button" href={activeSlide.buttonLink}>
                        {activeSlide.buttonText}
                        <span aria-hidden="true">→</span>
                    </a>
                </div>
            </article>

            {slides.length > 1 && (
                <>
                    <button
                        className="banner__arrow banner__arrow--previous"
                        type="button"
                        aria-label="Previous slide"
                        onClick={() => showSlide(activeIndex - 1)}
                    >
                        <span aria-hidden="true">←</span>
                    </button>
                    <button
                        className="banner__arrow banner__arrow--next"
                        type="button"
                        aria-label="Next slide"
                        onClick={() => showSlide(activeIndex + 1)}
                    >
                        <span aria-hidden="true">→</span>
                    </button>

                    <div className="banner__controls">
                        <button
                            className="banner__play-toggle"
                            type="button"
                            aria-label={isPlaying ? "Pause slide rotation" : "Play slide rotation"}
                            onClick={() => setIsPlaying((playing) => !playing)}
                        >
                            <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
                        </button>
                        <div className="banner__pagination" aria-label="Choose a slide">
                            {slides.map((slide, index) => (
                                <button
                                    className={`banner__dot${index === activeIndex ? " banner__dot--active" : ""}`}
                                    key={slide.id}
                                    type="button"
                                    aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                                    aria-current={index === activeIndex ? "true" : undefined}
                                    onClick={() => showSlide(index)}
                                />
                            ))}
                        </div>
                        <span className="banner__count" aria-hidden="true">
                            {String(activeIndex + 1).padStart(2, "0")} /{" "}
                            {String(slides.length).padStart(2, "0")}
                        </span>
                    </div>
                </>
            )}
        </section>
    );
}

export default Banner;