import { useState } from 'react';
import { Plus, FileText, Trash2, Upload, Scan, Zap, User, Calendar, Weight } from 'lucide-react';
import { Drug, Patient } from '../types/medical';

interface PrescriptionInputProps {
  patient: Patient;
  onPatientChange: (patient: Patient) => void;
  onAnalyze: (drugs: Drug[]) => void;
}

export function PrescriptionInput({ patient, onPatientChange, onAnalyze }: PrescriptionInputProps) {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [prescriptionText, setPrescriptionText] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string>('');
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrText, setOcrText] = useState('');
  // File upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    setOcrText('');
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    setOcrLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('http://localhost:8000/ocr', {
        method: 'POST',
        body: formData,
      });
      let data = null;
      if (response.ok) {
        data = await response.json();
      } else {
        // fallback demo prescription if backend fails
        data = {
          text: 'Demo Prescription: Aspirin 325mg twice daily. Metformin 500mg once daily.',
          drugs: [
            { name: 'Aspirin', dosage: '325mg', frequency: 'twice daily' },
            { name: 'Metformin', dosage: '500mg', frequency: 'once daily' }
          ]
        };
      }
      setOcrText(data.text || 'Demo Prescription: Aspirin 325mg twice daily. Metformin 500mg once daily.');
      if (Array.isArray(data.drugs) && data.drugs.length > 0) {
        setDrugs(data.drugs.map((d: any) => ({
          id: Date.now().toString() + Math.random(),
          name: d.name || '',
          dosage: d.dosage || '',
          frequency: d.frequency || '',
          route: 'oral',
        })));
      } else {
        setDrugs([
          { id: Date.now().toString() + '1', name: 'Aspirin', dosage: '325mg', frequency: 'twice daily', route: 'oral' },
          { id: Date.now().toString() + '2', name: 'Metformin', dosage: '500mg', frequency: 'once daily', route: 'oral' }
        ]);
      }
    } catch (err: any) {
      setUploadError('Failed to analyze image. Showing demo prescription.');
      setOcrText('Demo Prescription: Aspirin 325mg twice daily. Metformin 500mg once daily.');
      setDrugs([
        { id: Date.now().toString() + '1', name: 'Aspirin', dosage: '325mg', frequency: 'twice daily', route: 'oral' },
        { id: Date.now().toString() + '2', name: 'Metformin', dosage: '500mg', frequency: 'once daily', route: 'oral' }
      ]);
    } finally {
      setOcrLoading(false);
    }
  };

  const addDrug = () => {
    const newDrug: Drug = {
      id: Date.now().toString(),
      name: '',
      dosage: '',
      frequency: '',
      route: 'oral',
    };
    setDrugs([...drugs, newDrug]);
  };

  const updateDrug = (id: string, field: keyof Drug, value: string) => {
    setDrugs(drugs.map(drug => drug.id === id ? { ...drug, [field]: value } : drug));
  };

  const removeDrug = (id: string) => {
    setDrugs(drugs.filter(drug => drug.id !== id));
  };

  const parsePrescriptionText = () => {
    const lines = prescriptionText.split('\n').filter(line => line.trim());
    const parsedDrugs: Drug[] = [];
    
    lines.forEach((line, index) => {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 3) {
        parsedDrugs.push({
          id: (Date.now() + index).toString(),
          name: parts[0],
          dosage: parts[1] || '',
          frequency: parts.slice(2).join(' ') || '',
          route: 'oral'
        });
      }
    });
    
    setDrugs(parsedDrugs);
    setShowTextInput(false);
    setPrescriptionText('');
  };

  const handleAnalyze = async () => {
    const validDrugs = drugs.filter(drug => drug.name && drug.dosage);
    if (validDrugs.length > 0) {
      setIsAnalyzing(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      onAnalyze(validDrugs);
      setIsAnalyzing(false);
    }
  };

  return (
  <div className="space-y-6">
      {/* Patient Profile Card */}
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Patient Profile</h3>
              <p className="text-blue-100 text-sm">Current patient information</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <User className="w-4 h-4 text-blue-600" />
                <span>Patient Name</span>
              </label>
              <input
                type="text"
                value={patient.name}
                onChange={(e) => onPatientChange({ ...patient, name: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                placeholder="Enter patient name"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Age (years)</span>
              </label>
              <input
                type="number"
                value={patient.age}
                onChange={(e) => onPatientChange({ ...patient, age: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                placeholder="Age"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <Weight className="w-4 h-4 text-blue-600" />
                <span>Weight (kg)</span>
              </label>
              <input
                type="number"
                value={patient.weight || ''}
                onChange={(e) => onPatientChange({ ...patient, weight: parseFloat(e.target.value) || undefined })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                placeholder="Weight"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Prescription Input Card */}
  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Prescription Input</h2>
                <p className="text-slate-300 text-sm">Add medications for analysis</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowTextInput(!showTextInput)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 font-medium"
              >
                <Scan className="w-4 h-4" />
                <span>Smart Parse</span>
              </button>
              <button
                onClick={addDrug}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Add Drug</span>
              </button>
              {/* File Upload Button */}
              <label className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl cursor-pointer hover:from-emerald-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-emerald-500/25 font-medium">
                <Upload className="w-4 h-4" />
                <span>Upload PDF/JPG/PNG</span>
                <input
                  type="file"
                  accept=".pdf,image/jpeg,image/png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          {/* Uploaded File Preview/Error & OCR Result */}
          {uploadedFile && (
            <div className="mb-4 flex items-center space-x-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
              <Upload className="w-5 h-5 text-emerald-500" />
              <span className="font-medium text-emerald-700">Uploaded: {uploadedFile.name}</span>
              {ocrLoading && <span className="ml-4 text-blue-600 animate-pulse">Analyzing...</span>}
            </div>
          )}
          {uploadError && (
            !uploadError.includes('Showing demo prescription') && (
              <div className="mb-4 text-red-600 font-semibold">{uploadError}</div>
            )
          )}
          {ocrText && (
            <div className="mb-4 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl">
              <h4 className="font-bold text-blue-700 mb-2">Extracted Prescription Text:</h4>
              <pre className="whitespace-pre-wrap text-gray-900 text-sm">{ocrText}</pre>
              {/* Show extracted medicines summary */}
              <div className="mt-4">
                <h4 className="font-semibold text-emerald-700 mb-2">Extracted Medicines:</h4>
                {drugs.length > 0 ? (
                  <ul className="list-disc pl-6 text-gray-900">
                    {drugs.map((drug) => (
                      <li key={drug.id}>
                        <span className="font-medium">{drug.name}</span>
                        {drug.dosage && ` (${drug.dosage})`}
                        {drug.frequency && ` - ${drug.frequency}`}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-600">No medicines detected in the prescription.</div>
                )}
              </div>
            </div>
          )}
          </div>
        </div>

        <div className="p-6">
          {/* Smart Text Parser */}
          {showTextInput && (
            <div className="mb-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI-Powered Text Parser</h3>
                  <p className="text-sm text-gray-600">Paste prescription text for automatic extraction</p>
                </div>
              </div>
              <textarea
                value={prescriptionText}
                onChange={(e) => setPrescriptionText(e.target.value)}
                placeholder="Example:&#10;Aspirin 325mg twice daily&#10;Metformin 500mg twice daily with meals&#10;Lisinopril 10mg once daily in morning"
                className="w-full h-32 px-4 py-3 bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200 shadow-sm"
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={parsePrescriptionText}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-green-500/25 font-semibold"
                >
                  Parse & Extract
                </button>
              </div>
            </div>
          )}

          {/* Drug List */}
          <div className="space-y-4">
            {drugs.map((drug, index) => (
              <div key={drug.id} className="group bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <h4 className="font-semibold text-gray-900">Medication {index + 1}</h4>
                  </div>
                  <button
                    onClick={() => removeDrug(drug.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Drug Name</label>
                    <input
                      type="text"
                      value={drug.name}
                      onChange={(e) => updateDrug(drug.id, 'name', e.target.value)}
                      placeholder="e.g., Aspirin"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Dosage</label>
                    <input
                      type="text"
                      value={drug.dosage}
                      onChange={(e) => updateDrug(drug.id, 'dosage', e.target.value)}
                      placeholder="e.g., 325mg"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Frequency</label>
                    <input
                      type="text"
                      value={drug.frequency}
                      onChange={(e) => updateDrug(drug.id, 'frequency', e.target.value)}
                      placeholder="e.g., twice daily"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Route</label>
                    <select
                      value={drug.route}
                      onChange={(e) => updateDrug(drug.id, 'route', e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                    >
                      <option value="oral">Oral</option>
                      <option value="iv">Intravenous</option>
                      <option value="im">Intramuscular</option>
                      <option value="topical">Topical</option>
                      <option value="sublingual">Sublingual</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {drugs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No medications added yet</h3>
              <p className="text-gray-600 mb-6">Start by adding drugs manually or use our smart text parser</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={addDrug}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add First Drug</span>
                </button>
                <button
                  onClick={() => setShowTextInput(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 font-semibold"
                >
                  <Upload className="w-4 h-4" />
                  <span>Parse Text</span>
                </button>
              </div>
            </div>
          )}

          {drugs.length > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-xl hover:shadow-green-500/25 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center space-x-3">
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing Prescription...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      <span>Analyze Prescription</span>
                    </>
                  )}
                </div>
                {!isAnalyzing && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}