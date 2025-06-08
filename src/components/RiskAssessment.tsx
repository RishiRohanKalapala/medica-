import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Calculator, Heart, Activity, User, Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RiskAssessmentProps {
  onRiskAssessment: (assessment: any) => void;
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({ onRiskAssessment }): JSX.Element => {
  const [formData, setFormData] = useState({
    age: "",
    smoking: "",
    familyHistory: "",
    weight: "",
    height: "",
    bloodPressure: "",
    cholesterol: "",
    diabetes: ""
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInput = (name: string, value: string) => {
    const numValue = parseFloat(value);
    
    switch (name) {
      case 'age':
        if (numValue < 0 || numValue > 120) {
          return 'Age must be between 0 and 120 years';
        }
        break;
      case 'weight':
        if (numValue < 0 || numValue > 500) {
          return 'Weight must be between 0 and 500 kg';
        }
        break;
      case 'height':
        if (numValue < 0 || numValue > 300) {
          return 'Height must be between 0 and 300 cm';
        }
        break;
    }
    return '';
  };

  const handleInputChange = (name: string, value: string) => {
    const error = validateInput(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return formData.age && 
           formData.smoking && 
           formData.familyHistory && 
           !Object.values(errors).some(error => error !== '');
  };

  const calculateRisk = async () => {
    try {
      setIsCalculating(true);
      
      // Validate required fields
      if (!formData.age || !formData.smoking || !formData.familyHistory) {
        throw new Error('Please complete all required fields');
      }

      // Validate numeric inputs
      const age = parseInt(formData.age);
      if (isNaN(age) || age < 0 || age > 120) {
        throw new Error('Invalid age value');
      }

      // Calculate BMI if both weight and height are provided
      let bmi = null;
      if (formData.weight && formData.height) {
        const weight = parseFloat(formData.weight);
        const height = parseFloat(formData.height) / 100; // Convert cm to m
        
        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
          throw new Error('Invalid weight or height values');
        }
        
        bmi = weight / (height * height);
        if (bmi > 100) { // Unrealistic BMI check
          throw new Error('Invalid BMI calculation');
        }
      }
      
      // Simulate risk calculation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const isSmoker = formData.smoking === "yes";
      const hasFamilyHistory = formData.familyHistory === "yes";
      const hasDiabetes = formData.diabetes === "yes";
      const hasHighBP = formData.bloodPressure === "high";
      const hasHighCholesterol = formData.cholesterol === "high";
      
      let riskScore = 0;
      const riskFactors = [];
      const preventiveMeasures = [];
      
      // Age-based risk
      if (age > 65) {
        riskScore += 30;
        riskFactors.push("Advanced age (>65 years)");
      } else if (age > 50) {
        riskScore += 15;
        riskFactors.push("Middle age (50-65 years)");
      }
      
      // Smoking risk
      if (isSmoker) {
        riskScore += 40;
        riskFactors.push("Current smoker");
        preventiveMeasures.push("Smoking cessation program");
      }
      
      // Family history
      if (hasFamilyHistory) {
        riskScore += 25;
        riskFactors.push("Family history of heart disease, cancer, or thyroid disorders");
        preventiveMeasures.push("Regular genetic counseling and screening");
      }
      
      // Diabetes
      if (hasDiabetes) {
        riskScore += 20;
        riskFactors.push("Diabetes mellitus");
        preventiveMeasures.push("Optimal diabetes management and HbA1c monitoring");
      }
      
      // Blood pressure
      if (hasHighBP) {
        riskScore += 15;
        riskFactors.push("Hypertension");
        preventiveMeasures.push("Blood pressure control through medication and lifestyle");
      }
      
      // Cholesterol
      if (hasHighCholesterol) {
        riskScore += 15;
        riskFactors.push("High cholesterol levels");
        preventiveMeasures.push("Cholesterol management with statins and diet modification");
      }
      
      // Calculate BMI if weight and height provided
      if (bmi) {
        if (bmi > 30) {
          riskScore += 10;
          riskFactors.push("Obesity (BMI >30)");
          preventiveMeasures.push("Weight management through diet and exercise");
        } else if (bmi > 25) {
          riskScore += 5;
          riskFactors.push("Overweight (BMI 25-30)");
          preventiveMeasures.push("Lifestyle modifications for weight control");
        }
      }
      
      // Add general preventive measures
      preventiveMeasures.push("Regular exercise (150 minutes/week)", "Mediterranean diet", "Stress management", "Regular medical check-ups");
      
      let overallRisk = "Low";
      let riskExplanation = "Your current risk profile suggests a low probability of developing serious conditions.";
      
      if (riskScore > 60) {
        overallRisk = "High";
        riskExplanation = "Your risk profile indicates elevated chances of developing cardiovascular, thyroid, or lung conditions. Immediate medical consultation recommended.";
      } else if (riskScore > 30) {
        overallRisk = "Moderate";
        riskExplanation = "You have moderate risk factors that should be addressed through lifestyle changes and regular monitoring.";
      }
      
      const assessment = {
        overallRisk,
        riskScore,
        riskExplanation,
        riskFactors,
        preventiveMeasures: Array.from(new Set(preventiveMeasures)),
        bmi: bmi ? parseFloat(bmi.toFixed(1)) : null,
        timestamp: new Date().toISOString()
      };
      
      onRiskAssessment(assessment);
    } catch (error) {
      console.error('Risk calculation error:', error);
      // You might want to show an error toast here
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <Card className="h-fit shadow-lg border-0 bg-gradient-to-br from-red-50 to-orange-50">
      <CardHeader className="pb-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-t-xl">
        <CardTitle className="text-sm flex items-center">
          <AlertTriangle size={18} className="mr-2" />
          Health Risk Assessment
        </CardTitle>
        <p className="text-xs opacity-90">
          Evaluate cardiovascular, lung, and thyroid disease risk
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {/* Personal Information Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-700 border-b border-gray-200 pb-2">
              <User size={16} className="text-red-500" />
              <span>Personal Information</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age" className="text-sm text-gray-700">Age (years)</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="35"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="h-9 text-sm bg-white border-gray-200 focus:border-red-400"
                  min="0"
                  max="120"
                />
                {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age}</p>}
              </div>
              <div>
                <Label className="text-sm text-gray-700">Smoking Status</Label>
                <Select value={formData.smoking} onValueChange={(value) => setFormData({...formData, smoking: value})}>
                  <SelectTrigger className="h-9 text-sm bg-white border-gray-200 focus:border-red-400">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Current Smoker</SelectItem>
                    <SelectItem value="no">Non-Smoker</SelectItem>
                    <SelectItem value="former">Former Smoker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Medical History Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-700 border-b border-gray-200 pb-2">
              <Heart size={16} className="text-red-500" />
              <span>Medical History</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-700">Family History</Label>
                <Select value={formData.familyHistory} onValueChange={(value) => setFormData({...formData, familyHistory: value})}>
                  <SelectTrigger className="h-9 text-sm bg-white border-gray-200 focus:border-red-400">
                    <SelectValue placeholder="Heart/Cancer/Thyroid disease" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-gray-700">Diabetes Status</Label>
                <Select value={formData.diabetes} onValueChange={(value) => setFormData({...formData, diabetes: value})}>
                  <SelectTrigger className="h-9 text-sm bg-white border-gray-200 focus:border-red-400">
                    <SelectValue placeholder="Select diabetes status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Diabetic</SelectItem>
                    <SelectItem value="no">Non-diabetic</SelectItem>
                    <SelectItem value="prediabetic">Pre-diabetic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Physical Measurements Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-700 border-b border-gray-200 pb-2">
              <Scale size={16} className="text-red-500" />
              <span>Physical Measurements</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight" className="text-sm text-gray-700">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="h-9 text-sm bg-white border-gray-200 focus:border-red-400"
                  min="0"
                  max="500"
                />
                {errors.weight && <p className="text-xs text-red-500 mt-1">{errors.weight}</p>}
              </div>
              <div>
                <Label htmlFor="height" className="text-sm text-gray-700">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="h-9 text-sm bg-white border-gray-200 focus:border-red-400"
                  min="0"
                  max="300"
                />
                {errors.height && <p className="text-xs text-red-500 mt-1">{errors.height}</p>}
              </div>
            </div>
          </div>

          {/* Vital Signs Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-700 border-b border-gray-200 pb-2">
              <Activity size={16} className="text-red-500" />
              <span>Vital Signs</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-700">Blood Pressure</Label>
                <Select value={formData.bloodPressure} onValueChange={(value) => setFormData({...formData, bloodPressure: value})}>
                  <SelectTrigger className="h-9 text-sm bg-white border-gray-200 focus:border-red-400">
                    <SelectValue placeholder="Select BP status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal (&lt;120/80)</SelectItem>
                    <SelectItem value="elevated">Elevated (120-129/&lt;80)</SelectItem>
                    <SelectItem value="high">High (&ge;130/80)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-gray-700">Cholesterol</Label>
                <Select value={formData.cholesterol} onValueChange={(value) => setFormData({...formData, cholesterol: value})}>
                  <SelectTrigger className="h-9 text-sm bg-white border-gray-200 focus:border-red-400">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal (&lt;200 mg/dL)</SelectItem>
                    <SelectItem value="borderline">Borderline (200-239)</SelectItem>
                    <SelectItem value="high">High (&ge;240 mg/dL)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <Button 
            onClick={calculateRisk}
            disabled={!isFormValid() || isCalculating}
            className="w-full text-sm h-10 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 shadow-md"
            size="sm"
          >
            {isCalculating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Calculating Risk...
              </>
            ) : (
              <>
                <Calculator size={16} className="mr-2" />
                Calculate Health Risk Profile
              </>
            )}
          </Button>
          
          {!isFormValid() && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              Complete all fields to calculate risk
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAssessment;
