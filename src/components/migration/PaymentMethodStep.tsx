
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
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Add Payment Method</h2>
        <p className="text-gray-600">
          We're upgrading to credit card payments for enhanced security and convenience.
          Don't worry, you won't be charged until your next billing cycle.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Payment Information</h3>
            {paymentMethodAdded && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <Check className="h-4 w-4 mr-1" />
                Added
              </span>
            )}
          </div>
        </div>
        <div className="p-6">
          {paymentMethodAdded ? (
            <div className="flex items-center justify-between border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-blue-600 mr-4" />
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-500">Expires 12/2025</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setPaymentMethodAdded(false)}
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                Change
              </Button>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No payment method</h3>
              <p className="mt-1 text-sm text-gray-500">
                Please add a credit card to continue with the plan migration.
              </p>
              <div className="mt-6">
                <Button
                  onClick={handleAddPaymentMethod}
                  className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                >
                  Add Credit Card
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">Credit Card Benefits</h3>
              <ul className="mt-2 text-sm text-gray-500 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Automatic, hassle-free payments
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Higher security standards
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  No manual wire transfers
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Easy invoice management
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <HelpCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">Important Information</h3>
              <ul className="mt-2 text-sm text-gray-500 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  You won't be charged until your next billing cycle
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  All payment details are securely processed
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  We use industry-standard encryption
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <button className="text-blue-600 underline hover:text-blue-800 text-left">
                        See our recurring billing policy
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Recurring Billing Policy</DialogTitle>
                        <DialogDescription>
                          Important information about how billing works with your plan.
                        </DialogDescription>
                      </DialogHeader>
                      <Tabs defaultValue="policy" className="mt-4">
                        <TabsList className="grid grid-cols-2">
                          <TabsTrigger value="policy">Policy</TabsTrigger>
                          <TabsTrigger value="faq">FAQ</TabsTrigger>
                        </TabsList>
                        <TabsContent value="policy" className="p-4">
                          <div className="space-y-4 text-sm">
                            <p>Our recurring billing system works as follows:</p>
                            <ol className="list-decimal pl-5 space-y-2">
                              <li>Your credit card will be automatically charged on your billing date.</li>
                              <li>You'll receive email notifications before each charge.</li>
                              <li>You can update your payment method at any time from your account settings.</li>
                              <li>Cancellations must be made at least 7 days before your billing date.</li>
                            </ol>
                          </div>
                        </TabsContent>
                        <TabsContent value="faq" className="p-4">
                          <div className="space-y-4 text-sm">
                            <div>
                              <h4 className="font-medium">When will I be charged?</h4>
                              <p className="text-gray-500">You'll be charged on your next billing cycle date.</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Can I cancel my subscription?</h4>
                              <p className="text-gray-500">Yes, you can cancel anytime from your account settings.</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Is my payment information secure?</h4>
                              <p className="text-gray-500">Yes, we use industry-standard encryption and never store your full card details.</p>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                      <DialogFooter className="sm:justify-start">
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => setIsDialogOpen(false)}
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
            <div className="text-center py-8">
              <div className="animate-pulse flex flex-col items-center justify-center">
                <div className="rounded-md bg-gray-300 h-10 w-full mb-4"></div>
                <div className="rounded-md bg-gray-300 h-10 w-full mb-4"></div>
                <div className="rounded-md bg-gray-300 h-10 w-2/3"></div>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                This is a simulation of the payment gateway iframe.
              </p>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              onClick={handlePaymentAdded}
              className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
            >
              Simulate Card Addition
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex justify-between">
        <Button 
          onClick={onBack}
          variant="outline"
          size="lg"
          className="border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Plan Selection
        </Button>
        
        <Button 
          onClick={onNext}
          className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
          size="lg"
          disabled={!paymentMethodAdded}
        >
          Continue to Confirmation
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethodStep;
