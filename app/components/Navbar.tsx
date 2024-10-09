import Link from 'next/link';
import { HomeIcon, ChartBarIcon, UserIcon } from '@heroicons/react/24/outline'; // Import from Heroicons v2

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white fixed top-0 sm:fixed sm:left-0 sm:h-full sm:w-48 w-full z-10 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-col justify-between items-center p-4">
        {/* Branding / Logo */}
        <div className="text-2xl font-bold mb-6">
          <Link href="/" className="flex items-center">
            <span className="ml-2">InferenceBank</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-6 text-sm sm:text-base">
          <Link href="/dashboard" className="hover:underline flex items-center">
            <HomeIcon className="h-6 w-6 mr-2" />
            Dashboard
          </Link>

          <Link href="/insights" className="hover:underline flex items-center">
            <ChartBarIcon className="h-6 w-6 mr-2" />
            Insights
          </Link>

          <Link href="/profile" className="hover:underline flex items-center">
            <UserIcon className="h-6 w-6 mr-2" />
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
