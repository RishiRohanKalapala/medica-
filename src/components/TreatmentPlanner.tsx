import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Download, FileText, Users, Phone, CheckCircle } from "lucide-react";
import { DiagnosisResult, MedicationRecommendation } from "@/types/chat";
import { Badge } from "@/components/ui/badge";

interface TreatmentPlannerProps {
  diagnoses: DiagnosisResult[];
  medications: MedicationRecommendation[];
  onTreatmentPlan: (plan: any) => void;
}

const TreatmentPlanner: React.FC<TreatmentPlannerProps> = ({ 
  diagnoses, 
  medications, 
  onTreatmentPlan 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [treatmentPlan, setTreatmentPlan] = useState<any>(null);

  const generateTreatmentPlan = async () => {
    if (diagnoses.length === 0) return;
    
    setIsGenerating(true);
    
    // Simulate treatment plan generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const primaryCondition = diagnoses[0].condition.toLowerCase();
    let timeline = [];
    let specialists = [];
    let followUpSchedule = [];
    
    // Generate timeline based on condition
    if (primaryCondition.includes('lung') || primaryCondition.includes('cancer')) {
      timeline = [
        {
          phase: "Immediate Assessment (0-2 weeks)",
          duration: "2 weeks",
          priority: "urgent",
          activities: ["Complete staging workup", "Biopsy confirmation", "Multidisciplinary team consultation", "PET/CT imaging"]
        },
        {
          phase: "Treatment Planning (2-4 weeks)",
          duration: "2 weeks", 
          priority: "high",
          activities: ["Treatment plan finalization", "Pre-treatment assessments", "Patient education", "Insurance authorization"]
        },
        {
          phase: "Active Treatment (1-6 months)",
          duration: "3-6 months",
          priority: "ongoing",
          activities: ["Chemotherapy/Radiation", "Regular monitoring", "Supportive care", "Side effect management"]
        },
        {
          phase: "Surveillance (Ongoing)",
          duration: "Lifelong",
          priority: "maintenance",
          activities: ["Regular imaging", "Symptom monitoring", "Survivorship care", "Quality of life assessment"]
        }
      ];
      
      specialists = [
        "Medical Oncologist - Primary treatment coordination and chemotherapy management",
        "Pulmonologist - Lung function monitoring and respiratory care", 
        "Radiation Oncologist - Radiation therapy planning and delivery",
        "Thoracic Surgeon - Surgical evaluation and intervention",
        "Palliative Care Specialist - Symptom management and quality of life"
      ];
      
      followUpSchedule = [
        "Week 2: Treatment response assessment and lab work",
        "Month 1: Side effect monitoring and dose adjustments",
        "Month 3: Mid-treatment evaluation with imaging", 
        "Month 6: End of treatment assessment and planning",
        "Every 3 months: Surveillance imaging and clinical evaluation"
      ];
      
    } else if (primaryCondition.includes('thyroid')) {
      timeline = [
        {
          phase: "Diagnostic Workup (0-2 weeks)",
          duration: "2 weeks",
          priority: "urgent",
          activities: ["Complete thyroid function tests", "Thyroid ultrasound", "Fine needle biopsy if indicated", "Nuclear medicine scan"]
        },
        {
          phase: "Treatment Initiation (2-4 weeks)",
          duration: "2 weeks",
          priority: "high",
          activities: ["Medication selection and titration", "Lifestyle counseling", "Baseline monitoring", "Patient education"]
        },
        {
          phase: "Stabilization Phase (1-3 months)",
          duration: "2-3 months",
          priority: "ongoing",
          activities: ["Regular dose adjustments", "Symptom monitoring", "Lab follow-ups", "Side effect assessment"]
        },
        {
          phase: "Maintenance Care (Ongoing)",
          duration: "Lifelong",
          priority: "maintenance",
          activities: ["Annual monitoring", "Medication optimization", "Complication screening", "Cardiovascular risk assessment"]
        }
      ];
      
      specialists = [
        "Endocrinologist - Primary thyroid disorder management and hormone optimization",
        "Nuclear Medicine Physician - Radioactive iodine therapy if needed",
        "Endocrine Surgeon - Surgical consultation for complex cases",
        "Cardiologist - Cardiovascular monitoring for hyperthyroidism"
      ];
      
      followUpSchedule = [
        "Week 2: Initial response check and symptom assessment",
        "Month 1: First dose adjustment based on lab results",
        "Month 3: Stabilization assessment and long-term planning",
        "Month 6: Comprehensive evaluation and optimization",
        "Annually: Complete thyroid function and complication screening"
      ];
      
    } else if (primaryCondition.includes('heart') || primaryCondition.includes('cardiac')) {
      timeline = [
        {
          phase: "Acute Stabilization (0-1 week)",
          duration: "1 week",
          priority: "urgent",
          activities: ["Emergency stabilization", "Comprehensive cardiac workup", "Risk stratification", "Medication optimization"]
        },
        {
          phase: "Treatment Optimization (1-4 weeks)",
          duration: "3 weeks",
          priority: "high",
          activities: ["Medication titration", "Lifestyle interventions", "Cardiac rehabilitation planning", "Risk factor modification"]
        },
        {
          phase: "Rehabilitation Phase (1-3 months)",
          duration: "2-3 months",
          priority: "ongoing",
          activities: ["Cardiac rehabilitation program", "Supervised exercise training", "Nutritional counseling", "Stress management"]
        },
        {
          phase: "Long-term Management (Ongoing)",
          duration: "Lifelong",
          priority: "maintenance",
          activities: ["Regular monitoring", "Medication optimization", "Preventive care", "Annual risk assessment"]
        }
      ];
      
      specialists = [
        "Interventional Cardiologist - Primary cardiac care and procedures",
        "Cardiac Surgeon - Surgical evaluation and intervention if needed",
        "Cardiac Rehabilitation Specialist - Exercise program and lifestyle modification",
        "Electrophysiologist - Heart rhythm disorders management",
        "Heart Failure Specialist - Advanced heart failure management"
      ];
      
      followUpSchedule = [
        "Week 1: Acute follow-up and medication adjustment",
        "Month 1: Treatment response and exercise tolerance",
        "Month 3: Rehabilitation progress and risk factor control",
        "Month 6: Long-term assessment and optimization",
        "Every 6 months: Comprehensive cardiac evaluation"
      ];
    }
    
    const plan = {
      primaryCondition: diagnoses[0].condition,
      generatedDate: new Date().toLocaleDateString(),
      timeline,
      specialists,
      followUpSchedule,
      medications: medications.map(med => ({
        name: med.name,
        schedule: med.frequency,
        monitoring: "Regular blood tests and clinical assessment required"
      })),
      emergencyContacts: [
        "Emergency Department: 911",
        "Cardiology Emergency: 1-800-HEART-911",
        "Oncology Emergency: 1-800-CANCER-HELP",
        "Poison Control: 1-800-222-1222"
      ],
      importantNotes: [
        "Always carry medication list and emergency contacts",
        "Report any new or worsening symptoms immediately",
        "Attend all scheduled appointments and follow-ups",
        "Maintain healthy lifestyle modifications as recommended"
      ]
    };
    
    setTreatmentPlan(plan);
    onTreatmentPlan(plan);
    setIsGenerating(false);
  };

  const downloadTreatmentPlan = () => {
    if (!treatmentPlan) return;

    const planText = `
═══════════════════════════════════════════════════════════════
                    COMPREHENSIVE TREATMENT PLAN
                      MediSpecialist AI Generated
═══════════════════════════════════════════════════════════════

Generated on: ${treatmentPlan.generatedDate}
Primary Condition: ${treatmentPlan.primaryCondition}

═══════════════════════════════════════════════════════════════
                          TREATMENT TIMELINE
═══════════════════════════════════════════════════════════════

${treatmentPlan.timeline.map((phase: any) => `
📅 ${phase.phase} (Duration: ${phase.duration})
Priority Level: ${phase.priority.toUpperCase()}
Activities:
${phase.activities.map((activity: string) => `   • ${activity}`).join('\n')}
`).join('\n')}

═══════════════════════════════════════════════════════════════
                        SPECIALIST CONSULTATIONS
═══════════════════════════════════════════════════════════════

${treatmentPlan.specialists.map((specialist: string) => `👨‍⚕️ ${specialist}`).join('\n')}

═══════════════════════════════════════════════════════════════
                         FOLLOW-UP SCHEDULE
═══════════════════════════════════════════════════════════════

${treatmentPlan.followUpSchedule.map((followUp: string) => `📋 ${followUp}`).join('\n')}

═══════════════════════════════════════════════════════════════
                         MEDICATION SCHEDULE
═══════════════════════════════════════════════════════════════

${treatmentPlan.medications.map((med: any) => `💊 ${med.name}
   Schedule: ${med.schedule}
   Monitoring: ${med.monitoring}
`).join('\n')}

═══════════════════════════════════════════════════════════════
                        EMERGENCY CONTACTS
═══════════════════════════════════════════════════════════════

${treatmentPlan.emergencyContacts.map((contact: string) => `🚨 ${contact}`).join('\n')}

═══════════════════════════════════════════════════════════════
                         IMPORTANT NOTES
═══════════════════════════════════════════════════════════════

${treatmentPlan.importantNotes.map((note: string) => `⚠️  ${note}`).join('\n')}

═══════════════════════════════════════════════════════════════
                            DISCLAIMER
═══════════════════════════════════════════════════════════════

This treatment plan is generated by AI for informational purposes only. 
Always consult with qualified healthcare professionals for medical decisions.
This plan should be reviewed and approved by your healthcare provider.

For medical emergencies, call 911 immediately.

Generated by MediSpecialist AI - Advanced Medical Analysis System
    `.trim();

    const blob = new Blob([planText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `treatment-plan-${treatmentPlan.primaryCondition.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const hasData = diagnoses.length > 0;

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'ongoing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'maintenance': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="h-fit shadow-lg border-0 bg-gradient-to-br from-purple-50 to-indigo-50">
      <CardHeader className="pb-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-xl">
        <CardTitle className="text-sm flex items-center">
          <Calendar size={18} className="mr-2" />
          Treatment Planner
        </CardTitle>
        <p className="text-xs opacity-90">
          Comprehensive care timeline and specialist coordination
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="text-sm text-gray-600 bg-white p-4 rounded-lg border border-gray-100">
          <div className="flex items-center space-x-2 mb-2">
            <FileText size={16} className="text-purple-500" />
            <span className="font-medium">AI-Generated Treatment Planning</span>
          </div>
          <p>Creates personalized treatment timelines, specialist referrals, and follow-up schedules based on your diagnosis.</p>
        </div>
        
        {hasData && (
          <div className="p-4 bg-white rounded-lg border border-purple-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-800">Primary Condition:</span>
              <Badge variant="outline" className="text-purple-700 border-purple-300">
                Active
              </Badge>
            </div>
            <div className="text-base font-medium text-purple-900">{diagnoses[0].condition}</div>
            <div className="text-sm text-purple-600 mt-1">
              Treatment plan will be customized for this condition
            </div>
          </div>
        )}
        
        {treatmentPlan && (
          <div className="space-y-4 bg-white p-4 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 flex items-center">
                <CheckCircle size={16} className="text-green-500 mr-1" />
                Plan Generated
              </span>
              <Badge className="bg-green-100 text-green-800 text-sm">Ready</Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <Clock size={14} className="text-purple-500" />
                <span>{treatmentPlan.timeline.length} Phases</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users size={14} className="text-purple-500" />
                <span>{treatmentPlan.specialists.length} Specialists</span>
              </div>
            </div>
            
            {treatmentPlan.timeline.slice(0, 2).map((phase: any, index: number) => (
              <div key={index} className="p-3 bg-gray-50 rounded border-l-4 border-l-purple-400">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-800">{phase.phase}</span>
                  <Badge className={`text-sm px-2 py-0.5 ${getPriorityColor(phase.priority)}`}>
                    {phase.priority}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">{phase.duration}</div>
              </div>
            ))}
          </div>
        )}
        
        <div className="space-y-3 pt-4 border-t border-gray-100">
          <Button 
            onClick={generateTreatmentPlan}
            disabled={!hasData || isGenerating}
            className="w-full text-sm h-10 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 shadow-md"
            size="sm"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating Treatment Plan...
              </>
            ) : (
              <>
                <Clock size={16} className="mr-2" />
                Create Comprehensive Plan
              </>
            )}
          </Button>
          
          {treatmentPlan && (
            <Button 
              onClick={downloadTreatmentPlan}
              variant="outline"
              className="w-full text-sm h-9 border-purple-200 text-purple-700 hover:bg-purple-50"
              size="sm"
            >
              <Download size={14} className="mr-2" />
              Download Treatment Plan
            </Button>
          )}
        </div>
        
        {!hasData && (
          <div className="text-center py-6 bg-white rounded-lg border border-gray-100">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar size={18} className="text-purple-500" />
              </div>
              <div className="text-sm text-gray-500">No diagnosis available</div>
              <div className="text-sm text-gray-400">Complete a diagnosis to generate treatment plan</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TreatmentPlanner;
