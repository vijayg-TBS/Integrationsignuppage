import {
  LayoutDashboard,
  Users,
  FileText,
  DollarSign,
  BarChart3,
  Settings,
  User,
  ChevronDown,
} from "lucide-react";

export function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Users, label: "Employees" },
    { icon: FileText, label: "Plan Details" },
    { icon: DollarSign, label: "Contributions", hasDropdown: true },
    { icon: BarChart3, label: "Reports" },
    { icon: Settings, label: "Business Settings", active: true },
    { icon: User, label: "Profile Settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">
            <span className="text-purple-600">Wealth</span>
            <span className="text-yellow-400">R</span>
            <span className="text-black">abbit</span>
          </span>
          <span className="text-xs align-super">®</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  item.active
                    ? "bg-purple-50 text-purple-600 border-l-4 border-purple-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1">{item.label}</span>
                {item.hasDropdown && (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
