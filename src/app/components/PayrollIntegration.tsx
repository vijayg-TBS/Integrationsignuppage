import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ProviderCard } from "./ProviderCard";
import { TaxBanditsModal } from "./TaxBanditsModal";
import gustoIcon from "figma:asset/d502c66df45865594db49a1b00685e09c192084b.png";

export function PayrollIntegration() {
  const [isTaxBanditsModalOpen, setIsTaxBanditsModalOpen] = useState(false);

  const providers = [
    { name: "Gusto", icon: "🅖", color: "#FF6B6B" },
    { name: "QuickBooks", icon: "qb", color: "#2CA01C" },
    { name: "TaxBandits Payroll", icon: "🦝", color: "#FF6B35" },
    { name: "Paychex", icon: "Þ", color: "#0033A0" },
    { name: "Square Payroll", icon: "▪", color: "#000000" },
    { name: "ADP Run", icon: "ADP", color: "#EF3829" },
  ];

  const handleConnectTaxBandits = () => {
    setIsTaxBanditsModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-purple-900 to-purple-700 rounded-2xl p-12 mb-8 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-purple-200 text-sm font-medium mb-3 tracking-wide uppercase">
                PAYROLL INTEGRATION
              </p>
              <h1 className="text-white text-4xl mb-4">Connect your Payroll</h1>
              <p className="text-purple-100 text-lg max-w-2xl">
                Sync employees and contributions automatically. WealthRabbit connects
                to your payroll provider via Finch — select yours below to get started.
              </p>
            </div>
            {/* Floating Icons */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2">
              <div className="relative w-64 h-64">
                <div className="absolute top-0 right-12 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  qb
                </div>
                <div className="absolute top-4 left-0 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  ADP
                </div>
                <div className="absolute top-20 right-0 w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  g
                </div>
                <div className="absolute bottom-20 left-8 w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                  ▪
                </div>
                <div className="absolute bottom-12 right-20 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <span className="text-yellow-500 text-3xl font-bold">R</span>
                  </div>
                </div>
                <div className="absolute bottom-0 right-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  Þ
                </div>
              </div>
            </div>
          </div>

          {/* Providers Section */}
          <div className="mb-6">
            <h2 className="text-2xl mb-6">Supported Providers (06)</h2>
            <div className="grid grid-cols-2 gap-6">
              {providers.map((provider, index) => (
                <ProviderCard
                  key={provider.name}
                  name={provider.name}
                  icon={provider.icon}
                  color={provider.color}
                  onConnect={
                    provider.name === "TaxBandits Payroll"
                      ? handleConnectTaxBandits
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
        </main>
      </div>

      <TaxBanditsModal
        isOpen={isTaxBanditsModalOpen}
        onClose={() => setIsTaxBanditsModalOpen(false)}
      />
    </div>
  );
}
