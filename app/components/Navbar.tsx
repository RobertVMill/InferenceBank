import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white fixed top-0 left-0 w-full shadow-md z-10">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center p-4">
        {/* Branding / Logo */}
        <div className="text-2xl font-bold mb-2 sm:mb-0">
          <Link href="/">InferenceBank</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm sm:text-base">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/insights" className="hover:underline">
            Insights
          </Link>
          <Link href="/profile" className="hover:underline">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
