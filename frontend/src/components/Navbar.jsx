import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../pages/AuthContext"; // Import correctly

const navigation = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth(); // ✅ Use the custom hook directly

  return (
    <Disclosure as="nav" className="bg-white shadow-lg sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="text-2xl font-bold text-indigo-600">
                    RentKaro
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {isAuthenticated ? (
                  <button
                    onClick={logout}
                    className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                  >
                    Login / Sign Up
                  </Link>
                )}
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className=" cursor-pointer block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-red-600 hover:bg-gray-50"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block pl-3 pr-4 py-2 text-base font-medium text-indigo-600 hover:bg-gray-50"
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
