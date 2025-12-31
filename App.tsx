
import React, { useState, useCallback } from 'react';
import { Layout } from './components/Layout';
import { FormInput } from './components/FormInput';
import { CandidateData } from './types';
import { generateCoverLetter } from './services/geminiService';

const App: React.FC = () => {
  const [formData, setFormData] = useState<CandidateData>({
    personalDetails: '',
    currentStatus: '',
    education: '',
    experience: '',
    skills: '',
    jobDescription: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const coverLetter = await generateCoverLetter(formData);
      setResult(coverLetter);
    } catch (err) {
      setError("We encountered an error crafting your letter. Please check your inputs and try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      alert("Cover letter copied to clipboard!");
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: Input Form */}
        <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Input Your Narrative</h2>
            <p className="text-gray-500 text-sm">Fill in your background details. Our AI Senior Recruiter will weave them into a masterpiece.</p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-6">
            <FormInput
              label="1. Header & Contact Info"
              name="personalDetails"
              value={formData.personalDetails}
              onChange={handleInputChange}
              placeholder="Full Name, Phone, Email, LinkedIn, Portfolio Link..."
              required
            />
            
            <FormInput
              label="2. Current Professional Status"
              name="currentStatus"
              value={formData.currentStatus}
              onChange={handleInputChange}
              placeholder="e.g., Final-year CS student at Stanford, Senior Product Manager with 10 years experience..."
              required
            />

            <FormInput
              label="3. Education"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              placeholder="Degrees, Certifications, Relevant coursework..."
              required
            />

            <FormInput
              label="4. Relevant Experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="Key roles, major accomplishments, and quantitative results..."
              rows={5}
              required
            />

            <FormInput
              label="5. Core Skills"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="Technical skills, soft skills, tools, and methodologies..."
              required
            />

            <FormInput
              label="6. Targeted Job Description"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              placeholder="Paste the job title and description here to tailor the letter..."
              rows={5}
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all transform active:scale-95 ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-indigo-200'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Recruiter is thinking...
                </span>
              ) : 'Generate My Cover Letter'}
            </button>
          </form>
        </section>

        {/* Right Side: Output Preview */}
        <section className="sticky top-24 lg:h-[calc(100vh-140px)] flex flex-col">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex-grow overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-bold text-gray-900">Draft Preview</h2>
              {result && (
                <button 
                  onClick={copyToClipboard}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy Text
                </button>
              )}
            </div>

            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
              {!result && !isLoading && !error && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium">Your tailored cover letter will appear here.</p>
                </div>
              )}

              {isLoading && (
                <div className="space-y-4">
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2"></div>
                  <div className="h-32 bg-gray-100 rounded animate-pulse w-full"></div>
                  <div className="h-32 bg-gray-100 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-1/4"></div>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              {result && (
                <div className="prose prose-indigo max-w-none">
                  <div className="whitespace-pre-wrap text-gray-900 leading-relaxed font-serif text-lg">
                    {result}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </Layout>
  );
};

export default App;
