
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MigrationWizard from "@/components/migration/MigrationWizard";
import SelectPlanStep from "@/components/migration/SelectPlanStep";
import PaymentMethodStep from "@/components/migration/PaymentMethodStep";
import ConfirmationStep from "@/components/migration/ConfirmationStep";

const PlanMigration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("premium");
  const [billingCycle, setBillingCycle] = useState("annual");
  const [paymentMethodAdded, setPaymentMethodAdded] = useState(false);
  
  const steps = [
    {
      id: 1,
      name: "Select Plan",
      description: "Choose your new plan",
    },
    {
      id: 2,
      name: "Payment Method",
      description: "Add your credit card",
    },
    {
      id: 3,
      name: "Confirmation",
      description: "Review and confirm",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Completed all steps
      navigate("/migration-success");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <SelectPlanStep
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            billingCycle={billingCycle}
            setBillingCycle={setBillingCycle}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <PaymentMethodStep
            onBack={handleBack}
            onNext={handleNext}
            paymentMethodAdded={paymentMethodAdded}
            setPaymentMethodAdded={setPaymentMethodAdded}
          />
        );
      case 3:
        return (
          <ConfirmationStep
            selectedPlan={selectedPlan}
            billingCycle={billingCycle}
            onBack={handleBack}
            onComplete={handleNext}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
            Plan Migration Wizard
          </h1>
          <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">
            We're upgrading our membership structure to provide you with better features and services.
            Please follow these steps to migrate to our new plan system.
          </p>
        </div>
        
        <MigrationWizard steps={steps} currentStep={currentStep} />
        
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default PlanMigration;
