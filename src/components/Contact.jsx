





import { useState } from 'react'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })
    
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        // Simulate form submission
        setTimeout(() => {
            setSubmitStatus('success')
            setIsSubmitting(false)
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            })
            
            // Clear success message after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000)
        }, 1500)
    }

    return (
        <section id="contact" className="py-20 md:py-28 lg:py-32 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-12 h-px bg-yellow-400"></div>
                        <span className="text-yellow-400 font-semibold tracking-wider text-sm uppercase">
                            İletişim
                        </span>
                        <div className="w-12 h-px bg-yellow-400"></div>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        Bize Ulaşın
                    </h2>
                    
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6 rounded-full"></div>
                    
                    <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
                        Projeleriniz için ücretsiz keşif ve teklif talebinde bulunun
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Contact Information Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10 hover:border-yellow-400/50 transition-all duration-300 hover:-translate-y-1">
                            <div className="w-14 h-14 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="text-white font-semibold mb-2">Telefon</h3>
                            <p className="text-gray-300 text-sm">+90 (212) 123 45 67</p>
                            <p className="text-gray-400 text-xs mt-1">Hafta içi 09:00 - 18:00</p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10 hover:border-yellow-400/50 transition-all duration-300 hover:-translate-y-1">
                            <div className="w-14 h-14 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-white font-semibold mb-2">E-posta</h3>
                            <p className="text-gray-300 text-sm">info@aydinlatma.com.tr</p>
                            <p className="text-gray-400 text-xs mt-1">24 saat içinde dönüş</p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10 hover:border-yellow-400/50 transition-all duration-300 hover:-translate-y-1">
                            <div className="w-14 h-14 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-white font-semibold mb-2">Adres</h3>
                            <p className="text-gray-300 text-sm">İstanbul, Türkiye</p>
                            <p className="text-gray-400 text-xs mt-1">Randevu ile ziyaret</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white/5 rounded-2xl p-6 md:p-8 lg:p-10 border border-white/10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Adınız Soyadınız *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                                        placeholder="Ahmet Yılmaz"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        E-posta Adresiniz *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                                        placeholder="info@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Telefon Numaranız
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                                        placeholder="+90 555 123 45 67"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Proje Konusu *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                                        placeholder="Aydınlatma Projesi"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Proje Detayları *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all resize-none"
                                    placeholder="Projeniz hakkında detaylı bilgi verin..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 px-8 py-4 rounded-lg text-gray-900 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Gönderiliyor...
                                    </>
                                ) : (
                                    <>
                                        Gönder
                                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                            </button>

                            {submitStatus === 'success' && (
                                <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-green-400">Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.</p>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact




// function Contact() {
//   return (
//     <section id="contact" className="section">
//                 <div className="container">
//                     <div className="section-title">
//                         <h2>İletişim</h2>
//                         <p>Projeleriniz için ücretsiz keşif ve teklif talebinde bulunun</p>
//                     </div>

//                     <div className="contact-form">
//                         <form>
//                             <div className="form-group">
//                                 <input type="text" className="form-input" placeholder="Adınız Soyadınız" required />
//                             </div>

//                             <div className="form-group">
//                                 <input type="email" className="form-input" placeholder="E-posta Adresiniz" required />
//                             </div>

//                             <div className="form-group">
//                                 <input type="tel" className="form-input" placeholder="Telefon Numaranız" />
//                             </div>

//                             <div className="form-group">
//                                 <input type="text" className="form-input" placeholder="Proje Konusu" required />
//                             </div>

//                             <div className="form-group">
//                                 <textarea className="form-input" placeholder="Proje Detayları" required></textarea>
//                             </div>

//                             <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
//                                 Gönder
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </section>
//   )
// }

// export default Contact