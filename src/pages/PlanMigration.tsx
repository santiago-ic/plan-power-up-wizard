
import { useState, useEffect } from "react";
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
  const [pageLoaded, setPageLoaded] = useState(false);
  
  useEffect(() => {
    // Add page load animation
    setPageLoaded(true);
  }, []);
  
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300);
    } else {
      // Completed all steps
      navigate("/migration-success");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
      }, 300);
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
    <div className="h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden flex flex-col">
      <div 
        className={`fixed inset-0 w-full h-full bg-gradient-to-br from-blue-600/5 to-violet-600/5 pointer-events-none transition-opacity duration-1000 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}
      ></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-violet-600/10 rounded-full filter blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-600/10 to-violet-600/10 rounded-full filter blur-3xl opacity-70 translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-6xl mx-auto px-4 py-6 relative z-10 flex-1 flex flex-col">
        <div className={`transition-all duration-700 transform ${pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} flex-1 flex flex-col`}>
          <div className="mb-4 text-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 inline-block">
              Plan Migration Wizard
            </h1>
            <p className="text-center text-gray-600 mt-1 max-w-2xl mx-auto text-sm">
              We're upgrading our membership structure to provide you with better features and services.
            </p>
          </div>
          
          <MigrationWizard steps={steps} currentStep={currentStep} />
          
          <div className={`bg-white rounded-xl shadow-lg p-6 mt-4 transition-all duration-500 transform flex-1 overflow-auto`}>
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanMigration;
