import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
          <p className="mt-4 text-xl text-gray-600">
            Your trusted partner in finding the perfect home
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Property Listing</h3>
            <p className="text-gray-600">
              List your property with us and reach thousands of potential buyers and tenants.
              Our platform makes it easy to showcase your property's best features.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Property Search</h3>
            <p className="text-gray-600">
              Find your dream property using our advanced search filters. Browse through
              verified listings and connect directly with property owners.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Rental Services</h3>
            <p className="text-gray-600">
              Looking to rent? We've got you covered. Our rental services make it easy
              to find and secure your next home with confidence.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-white p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            We're committed to revolutionizing the real estate industry by providing a
            transparent, efficient, and user-friendly platform for property transactions.
            Our goal is to make property hunting and listing an enjoyable experience for
            everyone involved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}