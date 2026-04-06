import { useState, useEffect, useRef } from 'react'

function About() {
    const [counterStarted, setCounterStarted] = useState(false)
    const [counters, setCounters] = useState({
        projects: 0,
        experts: 0,
        experience: 0
    })

    const aboutSectionsRef = useRef([])
    const statsRef = useRef(null)

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1'
                    entry.target.style.transform = 'translateY(0)'
                    
                    // Start counter when stats section becomes visible
                    if (entry.target === statsRef.current && !counterStarted) {
                        setCounterStarted(true)
                        startCounters()
                    }
                }
            })
        }, observerOptions)

        // Observe about sections
        aboutSectionsRef.current.forEach(section => {
            if (section) observer.observe(section)
        })
        
        if (statsRef.current) {
            observer.observe(statsRef.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [counterStarted])

    const startCounters = () => {
        const duration = 2000
        const steps = 60
        const interval = duration / steps
        
        const targetProjects = 500
        const targetExperts = 50
        const targetExperience = 20
        
        let currentStep = 0
        
        const timer = setInterval(() => {
            currentStep++
            const progress = currentStep / steps
            
            setCounters({
                projects: Math.min(Math.floor(targetProjects * progress), targetProjects),
                experts: Math.min(Math.floor(targetExperts * progress), targetExperts),
                experience: Math.min(Math.floor(targetExperience * progress), targetExperience)
            })
            
            if (currentStep >= steps) {
                clearInterval(timer)
            }
        }, interval)
    }

    const benefits = [
        {
            icon: '⚡',
            title: 'Enerji Verimliliği',
            description: 'Yüksek verimli LED teknolojileri ile enerji tasarrufu sağlayan çözümler'
        },
        {
            icon: '🌱',
            title: 'Çevre Dostu',
            description: 'Sürdürülebilir ve çevreye duyarlı aydınlatma sistemleri'
        },
        {
            icon: '🛠️',
            title: '7/24 Teknik Destek',
            description: 'Kesintisiz teknik destek ve bakım hizmetleri'
        },
        {
            icon: '🏆',
            title: 'Uluslararası Standartlar',
            description: 'ISO, CE, RoHS gibi uluslararası kalite belgeleri'
        },
        {
            icon: '🎯',
            title: 'Özelleştirilmiş Çözümler',
            description: 'Projeye özel tasarım ve mühendislik hizmetleri'
        }
    ]

    return (
        <section className="py-20 md:py-28 lg:py-32 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-12 h-px bg-yellow-400"></div>
                        <span className="text-yellow-400 font-semibold tracking-wider text-sm uppercase">
                            Hakkımızda
                        </span>
                        <div className="w-12 h-px bg-yellow-400"></div>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Lineo Aydınlatma
                    </h2>
                    
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6 rounded-full"></div>
                    
                    <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
                        Vizyonumuz ve misyonumuz ile aydınlatma sektöründe fark yaratıyoruz
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left Column - Company Info */}
                    <div 
                        ref={el => aboutSectionsRef.current[0] = el}
                        className="space-y-6"
                        style={{
                            opacity: 0,
                            transform: 'translateY(40px)',
                            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    >
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-yellow-400/30"></div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative inline-block">
                                20+ Yıllık Tecrübe
                                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 to-transparent"></div>
                            </h3>
                        </div>
                        
                        <p className="text-gray-300 leading-relaxed">
                            2003 yılından bu yana aydınlatma sektöründe faaliyet gösteren firmamız,
                            Türkiye'nin en büyük aydınlatma projelerine imza atmıştır.
                        </p>
                        
                        <p className="text-gray-300 leading-relaxed">
                            Uzman mühendis kadromuz ve son teknoloji ekipmanlarımızla,
                            müşterilerimize en kaliteli hizmeti sunmayı hedefliyoruz.
                        </p>

                        <div className="flex flex-wrap gap-3 pt-4">
                            <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                <span className="text-yellow-400 font-semibold">ISO 9001</span>
                            </div>
                            <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                <span className="text-yellow-400 font-semibold">CE Belgesi</span>
                            </div>
                            <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                <span className="text-yellow-400 font-semibold">RoHS Uyumlu</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Benefits */}
                    <div 
                        ref={el => aboutSectionsRef.current[1] = el}
                        style={{
                            opacity: 0,
                            transform: 'translateY(40px)',
                            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
                        }}
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                            Neden Bizi Tercih Etmelisiniz?
                        </h3>
                        
                        <div className="space-y-4">
                            {benefits.map((benefit, index) => (
                                <div 
                                    key={index}
                                    className="group flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:translate-x-2"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-400/10 rounded-lg flex items-center justify-center group-hover:bg-yellow-400/20 transition-all duration-300">
                                        <span className="text-2xl">{benefit.icon}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-white font-semibold mb-1 group-hover:text-yellow-400 transition-colors">
                                            {benefit.title}
                                        </h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Statistics Section */}
                <div 
                    ref={statsRef}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-16 pt-8 border-t border-white/10"
                >
                    <div className="text-center p-6 bg-gradient-to-br from-white/5 to-transparent rounded-2xl hover:scale-105 transition-all duration-300">
                        <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                            {counters.projects}+
                        </div>
                        <div className="text-gray-300 font-medium">Tamamlanan Proje</div>
                        <div className="text-gray-500 text-sm mt-2">Türkiye geneli</div>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-br from-white/5 to-transparent rounded-2xl hover:scale-105 transition-all duration-300">
                        <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                            {counters.experience}+
                        </div>
                        <div className="text-gray-300 font-medium">Yıllık Tecrübe</div>
                        <div className="text-gray-500 text-sm mt-2">Sektör lideri</div>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-br from-white/5 to-transparent rounded-2xl hover:scale-105 transition-all duration-300">
                        <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                            {counters.experts}+
                        </div>
                        <div className="text-gray-300 font-medium">Uzman Personel</div>
                        <div className="text-gray-500 text-sm mt-2">Mühendis ve teknisyen</div>
                    </div>
                </div>

                {/* Mission & Vision Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div className="bg-gradient-to-br from-yellow-400/5 to-transparent rounded-2xl p-6 border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white">Misyonumuz</h3>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            Sürdürülebilir, yenilikçi ve estetik aydınlatma çözümleriyle 
                            müşteri memnuniyetini en üst düzeyde tutmak, enerji verimliliğine 
                            katkı sağlamak ve sektörde öncü olmak.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-400/5 to-transparent rounded-2xl p-6 border border-blue-400/10 hover:border-blue-400/30 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-400/20 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white">Vizyonumuz</h3>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            Türkiye'de ve dünyada akıllı aydınlatma sistemleri konusunda 
                            referans gösterilen, teknoloji ve tasarımı birleştiren, 
                            sürdürülebilir çözümler üreten global bir marka olmak.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About