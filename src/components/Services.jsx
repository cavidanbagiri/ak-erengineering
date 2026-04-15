



import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function Services() {
    const { t } = useTranslation()
    const [scrolled, setScrolled] = useState(false)
    const [hoveredIndex, setHoveredIndex] = useState(null)
    const serviceCardsRef = useRef([])
    const technicalCardsRef = useRef([])

    // Get services from translation file
    const services = t('footer.services.list', { returnObjects: true }) || []
    
    // Get technical services from translation file
    const technicalServices = t('technicalServices.list', { returnObjects: true }) || []

    // Function to get descriptions based on service title
    const getServiceDescription = (serviceTitle) => {
        const descriptionMap = {
            [t('footer.services.list.0')]: t('services.descriptions.facade'),
            [t('footer.services.list.1')]: t('services.descriptions.industrial'),
            [t('footer.services.list.2')]: t('services.descriptions.landscape'),
            [t('footer.services.list.3')]: t('services.descriptions.road'),
            [t('footer.services.list.4')]: t('services.descriptions.energy'),
            [t('footer.services.list.5')]: t('services.descriptions.smart')
        }
        return descriptionMap[serviceTitle] || t('services.descriptions.default')
    }

    // Map icons and gradients to services
    const serviceDetails = [
        { icon: '💡', gradient: 'from-yellow-500 to-orange-500', route: '/services/facade-lighting' },
        { icon: '🏢', gradient: 'from-blue-500 to-cyan-500', route: '/services/industrial-lighting' },
        { icon: '🌳', gradient: 'from-green-500 to-emerald-500', route: '/services/landscape-lighting' },
        { icon: '🛣️', gradient: 'from-purple-500 to-pink-500', route: '/services/road-lighting' },
        { icon: '⚡', gradient: 'from-red-500 to-orange-500', route: '/services/energy-solutions' },
        { icon: '🤖', gradient: 'from-indigo-500 to-purple-500', route: '/services/smart-systems' }
    ]

    // Combine translated service names with icons and gradients
    const enhancedServices = services.map((service, index) => ({
        title: service,
        description: getServiceDescription(service),
        icon: serviceDetails[index]?.icon || '🔧',
        gradient: serviceDetails[index]?.gradient || 'from-gray-500 to-gray-600',
        route: serviceDetails[index]?.route
    }))

    // Technical service icons and gradients
    const technicalServiceDetails = [
        { icon: '⚙️', gradient: 'from-orange-500 to-red-500', color: 'orange' },
        { icon: '🔧', gradient: 'from-gray-500 to-gray-700', color: 'gray' },
        { icon: '🏗️', gradient: 'from-blue-500 to-indigo-500', color: 'blue' },
        { icon: '🎛️', gradient: 'from-purple-500 to-pink-500', color: 'purple' },
        { icon: '📊', gradient: 'from-green-500 to-teal-500', color: 'green' },
        { icon: '🔩', gradient: 'from-yellow-600 to-orange-600', color: 'yellow' }
    ]

    const enhancedTechnicalServices = technicalServices.map((service, index) => ({
        title: service.title,
        description: service.description,
        icon: technicalServiceDetails[index]?.icon || '🔧',
        gradient: technicalServiceDetails[index]?.gradient || 'from-gray-500 to-gray-600',
        color: technicalServiceDetails[index]?.color || 'gray'
    }))

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                }
            })
        }, observerOptions)
        
        serviceCardsRef.current.forEach(card => {
            if (card) observer.observe(card)
        })
        
        technicalCardsRef.current.forEach(card => {
            if (card) observer.observe(card)
        })
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
            observer.disconnect()
        }
    }, [])

    // Add CSS to head for animations
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .service-card {
                opacity: 0;
                transform: translateY(40px);
                transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .service-card.visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .technical-card {
                opacity: 0;
                transform: translateX(-30px);
                transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .technical-card.visible {
                opacity: 1 !important;
                transform: translateX(0) !important;
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 0.2; }
                50% { opacity: 0.3; }
            }
            
            .animate-float {
                animation: float 6s ease-in-out infinite;
            }
            
            .animate-pulse-slow {
                animation: pulse 4s ease-in-out infinite;
            }
            
            .animation-delay-2000 {
                animation-delay: 2s;
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <>
            {/* Main Services Section */}
            <section 
                id="services" 
                className="relative py-20 md:py-28 lg:py-32 overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
            >
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-12 md:mb-16 lg:mb-20">
                        <div className="inline-block">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="w-12 h-px bg-yellow-400"></div>
                                <span className="text-yellow-400 font-semibold tracking-wider text-sm uppercase">
                                    {t('services.sectionHeader.subtitle')}
                                </span>
                                <div className="w-12 h-px bg-yellow-400"></div>
                            </div>
                        </div>
                        
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            {t('services.sectionHeader.title')}
                        </h2>
                        
                        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6 rounded-full"></div>
                        
                        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
                            {t('services.sectionHeader.description')}
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {enhancedServices.map((service, index) => (
                            <div
                                key={index}
                                ref={el => serviceCardsRef.current[index] = el}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="service-card group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 
                                         backdrop-blur-sm rounded-2xl p-6 md:p-8 
                                         transition-all duration-500 ease-out
                                         border border-gray-700 hover:border-yellow-400/50
                                         transform hover:-translate-y-3 hover:shadow-2xl
                                         cursor-pointer overflow-hidden"
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                                
                                {/* Glow effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-transparent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                                
                                {/* Icon Container */}
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <span className="relative text-5xl md:text-6xl block transition-all duration-500 
                                                   group-hover:scale-110 group-hover:rotate-12 inline-block">
                                        {service.icon}
                                    </span>
                                </div>
                                
                                {/* Title with gradient underline */}
                                <div className="relative mb-4">
                                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent 
                                                  group-hover:w-full transition-all duration-500"></div>
                                </div>
                                
                                {/* Description */}
                                <p className="text-gray-300 leading-relaxed text-sm md:text-base relative z-10">
                                    {service.description}
                                </p>
                                
                                {/* Read more link */}
                                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <Link to={service.route} className="text-yellow-400 text-sm font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
                                        {t('services.buttons.readMore')}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                                
                                {/* Corner decoration */}
                                <div className="absolute top-4 right-4 w-12 h-12">
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-400/0 group-hover:border-yellow-400/50 transition-all duration-300"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technical Services Section - Image Left, Text Right */}
            <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow animation-delay-2000"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-12 md:mb-16">
                        <div className="inline-block">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="w-12 h-px bg-orange-400"></div>
                                <span className="text-orange-400 font-semibold tracking-wider text-sm uppercase">
                                    {t('technicalServices.sectionHeader.subtitle')}
                                </span>
                                <div className="w-12 h-px bg-orange-400"></div>
                            </div>
                        </div>
                        
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                            {t('technicalServices.sectionHeader.title')}
                        </h2>
                        
                        <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 mx-auto mb-6 rounded-full"></div>
                        
                        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
                            {t('technicalServices.sectionHeader.description')}
                        </p>
                    </div>

                    {/* Technical Services List - Alternating Image/Text Layout */}
                    <div className="space-y-12 md:space-y-16">
                        {enhancedTechnicalServices.map((service, index) => (
                            <div
                                key={index}
                                ref={el => technicalCardsRef.current[index] = el}
                                className={`technical-card group flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                {/* Image / Icon Side */}
                                <div className="w-full lg:w-1/2">
                                    <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                                        <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500 z-10`}></div>
                                        <div className="aspect-video bg-gray-800 flex items-center justify-center relative overflow-hidden">
                                            {/* Placeholder for actual image - you can replace this with real images */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-7xl md:text-8xl lg:text-9xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                                                    {service.icon}
                                                </span>
                                            </div>
                                            {/* Animated border effect on hover */}
                                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-400/50 rounded-2xl transition-all duration-500 z-20"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Text Content Side */}
                                <div className="w-full lg:w-1/2 space-y-4">
                                    <div className="relative">
                                        <div className={`w-16 h-1 bg-gradient-to-r ${service.gradient} rounded-full mb-4 group-hover:w-24 transition-all duration-500`}></div>
                                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                    </div>
                                    
                                    <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                                        {service.description}
                                    </p>
                                    
                                    <div className="pt-4">
                                        <Link 
                                            to="/services" 
                                            className="inline-flex items-center gap-2 text-orange-400 font-semibold hover:gap-3 transition-all duration-300 group/link"
                                        >
                                            {t('technicalServices.buttons.learnMore')}
                                            <svg className="w-5 h-5 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Services
