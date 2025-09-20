import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, User, Calendar, AlertCircle, Edit3, Trash2, Heart, Activity, Shield } from 'lucide-react';
import { Patient } from '../types/medical';

interface PatientManagementProps {
  patients: Patient[];
  onAddPatient: (patient: Patient) => void;
  onSelectPatient: (patient: Patient) => void;
}

export function PatientManagement({ patients, onAddPatient, onSelectPatient }: PatientManagementProps) {
  // Navigation links for dashboard switching
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPatient, setNewPatient] = useState<Partial<Patient>>({
    name: '',
    age: 0,
    weight: undefined,
    allergies: [],
    medicalHistory: [],
    currentMedications: []
  });

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = () => {
    if (newPatient.name && newPatient.age) {
      const patient: Patient = {
        id: Date.now().toString(),
        name: newPatient.name,
        age: newPatient.age,
        weight: newPatient.weight,
        allergies: newPatient.allergies || [],
        medicalHistory: newPatient.medicalHistory || [],
        currentMedications: newPatient.currentMedications || []
      };
      onAddPatient(patient);
      setNewPatient({
        name: '',
        age: 0,
        weight: undefined,
        allergies: [],
        medicalHistory: [],
        currentMedications: []
      });
      setShowAddForm(false);
    }
  };

  const getAgeGroup = (age: number) => {
    if (age < 18) return { label: 'Pediatric', color: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50' };
    if (age > 65) return { label: 'Geriatric', color: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50' };
    return { label: 'Adult', color: 'from-green-500 to-emerald-500', bg: 'from-green-50 to-emerald-50' };
  };

  const getRiskLevel = (patient: Patient) => {
    let riskFactors = 0;
    if (patient.age > 65) riskFactors++;
    if (patient.allergies.length > 0) riskFactors++;
    if (patient.currentMedications.length > 3) riskFactors++;
    if (patient.medicalHistory.length > 2) riskFactors++;

    if (riskFactors >= 3) return { level: 'high', color: 'from-red-500 to-pink-500', bg: 'from-red-50 to-pink-50' };
    if (riskFactors >= 2) return { level: 'moderate', color: 'from-yellow-500 to-orange-500', bg: 'from-yellow-50 to-orange-50' };
    return { level: 'low', color: 'from-green-500 to-emerald-500', bg: 'from-green-50 to-emerald-50' };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Navigation Bar */}
      <nav className="w-full bg-slate-900 px-8 py-3 flex items-center space-x-8 text-lg font-semibold shadow" style={{marginBottom: 0}}>
        <Link to="/prescription" className="text-white hover:text-blue-400">User Dashboard</Link>
        <Link to="/patients" className="text-white hover:text-blue-400">Doctor Dashboard</Link>
        <Link to="/safety" className="text-white hover:text-blue-400">Admin Dashboard</Link>
      </nav>
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-xl p-6 mb-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Patient Management</h1>
              <p className="text-slate-300 text-lg">Comprehensive patient profiles and history</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 font-semibold"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Patient</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-6 animate-fade-in">
  <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patients by name..."
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
          />
        </div>
      </div>

      {/* Add Patient Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6 animate-fade-in">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4">
            <h3 className="text-xl font-bold text-white">Add New Patient</h3>
            <p className="text-blue-100 text-sm">Enter patient information</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Full Name *</label>
                <input
                  type="text"
                  value={newPatient.name || ''}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter patient name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Age *</label>
                <input
                  type="number"
                  value={newPatient.age || ''}
                  onChange={(e) => setNewPatient({ ...newPatient, age: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Age in years"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Weight (kg)</label>
                <input
                  type="number"
                  value={newPatient.weight || ''}
                  onChange={(e) => setNewPatient({ ...newPatient, weight: parseFloat(e.target.value) || undefined })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Weight in kg"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPatient}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-green-500/25 font-semibold"
              >
                Add Patient
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Patient List */}
  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="w-6 h-6 text-white" />
              <div>
                <h3 className="text-xl font-bold text-white">Patient Registry</h3>
                <p className="text-gray-300 text-sm">Active patient profiles</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-white/20 rounded-xl">
              <span className="text-white font-bold text-lg">{filteredPatients.length}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {filteredPatients.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No patients found</h3>
              <p className="text-gray-600 text-lg mb-8">Add a new patient or adjust your search criteria to get started.</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 font-bold text-lg"
              >
                Add First Patient
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPatients.map((patient) => {
                const riskLevel = getRiskLevel(patient);
                const ageGroup = getAgeGroup(patient.age);
                
                return (
                  <div
                    key={patient.id}
                    className="group bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 animate-fade-in"
                    onClick={() => onSelectPatient(patient)}
                    tabIndex={0}
                    aria-label={patient.name}
                    title={patient.name}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${ageGroup.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{patient.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600 font-medium">{patient.age} years</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <span className={`px-3 py-1 bg-gradient-to-r ${ageGroup.color} text-white rounded-full text-xs font-bold text-center`}>
                          {ageGroup.label}
                        </span>
                        <span className={`px-3 py-1 bg-gradient-to-r ${riskLevel.color} text-white rounded-full text-xs font-bold text-center capitalize`}>
                          {riskLevel.level} Risk
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {patient.weight && (
                        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
                          <Activity className="w-4 h-4 text-blue-600" />
                          <span className="text-blue-800 font-medium">Weight: {patient.weight} kg</span>
                        </div>
                      )}
                      
                      {patient.allergies.length > 0 && (
                        <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-xl border border-red-200">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <span className="text-red-800 font-medium">
                            {patient.allergies.length} known allergies
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl border border-green-200">
                        <Heart className="w-4 h-4 text-green-600" />
                        <span className="text-green-800 font-medium">
                          {patient.currentMedications.length} current medications
                        </span>
                      </div>

                      <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-xl border border-purple-200">
                        <Shield className="w-4 h-4 text-purple-600" />
                        <span className="text-purple-800 font-medium">
                          {patient.medicalHistory.length} medical conditions
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPatient(patient);
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 font-semibold text-sm"
                      >
                        View Profile
                      </button>
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Edit functionality would go here
                          }}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Delete functionality would go here
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}