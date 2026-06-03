import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent } from '../redux/slices/contentSlice';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

const Contact = () => {
  const dispatch = useDispatch();
  const { contact, isLoading } = useSelector((state) => state.content);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    dispatch(fetchContent('contact'));
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add API call to send contact form
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Parse contact body if it contains structured data
  let contactInfo = {
    address: '123 Business Street, City, State 12345',
    phone: '+91 98765 43210',
    email: 'support@example.com',
    hours: 'Mon - Sat: 10:00 AM - 7:00 PM'
  };

  if (contact?.body) {
    try {
      // If body is JSON string
      const parsed = JSON.parse(contact.body);
      contactInfo = { ...contactInfo, ...parsed };
    } catch {
      // If body is plain text, use as description
      contactInfo.description = contact.body;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {contact?.title || 'Contact Us'}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Get in Touch</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-red-600 mt-1" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">{contactInfo.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FaPhoneAlt className="text-red-600 mt-1" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">{contactInfo.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FaEnvelope className="text-red-600 mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">{contactInfo.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FaClock className="text-red-600 mt-1" />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-gray-600">{contactInfo.hours}</p>
                </div>
              </div>
            </div>
            
            {/* Dynamic description from admin */}
            {contactInfo.description && (
              <div className="mt-6 pt-4 border-t">
                <p className="text-gray-600 text-sm">{contactInfo.description}</p>
              </div>
            )}
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter subject"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;