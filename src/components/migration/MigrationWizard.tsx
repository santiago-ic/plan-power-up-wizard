
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  name: string;
  description: string;
}

interface MigrationWizardProps {
  steps: Step[];
  currentStep: number;
}

const MigrationWizard = ({ steps, currentStep }: MigrationWizardProps) => {
  return (
    <div className="px-4 py-5">
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li
              key={step.name}
              className={cn(
                stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "",
                "relative flex-1"
              )}
            >
              {step.id < currentStep ? (
                <div className="flex flex-col items-center">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-gradient-to-r from-blue-600 to-violet-600" />
                  </div>
                  <div
                    className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
                  >
                    <svg
                      className="h-6 w-6 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center">
                    <div className="text-sm font-medium text-gray-900">{step.name}</div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
              ) : step.id === currentStep ? (
                <div className="flex flex-col items-center">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <div
                    className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600 bg-white"
                    aria-current="step"
                  >
                    <span
                      className="h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-semibold"
                      aria-hidden="true"
                    >
                      {step.id}
                    </span>
                  </div>
                  <div className="mt-3 text-center">
                    <div className="text-sm font-medium text-blue-600">{step.name}</div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <div
                    className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white"
                  >
                    <span
                      className="h-6 w-6 flex items-center justify-center rounded-full text-gray-500 font-semibold"
                      aria-hidden="true"
                    >
                      {step.id}
                    </span>
                  </div>
                  <div className="mt-3 text-center">
                    <div className="text-sm font-medium text-gray-500">{step.name}</div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default MigrationWizard;
