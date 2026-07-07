import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-blue-600">
          Artisan's Corner
        </h1>

        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link to="/login" className="hover:text-blue-600">
            Login
          </Link>

          <Link to="/register" className="hover:text-blue-600">
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;