import { useState, useEffect } from 'react'

function Footer() {
    const [currentYear, setCurrentYear] = useState(2024)
    const [email, setEmail] = useState('')
    const [subscribeStatus, setSubscribeStatus] = useState(null)

    const navItems = [
        { label: 'Ana Sayfa', href: '#home' },
        { label: 'Hizmetler', href: '#services' },
        { label: 'Projeler', href: '#portfolio' },
        { label: 'Hakkımızda', href: '#about' },
        { label: 'İletişim', href: '#contact' },
    ]

    const services = [
        'Cephe Aydınlatma',
        'Endüstriyel Aydınlatma',
        'Peyzaj Aydınlatma',
        'Yol Aydınlatma',
        'Enerji Çözümleri',
        'Akıllı Sistemler'
    ]

    useEffect(() => {
        setCurrentYear(new Date().getFullYear())
    }, [])

    const handleSubscribe = (e) => {
        e.preventDefault()
        if (email) {
            setSubscribeStatus('success')
            setEmail('')
            setTimeout(() => setSubscribeStatus(null), 3000)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                                LINE<span className="text-yellow-500">O</span>
                            </div>
                            <div className="w-1 h-8 bg-yellow-400 rounded-full"></div>
                            <span className="text-gray-400 text-sm">Aydınlatma</span>
                        </div>
                        
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Aydınlatma mühendisliğinde yenilikçi çözümler sunan, 
                            Türkiye'nin önde gelen firmalarından biriyiz. 20+ yıllık 
                            tecrübemizle kalite ve güvenilirliği bir arada sunuyoruz.
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex space-x-3 pt-2">
                            <a href="#" className="w-10 h-10 bg-white/5 hover:bg-yellow-400/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/5 hover:bg-yellow-400/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/5 hover:bg-yellow-400/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                                    <rect x="2" y="9" width="4" height="12"/>
                                    <circle cx="4" cy="4" r="2"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/5 hover:bg-yellow-400/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-4 relative">
                            Hızlı Bağlantılar
                            <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-yellow-400 rounded-full"></div>
                        </h4>
                        <ul className="space-y-2">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <a href={item.href} className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-yellow-400 transition-all duration-300"></span>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-4 relative">
                            Hizmetlerimiz
                            <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-yellow-400 rounded-full"></div>
                        </h4>
                        <ul className="space-y-2">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <a href="#services" className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-yellow-400 transition-all duration-300"></span>
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-4 relative">
                            Bize Ulaşın
                            <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-yellow-400 rounded-full"></div>
                        </h4>
                        
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>İstanbul, Türkiye</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>+90 (212) 123 45 67</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>info@lineo.com.tr</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Pzt - Cum: 09:00 - 18:00</span>
                            </li>
                        </ul>

                        {/* Newsletter */}
                        <div className="mt-6">
                            <h5 className="text-white text-sm font-semibold mb-3">Bültenimize Abone Olun</h5>
                            <form onSubmit={handleSubscribe} className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="E-posta adresiniz"
                                    className="w-full px-4 py-2.5 pr-24 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="absolute right-1 top-1 px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-semibold rounded-md transition-all duration-300"
                                >
                                    Abone
                                </button>
                            </form>
                            {subscribeStatus === 'success' && (
                                <p className="text-green-400 text-xs mt-2">
                                    ✓ Başarıyla abone oldunuz!
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="pt-8 mt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            © {currentYear} Lineo Aydınlatma Mühendisliği. Tüm hakları saklıdır.
                        </p>
                        
                        <div className="flex gap-6">
                            <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                                Gizlilik Politikası
                            </a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                                Kullanım Koşulları
                            </a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                                Çerez Politikası
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 z-50 bg-yellow-400 hover:bg-yellow-500 text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Yukarı çık"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </footer>
    )
}

export default Footer