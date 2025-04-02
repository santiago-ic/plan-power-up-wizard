
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
    },
    {
      current: null,
      new: "AI Lead Generation",
      highlight: "New feature"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
          Upgrade Your Experience
        </h2>
        <p className="text-gray-600 mt-2">
          We've redesigned our plans to give you more power, more features, and more value.
        </p>
      </div>

      <div className="flex justify-center items-center gap-4 my-8">
        <div className={`text-sm font-medium transition-colors duration-200 ${billingCycle === "monthly" ? "text-blue-600" : "text-gray-500"}`}>
          Monthly
        </div>
        <Switch
          checked={billingCycle === "annual"}
          onCheckedChange={toggleBillingCycle}
        />
        <div className="flex items-center gap-2">
          <div className={`text-sm font-medium transition-colors duration-200 ${billingCycle === "annual" ? "text-blue-600" : "text-gray-500"}`}>
            Annual
          </div>
          <div className="relative group">
            <div className="absolute -top-1 -right-1 bg-green-400 w-2 h-2 rounded-full animate-pulse"></div>
            <span className="ml-1 bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-xs px-2 py-1 rounded-full group-hover:scale-105 transition-transform">
              Save 33%
            </span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-4 relative">
        <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-10 bg-gray-200 -z-10 rounded-full"></div>
        
        {/* Current Plan */}
        <div className="md:col-span-5 border rounded-xl p-6 bg-gradient-to-b from-white to-gray-50 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="mb-4">
            <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium inline-flex items-center">
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-1"></span>
              Current Plan
            </span>
            <h3 className="text-xl font-bold mt-3 flex items-center">
              Silver Plan
              <div className="text-gray-400 text-xs ml-2 bg-gray-100 px-2 py-0.5 rounded">Legacy</div>
            </h3>
            <p className="text-gray-500 mt-1 text-sm">Your existing membership</p>
          </div>
          
          <div className="flex justify-between items-end mb-6 pt-2 pb-4 border-t border-b border-gray-100">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide">Current Price</p>
              <div className="flex items-baseline">
                <p className="text-3xl font-bold">$49.99</p>
                <span className="text-sm font-normal text-gray-500 ml-1">/month</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            {featureComparisons.map((feature, index) => (
              <div 
                key={`current-${index}`} 
                className={`flex items-start ${!feature.current ? 'opacity-30' : ''}`}
              >
                <div className="flex-shrink-0 mt-1">
                  {feature.current ? (
                    <Check className="h-4 w-4 text-gray-400" />
                  ) : (
                    <X className="h-4 w-4 text-gray-300" />
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-gray-900">{feature.current || 'Not available'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* New Premium Plan */}
        <div className="md:col-span-7 border-2 border-blue-500 rounded-xl p-6 relative bg-gradient-to-b from-white to-blue-50 shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-md flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            RECOMMENDED
          </div>
          
          <div className="mb-4">
            <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-violet-100 text-blue-700 rounded-full text-xs font-medium inline-flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></span>
              New Plan
            </span>
            <h3 className="text-xl font-bold mt-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-violet-700">
              Premium Plan
            </h3>
            <p className="text-blue-600 mt-1 text-sm">Enhanced membership with more features</p>
          </div>
          
          <div className="flex justify-between items-end mb-6 pt-2 pb-4 border-t border-b border-blue-100">
            <div>
              <p className="text-blue-600 text-xs uppercase tracking-wide">New Price</p>
              <div className="flex items-baseline">
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                  ${getMonthlyPrice(99.99)}
                </p>
                <span className="text-sm font-normal text-blue-600 ml-1">
                  /{billingCycle === "annual" ? "mo" : "month"}
                </span>
              </div>
              {billingCycle === "annual" && (
                <div className="flex flex-col">
                  <p className="text-green-600 text-sm">Billed annually (${(99.99 * 12 * 0.67).toFixed(2)})</p>
                  <p className="text-green-600 text-xs font-medium mt-1">
                    You save ${annualSavings(99.99)} per year
                  </p>
                </div>
              )}
            </div>
            <div className="hidden md:block">
              <Button 
                onClick={onNext}
                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
              >
                Choose Premium
              </Button>
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            {featureComparisons.map((feature, index) => (
              <div 
                key={`new-${index}`} 
                className={`flex items-start transition-all duration-500 transform ${animateFeatures ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                style={{transitionDelay: `${index * 100}ms`}}
              >
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-4 w-4 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-gray-900">{feature.new}</p>
                  {feature.highlight && (
                    <p className="text-xs text-blue-600 mt-0.5">{feature.highlight}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showInfoCard && (
        <div className="bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-100 rounded-xl p-6 relative overflow-hidden">
          <button 
            onClick={() => setShowInfoCard(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-white/50 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-500 mt-1" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-blue-800">Migrate Now, Pay Later</h3>
              <div className="mt-2 space-y-2">
                <p className="text-blue-600 text-sm flex items-baseline">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 inline-block"></span>
                  Immediate access to all Premium features
                </p>
                <p className="text-blue-600 text-sm flex items-baseline">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 inline-block"></span>
                  No charge until your next billing date
                </p>
                <p className="text-blue-600 text-sm flex items-baseline">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 inline-block"></span>
                  Up to 30 days of premium features at no additional cost
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-r from-blue-200/20 to-violet-200/20 rounded-full z-0"></div>
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-gradient-to-r from-blue-200/10 to-violet-200/10 rounded-full z-0"></div>
        </div>
      )}

      <div className="flex justify-end">
        <Button 
          onClick={onNext}
          size="lg"
          className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <span className="relative z-10 flex items-center">
            Continue to Payment Method
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-700 to-violet-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </Button>
      </div>
    </div>
  );
};

export default SelectPlanStep;
