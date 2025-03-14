import mongoose from "mongoose";
// import './images'

const PropertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { 
        type: String, 
        enum: ['Apartment', 'Row House', 'Bunglow', 'Duplex', 'Penthouse', 'Other'], 
        required: true 
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true }
    },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    areaSize: { type: Number, required: true },
    furnished: { type: String, required: true },
    amenities: { type: [String], default: [] },
    price: { type: Number, required: true },
    securityDeposit: { type: Number, required: true },
    // leaseDuration: { type: String, required: true },
    img: { type: String  },
    description: { type: String, required: true }
}, { timestamps: true });

const Property = mongoose.model("Property", PropertySchema);

export default Property;
