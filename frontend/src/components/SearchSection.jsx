import React, { useState,useEffect } from "react";
import { Search } from "lucide-react";

const SearchSection = ({ properties, setFilteredProperties }) => {
  const [searchText, setSearchText] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const api = "http://localhost:3000/api/auth/dashboard/properties";

  const getHousingData = async () => {
    try {
      const res = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
        },
      });
      setProperties(res.data.properties); // Update state with API response
    } catch (error) {
      console.log("Error fetching properties:", error);
    }
  };
  useEffect(() => {
    getHousingData();
  }, []);

  const handleSearch = () => {
    let filtered = api;

    if (searchText) {
      filtered = filtered.filter((property) =>
        property.location.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter((property) => {
        const price = property.price;
        return max ? price >= min && price <= max : price >= min;
      });
    }

    if (propertyType) {
      filtered = filtered.filter((property) => property.type === propertyType);
    }

    setFilteredProperties(filtered);
  };

  return (
    <section className="bg-white py-8 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search location..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Price Range</option>
            <option value="0-1000">$0 - $1,000</option>
            <option value="1000-2000">$1,000 - $2,000</option>
            <option value="2000+">$2,000+</option>
          </select>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Property Type</option>
            <option value="furnished">Furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </select>
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
