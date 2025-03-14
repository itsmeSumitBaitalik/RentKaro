import { useState, useEffect } from "react";
import api from "../api/axios.jsx";
import { Link } from "react-router-dom";
import {
  FaTimes,
  FaHome,
  FaPlus,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaDollarSign,
  FaFilter,
  FaBuilding,
  FaSwimmingPool 
} from "react-icons/fa";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    bedrooms: '',
    bathrooms: '',
    minPrice: '',
    maxPrice: '',
    amenities: '',
  });

  const [newProperty, setNewProperty] = useState({
    title: "",
    type: "",
    address: { street: "", city: "", state: "", zip: "" },
    bedrooms: "",
    bathrooms: "",
    areaSize: "",
    furnished: "",
    amenities: "",
    price: "",
    securityDeposit: "",
    img: "",
    description: "",
  });

  const fetchProperties = async () => {
    try {
      const res = await api.get("/properties", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProperties(res.data.properties);
    } catch (err) {
      console.error("Failed to fetch properties:", err);
    }
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/properties/add", newProperty, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProperties([...properties, res.data.property]);
      setFilteredProperties(res.data.properties);
      setNewProperty({
        title: "",
        type: "",
        address: { street: "", city: "", state: "", zip: "" },
        bedrooms: "",
        bathrooms: "",
        areaSize: "",
        furnished: "",
        amenities: "",
        price: "",
        securityDeposit: "",
        img: "",
        description: "",
      });
      alert("Property added successfully");
      setShowAddModal(false);
    } catch (err) {
      console.error("Failed to add property:", err);
    }
  };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "state", "zip"].includes(name)) {
      setNewProperty((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setNewProperty((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    let filtered = properties.filter(property => {
      return (
        (!filters.type || property.type === filters.type) &&
        (!filters.bedrooms || property.bedrooms == filters.bedrooms) &&
        (!filters.bathrooms || property.bathrooms == filters.bathrooms) &&
        (!filters.minPrice || property.price >= filters.minPrice) &&
        (!filters.maxPrice || property.price <= filters.maxPrice) &&
        (!filters.amenities || property.amenities.toLowerCase().includes(filters.amenities.toLowerCase()))
      );
    });
    setFilteredProperties(filtered);
  }, [filters, properties]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Filters */}
      <div className="col-span-1 bg-white p-6 shadow-lg rounded-xl transform hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-gray-800">
        <FaFilter className="text-blue-500" /> 
        <span>Filters</span>
      </h2>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {/* Property Type */}
        <div className="relative">
          <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
          >
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div className="relative">
          <FaBed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleFilterChange}
            placeholder="Bedrooms"
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
          />
        </div>

        {/* Bathrooms */}
        <div className="relative">
          <FaBath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            name="bathrooms"
            value={filters.bathrooms}
            onChange={handleFilterChange}
            placeholder="Bathrooms"
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
          />
        </div>

        {/* Min Price */}
        <div className="relative">
          <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="Min Price"
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
          />
        </div>

        {/* Max Price */}
        <div className="relative">
          <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="Max Price"
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
          />
        </div>

        {/* Amenities */}
        <div className="relative">
          <FaSwimmingPool className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="amenities"
            value={filters.amenities}
            onChange={handleFilterChange}
            placeholder="Amenities (e.g., pool, gym)"
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-700"
          />
        </div>
      </div>
    </div>
      {/* Add Property Button */}
      <div className="mt-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="cursor-pointer flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
        >
          <FaPlus className="h-5 w-5" />
          Add New Property
        </button>
      </div>

      {/* Property Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-4">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div
                className="h-48 bg-gray-200 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${property.img || "default-img.jpg"})`,
                }}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {property.title}
                </h3>
                <p className="text-gray-600">{property.type}</p>
                <p className="text-gray-600">{property.amenities}</p>
                <p className="text-gray-600">
                  ${Number(property.price).toLocaleString()}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <Link to={`/viewdetails`} state={{ property }}>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 cursor-pointer">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No properties found.</p>
        )}
      </div>

      {/* Add Property Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="cursor-pointer text-xl font-semibold flex items-center gap-2">
                <FaHome className="h-6 w-6" />
                Add New Property
              </h2>
              <button onClick={() => setShowAddModal(false)}>
                <FaTimes className="h-6 w-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <form onSubmit={handleAddProperty} className="p-6 grid gap-4">
              {/* Basic Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newProperty.title}
                    onChange={handleInputChange}
                    placeholder="Property Title"
                    required
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    name="type"
                    value={newProperty.type}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <FaMapMarkerAlt className="h-5 w-5" />
                  Address
                </h3>
                <input
                  type="text"
                  name="street"
                  value={newProperty.address.street}
                  onChange={handleInputChange}
                  placeholder="Street Address"
                  required
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <div className="grid gap-4 md:grid-cols-3">
                  <input
                    type="text"
                    name="city"
                    value={newProperty.address.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    required
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="state"
                    value={newProperty.address.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    required
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="zip"
                    value={newProperty.address.zip}
                    onChange={handleInputChange}
                    placeholder="ZIP Code"
                    required
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Property Details */}
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <FaBed className="h-4 w-4" /> Bedrooms
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={newProperty.bedrooms}
                    onChange={handleInputChange}
                    placeholder="Bedrooms"
                    required
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <FaBath className="h-4 w-4" /> Bathrooms
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={newProperty.bathrooms}
                    onChange={handleInputChange}
                    placeholder="Bathrooms"
                    required
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <FaRulerCombined className="h-4 w-4" /> Area (sqft)
                  </label>
                  <input
                    type="number"
                    name="areaSize"
                    value={newProperty.areaSize}
                    onChange={handleInputChange}
                    placeholder="Area Size"
                    required
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <FaDollarSign className="h-4 w-4" /> Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={newProperty.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                    required
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <FaDollarSign className="h-4 w-4" /> Security Deposit
                  </label>
                  <input
                    type="number"
                    name="securityDeposit"
                    value={newProperty.securityDeposit}
                    onChange={handleInputChange}
                    placeholder="Security Deposit"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Additional Fields */}
              <input
                type="text"
                name="furnished"
                value={newProperty.furnished}
                onChange={handleInputChange}
                placeholder="Furnished (Yes/No)"
                required
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="amenities"
                value={newProperty.amenities}
                onChange={handleInputChange}
                placeholder="Amenities (comma-separated)"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="img"
                value={newProperty.img}
                onChange={handleInputChange}
                placeholder="Image URL"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="description"
                value={newProperty.description}
                onChange={handleInputChange}
                placeholder="Property Description"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 h-24"
              />

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 w-full"
              >
                Add Property
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
