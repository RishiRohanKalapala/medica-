import React, { useState, useEffect } from "react";
import Chat from "@/components/Chat";
import DiagnosisDisplay from "@/components/DiagnosisDisplay";
import MedicationList from "@/components/MedicationList";
import ReportAnalysis from "@/components/ReportAnalysis";
import SymptomChecker from "@/components/SymptomChecker";
import RiskAssessment from "@/components/RiskAssessment";
import TreatmentPlanner from "@/components/TreatmentPlanner";
import { DiagnosisResult, MedicationRecommendation } from "@/types/chat";
import { FileText, LayoutDashboard, AlertCircle, Activity, Clipboard, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { fetchMedicalArticles } from "@/utils/apiUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MedicalArticle {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  journal: string;
  publicationDate: string;
  url: string;
}

const Index = () => {
  const [diagnoses, setDiagnoses] = useState<DiagnosisResult[]>([]);
  const [medications, setMedications] = useState<MedicationRecommendation[]>([]);
  const [advice, setAdvice] = useState<string>("");
  const [articles, setArticles] = useState<MedicalArticle[]>([]);
  const [lastQuery, setLastQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("diagnosis");
  const [reportAnalysis, setReportAnalysis] = useState<any>(null);
  const [riskFactors, setRiskFactors] = useState<any>(null);
  const [treatmentPlan, setTreatmentPlan] = useState<any>(null);

  const handleAnalysisUpdate = async (analysis: {
    diagnoses: DiagnosisResult[],
    medications: MedicationRecommendation[],
    advice: string
  }) => {
    setDiagnoses(analysis.diagnoses);
    setMedications(analysis.medications);
    setAdvice(analysis.advice);
    
    // Fetch relevant articles based on diagnoses
    if (analysis.diagnoses.length > 0) {
      const query = analysis.diagnoses[0].condition;
      if (query !== lastQuery) {
        setLastQuery(query);
        try {
          const fetchedArticles = await fetchMedicalArticles(query);
          setArticles(fetchedArticles);
        } catch (error) {
          console.error("Error fetching articles:", error);
        }
      }
    }
  };

  const handleReportAnalysisComplete = (analysis: any) => {
    setReportAnalysis(analysis);
  };

  const handleRiskAssessmentComplete = (assessment: any) => {
    setRiskFactors(assessment);
  };

  const handleTreatmentPlanComplete = (plan: any) => {
    setTreatmentPlan(plan);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-medical-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">MediSpecialist AI</h1>
            <p className="text-sm opacity-90">Advanced Medical Analysis • Lung Cancer • Thyroid Disease • Heart Disease</p>
          </div>
          <div className="text-sm text-right">
            <div className="font-medium">AI-Powered Healthcare Assistant</div>
            <div className="text-xs opacity-80">Expert Analysis • Treatment Planning • Risk Assessment</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          {/* Chat section - 4 columns on large screens */}
          <div className="lg:col-span-4 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-[calc(100vh-160px)]">
            <div className="bg-blue-50 p-3 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <LayoutDashboard size={18} className="mr-2 text-medical-primary" />
                Medical Consultation Hub
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                AI-powered analysis for lung cancer, thyroid disorders, and cardiovascular diseases
              </p>
            </div>
            <Chat onAnalysisUpdate={handleAnalysisUpdate} />
          </div>
          
          {/* Analysis section - 3 columns on large screens */}
          <div className="lg:col-span-3 space-y-6 h-[calc(100vh-160px)] overflow-y-auto pr-2">
            
            {/* Advanced Tools Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SymptomChecker onSymptomAnalysis={handleAnalysisUpdate} />
              <div className="space-y-4">
                <RiskAssessment onRiskAssessment={handleRiskAssessmentComplete} />
                <TreatmentPlanner 
                  diagnoses={diagnoses} 
                  medications={medications}
                  onTreatmentPlan={handleTreatmentPlanComplete}
                />
              </div>
            </div>

            {/* Report Analysis Section */}
            <div className="mb-6">
              <ReportAnalysis onAnalysisComplete={handleReportAnalysisComplete} />
            </div>
            
            {/* Medical Analysis Tabs */}
            <Card className="shadow-md border-0 rounded-xl overflow-hidden mb-6">
              <div className="bg-blue-50 p-3 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Activity size={18} className="mr-2 text-medical-primary" />
                  Comprehensive Medical Analysis
                </h2>
              </div>
              <CardContent className="p-0">
                <Tabs 
                  defaultValue="diagnosis" 
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-4 rounded-none">
                    <TabsTrigger value="diagnosis" className="text-xs">Conditions</TabsTrigger>
                    <TabsTrigger value="medications" className="text-xs">Medications</TabsTrigger>
                    <TabsTrigger value="advice" className="text-xs">Guidance</TabsTrigger>
                    <TabsTrigger value="risk" className="text-xs">Risk Profile</TabsTrigger>
                  </TabsList>
                  <TabsContent value="diagnosis" className="m-0 p-4 max-h-[40vh] overflow-y-auto">
                    <DiagnosisDisplay diagnoses={diagnoses} />
                    {reportAnalysis && reportAnalysis.suspectedConditions.length > 0 && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="text-sm font-medium text-yellow-800 mb-2 flex items-center">
                          <FileText size={14} className="mr-1" />
                          From Report Analysis:
                        </h4>
                        <ul className="text-xs text-yellow-700 space-y-1">
                          {reportAnalysis.suspectedConditions.map((condition: string, index: number) => (
                            <li key={index}>• {condition}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {treatmentPlan && treatmentPlan.timeline && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="text-sm font-medium text-green-800 mb-2 flex items-center">
                          <Calendar size={14} className="mr-1" />
                          Treatment Timeline:
                        </h4>
                        <div className="text-xs text-green-700 space-y-1">
                          {treatmentPlan.timeline.map((phase: any, index: number) => (
                            <div key={index}>
                              <strong>{phase.phase}:</strong> {phase.duration} - {phase.activities.join(", ")}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="medications" className="m-0 p-4 max-h-[40vh] overflow-y-auto">
                    <MedicationList medications={medications} />
                  </TabsContent>
                  <TabsContent value="advice" className="m-0 p-4 max-h-[40vh] overflow-y-auto">
                    {advice ? (
                      <div className="space-y-3">
                        <h3 className="text-md font-medium">Medical Recommendations</h3>
                        <p className="text-sm whitespace-pre-line">{advice}</p>
                        {reportAnalysis && reportAnalysis.recommendedTests.length > 0 && (
                          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                              <Clipboard size={14} className="mr-1" />
                              Recommended Tests:
                            </h4>
                            <ul className="text-xs text-blue-700 space-y-1">
                              {reportAnalysis.recommendedTests.map((test: string, index: number) => (
                                <li key={index}>• {test}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-sm text-gray-500">No recommendations available yet.</p>
                        <p className="text-xs text-gray-400 mt-1">Use our advanced tools or chat to get personalized guidance</p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="risk" className="m-0 p-4 max-h-[40vh] overflow-y-auto">
                    {riskFactors ? (
                      <div className="space-y-3">
                        <h3 className="text-md font-medium">Risk Assessment Profile</h3>
                        <div className="space-y-2">
                          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <h4 className="text-sm font-medium text-red-800">Overall Risk Level: {riskFactors.overallRisk}</h4>
                            <p className="text-xs text-red-700 mt-1">{riskFactors.riskExplanation}</p>
                          </div>
                          {riskFactors.riskFactors && riskFactors.riskFactors.length > 0 && (
                            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                              <h4 className="text-sm font-medium text-orange-800 mb-2">Identified Risk Factors:</h4>
                              <ul className="text-xs text-orange-700 space-y-1">
                                {riskFactors.riskFactors.map((factor: string, index: number) => (
                                  <li key={index}>• {factor}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {riskFactors.preventiveMeasures && riskFactors.preventiveMeasures.length > 0 && (
                            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                              <h4 className="text-sm font-medium text-green-800 mb-2">Preventive Measures:</h4>
                              <ul className="text-xs text-green-700 space-y-1">
                                {riskFactors.preventiveMeasures.map((measure: string, index: number) => (
                                  <li key={index}>• {measure}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-sm text-gray-500">No risk assessment available yet.</p>
                        <p className="text-xs text-gray-400 mt-1">Use the Risk Assessment tool to evaluate your health profile</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            {/* Medical Literature Section */}
            <Card className="shadow-md border-0 rounded-xl overflow-hidden">
              <div className="bg-blue-50 p-3 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FileText size={18} className="mr-2 text-medical-primary" />
                  Medical Literature & Research
                </h2>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  {articles.length} {articles.length === 1 ? 'source' : 'sources'}
                </span>
              </div>
              <CardContent className="p-4 max-h-[30vh] overflow-y-auto">
                {articles.length > 0 ? (
                  <div className="space-y-4">
                    {articles.map((article) => (
                      <div key={article.id} className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                        <h4 className="font-medium text-sm">{article.title}</h4>
                        <div className="flex items-center mt-1 text-xs text-gray-600">
                          <span className="mr-2 font-medium">{article.journal}</span>
                          <span>•</span>
                          <span className="mx-2">{article.publicationDate}</span>
                        </div>
                        <p className="text-xs mt-2 text-gray-700 line-clamp-2">{article.abstract}</p>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-xs text-gray-500">{article.authors}</span>
                          <a 
                            href={article.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-medical-primary hover:underline font-medium"
                          >
                            View Research
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-sm text-gray-500">No relevant research found.</p>
                    <p className="text-xs text-gray-400 mt-1">Ask about specific conditions to see related literature.</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Enhanced Disclaimer */}
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
              <div className="flex items-start">
                <AlertCircle size={18} className="text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800 font-medium">
                    Advanced Medical AI Assistant
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    This specialized AI provides comprehensive analysis for lung cancer, thyroid diseases, and cardiovascular conditions using advanced algorithms and medical datasets. Always consult qualified healthcare professionals for diagnosis, treatment, and medical decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
