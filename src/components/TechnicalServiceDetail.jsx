import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function TechnicalServiceDetail() {
    const { serviceSlug } = useParams()
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [serviceData, setServiceData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getServiceDetails = () => {
            try {
                const details = t(`technicalServiceDetails.${serviceSlug}`, { returnObjects: true })
                
                if (details && Object.keys(details).length > 0) {
                    setServiceData(details)
                } else {
                    navigate('/services', { replace: true })
                }
            } catch (error) {
                console.error('Technical service not found:', error)
                navigate('/services', { replace: true })
            } finally {
                setLoading(false)
            }
        }

        getServiceDetails()
    }, [serviceSlug, t, navigate])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg">{t('common.loading') || 'Loading...'}</p>
                </div>
            </div>
        )
    }

    if (!serviceData) {
        return null
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            {/* Hero Section */}
            <section className="relative py-20 md:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 to-red-900/20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-950"></div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="mb-6">
                            <Link 
                                to="/technical-services" 
                                className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors duration-300 group"
                            >
                                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                {t('common.backToServices') || 'Back to Services'}
                            </Link>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            {serviceData.title}
                        </h1>
                        <p className="text-xl text-gray-300">
                            {serviceData.shortDescription}
                        </p>
                    </div>
                </div>
            </section>

            {/* Full Description */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-orange-400/20">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                {t('common.overview') || 'Overview'}
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {serviceData.fullDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features & Benefits Grid */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 md:p-8">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-orange-400">✓</span>
                                {t('common.keyFeatures') || 'Key Features'}
                            </h3>
                            <ul className="space-y-3">
                                {serviceData.features?.map((feature, index) => (
                                    <li key={index} className="text-gray-300 flex items-start gap-2">
                                        <span className="text-orange-400 mt-1">•</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 md:p-8">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-green-400">★</span>
                                {t('common.benefits') || 'Benefits'}
                            </h3>
                            <ul className="space-y-3">
                                {serviceData.benefits?.map((benefit, index) => (
                                    <li key={index} className="text-gray-300 flex items-start gap-2">
                                        <span className="text-green-400 mt-1">•</span>
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technologies & Applications */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 md:p-8">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                                {t('common.technologies') || 'Technologies'}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {serviceData.technologies?.map((tech, index) => (
                                    <span key={index} className="px-3 py-1 bg-orange-400/10 text-orange-400 rounded-full text-sm">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 md:p-8">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
                                {t('common.applications') || 'Applications'}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {serviceData.applications?.map((app, index) => (
                                    <span key={index} className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full text-sm">
                                        {app}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            {serviceData.faq && serviceData.faq.length > 0 && (
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
                                {t('common.faq') || 'Frequently Asked Questions'}
                            </h2>
                            <div className="space-y-4">
                                {serviceData.faq.map((item, index) => (
                                    <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6">
                                        <h4 className="text-lg font-semibold text-white mb-2">
                                            {item.question}
                                        </h4>
                                        <p className="text-gray-300">
                                            {item.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-orange-600/10 to-red-600/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-orange-400/20">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            {t('common.readyToStart') || 'Ready to Get Started?'}
                        </h2>
                        <p className="text-gray-300 mb-8">
                            {t('common.contactForQuote') || 'Contact us for a free consultation and quote'}
                        </p>
                        <Link 
                            to="/contact" 
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                            {t('common.contactUs') || 'Contact Us'}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TechnicalServiceDetail