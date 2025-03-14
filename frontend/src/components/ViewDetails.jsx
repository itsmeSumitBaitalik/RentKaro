import React, { useState, useEffect } from 'react';
import { MapPin, Bed, Bath, Home, Check, Star, Phone, Mail, Calendar } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export function ViewDetails() {
  const location = useLocation();
  const property = location.state?.property;

  if (!property) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Property details not available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src={property?.img || "default-img.jpg"} 
          alt={property?.title || "Property Image"}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
          <h1 className="text-4xl font-bold text-white mb-2">{property?.title || "No Title"}</h1>
          <div className="flex items-center text-white gap-4">
            <MapPin className="w-5 h-5" />
            <span>{property?.location?.city}, {property?.location?.area}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Property Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Bed className="w-5 h-5 text-blue-600" />
                <span>{property?.bedrooms || 0} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-5 h-5 text-blue-600" />
                <span>{property?.bathrooms || 0} Bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-blue-600" />
                <span>{property?.area || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          {property?.amenities?.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {property?.reviews?.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
              <div className="space-y-4">
                {property.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review?.name || "Anonymous"}</span>
                        <div className="flex">
                          {[...Array(review?.rating || 0)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <span className="text-gray-500 text-sm">{review?.date || "N/A"}</span>
                    </div>
                    <p className="text-gray-600">{review?.comment || "No comment"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Map */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
            <iframe
              src="https://www.google.com/maps/embed?..."
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>

        {/* Right Column - Contact Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Owner</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{property?.owner?.phone || "Not Available"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{property?.owner?.email || "Not Available"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Schedule a Visit</p>
                  <button className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}
