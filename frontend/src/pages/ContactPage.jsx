import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axios'
import toast,{Toaster} from 'react-hot-toast'

export default function Contact() {
  const [loading,setLoading] = useState()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  

    try {
      const response = await api.post('/contact', formData);
      toast.success(response.data.message || 'Message sent successfully!');
      
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message.');
    }
    setLoading(false);
  };

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Toaster/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-4 text-xl text-gray-600">
            Get in touch with our team
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder='Name'
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder='Email'
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder='Subject'
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder='Type your message....'
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {loading ? (
                <button
                  type="button"
                  className="w-full flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                  disabled
                >
                  <svg
                    className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white"
                    viewBox="0 0 24 24"
                  ></svg>
                  Sending...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Send Message
                </button>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                <p className="mt-2 text-gray-600">
                  123 Real Estate Avenue<br />
                  Business District<br />
                  City, State 12345
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                <p className="mt-2 text-gray-600">
                  info@realestate.com
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                <p className="mt-2 text-gray-600">
                  +1 (123) 456-7890
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">Social Media</h3>
                <div className="mt-2 flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-indigo-600">
                    Facebook
                  </a>
                  <a href="#" className="text-gray-600 hover:text-indigo-600">
                    Twitter
                  </a>
                  <a href="#" className="text-gray-600 hover:text-indigo-600">
                    LinkedIn
                  </a>
                  <a href="#" className="text-gray-600 hover:text-indigo-600">
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}