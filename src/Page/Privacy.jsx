import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent } from '../redux/slices/contentSlice';

const Privacy = () => {
  const dispatch = useDispatch();
  const { privacy, isLoading } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchContent('privacy'));
  }, [dispatch]);

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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">
            {privacy?.title || 'Privacy Policy'}
          </h1>
          <div className="prose max-w-none">
            <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {privacy?.body || 'Please check back later for our privacy policy.'}
            </div>
          </div>
          <div className="mt-8 pt-4 border-t text-sm text-gray-500">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;