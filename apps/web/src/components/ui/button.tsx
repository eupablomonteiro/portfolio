import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-12 font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-primary focus-visible:ring-offset-2 cursor-pointer disabled:pointer-events-none disabled:opacity-50 select-none active:translate-y-1 active:shadow-none",
  {
    variants: {
      variant: {
        primary:
          "bg-portfolio-primary text-white shadow-solid hover:-translate-y-0.5 hover:bg-portfolio-primary-hover hover:shadow-solid-sm",
        secondary:
          "bg-portfolio-surface text-portfolio-primary border-[1.5px] border-portfolio-primary shadow-solid hover:-translate-y-0.5 hover:bg-portfolio-primary hover:text-white hover:shadow-solid-sm",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-sm",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
