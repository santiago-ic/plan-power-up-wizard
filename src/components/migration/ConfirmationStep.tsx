
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
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Review and Confirm</h2>
        <p className="text-gray-600">
          Please review your plan migration details before confirming.
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Migration Summary</h3>
        
        <div className="space-y-5">
          <div className="flex justify-between items-start pb-4 border-b border-blue-100">
            <div>
              <p className="font-medium text-blue-900">New Plan</p>
              <p className="text-sm text-blue-700">Premium Plan</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-blue-900">
                ${getPrice(99.99)} 
                <span className="text-sm font-normal ml-1">
                  /{billingCycle === "annual" ? "year" : "month"}
                </span>
              </p>
              {billingCycle === "annual" && (
                <p className="text-sm text-blue-700">
                  ${getMonthlyEquivalent(99.99)}/month, billed annually
                </p>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-start pb-4 border-b border-blue-100">
            <div>
              <p className="font-medium text-blue-900">Billing Method</p>
              <p className="text-sm text-blue-700">Credit Card (•••• 4242)</p>
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              <Check className="h-4 w-4 inline-block mr-1" />
              Verified
            </div>
          </div>
          
          <div className="flex justify-between items-start pb-4 border-b border-blue-100">
            <div>
              <p className="font-medium text-blue-900">Current Plan</p>
              <p className="text-sm text-blue-700">Silver Plan</p>
            </div>
            <div className="text-right">
              <p className="text-blue-900">Will be replaced</p>
            </div>
          </div>
          
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-blue-900">Next Billing Date</p>
              <p className="text-sm text-blue-700">March 29, 2025</p>
            </div>
            <div className="text-right">
              <p className="text-blue-900">361 days remaining</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <div className="flex items-start">
          <Info className="h-6 w-6 text-blue-500 mr-3 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-blue-800">Important Information</h3>
            <ul className="mt-2 space-y-2 text-blue-700">
              <li>• By confirming, you agree to migrate to our new Premium plan.</li>
              <li>• Your current plan will be replaced with the new Premium plan.</li>
              <li>• You won't be charged until your next billing date (March 29, 2025).</li>
              <li>• Your new plan benefits will be available immediately after migration.</li>
              <li>• Future payments will be processed automatically using your credit card.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">New Plan Benefits</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-gray-900 font-medium">Unlimited Properties</p>
              <p className="text-sm text-gray-500">List as many properties as you need</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-gray-900 font-medium">Unlimited Contacts</p>
              <p className="text-sm text-gray-500">Manage all your client relationships</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-gray-900 font-medium">Advanced Analytics</p>
              <p className="text-sm text-gray-500">Get deeper insights into your business</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-gray-900 font-medium">Priority Support</p>
              <p className="text-sm text-gray-500">24/7 dedicated customer service</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button 
          onClick={onBack}
          variant="outline"
          size="lg"
          className="border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Payment Method
        </Button>
        
        <Button 
          onClick={onComplete}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-6 text-lg shadow-lg"
          size="lg"
        >
          Confirm Migration
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
