'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Users, Shield, Zap, Heart, Star, Play, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Language, useTranslation, getStoredLanguage } from '@/lib/i18n';
import LanguageSelector from '@/components/LanguageSelector';

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const router = useRouter();
  const t = useTranslation(language);

  useEffect(() => {
    setIsLoaded(true);
    setLanguage(getStoredLanguage());
    
    // Check if user is already authenticated
    const checkAuth = () => {
      const hasCompletedOnboarding = localStorage.getItem('userPersonality');
      if (hasCompletedOnboarding) {
        // User has completed onboarding, redirect to dashboard
        router.push('/dashboard');
      }
    };

    checkAuth();
  }, [router]);

  const features = [
    {
      icon: Users,
      title: t.features.authenticConnections,
      description: t.features.authenticDescription,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Shield,
      title: t.features.safeConversations,
      description: t.features.safeDescription,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: Zap,
      title: t.features.realityDrift,
      description: t.features.realityDriftDescription,
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const personalities = [
    {
      id: 'real-me',
      title: t.personalities.realMe,
      description: t.personalities.realMeDescription,
      icon: Heart,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'my-mask',
      title: t.personalities.myMask,
      description: t.personalities.myMaskDescription,
      icon: Star,
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 'crazy-self',
      title: t.personalities.crazySelf,
      description: t.personalities.crazySelfDescription,
      icon: Zap,
      color: 'from-orange-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">RealTalk</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSelector 
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
              <Link 
                href="/auth/login"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                {t.nav.login}
              </Link>
              <Link 
                href="/onboarding"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                {t.nav.signUp}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight whitespace-pre-line">
                {t.landing.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                {t.landing.description}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link 
                  href="/onboarding"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <span>{t.landing.startJourney}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <button className="group px-8 py-4 bg-white text-gray-700 rounded-2xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>{t.landing.watchDemo}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {personalities.map((personality, index) => {
                  const IconComponent = personality.icon;
                  return (
                    <div key={personality.id} className="text-center group cursor-pointer">
                      <div className={`w-20 h-20 bg-gradient-to-r ${personality.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{personality.title}</h3>
                      <p className="text-gray-600 text-sm">{personality.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.landing.whyRealTalk}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.landing.whyDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t.landing.howItWorks}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.landing.howDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: t.landing.step1Title,
                description: t.landing.step1Description,
                icon: Users
              },
              {
                step: '02',
                title: t.landing.step2Title,
                description: t.landing.step2Description,
                icon: Heart
              },
              {
                step: '03',
                title: t.landing.step3Title,
                description: t.landing.step3Description,
                icon: Zap
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="text-center relative">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <IconComponent className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100">
                      <span className="text-sm font-bold text-gray-700">{item.step}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 left-full w-full">
                      <ArrowRight className="w-6 h-6 text-gray-300 mx-auto" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t.landing.readyForConnections}
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            {t.landing.readyDescription}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/onboarding"
              className="group px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>{t.landing.startFree}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="flex items-center space-x-2 text-white/90">
              <CheckCircle className="w-5 h-5" />
              <span>{t.landing.noCreditCard}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">RealTalk</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                {language === 'en' 
                  ? 'The future of authentic online connections. Discover who you really are in conversations that matter.'
                  : 'De toekomst van authentieke online verbindingen. Ontdek wie je echt bent in gesprekken die ertoe doen.'
                }
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 RealTalk. {language === 'en' ? 'All rights reserved.' : 'Alle rechten voorbehouden.'}</p>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}