
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CreditCard, AlignLeft, HelpCircle, Check } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PaymentMethodStepProps {
  onBack: () => void;
  onNext: () => void;
  paymentMethodAdded: boolean;
  setPaymentMethodAdded: (added: boolean) => void;
}

const PaymentMethodStep = ({ 
  onBack, 
  onNext, 
  paymentMethodAdded, 
  setPaymentMethodAdded 
}: PaymentMethodStepProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddPaymentMethod = () => {
    // Open dialog to simulate payment gateway iframe
    setIsDialogOpen(true);
  };

  const handlePaymentAdded = () => {
    setPaymentMethodAdded(true);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">Add Payment Method</h2>
        <p className="text-gray-600 text-sm">
          We're upgrading to credit card payments for enhanced security and convenience.
          You won't be charged until your next billing cycle.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">Payment Information</h3>
            {paymentMethodAdded && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <Check className="h-3 w-3 mr-1" />
                Added
              </span>
            )}
          </div>
        </div>
        <div className="p-4">
          {paymentMethodAdded ? (
            <div className="flex items-center justify-between border border-gray-200 rounded p-3">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
                <div>
                  <p className="font-medium text-sm">•••• •••• •••• 4242</p>
                  <p className="text-xs text-gray-500">Expires 12/2025</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setPaymentMethodAdded(false)}
                className="text-blue-600 border-blue-200 hover:bg-blue-50 text-xs h-7 px-2"
                size="sm"
              >
                Change
              </Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <CreditCard className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No payment method</h3>
              <p className="mt-1 text-xs text-gray-500">
                Please add a credit card to continue.
              </p>
              <div className="mt-3">
                <Button
                  onClick={handleAddPaymentMethod}
                  variant="gradient"
                  size="sm"
                  className="text-sm"
                >
                  Add Credit Card
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CreditCard className="h-4 w-4 text-blue-600 mt-0.5" />
            </div>
            <div className="ml-2">
              <h3 className="text-sm font-medium text-gray-900">Credit Card Benefits</h3>
              <ul className="mt-1 text-xs text-gray-500 space-y-1">
                <li className="flex items-start">
                  <span className="text-green-500 mr-1">✓</span>
                  Automatic, hassle-free payments
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-1">✓</span>
                  Higher security standards
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-1">✓</span>
                  Easy invoice management
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <HelpCircle className="h-4 w-4 text-blue-600 mt-0.5" />
            </div>
            <div className="ml-2">
              <h3 className="text-sm font-medium text-gray-900">Important Information</h3>
              <ul className="mt-1 text-xs text-gray-500 space-y-1">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-1">•</span>
                  You won't be charged until your next billing cycle
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-1">•</span>
                  All payment details are securely processed
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-1">•</span>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <button className="text-blue-600 underline hover:text-blue-800 text-left text-xs">
                        See our billing policy
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Recurring Billing Policy</DialogTitle>
                        <DialogDescription>
                          Important information about how billing works.
                        </DialogDescription>
                      </DialogHeader>
                      <Tabs defaultValue="policy" className="mt-4">
                        <TabsList className="grid grid-cols-2">
                          <TabsTrigger value="policy">Policy</TabsTrigger>
                          <TabsTrigger value="faq">FAQ</TabsTrigger>
                        </TabsList>
                        <TabsContent value="policy" className="p-4">
                          <div className="space-y-3 text-sm">
                            <p>Our recurring billing system works as follows:</p>
                            <ol className="list-decimal pl-5 space-y-1 text-xs">
                              <li>Your card will be automatically charged on your billing date.</li>
                              <li>You'll receive email notifications before each charge.</li>
                              <li>Cancellations must be made at least 7 days before your billing date.</li>
                            </ol>
                          </div>
                        </TabsContent>
                        <TabsContent value="faq" className="p-4">
                          <div className="space-y-3 text-sm">
                            <div>
                              <h4 className="font-medium">When will I be charged?</h4>
                              <p className="text-gray-500 text-xs">You'll be charged on your next billing date.</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Can I cancel my subscription?</h4>
                              <p className="text-gray-500 text-xs">Yes, you can cancel anytime from your account.</p>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                      <DialogFooter className="sm:justify-start">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => setIsDialogOpen(false)}
                          size="sm"
                        >
                          Close
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Gateway Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>
              Add your credit card information securely.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 my-4">
            <div className="text-center py-6">
              <div className="animate-pulse flex flex-col items-center justify-center">
                <div className="rounded-md bg-gray-300 h-8 w-full mb-3"></div>
                <div className="rounded-md bg-gray-300 h-8 w-full mb-3"></div>
                <div className="rounded-md bg-gray-300 h-8 w-2/3"></div>
              </div>
              <p className="mt-3 text-xs text-gray-500">
                This is a simulation of the payment gateway iframe.
              </p>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              onClick={handlePaymentAdded}
              variant="gradient"
              size="sm"
            >
              Simulate Card Addition
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              size="sm"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
          onClick={onNext}
          variant="gradient"
          size="default"
          className="font-medium shadow-md"
          disabled={!paymentMethodAdded}
        >
          Continue to Confirmation
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethodStep;
