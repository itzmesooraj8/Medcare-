import React from 'react';
import { AlertTriangle, CheckCircle, Shield, Lightbulb, User, Clock, TrendingUp, Activity, Zap, AlertCircle } from 'lucide-react';
import { AnalysisResult } from '../types/medical';

interface AnalysisResultsProps {
  results: AnalysisResult | null;
  patientName: string;
}

export function AnalysisResults({ results, patientName }: AnalysisResultsProps) {
  if (!results) {
    return (
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Analysis Results</h2>
              <p className="text-slate-300 text-sm">Waiting for prescription data</p>
            </div>
          </div>
        </div>
        
        <div className="p-12 text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Activity className="w-16 h-16 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready for Analysis</h3>
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
            Enter prescription details and click "Analyze Prescription" to see comprehensive safety results and recommendations.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-xl">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Drug Interactions</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 rounded-xl">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Dosage Verification</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-purple-50 rounded-xl">
              <Lightbulb className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Smart Alternatives</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'from-green-500 to-emerald-500';
      case 'moderate': return 'from-yellow-500 to-orange-500';
      case 'high': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getRiskBg = (risk: string) => {
    switch (risk) {
      case 'low': return 'from-green-50 to-emerald-50 border-green-200';
      case 'moderate': return 'from-yellow-50 to-orange-50 border-yellow-200';
      case 'high': return 'from-red-50 to-pink-50 border-red-200';
      default: return 'from-gray-50 to-slate-50 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'from-yellow-500 to-orange-500';
      case 'moderate': return 'from-orange-500 to-red-500';
      case 'severe': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'mild': return 'from-yellow-50 to-orange-50 border-yellow-200';
      case 'moderate': return 'from-orange-50 to-red-50 border-orange-200';
      case 'severe': return 'from-red-50 to-pink-50 border-red-200';
      default: return 'from-gray-50 to-slate-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Assessment */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Analysis Complete</h2>
                <p className="text-slate-300 text-sm">{patientName} • {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className={`bg-gradient-to-br ${getRiskBg(results.overallRisk)} border rounded-2xl p-6`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${getRiskColor(results.overallRisk)} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 capitalize">{results.overallRisk} Risk</h3>
                  <p className="text-gray-600 font-medium">Overall Safety Assessment</p>
                </div>
              </div>
              {results.overallRisk === 'low' && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Safe to Proceed</span>
                </div>
              )}
              {results.overallRisk === 'moderate' && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-yellow-100 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">Requires Monitoring</span>
                </div>
              )}
              {results.overallRisk === 'high' && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-red-100 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-800">Immediate Attention</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Drug Interactions */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-white" />
              <div>
                <h3 className="text-xl font-bold text-white">Drug Interactions</h3>
                <p className="text-orange-100 text-sm">Potential medication conflicts detected</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-white/20 rounded-xl">
              <span className="text-white font-bold text-lg">{results.interactions.length}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {results.interactions.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">No Interactions Found</h4>
              <p className="text-gray-600">All medications appear to be compatible with each other.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.interactions.map((interaction, index) => (
                <div key={index} className={`bg-gradient-to-br ${getSeverityBg(interaction.severity)} border rounded-2xl p-6`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${getSeverityColor(interaction.severity)} rounded-xl flex items-center justify-center shadow-lg`}>
                        <AlertTriangle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          {interaction.drug1} + {interaction.drug2}
                        </h4>
                        <span className={`inline-block px-3 py-1 bg-gradient-to-r ${getSeverityColor(interaction.severity)} text-white rounded-full text-sm font-semibold capitalize mt-1`}>
                          {interaction.severity} Risk
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 text-lg leading-relaxed">{interaction.description}</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-blue-900 mb-2">Clinical Recommendation:</h5>
                        <p className="text-blue-800">{interaction.recommendation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dosage Verifications */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-white" />
              <div>
                <h3 className="text-xl font-bold text-white">Dosage Verification</h3>
                <p className="text-blue-100 text-sm">Age-appropriate dosing analysis</p>
              </div>
            </div>
            <div className="px-4 py-2 bg-white/20 rounded-xl">
              <span className="text-white font-bold text-lg">{results.dosageVerifications.length}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {results.dosageVerifications.map((verification, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                      verification.isAppropriate 
                        ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                        : 'bg-gradient-to-br from-red-500 to-pink-500'
                    }`}>
                      {verification.isAppropriate ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <AlertTriangle className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{verification.drugName}</h4>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          verification.isAppropriate 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {verification.isAppropriate ? 'Appropriate Dose' : 'Needs Review'}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium capitalize">
                          {verification.ageGroup} Patient
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h5 className="font-semibold text-gray-700 mb-2">Prescribed Dose</h5>
                    <p className="text-lg font-bold text-gray-900">{verification.prescribedDose}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h5 className="font-semibold text-gray-700 mb-2">Recommended Dose</h5>
                    <p className="text-lg font-bold text-gray-900">{verification.recommendedDose}</p>
                  </div>
                </div>
                
                {verification.warnings && verification.warnings.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h5 className="font-semibold text-yellow-900 mb-2">Clinical Warnings:</h5>
                        <ul className="space-y-1">
                          {verification.warnings.map((warning, idx) => (
                            <li key={idx} className="text-yellow-800 flex items-start space-x-2">
                              <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
                              <span>{warning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alternative Medications */}
      {results.alternatives.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Lightbulb className="w-6 h-6 text-white" />
                <div>
                  <h3 className="text-xl font-bold text-white">Alternative Medications</h3>
                  <p className="text-green-100 text-sm">Safer therapeutic options</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-white/20 rounded-xl">
                <span className="text-white font-bold text-lg">{results.alternatives.length}</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {results.alternatives.map((alternative, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          Replace: <span className="text-red-600">{alternative.originalDrug}</span>
                        </h4>
                        <p className="text-lg font-semibold text-green-700">
                          With: {alternative.alternative}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-green-200 mb-4">
                    <h5 className="font-semibold text-gray-900 mb-2">Clinical Rationale:</h5>
                    <p className="text-gray-700">{alternative.reason}</p>
                  </div>
                  {alternative.dosageAdjustment && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h5 className="font-semibold text-blue-900 mb-2">Dosage Guidance:</h5>
                          <p className="text-blue-800">{alternative.dosageAdjustment}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* General Recommendations */}
      {results.recommendations.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-white" />
              <div>
                <h3 className="text-xl font-bold text-white">Clinical Recommendations</h3>
                <p className="text-purple-100 text-sm">Best practice guidelines</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid gap-4">
              {results.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 font-medium">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}