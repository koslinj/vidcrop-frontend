import { Link, useLocation, Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { UserMenu } from '../components/UserMenu';

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/upload', label: 'Upload' },
    { path: '/library', label: 'Library' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <nav className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">🎬 VidCrop</h1>
          <div className="flex gap-4 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium ${location.pathname === item.path
                    ? 'text-blue-600 underline'
                    : 'text-gray-600 hover:text-blue-500'
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <UserMenu />
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full p-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
