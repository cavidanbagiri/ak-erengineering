

import { useState, useEffect, useRef } from 'react'
import '../index.css'


function Portfolio() {

    const portfolioItemsRef = useRef([])
    
    useEffect(() => {
        portfolioItemsRef.current.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show')
            }, index * 100)
        })
    }, [])

    const portfolioItems = [
        { id: 1, title: 'İstanbul Finans Merkezi', category: 'Cephe Aydınlatma', image: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { id: 2, title: 'Ankara Otoyol Projesi', category: 'Yol Aydınlatma', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { id: 3, title: 'İzmir Liman Aydınlatması', category: 'Endüstriyel', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { id: 4, title: 'Bodrum Marina', category: 'Peyzaj', image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { id: 5, title: 'Teknopark İstanbul', category: 'Akıllı Sistemler', image: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        { id: 6, title: 'AVM Cephe Aydınlatma', category: 'Cephe', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
    ]
    
    return (
        <section id="portfolio" className="section">
            <div className="container">
                <div className="section-title">
                    <h2>Tamamlanan Projeler</h2>
                    <p>Türkiye'nin dört bir yanında hayata geçirdiğimiz başarılı projelerimiz</p>
                </div>

                <div className="portfolio-grid">
                    {portfolioItems.map((item, index) => (
                        <div
                            key={item.id}
                            className="portfolio-item"
                            ref={el => portfolioItemsRef.current[index] = el}
                        >
                            <img src={item.image} alt={item.title} className="portfolio-image" />
                            <div className="portfolio-overlay">
                                <h4>{item.title}</h4>
                                <p className="text-primary">{item.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Portfolio