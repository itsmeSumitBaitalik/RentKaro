import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try { 
      const res = await api.get('/properties', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setProperties(res.data.properties);
    } catch (err) {
      console.error('Failed to fetch properties:', err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);


  const images = [
    "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg",
    "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
    "https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg",
  ];

  const testimonials = [
    {
      name: "John Doe",
      review: "Amazing service! I found my dream home quickly and easily.",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Sarah Smith",
      review: "A seamless and stress-free experience. Highly recommended!",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Motion Header Section */}
      <div className="relative h-[600px] overflow-hidden w-full">
        <motion.div
          className="absolute top-0 left-0 flex w-[500%]"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 75, ease: "easeOut" }}
        >
          {[...images, ...images].map((img, index) => (
            <img key={index} src={img} alt="House" className="w-fit object-cover h-[600px]" />
          ))}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-75"></div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find Your Dream Home
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Discover the perfect property that matches your lifestyle.
          </p>
          <div className="mt-10">
            <Link to="/properties">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700">
                Explore Properties
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.length >0 ? (
             properties.slice(0, 3).map((property) => (
              <motion.div
                key={property._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img src={property.img} alt={property.title} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{property.title}</h3>
                  <p className="text-gray-600">{property.type}</p>
                  <p className="text-gray-600 mt-2">{property.amenties}</p>
                  <p className="text-gray-600 mt-2">{property.description}</p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-2xl font-bold text-indigo-600">${property.price}</span>
                    <Link to='/viewdetails' state={{ property }} ><button className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                      View Details
                    </button></Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500">No properties available</p>
          )}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What Our Customers Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
                <p className="text-gray-600 italic">"{testimonial.review}"</p>
                <h4 className="mt-4 text-lg font-semibold text-gray-900">{testimonial.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
