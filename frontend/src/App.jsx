import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './pages/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import Properties from './pages/Property';
import About from './pages/About';
import Contact from './pages/ContactPage';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ViewDetails } from './components/ViewDetails';

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/viewdetails" element={<ViewDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
    <Footer/>
    </AuthProvider>
  );
}

export default App;