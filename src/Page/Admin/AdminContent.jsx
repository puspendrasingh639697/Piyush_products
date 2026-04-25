import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent, updateContent, clearContentState } from '../../redux/slices/contentSlice';
import { toast } from 'react-toastify';
import { FaSave, FaEdit, FaInfoCircle, FaFileAlt, FaLock, FaPhoneAlt } from 'react-icons/fa';

const AdminContent = () => {
  const dispatch = useDispatch();
  const { about, terms, privacy, contact, isLoading, success, error } = useSelector((state) => state.content);
  const [activeTab, setActiveTab] = useState('about');
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });

  useEffect(() => {
    loadContent();
  }, [activeTab]);

  useEffect(() => {
    if (success) {
      toast.success('Content updated successfully!');
      dispatch(clearContentState());
    }
    if (error) {
      toast.error(error);
      dispatch(clearContentState());
    }
  }, [success, error, dispatch]);

  const loadContent = () => {
    dispatch(fetchContent(activeTab));
  };

  useEffect(() => {
    if (activeTab === 'about' && about) {
      setFormData({ title: about.title || '', body: about.body || '' });
    } else if (activeTab === 'terms' && terms) {
      setFormData({ title: terms.title || '', body: terms.body || '' });
    } else if (activeTab === 'privacy' && privacy) {
      setFormData({ title: privacy.title || '', body: privacy.body || '' });
    } else if (activeTab === 'contact' && contact) {
      setFormData({ title: contact.title || '', body: contact.body || '' });
    }
  }, [activeTab, about, terms, privacy, contact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateContent({
      contentType: activeTab,
      title: formData.title,
      body: formData.body
    }));
  };

  const tabs = [
    { id: 'about', label: 'About Us', icon: FaInfoCircle },
    { id: 'terms', label: 'Terms & Conditions', icon: FaFileAlt },
    { id: 'privacy', label: 'Privacy Policy', icon: FaLock },
    { id: 'contact', label: 'Contact Info', icon: FaPhoneAlt },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Content Management</h1>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition ${
                activeTab === tab.id 
                  ? 'border-b-2 border-red-600 text-red-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter title..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Body</label>
              <textarea
                value={formData.body}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows="12"
                placeholder="Enter content here..."
                required
              />
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                <FaSave /> {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={loadContent}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">{formData.title || 'Title'}</h3>
            <div className="prose max-w-none">
              <p className="text-gray-600 whitespace-pre-wrap">{formData.body || 'Content will appear here...'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContent;