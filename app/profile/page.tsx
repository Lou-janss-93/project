'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Calendar, Edit3, Save, X, Camera, Shield, Mic } from 'lucide-react';
import { supabase, getCurrentUser, getProfile, updateProfile } from '@/lib/supabase';
import { Language, useTranslation, getStoredLanguage } from '@/lib/i18n';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  username?: string;
  avatar_url?: string;
  personality_type: 'real-me' | 'my-mask' | 'crazy-self';
  bio?: string;
  created_at: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState<Language>('en');
  const [editForm, setEditForm] = useState({
    full_name: '',
    username: '',
    bio: '',
    personality_type: 'real-me' as const
  });

  const router = useRouter();
  const t = useTranslation(language);

  useEffect(() => {
    setLanguage(getStoredLanguage());
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        router.push('/auth/login');
        return;
      }

      const profileData = await getProfile(user.id);
      setProfile(profileData);
      setEditForm({
        full_name: profileData.full_name || '',
        username: profileData.username || '',
        bio: profileData.bio || '',
        personality_type: profileData.personality_type || 'real-me'
      });
    } catch (error) {
      console.error('Error loading profile:', error);
      setError('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!profile) return;

    setIsSaving(true);
    setError('');

    try {
      const updatedProfile = await updateProfile(profile.id, {
        full_name: editForm.full_name,
        username: editForm.username,
        bio: editForm.bio,
        personality_type: editForm.personality_type
      });

      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (error: any) {
      setError(error.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setEditForm({
        full_name: profile.full_name || '',
        username: profile.username || '',
        bio: profile.bio || '',
        personality_type: profile.personality_type || 'real-me'
      });
    }
    setIsEditing(false);
    setError('');
  };

  const getPersonalityInfo = (personality: string) => {
    switch (personality) {
      case 'real-me':
        return {
          title: t.personalities.realMe,
          description: t.personalities.realMeDescription,
          color: 'from-blue-500 to-indigo-600',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-800'
        };
      case 'my-mask':
        return {
          title: t.personalities.myMask,
          description: t.personalities.myMaskDescription,
          color: 'from-purple-500 to-violet-600',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-800'
        };
      case 'crazy-self':
        return {
          title: t.personalities.crazySelf,
          description: t.personalities.crazySelfDescription,
          color: 'from-orange-500 to-pink-600',
          bgColor: 'bg-orange-50',
          textColor: 'text-orange-800'
        };
      default:
        return {
          title: 'Unknown',
          description: 'Unknown personality type',
          color: 'from-gray-500 to-gray-600',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-800'
        };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">Unable to load your profile information.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const personalityInfo = getPersonalityInfo(profile.personality_type);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Profile</h1>
          <p className="text-xl text-gray-600">Manage your account and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Cover Section */}
          <div className={`h-32 bg-gradient-to-r ${personalityInfo.color} relative`}>
            <div className="absolute top-4 right-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="p-2 bg-green-500 rounded-lg text-white hover:bg-green-600 transition-colors disabled:opacity-50"
                  >
                    {isSaving ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-8">
            {/* Avatar and Basic Info */}
            <div className="flex items-start space-x-6 mb-8">
              <div className="relative">
                {profile.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt={profile.full_name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className={`w-24 h-24 bg-gradient-to-r ${personalityInfo.color} rounded-full flex items-center justify-center border-4 border-white shadow-lg`}>
                    <User className="w-12 h-12 text-white" />
                  </div>
                )}
                <button className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editForm.full_name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        value={editForm.username}
                        onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Choose a username"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {profile.full_name || 'No name set'}
                    </h2>
                    <p className="text-lg text-gray-600 mb-2">
                      @{profile.username || 'no-username'}
                    </p>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Mail className="w-4 h-4" />
                      <span>{profile.email}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Personality Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personality Type</h3>
              {isEditing ? (
                <div className="space-y-3">
                  {(['real-me', 'my-mask', 'crazy-self'] as const).map((type) => {
                    const info = getPersonalityInfo(type);
                    return (
                      <label key={type} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="personality_type"
                          value={type}
                          checked={editForm.personality_type === type}
                          onChange={(e) => setEditForm(prev => ({ ...prev, personality_type: e.target.value as any }))}
                          className="w-4 h-4 text-blue-600"
                        />
                        <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center`}>
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{info.title}</p>
                          <p className="text-sm text-gray-600">{info.description}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div className={`p-6 ${personalityInfo.bgColor} rounded-2xl`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${personalityInfo.color} rounded-2xl flex items-center justify-center`}>
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold ${personalityInfo.textColor}`}>
                        {personalityInfo.title}
                      </h4>
                      <p className={`${personalityInfo.textColor} opacity-80`}>
                        {personalityInfo.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bio Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">About</h3>
              {isEditing ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-700">
                    {profile.bio || 'No bio added yet. Click edit to add one!'}
                  </p>
                </div>
              )}
            </div>

            {/* Account Info */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Member since</p>
                    <p className="font-medium text-gray-900">
                      {new Date(profile.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <Shield className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Account Status</p>
                    <p className="font-medium text-green-600">Verified</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t border-gray-200 pt-8 mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => router.push('/voice-capture')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Mic className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-gray-900">Voice Setup</span>
                </button>
                <button
                  onClick={() => router.push('/conversations')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <User className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-gray-900">View Conversations</span>
                </button>
                <button
                  onClick={() => router.push('/matching')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <User className="w-5 h-5 text-purple-500" />
                  <span className="font-medium text-gray-900">Find Match</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}