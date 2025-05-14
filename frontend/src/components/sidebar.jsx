import { Link, useLocation } from "react-router-dom";

// Sidebar Component
export const Sidebar = () => {
  const location = useLocation();
  const navLinks = [
    { label: "Home", path: "/dashboard" },
    { label: "Services", path: "/dashboard/services" },
    { label: "Projects", path: "/dashboard/projects" },
    { label: "Logout", path: "/logout" },
  ];
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav className="flex-1">
        <ul className="space-y-4">
          {navLinks.map(({ label, path }) => (
            <li key={path}>
              <Link
                to={path}
                className={`block px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 ${
                  location.pathname === path ? "bg-gray-700" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="text-sm text-gray-400 mt-auto">
        &copy; {new Date().getFullYear()} MyApp
      </div>
    </aside>
  );
};
