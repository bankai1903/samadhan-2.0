import React, { useState } from 'react';
import { MapPin, Mail, Phone, Star, Heart, MessageCircle } from 'lucide-react';

const ProfileCard = ({ 
  name = "Alex Johnson", 
  role = "Frontend Developer", 
  location = "San Francisco, CA",
  email = "alex@example.com",
  phone = "+1 (555) 123-4567",
  avatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  bio = "Passionate developer with 5+ years of experience building modern web applications. Love creating beautiful, functional user interfaces.",
  skills = ["React", "JavaScript", "TypeScript", "CSS", "Node.js"],
  isOnline = true,
  rating = 4.9,
  projects = 42
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 relative">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-4 right-4">
          <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-400'} animate-pulse`}></div>
        </div>
      </div>

      {/* Avatar */}
      <div className="relative -mt-16 flex justify-center">
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
          <img 
            src={avatar} 
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        <div className="text-center mt-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{name}</h2>
          <p className="text-blue-600 font-medium">{role}</p>
          <div className="flex items-center justify-center text-gray-500 mt-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{location}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center space-x-6 mb-4 py-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-800">{projects}</div>
            <div className="text-xs text-gray-500">Projects</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-xl font-bold text-gray-800">{rating}</span>
            </div>
            <div className="text-xs text-gray-500">Rating</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-800">{isOnline ? 'Online' : 'Away'}</div>
            <div className="text-xs text-gray-500">Status</div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{bio}</p>

        {/* Skills */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium hover:bg-blue-200 transition-colors cursor-pointer"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Contact (toggle) */}
        {showContact && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center mb-2">
              <Mail className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">{email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700">{phone}</span>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={() => setShowContact(!showContact)}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {showContact ? 'Hide Contact' : 'Contact'}
          </button>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center ${
              isLiked 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
