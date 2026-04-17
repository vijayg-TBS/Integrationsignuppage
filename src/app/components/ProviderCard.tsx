interface ProviderCardProps {
  name: string;
  icon: string;
  color: string;
  onConnect?: () => void;
}

export function ProviderCard({ name, icon, color, onConnect }: ProviderCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl"
          style={{ backgroundColor: color }}
        >
          {icon === "qb" ? (
            <span className="text-base">qb</span>
          ) : icon === "🦝" ? (
            <span className="text-2xl">🦝</span>
          ) : icon === "Þ" ? (
            <span>Þ</span>
          ) : icon === "▪" ? (
            <span>▪</span>
          ) : icon === "ADP" ? (
            <span className="text-sm">ADP</span>
          ) : (
            icon
          )}
        </div>
        {/* Name */}
        <span className="text-lg font-medium text-gray-900">{name}</span>
      </div>

      {/* Connect Button */}
      <button
        onClick={onConnect}
        className="px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
      >
        Connect
      </button>
    </div>
  );
}
