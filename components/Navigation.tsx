'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Users, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Home,
  MessageCircle,
  Mic,
  Bell
} from 'lucide-react';
import { supabase, demoSignOut, isDemoMode } from '@/lib/supabase';
import { Language, useTranslation, getStoredLanguage } from '@/lib/i18n';
import LanguageSelector from './LanguageSelector';

interface NavigationProps {
  user?: any;
}

export default function Navigation({ user }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const [language, setLanguage] = useState<Language>('en');
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslation(language);

  // Don't show navigation on landing page or auth pages
  const hideNavigation = pathname === '/' || pathname.startsWith('/auth') || pathname === '/onboarding';

  useEffect(() => {
    setLanguage(getStoredLanguage());
    // Simulate notifications
    setNotifications(Math.floor(Math.random() * 5));
  }, []);

  const handleSignOut = async () => {
    try {
      if (isDemoMode) {
        await demoSignOut();
      } else {
        await supabase?.auth.signOut();
      }
      localStorage.clear();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (hideNavigation) return null;

  const navItems = [
    { href: '/dashboard', label: t.nav.dashboard, icon: Home },
    { href: '/matching', label: t.nav.findMatch, icon: Users },
    { href: '/conversations', label: t.nav.conversations, icon: MessageCircle },
    { href: '/voice-capture', label: t.nav.voiceSetup, icon: Mic },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">RealTalk</span>
              {isDemoMode && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                  Demo
                </span>
              )}
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <LanguageSelector 
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* User Profile */}
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user?.email || 'Demo User'}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>{t.nav.profile}</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>{t.nav.settings}</span>
                    </Link>
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t.nav.logout}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              
              <hr className="my-4 border-gray-200" />
              
              <Link
                href="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">{t.nav.profile}</span>
              </Link>
              
              <Link
                href="/settings"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">{t.nav.settings}</span>
              </Link>
              
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">{t.nav.logout}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}