
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { ArrowRight, Check, Info } from "lucide-react";

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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Select Your New Plan</h2>
        <p className="text-gray-600">
          We're updating our plan structure to better serve you. Please select your new plan below.
        </p>
      </div>

      <div className="flex justify-center items-center gap-3 my-6">
        <span className={`text-sm font-medium ${billingCycle === "monthly" ? "text-blue-600" : "text-gray-500"}`}>
          Monthly
        </span>
        <Toggle
          pressed={billingCycle === "annual"}
          onPressedChange={toggleBillingCycle}
          className="data-[state=on]:bg-blue-600"
        >
          <div className="relative w-12 h-6 bg-gray-200 rounded-full">
            <div
              className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition-all duration-200 ${
                billingCycle === "annual" ? "left-6" : "left-0.5"
              }`}
            />
          </div>
        </Toggle>
        <span className={`text-sm font-medium ${billingCycle === "annual" ? "text-blue-600" : "text-gray-500"}`}>
          Annual
          <span className="ml-1 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
            Save 33%
          </span>
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Current Plan */}
        <div className="border rounded-xl p-6 bg-gray-50">
          <div className="mb-4">
            <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium">
              Current Plan
            </span>
            <h3 className="text-xl font-bold mt-2">Silver Plan</h3>
            <p className="text-gray-500 mt-1">Your existing membership</p>
          </div>
          
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-gray-500 text-sm">Current Price</p>
              <p className="text-2xl font-bold">$49.99<span className="text-sm font-normal">/month</span></p>
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-4 w-4 text-gray-400" />
              </div>
              <div className="ml-3">
                <p className="text-gray-900">Basic Analytics</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-4 w-4 text-gray-400" />
              </div>
              <div className="ml-3">
                <p className="text-gray-900">Up to 50 Properties</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-4 w-4 text-gray-400" />
              </div>
              <div className="ml-3">
                <p className="text-gray-900">Email Support</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* New Premium Plan */}
        <div className="border-2 border-blue-500 rounded-xl p-6 relative bg-gradient-to-b from-white to-blue-50">
          <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg rounded-tr-xl text-xs font-semibold">
            RECOMMENDED
          </div>
          
          <div className="mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              New Plan
            </span>
            <h3 className="text-xl font-bold mt-2 text-blue-800">Premium Plan</h3>
            <p className="text-blue-600 mt-1">Enhanced membership with more features</p>
          </div>
          
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-blue-600 text-sm">New Price</p>
              <p className="text-2xl font-bold">
                ${getMonthlyPrice(99.99)}
                <span className="text-sm font-normal">
                  /{billingCycle === "annual" ? "mo" : "month"}
                </span>
              </p>
              {billingCycle === "annual" && (
                <p className="text-green-600 text-sm">Billed annually (${(99.99 * 12 * 0.67).toFixed(2)})</p>
              )}
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-4 w-4 text-blue-500" />
              </div>
              <div className="ml-3">
                <p className="text-gray-900">Advanced Analytics</p>
                <p className="text-xs text-blue-600">Enhanced from Basic</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-4 w-4 text-blue-500" />
              </div>
              <div className="ml-3">
                <p className="text-gray-900">Unlimited Properties</p>
                <p className="text-xs text-blue-600">Upgraded from 50</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-4 w-4 text-blue-500" />
              </div>
              <div className="ml-3">
                <p className="text-gray-900">24/7 Priority Support</p>
                <p className="text-xs text-blue-600">New feature</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-4 w-4 text-blue-500" />
              </div>
              <div className="ml-3">
                <p className="text-gray-900">Custom Branding</p>
                <p className="text-xs text-blue-600">New feature</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="h-4 w-4 text-blue-500" />
              </div>
              <div className="ml-3">
                <p className="text-gray-900">AI Lead Generation</p>
                <p className="text-xs text-blue-600">New feature</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-6 w-6 text-blue-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-blue-800">Migrate Now, Pay Later</h3>
            <p className="text-blue-600 mt-1">
              By migrating today, you'll immediately gain access to all Premium features, but you won't be charged until your next billing date. That's up to 30 days of premium features at no additional cost!
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={onNext}
          className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white px-6 py-6 text-lg"
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
