
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-violet-600 data-[state=unchecked]:bg-gradient-to-r data-[state=unchecked]:from-gray-300 data-[state=unchecked]:to-gray-200",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none relative block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        "after:absolute after:top-[50%] after:left-[50%] after:h-full after:w-full after:translate-x-[-50%] after:translate-y-[-50%] after:rounded-full after:bg-white after:shadow-sm after:content-['']",
        "before:absolute before:top-[50%] before:left-[50%] before:h-[90%] before:w-[90%] before:translate-x-[-50%] before:translate-y-[-50%] before:rounded-full before:bg-gradient-to-br before:from-white before:to-gray-100 before:content-[''] before:z-10",
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
