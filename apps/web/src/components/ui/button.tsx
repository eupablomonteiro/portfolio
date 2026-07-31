import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[--radius-lg] text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-primary focus-visible:ring-offset-2 cursor-pointer disabled:pointer-events-none disabled:opacity-50 active:scale-[0.96] select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-portfolio-primary text-portfolio-card shadow-sm hover:bg-portfolio-primary-hover hover:shadow-md hover:-translate-y-0.5",
        secondary:
          "bg-portfolio-accent text-white shadow-sm hover:bg-portfolio-accent/90 hover:shadow-md hover:-translate-y-0.5",
        outline:
          "border-[3px] border-portfolio-primary bg-transparent text-portfolio-primary hover:bg-portfolio-primary hover:text-portfolio-card hover:-translate-y-0.5",
        ghost:
          "bg-portfolio-primary/8 text-portfolio-primary hover:bg-portfolio-primary/20 hover:-translate-y-0.5",
        subtle:
          "bg-portfolio-bg-alt text-portfolio-text border border-portfolio-border hover:bg-portfolio-primary/10 hover:border-portfolio-primary/30 hover:text-portfolio-primary hover:-translate-y-0.5",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
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