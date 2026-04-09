



import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

function Navbar() {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [servicesDropdown, setServicesDropdown] = useState(false)
    const [technicalDropdown, setTechnicalDropdown] = useState(false) // YENİ: teknik servisler dropdown
    const location = useLocation()

    const navItems = [
        { label: t('navbar.navItems.home'), path: '/', id: 'home' },
        { label: t('navbar.navItems.about'), path: '/about', id: 'about' },
        { 
            label: t('navbar.navItems.services'), 
            path: '/services', 
            id: 'services',
            dropdown: true,
            items: [
                { label: t('navbar.dropdown.facade'), path: '/services/facade-lighting' },        // DEĞİŞTİ
                { label: t('navbar.dropdown.industrial'), path: '/services/industrial-lighting' }, // DEĞİŞTİ
                { label: t('navbar.dropdown.landscape'), path: '/services/landscape-lighting' },   // DEĞİŞTİ
                { label: t('navbar.dropdown.road'), path: '/services/road-lighting' },             // YENİ
                { label: t('navbar.dropdown.energy'), path: '/services/energy-solutions' },        // YENİ
                { label: t('navbar.dropdown.smart'), path: '/services/smart-systems' },            // AYNI (zaten vardı)
            ]
        },
        // { 
        //     label: t('navbar.navItems.technical'), // YENİ
        //     path: '/technical-services', 
        //     id: 'technical',
        //     dropdown: true,
        //     items: [
        //         { label: t('navbar.dropdown.electricalPanel'), path: '/technical-services/electrical-panel' },
        //         { label: t('navbar.dropdown.mechanicalDrive'), path: '/technical-services/mechanical-drive' },
        //         { label: t('navbar.dropdown.bms'), path: '/technical-services/bms' },
        //         { label: t('navbar.dropdown.ddc'), path: '/technical-services/ddc' },
        //         { label: t('navbar.dropdown.prover'), path: '/technical-services/prover' },
        //         { label: t('navbar.dropdown.mechanicalInstallation'), path: '/technical-services/mechanical-installation' },
        //     ]
        // },
        { label: t('navbar.navItems.portfolio'), path: '/portfolio', id: 'portfolio' },
        { label: t('navbar.navItems.contact'), path: '/contact', id: 'contact' },
    ]

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsOpen(false)
        setServicesDropdown(false)
        setTechnicalDropdown(false) // YENİ: mobil menü kapanırken teknik dropdown da kapansın
    }, [location])

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
                        <Link to="/" className="relative group flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                                <span className="text-gray-900 font-bold text-lg">L</span>
                            </div>
                            <div>
                                <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                                    {t('navbar.logo')}<span className="text-yellow-500">O</span>
                                </div>
                                <div className="text-xs text-gray-400 hidden md:block">
                                    {t('navbar.brandSuffix')}
                                </div>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
                            {navItems.map((item) => (
                                <div key={item.label} className="relative">
                                    {item.dropdown ? (
                                        <div
                                            onMouseEnter={() => {
                                                if (item.id === 'services') {
                                                    setServicesDropdown(true)
                                                    setTechnicalDropdown(false)
                                                } else if (item.id === 'technical') {
                                                    setTechnicalDropdown(true)
                                                    setServicesDropdown(false)
                                                }
                                            }}
                                            onMouseLeave={() => {
                                                if (item.id === 'services') {
                                                    setServicesDropdown(false)
                                                } else if (item.id === 'technical') {
                                                    setTechnicalDropdown(false)
                                                }
                                            }}
                                            className="relative"
                                        >
                                            <button
                                                className={`relative px-4 py-2 text-sm lg:text-base font-medium transition-all duration-300 rounded-lg flex items-center gap-1 group ${
                                                    location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-300 hover:text-yellow-400'
                                                }`}
                                            >
                                                {item.label}
                                                <svg className={`w-4 h-4 transition-transform duration-300 ${
                                                    (item.id === 'services' && servicesDropdown) || (item.id === 'technical' && technicalDropdown) ? 'rotate-180' : ''
                                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            
                                            <div className={`absolute top-full left-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden transition-all duration-300 ${
                                                (item.id === 'services' && servicesDropdown) || (item.id === 'technical' && technicalDropdown)
                                                    ? 'opacity-100 visible translate-y-0' 
                                                    : 'opacity-0 invisible -translate-y-2'
                                            }`}>
                                                {item.items.map((subItem, idx) => (
                                                    <Link
                                                        key={idx}
                                                        to={subItem.path}
                                                        className="block px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-white/5 transition-all duration-300"
                                                        onClick={() => {
                                                            setServicesDropdown(false)
                                                            setTechnicalDropdown(false)
                                                        }}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) => `
                                                relative px-4 py-2 text-sm lg:text-base font-medium transition-all duration-300 rounded-lg group
                                                ${isActive ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}
                                            `}
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    {item.label}
                                                    {isActive && (
                                                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-yellow-400 rounded-full"></span>
                                                    )}
                                                    <span className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                                                        isActive
                                                            ? 'bg-yellow-400/10'
                                                            : 'bg-yellow-400/0 group-hover:bg-yellow-400/5'
                                                    }`}></span>
                                                </>
                                            )}
                                        </NavLink>
                                    )}
                                </div>
                            ))}
                            
                            {/* Language Switcher */}
                            <LanguageSwitcher />
                            
                            {/* Contact Button */}
                            <Link
                                to="/contact"
                                className="ml-4 px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-semibold rounded-full hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {t('navbar.buttons.getQuote')}
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 group z-50"
                            aria-label={t('navbar.ariaLabels.toggleMenu')}
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
                        <div className="mb-8 text-center">
                            <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
                                {t('navbar.logo')}<span className="text-yellow-500">O</span>
                            </div>
                            <div className="w-12 h-0.5 bg-yellow-400 mx-auto"></div>
                        </div>

                        {navItems.map((item, index) => {
                            // Eğer dropdown ise ana menüde sadece başlığı göster (mobilde ayrı dropdown yapmıyoruz)
                            if (item.dropdown) {
                                return (
                                    <div key={item.label} className="text-center">
                                        <div
                                            className={`text-2xl font-medium transition-all duration-300 transform ${
                                                location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-300'
                                            } ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                            style={{
                                                transitionDelay: isOpen ? `${index * 100}ms` : '0ms'
                                            }}
                                        >
                                            {item.label}
                                        </div>
                                        {/* Mobilde dropdown alt menüleri */}
                                        <div className="mt-3 space-y-3">
                                            {item.items.map((subItem, subIdx) => (
                                                <Link
                                                    key={subIdx}
                                                    to={subItem.path}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block text-base text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                                                >
                                                    {subItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )
                            }
                            return (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-2xl font-medium transition-all duration-300 transform ${
                                        location.pathname === item.path
                                            ? 'text-yellow-400 scale-110'
                                            : 'text-gray-300 hover:text-yellow-400'
                                    } ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                    style={{
                                        transitionDelay: isOpen ? `${index * 100}ms` : '0ms'
                                    }}
                                >
                                    {item.label}
                                </Link>
                            )
                        })}
                        
                        {/* Language Switcher in Mobile Menu */}
                        <div className={`mt-8 transition-all duration-300 ${
                            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}
                        style={{
                            transitionDelay: isOpen ? `${navItems.length * 100}ms` : '0ms'
                        }}>
                            <LanguageSwitcher />
                        </div>
                        
                        <div className={`mt-12 text-center space-y-4 transition-all duration-300 ${
                            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}
                        style={{
                            transitionDelay: isOpen ? `${(navItems.length + 1) * 100}ms` : '0ms'
                        }}>
                            <Link
                                to="/contact"
                                onClick={() => setIsOpen(false)}
                                className="inline-block px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-semibold rounded-full hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
                            >
                                {t('navbar.buttons.getQuote')}
                            </Link>
                            
                            <div className="pt-6 space-y-2 text-gray-400 text-sm">
                                <p>📞 {t('navbar.mobileMenu.contactInfo.phone')}</p>
                                <p>✉️ {t('navbar.mobileMenu.contactInfo.email')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="h-16 md:h-20"></div>
        </>
    )
}

export default Navbar













// import { useState, useEffect } from 'react'
// import { Link, NavLink, useLocation } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import LanguageSwitcher from './LanguageSwitcher'

// function Navbar() {
//     const { t } = useTranslation()
//     const [isOpen, setIsOpen] = useState(false)
//     const [scrolled, setScrolled] = useState(false)
//     const [servicesDropdown, setServicesDropdown] = useState(false)
//     const location = useLocation()

//     const navItems = [
//         { label: t('navbar.navItems.home'), path: '/', id: 'home' },
//         { label: t('navbar.navItems.about'), path: '/about', id: 'about' },
//         { 
//             label: t('navbar.navItems.services'), 
//             path: '/services', 
//             id: 'services',
//             dropdown: true,
//             items: [
//                 { label: t('navbar.dropdown.facade'), path: '/services/facade' },
//                 { label: t('navbar.dropdown.industrial'), path: '/services/industrial' },
//                 { label: t('navbar.dropdown.landscape'), path: '/services/landscape' },
//                 { label: t('navbar.dropdown.smart'), path: '/services/smart-systems' },
//             ]
//         },
//         { label: t('navbar.navItems.portfolio'), path: '/portfolio', id: 'portfolio' },
//         { label: t('navbar.navItems.contact'), path: '/contact', id: 'contact' },
//     ]

//     useEffect(() => {
//         const handleScroll = () => {
//             setScrolled(window.scrollY > 50)
//         }

//         window.addEventListener('scroll', handleScroll)
//         return () => window.removeEventListener('scroll', handleScroll)
//     }, [])

//     useEffect(() => {
//         setIsOpen(false)
//         setServicesDropdown(false)
//     }, [location])

//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth > 768 && isOpen) {
//                 setIsOpen(false)
//             }
//         }
        
//         window.addEventListener('resize', handleResize)
//         return () => window.removeEventListener('resize', handleResize)
//     }, [isOpen])

//     return (
//         <>
//             <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
//                 scrolled 
//                     ? 'bg-gray-950/95 backdrop-blur-md shadow-lg border-b border-white/10' 
//                     : 'bg-transparent'
//             }`}>
//                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex justify-between items-center h-16 md:h-20">
//                         {/* Logo */}
//                         <Link to="/" className="relative group flex items-center space-x-2">
//                             <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
//                                 <span className="text-gray-900 font-bold text-lg">L</span>
//                             </div>
//                             <div>
//                                 <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
//                                     {t('navbar.logo')}<span className="text-yellow-500">O</span>
//                                 </div>
//                                 <div className="text-xs text-gray-400 hidden md:block">
//                                     {t('navbar.brandSuffix')}
//                                 </div>
//                             </div>
//                         </Link>

//                         {/* Desktop Menu */}
//                         <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
//                             {navItems.map((item) => (
//                                 <div key={item.label} className="relative">
//                                     {item.dropdown ? (
//                                         <div
//                                             onMouseEnter={() => setServicesDropdown(true)}
//                                             onMouseLeave={() => setServicesDropdown(false)}
//                                             className="relative"
//                                         >
//                                             <button
//                                                 className={`relative px-4 py-2 text-sm lg:text-base font-medium transition-all duration-300 rounded-lg flex items-center gap-1 group ${
//                                                     location.pathname === item.path || location.pathname.startsWith('/services/')
//                                                         ? 'text-yellow-400'
//                                                         : 'text-gray-300 hover:text-yellow-400'
//                                                 }`}
//                                             >
//                                                 {item.label}
//                                                 <svg className={`w-4 h-4 transition-transform duration-300 ${
//                                                     servicesDropdown ? 'rotate-180' : ''
//                                                 }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                                                 </svg>
//                                             </button>
                                            
//                                             <div className={`absolute top-full left-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden transition-all duration-300 ${
//                                                 servicesDropdown 
//                                                     ? 'opacity-100 visible translate-y-0' 
//                                                     : 'opacity-0 invisible -translate-y-2'
//                                             }`}>
//                                                 {item.items.map((subItem, idx) => (
//                                                     <Link
//                                                         key={idx}
//                                                         to={subItem.path}
//                                                         className="block px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-white/5 transition-all duration-300"
//                                                         onClick={() => setServicesDropdown(false)}
//                                                     >
//                                                         {subItem.label}
//                                                     </Link>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     ) : (
//                                         <NavLink
//                                             to={item.path}
//                                             className={({ isActive }) => `
//                                                 relative px-4 py-2 text-sm lg:text-base font-medium transition-all duration-300 rounded-lg group
//                                                 ${isActive ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}
//                                             `}
//                                         >
//                                             {({ isActive }) => (
//                                                 <>
//                                                     {item.label}
//                                                     {isActive && (
//                                                         <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-yellow-400 rounded-full"></span>
//                                                     )}
//                                                     <span className={`absolute inset-0 rounded-lg transition-all duration-300 ${
//                                                         isActive
//                                                             ? 'bg-yellow-400/10'
//                                                             : 'bg-yellow-400/0 group-hover:bg-yellow-400/5'
//                                                     }`}></span>
//                                                 </>
//                                             )}
//                                         </NavLink>
//                                     )}
//                                 </div>
//                             ))}
                            
//                             {/* Language Switcher */}
//                             <LanguageSwitcher />
                            
//                             {/* Contact Button */}
//                             <Link
//                                 to="/contact"
//                                 className="ml-4 px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-semibold rounded-full hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 hover:scale-105 flex items-center gap-2"
//                             >
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                                 </svg>
//                                 {t('navbar.buttons.getQuote')}
//                             </Link>
//                         </div>

//                         {/* Mobile Menu Button */}
//                         <button
//                             onClick={() => setIsOpen(!isOpen)}
//                             className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 group z-50"
//                             aria-label={t('navbar.ariaLabels.toggleMenu')}
//                         >
//                             <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
//                                 isOpen ? 'rotate-45 translate-y-2' : ''
//                             }`}></span>
//                             <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
//                                 isOpen ? 'opacity-0' : ''
//                             }`}></span>
//                             <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
//                                 isOpen ? '-rotate-45 -translate-y-2' : ''
//                             }`}></span>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile Menu Overlay */}
//                 <div className={`md:hidden fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 transition-all duration-500 z-40 ${
//                     isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
//                 }`}>
//                     <div className="flex flex-col items-center justify-center min-h-screen space-y-6 px-4">
//                         <div className="mb-8 text-center">
//                             <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
//                                 {t('navbar.logo')}<span className="text-yellow-500">O</span>
//                             </div>
//                             <div className="w-12 h-0.5 bg-yellow-400 mx-auto"></div>
//                         </div>

//                         {navItems.map((item, index) => (
//                             <Link
//                                 key={item.label}
//                                 to={item.path}
//                                 onClick={() => setIsOpen(false)}
//                                 className={`text-2xl font-medium transition-all duration-300 transform ${
//                                     location.pathname === item.path || (item.dropdown && location.pathname.startsWith('/services/'))
//                                         ? 'text-yellow-400 scale-110'
//                                         : 'text-gray-300 hover:text-yellow-400'
//                                 } ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
//                                 style={{
//                                     transitionDelay: isOpen ? `${index * 100}ms` : '0ms'
//                                 }}
//                             >
//                                 {item.label}
//                             </Link>
//                         ))}
                        
//                         {/* Language Switcher in Mobile Menu */}
//                         <div className={`mt-8 transition-all duration-300 ${
//                             isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//                         }`}
//                         style={{
//                             transitionDelay: isOpen ? `${navItems.length * 100}ms` : '0ms'
//                         }}>
//                             <LanguageSwitcher />
//                         </div>
                        
//                         <div className={`mt-12 text-center space-y-4 transition-all duration-300 ${
//                             isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//                         }`}
//                         style={{
//                             transitionDelay: isOpen ? `${(navItems.length + 1) * 100}ms` : '0ms'
//                         }}>
//                             <Link
//                                 to="/contact"
//                                 onClick={() => setIsOpen(false)}
//                                 className="inline-block px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-semibold rounded-full hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
//                             >
//                                 {t('navbar.buttons.getQuote')}
//                             </Link>
                            
//                             <div className="pt-6 space-y-2 text-gray-400 text-sm">
//                                 <p>📞 {t('navbar.mobileMenu.contactInfo.phone')}</p>
//                                 <p>✉️ {t('navbar.mobileMenu.contactInfo.email')}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </nav>

//             <div className="h-16 md:h-20"></div>
//         </>
//     )
// }

// export default Navbar




