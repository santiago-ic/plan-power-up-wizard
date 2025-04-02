
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Info } from "lucide-react";

interface ConfirmationStepProps {
  selectedPlan: string;
  billingCycle: string;
  onBack: () => void;
  onComplete: () => void;
}

const ConfirmationStep = ({
  selectedPlan,
  billingCycle,
  onBack,
  onComplete,
}: ConfirmationStepProps) => {
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

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">Review and Confirm</h2>
        <p className="text-gray-600 text-sm">
          Please review your plan migration details before confirming.
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
        <h3 className="text-base font-semibold mb-3">Migration Summary</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-start pb-2 border-b border-blue-100">
            <div>
              <p className="font-medium text-blue-900">New Plan</p>
              <p className="text-xs text-blue-700">Premium Plan</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-blue-900">
                ${getPrice(99.99)} 
                <span className="text-xs font-normal ml-1">
                  /{billingCycle === "annual" ? "year" : "month"}
                </span>
              </p>
              {billingCycle === "annual" && (
                <p className="text-xs text-blue-700">
                  ${getMonthlyEquivalent(99.99)}/month, billed annually
                </p>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-start pb-2 border-b border-blue-100">
            <div>
              <p className="font-medium text-blue-900">Billing Method</p>
              <p className="text-xs text-blue-700">Credit Card (•••• 4242)</p>
            </div>
            <div className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
              <Check className="h-3 w-3 inline-block mr-1" />
              Verified
            </div>
          </div>
          
          <div className="flex justify-between items-start pb-2 border-b border-blue-100">
            <div>
              <p className="font-medium text-blue-900">Current Plan</p>
              <p className="text-xs text-blue-700">Silver Plan</p>
            </div>
            <div className="text-right">
              <p className="text-blue-900 text-xs">Will be replaced</p>
            </div>
          </div>
          
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-blue-900">Next Billing Date</p>
              <p className="text-xs text-blue-700">March 29, 2025</p>
            </div>
            <div className="text-right">
              <p className="text-blue-900 text-xs">361 days remaining</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <div className="flex items-start">
          <Info className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-blue-800">Important Information</h3>
            <ul className="mt-1 space-y-1 text-xs text-blue-700">
              <li>• Your current plan will be replaced with the new Premium plan.</li>
              <li>• You won't be charged until your next billing date.</li>
              <li>• New plan benefits will be available immediately after migration.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white border border-gray-200 p-4">
        <h3 className="text-sm font-semibold mb-2">New Plan Benefits</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <Check className="h-3 w-3 text-green-500" />
            </div>
            <div className="ml-2">
              <p className="text-gray-900 font-medium">Unlimited Properties</p>
              <p className="text-xs text-gray-500">List as many as you need</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <Check className="h-3 w-3 text-green-500" />
            </div>
            <div className="ml-2">
              <p className="text-gray-900 font-medium">Unlimited Contacts</p>
              <p className="text-xs text-gray-500">Manage all clients</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <Check className="h-3 w-3 text-green-500" />
            </div>
            <div className="ml-2">
              <p className="text-gray-900 font-medium">Advanced Analytics</p>
              <p className="text-xs text-gray-500">Get deeper insights</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <Check className="h-3 w-3 text-green-500" />
            </div>
            <div className="ml-2">
              <p className="text-gray-900 font-medium">Priority Support</p>
              <p className="text-xs text-gray-500">24/7 dedicated service</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-2 mt-auto">
        <Button 
          onClick={onBack}
          variant="outline"
          size="default"
          className="border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        
        <Button 
          onClick={onComplete}
          variant="gradient"
          size="default"
          className="font-medium shadow-md"
        >
          Confirm Migration
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
