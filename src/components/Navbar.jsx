import { useState, useEffect } from 'react'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('home')
    const [servicesDropdown, setServicesDropdown] = useState(false)

    const navItems = [
        { label: 'Ana Sayfa', href: '#home', id: 'home' },
        { label: 'Hakkımızda', href: '#about', id: 'about' },
        { 
            label: 'Hizmetler', 
            href: '#services', 
            id: 'services',
            dropdown: true,
            items: [
                { label: 'Cephe Aydınlatma', href: '#services', id: 'services' },
                { label: 'Endüstriyel Aydınlatma', href: '#services', id: 'services' },
                { label: 'Peyzaj Aydınlatma', href: '#services', id: 'services' },
                { label: 'Akıllı Sistemler', href: '#services', id: 'services' },
            ]
        },
        { label: 'Projeler', href: '#portfolio', id: 'portfolio' },
        { label: 'İletişim', href: '#contact', id: 'contact' },
    ]

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)

            const sections = navItems.map(item => document.getElementById(item.id))
            
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i]
                if (section) {
                    const rect = section.getBoundingClientRect()
                    if (rect.top <= 100) {
                        setActiveSection(navItems[i].id)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [navItems])

    const handleClick = (e, href, id) => {
        e.preventDefault()
        setIsOpen(false)
        setServicesDropdown(false)
        
        const element = document.getElementById(id)
        if (element) {
            const offset = 80
            const elementPosition = element.offsetTop - offset
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            })
        }
        
        setActiveSection(id)
    }

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isOpen) {
                setIsOpen(false)
            }
        }
        
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [isOpen])

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                scrolled 
                    ? 'bg-gray-950/95 backdrop-blur-md shadow-lg border-b border-white/10' 
                    : 'bg-transparent'
            }`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 md:h-20">
                        {/* Logo */}
                        <a 
                            href="#home" 
                            onClick={(e) => handleClick(e, '#home', 'home')}
                            className="relative group flex items-center space-x-2"
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                                <span className="text-gray-900 font-bold text-lg">L</span>
                            </div>
                            <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                                LINE<span className="text-yellow-500">O</span>
                            </div>
                        </a>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
                            {navItems.map((item) => (
                                <div key={item.label} className="relative">
                                    {item.dropdown ? (
                                        <div
                                            onMouseEnter={() => setServicesDropdown(true)}
                                            onMouseLeave={() => setServicesDropdown(false)}
                                            className="relative"
                                        >
                                            <button
                                                className={`relative px-4 py-2 text-sm lg:text-base font-medium transition-all duration-300 rounded-lg flex items-center gap-1 group ${
                                                    activeSection === item.id
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-300 hover:text-yellow-400'
                                                }`}
                                            >
                                                {item.label}
                                                <svg className={`w-4 h-4 transition-transform duration-300 ${
                                                    servicesDropdown ? 'rotate-180' : ''
                                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            
                                            {/* Dropdown Menu */}
                                            <div className={`absolute top-full left-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden transition-all duration-300 ${
                                                servicesDropdown 
                                                    ? 'opacity-100 visible translate-y-0' 
                                                    : 'opacity-0 invisible -translate-y-2'
                                            }`}>
                                                {item.items.map((subItem, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={subItem.href}
                                                        onClick={(e) => handleClick(e, subItem.href, subItem.id)}
                                                        className="block px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-white/5 transition-all duration-300"
                                                    >
                                                        {subItem.label}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <a
                                            href={item.href}
                                            onClick={(e) => handleClick(e, item.href, item.id)}
                                            className={`relative px-4 py-2 text-sm lg:text-base font-medium transition-all duration-300 rounded-lg group ${
                                                activeSection === item.id
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-300 hover:text-yellow-400'
                                            }`}
                                        >
                                            {item.label}
                                            {activeSection === item.id && (
                                                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-yellow-400 rounded-full"></span>
                                            )}
                                            <span className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                                                activeSection === item.id
                                                    ? 'bg-yellow-400/10'
                                                    : 'bg-yellow-400/0 group-hover:bg-yellow-400/5'
                                            }`}></span>
                                        </a>
                                    )}
                                </div>
                            ))}
                            
                            {/* Contact Button */}
                            <a
                                href="#contact"
                                onClick={(e) => handleClick(e, '#contact', 'contact')}
                                className="ml-4 px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-semibold rounded-full hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Teklif Al
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 group z-50"
                            aria-label="Toggle menu"
                        >
                            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                                isOpen ? 'rotate-45 translate-y-2' : ''
                            }`}></span>
                            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                                isOpen ? 'opacity-0' : ''
                            }`}></span>
                            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                                isOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}></span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`md:hidden fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 transition-all duration-500 z-40 ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 px-4">
                        {/* Logo in mobile menu */}
                        <div className="mb-8 text-center">
                            <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
                                LINE<span className="text-yellow-500">O</span>
                            </div>
                            <div className="w-12 h-0.5 bg-yellow-400 mx-auto"></div>
                        </div>

                        {navItems.map((item, index) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => handleClick(e, item.href, item.id)}
                                className={`text-2xl font-medium transition-all duration-300 transform ${
                                    activeSection === item.id
                                        ? 'text-yellow-400 scale-110'
                                        : 'text-gray-300 hover:text-yellow-400'
                                } ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                style={{
                                    transitionDelay: isOpen ? `${index * 100}ms` : '0ms'
                                }}
                            >
                                {item.label}
                            </a>
                        ))}
                        
                        {/* Contact Info in mobile menu */}
                        <div className={`mt-12 text-center space-y-4 transition-all duration-300 ${
                            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}
                        style={{
                            transitionDelay: isOpen ? `${navItems.length * 100}ms` : '0ms'
                        }}>
                            <a
                                href="#contact"
                                onClick={(e) => handleClick(e, '#contact', 'contact')}
                                className="inline-block px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-semibold rounded-full hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
                            >
                                Teklif Al
                            </a>
                            
                            <div className="pt-6 space-y-2 text-gray-400 text-sm">
                                <p>📞 +90 (212) 123 45 67</p>
                                <p>✉️ info@lineo.com.tr</p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Spacer */}
            <div className="h-16 md:h-20"></div>
        </>
    )
}

export default Navbar