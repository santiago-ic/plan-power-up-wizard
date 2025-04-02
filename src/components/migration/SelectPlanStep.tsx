
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CheckCircle, Circle, ArrowRight, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  
  // Calculate prices based on billing cycle
  const getPrice = (basePrice: number) => {
    if (billingCycle === "annual") {
      // 33% discount for annual billing
      return (basePrice * 12 * 0.67).toFixed(2);
    }
    return basePrice.toFixed(2);
  };

  const getMonthlyEquivalent = (basePrice: number) => {
    if (billingCycle === "annual") {
      // Monthly equivalent when paying annually
      return (basePrice * 0.67).toFixed(2);
    }
    return basePrice.toFixed(2);
  };

  const currentPlanFeatures = [
    { name: "Property listings", value: "3" },
    { name: "Contacts", value: "Limited" },
    { name: "Email notifications", value: "Basic" },
    { name: "Analytics", value: "Basic" },
    { name: "API access", value: "No" },
    { name: "Customer support", value: "Email only" },
  ];

  const newPlanFeatures = [
    { name: "Property listings", value: "Unlimited", highlight: true },
    { name: "Contacts", value: "Unlimited", highlight: true },
    { name: "Email notifications", value: "Advanced", highlight: true },
    { name: "Analytics", value: "Advanced", highlight: true },
    { name: "API access", value: "Yes", highlight: true },
    { name: "Customer support", value: "24/7 Priority", highlight: true },
  ];

  const benefits = [
    "Start enjoying premium features immediately",
    "No payment until your next billing cycle",
    "Simplified automatic payments",
    "Highest security standards"
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Select Your New Plan</h2>
        <p className="text-gray-600">
          We're upgrading our plans to serve you better. Compare your current plan with our new offering below.
        </p>
      </div>

      <div className="flex justify-center items-center space-x-4 py-3">
        <span className={`font-medium ${billingCycle === "monthly" ? "text-blue-600" : "text-gray-500"}`}>Monthly</span>
        <Switch
          checked={billingCycle === "annual"}
          onCheckedChange={(checked) => setBillingCycle(checked ? "annual" : "monthly")}
          className="data-[state=checked]:bg-blue-600"
        />
        <div className="flex items-center">
          <span className={`font-medium ${billingCycle === "annual" ? "text-blue-600" : "text-gray-500"}`}>Annual</span>
          {billingCycle === "annual" && (
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Save 33%
            </span>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Current Plan */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-50 p-6">
            <h3 className="text-xl font-semibold text-gray-900">Current Silver Plan</h3>
            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-900">
                ${getPrice(79.99)}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  /{billingCycle === "annual" ? "year" : "month"}
                </span>
              </p>
              {billingCycle === "annual" && (
                <p className="text-sm text-gray-500 mt-1">
                  ${getMonthlyEquivalent(79.99)}/month, billed annually
                </p>
              )}
            </div>
          </div>
          <div className="p-6 space-y-4">
            {currentPlanFeatures.map((feature) => (
              <div key={feature.name} className="flex items-start">
                <Circle className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-gray-900">{feature.name}</p>
                  <p className="text-sm text-gray-500">{feature.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Plan */}
        <div className={`border-2 ${selectedPlan === "premium" ? "border-blue-600" : "border-gray-200"} rounded-xl overflow-hidden relative`}>
          {selectedPlan === "premium" && (
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
              Selected
            </div>
          )}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
            <h3 className="text-xl font-semibold text-gray-900">New Premium Plan</h3>
            <div className="mt-4">
              <p className="text-3xl font-bold text-blue-600">
                ${getPrice(99.99)}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  /{billingCycle === "annual" ? "year" : "month"}
                </span>
              </p>
              {billingCycle === "annual" && (
                <p className="text-sm text-gray-500 mt-1">
                  ${getMonthlyEquivalent(99.99)}/month, billed annually
                </p>
              )}
            </div>
          </div>
          <div className="p-6 space-y-4">
            {newPlanFeatures.map((feature) => (
              <div key={feature.name} className="flex items-start">
                <CheckCircle className={`h-5 w-5 ${feature.highlight ? "text-blue-600" : "text-gray-400"} mr-3 mt-0.5`} />
                <div>
                  <p className={`${feature.highlight ? "font-medium text-blue-900" : "text-gray-900"}`}>
                    {feature.name}
                  </p>
                  <p className={`text-sm ${feature.highlight ? "text-blue-600" : "text-gray-500"}`}>
                    {feature.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 p-6">
            <Button
              onClick={() => setSelectedPlan("premium")}
              className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
            >
              {selectedPlan === "premium" ? "Selected" : "Select This Plan"}
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Info className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-blue-800">Migrate Now Benefits</h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="space-y-1">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                    <span className="underline">Learn more about plan changes</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p>
                      Our new plans include advanced features, better security, and improved reliability. 
                      By migrating now, you'll continue to access all your current features plus get immediate 
                      access to all new premium features without any immediate charge to your account.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={onNext}
          className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
          size="lg"
        >
          Continue to Payment Method
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default SelectPlanStep;
