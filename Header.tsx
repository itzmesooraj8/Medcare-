import { Activity, Shield, Users, Bell, Settings, User, ChevronDown } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const tabs = [
    { id: 'analysis', label: 'Prescription Analysis', icon: Activity },
    { id: 'safety', label: 'Safety Dashboard', icon: Shield },
    { id: 'patients', label: 'Patient Management', icon: Users },
    { id: 'ocr', label: 'Document OCR', icon: Bell },
  ];
  // Programmer role navigation controls

  return (
  <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b border-slate-700 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                MedCare
              </h1>
              <p className="text-sm text-slate-400 font-medium">Advanced Prescription Intelligence</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex space-x-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`group relative flex items-center space-x-3 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden lg:block">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl opacity-20 animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </nav>
          {/* Programmer Role Navigation */}
          <div className="flex items-center space-x-2 ml-6">
            {/* Navigation buttons for dashboards */}
            <button
              onClick={() => window.location.href = '/user-dashboard'}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-xs font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow"
            >
              User Dashboard
            </button>
            <button
              onClick={() => window.location.href = '/doctor-dashboard'}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-xs font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow"
            >
              Doctor Dashboard
            </button>
            <button
              onClick={() => window.location.href = '/admin-dashboard'}
              className="px-4 py-2 bg-gradient-to-r from-gray-700 to-slate-800 text-white rounded-lg text-xs font-semibold hover:from-gray-800 hover:to-slate-900 transition-all duration-200 shadow"
            >
              Admin Dashboard
            </button>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-700">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-white">Dr. Sarah Wilson</p>
                <p className="text-xs text-slate-400">Chief Pharmacist</p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}