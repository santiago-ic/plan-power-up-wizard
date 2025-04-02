
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const MigrationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 m-4">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-500">
            Migration Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            You have successfully migrated to the new Premium plan. Your account has been upgraded and you can start enjoying the benefits immediately.
          </p>
          
          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-medium mb-4 text-green-800">What happens next?</h2>
            <ul className="text-left space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Your new plan is active immediately</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Your first payment will be processed on your next billing date</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>You can manage your subscription anytime from your account settings</span>
              </li>
            </ul>
          </div>
          
          <Button 
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MigrationSuccess;
