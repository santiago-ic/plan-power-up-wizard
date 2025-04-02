
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ArrowRight, Check, Info, Sparkles, X } from "lucide-react";

interface SelectPlanStepProps {
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
  billingCycle: string;
  setBillingCycle: (cycle: string) => void;
  onNext: () => void;
}

const SelectPlanStep = ({
  selectedPlan,
  setSelectedPlan,
  billingCycle,
  setBillingCycle,
  onNext,
}: SelectPlanStepProps) => {
  const [animateFeatures, setAnimateFeatures] = useState(false);
  const [showInfoCard, setShowInfoCard] = useState(true);

  useEffect(() => {
    // Trigger feature animation after component mounts
    setTimeout(() => {
      setAnimateFeatures(true);
    }, 300);
  }, []);

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly");
  };

  // Calculate prices based on billing cycle
  const getMonthlyPrice = (basePrice: number) => {
    if (billingCycle === "annual") {
      // 33% discount for annual billing
      return (basePrice * 0.67).toFixed(2);
    }
    return basePrice.toFixed(2);
  };

  const annualSavings = (basePrice: number) => {
    const monthlyCost = basePrice;
    const annualCost = basePrice * 0.67 * 12;
    return ((monthlyCost * 12) - annualCost).toFixed(2);
  };

  const featureComparisons = [
    {
      current: "Basic Analytics",
      new: "Advanced Analytics",
      highlight: "Enhanced from Basic"
    },
    {
      current: "Up to 50 Properties",
      new: "Unlimited Properties",
      highlight: "Upgraded from 50"
    },
    {
      current: "Email Support",
      new: "24/7 Priority Support",
      highlight: "New feature"
    },
    {
      current: null,
      new: "Custom Branding",
      highlight: "New feature"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center gap-3 mb-4">
        <div className={`text-xs font-medium transition-colors duration-200 ${billingCycle === "monthly" ? "text-blue-600" : "text-gray-500"}`}>
          Monthly
        </div>
        <Switch
          checked={billingCycle === "annual"}
          onCheckedChange={toggleBillingCycle}
        />
        <div className="flex items-center gap-1">
          <div className={`text-xs font-medium transition-colors duration-200 ${billingCycle === "annual" ? "text-blue-600" : "text-gray-500"}`}>
            Annual
          </div>
          <div className="relative group">
            <span className="ml-1 bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-xs px-1.5 py-0.5 rounded-full">
              Save 33%
            </span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-3 relative">
        <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-8 bg-gray-200 -z-10 rounded-full"></div>
        
        {/* Current Plan */}
        <div className="md:col-span-5 border rounded-lg p-4 bg-gradient-to-b from-white to-gray-50 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="mb-2">
            <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs font-medium inline-flex items-center">
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-1"></span>
              Current Plan
            </span>
            <h3 className="text-base font-bold mt-1 flex items-center">
              Silver Plan
              <div className="text-gray-400 text-xs ml-1 bg-gray-100 px-1 py-0.5 rounded">Legacy</div>
            </h3>
            <p className="text-gray-500 mt-0.5 text-xs">Your existing membership</p>
          </div>
          
          <div className="flex justify-between items-end mb-3 pt-1 pb-2 border-t border-b border-gray-100">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide">Current Price</p>
              <div className="flex items-baseline">
                <p className="text-xl font-bold">$49.99</p>
                <span className="text-xs font-normal text-gray-500 ml-1">/month</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-1.5 mb-3">
            {featureComparisons.map((feature, index) => (
              <div 
                key={`current-${index}`} 
                className={`flex items-start ${!feature.current ? 'opacity-30' : ''}`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {feature.current ? (
                    <Check className="h-3 w-3 text-gray-400" />
                  ) : (
                    <X className="h-3 w-3 text-gray-300" />
                  )}
                </div>
                <div className="ml-1.5">
                  <p className="text-gray-900 text-xs">{feature.current || 'Not available'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* New Premium Plan */}
        <div className="md:col-span-7 border-2 border-blue-500 rounded-lg p-4 relative bg-gradient-to-b from-white to-blue-50 shadow-md transition-all duration-300 hover:shadow-lg">
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white px-2 py-0.5 rounded text-xs font-semibold shadow-md flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            RECOMMENDED
          </div>
          
          <div className="mb-2">
            <span className="px-2 py-0.5 bg-gradient-to-r from-blue-100 to-violet-100 text-blue-700 rounded-full text-xs font-medium inline-flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></span>
              New Plan
            </span>
            <h3 className="text-base font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-violet-700">
              Premium Plan
            </h3>
            <p className="text-blue-600 mt-0.5 text-xs">Enhanced membership with more features</p>
          </div>
          
          <div className="flex justify-between items-end mb-3 pt-1 pb-2 border-t border-b border-blue-100">
            <div>
              <p className="text-blue-600 text-xs uppercase tracking-wide">New Price</p>
              <div className="flex items-baseline">
                <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                  ${getMonthlyPrice(99.99)}
                </p>
                <span className="text-xs font-normal text-blue-600 ml-1">
                  /{billingCycle === "annual" ? "mo" : "month"}
                </span>
              </div>
              {billingCycle === "annual" && (
                <div>
                  <p className="text-green-600 text-xs">Billed annually (${(99.99 * 12 * 0.67).toFixed(2)})</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-1.5 mb-3">
            {featureComparisons.map((feature, index) => (
              <div 
                key={`new-${index}`} 
                className={`flex items-start transition-all duration-500 transform ${animateFeatures ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                style={{transitionDelay: `${index * 100}ms`}}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-blue-500" />
                </div>
                <div className="ml-1.5">
                  <p className="text-gray-900 text-xs">{feature.new}</p>
                  {feature.highlight && (
                    <p className="text-xs text-blue-600 mt-0">{feature.highlight}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showInfoCard && (
        <div className="bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-100 rounded-lg p-3 relative overflow-hidden">
          <button 
            onClick={() => setShowInfoCard(false)}
            className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-white/50 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Info className="h-4 w-4 text-blue-500 mt-0.5" />
            </div>
            <div className="ml-2">
              <h3 className="text-sm font-medium text-blue-800">Migrate Now, Pay Later</h3>
              <div className="mt-1 space-y-1">
                <p className="text-blue-600 text-xs flex items-baseline">
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-1.5 inline-block"></span>
                  Immediate access to all Premium features
                </p>
                <p className="text-blue-600 text-xs flex items-baseline">
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-1.5 inline-block"></span>
                  No charge until your next billing date
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-2 mt-auto">
        <Button 
          onClick={onNext}
          variant="gradient"
          size="default"
          className="font-medium shadow-md"
        >
          Continue to Payment
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SelectPlanStep;
