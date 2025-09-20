import { Shield, AlertTriangle, TrendingUp, Clock, Users, Activity, Zap, BarChart3, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SafetyDashboard() {
  // Navigation links for dashboard switching
  const navStyle = { marginBottom: 16 };
  const linkStyle = { marginRight: 12 };
  const stats = [
    {
      title: 'Prescriptions Analyzed',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: Activity,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'Interactions Detected',
      value: '89',
      change: '-8%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    },
    {
      title: 'Safety Score',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Avg. Analysis Time',
      value: '0.8s',
      change: '-0.2s',
      trend: 'down',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      patient: 'John Doe',
      severity: 'high',
      description: 'Severe interaction between warfarin and aspirin detected',
      time: '2 minutes ago',
      status: 'resolved',
      priority: 'urgent'
    },
    {
      id: 2,
      patient: 'Jane Smith',
      severity: 'moderate',
      description: 'Age-inappropriate dosage for pediatric patient',
      time: '15 minutes ago',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 3,
      patient: 'Robert Johnson',
      severity: 'mild',
      description: 'Potential food interaction with medication timing',
      time: '1 hour ago',
      status: 'acknowledged',
      priority: 'medium'
    },
    {
      id: 4,
      patient: 'Maria Garcia',
      severity: 'moderate',
      description: 'Duplicate therapy detected in prescription',
      time: '2 hours ago',
      status: 'resolved',
      priority: 'high'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'from-red-500 to-pink-500';
      case 'moderate': return 'from-yellow-500 to-orange-500';
      case 'mild': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'high': return 'from-red-50 to-pink-50 border-red-200';
      case 'moderate': return 'from-yellow-50 to-orange-50 border-yellow-200';
      case 'mild': return 'from-blue-50 to-cyan-50 border-blue-200';
      default: return 'from-gray-50 to-slate-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'from-green-500 to-emerald-500';
      case 'pending': return 'from-yellow-500 to-orange-500';
      case 'acknowledged': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  return (
  <>
      <nav style={navStyle}>
        <Link to="/prescription" style={linkStyle}>User Dashboard</Link>
        <Link to="/patients" style={linkStyle}>Doctor Dashboard</Link>
        <Link to="/safety">Admin Dashboard</Link>
      </nav>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-xl p-6 mb-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Safety Dashboard</h1>
              <p className="text-slate-300 text-lg">Real-time prescription safety monitoring</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-slate-300 text-sm">Last updated</p>
            <p className="text-white font-semibold">{new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-gradient-to-br ${stat.bgColor} border border-opacity-20 rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl`} tabIndex={0} aria-label={stat.title} title={stat.title}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${
                    stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    <TrendingUp className={`w-3 h-3 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600 rotate-180'}`} />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className={`h-2 bg-gradient-to-r ${stat.color}`}></div>
            </div>
          );
        })}
      </div>

      {/* Recent Safety Alerts */}
  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8 animate-fade-in">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-white" />
              <div>
                <h2 className="text-xl font-bold text-white">Recent Safety Alerts</h2>
                <p className="text-orange-100 text-sm">Critical medication safety notifications</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-white/20 rounded-xl">
              <span className="text-white font-bold text-lg">{recentAlerts.length}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className={`bg-gradient-to-br ${getSeverityBg(alert.severity)} border rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer`} tabIndex={0} aria-label={alert.description} title={alert.description}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getSeverityColor(alert.severity)} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-600" />
                          <span className="font-bold text-gray-900">{alert.patient}</span>
                        </div>
                        <span className={`px-3 py-1 bg-gradient-to-r ${getSeverityColor(alert.severity)} text-white rounded-full text-xs font-bold uppercase tracking-wide`}>
                          {alert.severity}
                        </span>
                        <span className={`px-3 py-1 bg-gradient-to-r ${getStatusColor(alert.status)} text-white rounded-full text-xs font-bold uppercase tracking-wide`}>
                          {alert.status}
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium mb-3 text-lg">{alert.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">{alert.time}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm">
                            View Details
                          </button>
                          {alert.status === 'pending' && (
                            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm">
                              Resolve
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Safety Trends Chart */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-6 h-6 text-white" />
              <div>
                <h3 className="text-xl font-bold text-white">Safety Trends</h3>
                <p className="text-blue-100 text-sm">Monthly analysis overview</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl flex items-center justify-center border border-blue-200">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                <p className="text-blue-700 font-bold text-lg mb-2">Interactive Analytics</p>
                <p className="text-blue-600 text-sm">Real-time safety metrics visualization</p>
                <div className="flex justify-center space-x-4 mt-4">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                    <span className="text-xs text-gray-600">Safe</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></div>
                    <span className="text-xs text-gray-600">Moderate</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div>
                    <span className="text-xs text-gray-600">High Risk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
            <div className="flex items-center space-x-3">
              <PieChart className="w-6 h-6 text-white" />
              <div>
                <h3 className="text-xl font-bold text-white">Risk Distribution</h3>
                <p className="text-purple-100 text-sm">Current safety profile</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-gray-900">Low Risk</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-600">78%</span>
                  <p className="text-sm text-green-700">974 prescriptions</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="font-semibold text-gray-900">Moderate Risk</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-yellow-600">18%</span>
                  <p className="text-sm text-yellow-700">224 prescriptions</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="font-semibold text-gray-900">High Risk</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-red-600">4%</span>
                  <p className="text-sm text-red-700">49 prescriptions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
    </>
    );
  }