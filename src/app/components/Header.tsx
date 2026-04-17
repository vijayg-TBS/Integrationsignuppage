import { Search, Bell, Building2, ChevronDown } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Business settings</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Payroll integration</span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
            />
          </div>

          {/* Notification */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Company Info */}
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-gray-600" />
            <div className="text-right">
              <div className="font-medium text-sm">Snow daze LLC</div>
              <div className="text-xs text-gray-500">Plan Name SIMPLE IRA</div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
