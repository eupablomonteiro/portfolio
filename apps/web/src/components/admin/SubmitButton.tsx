"use client";

import { useFormStatus } from "react-dom";
import { Icon } from "@/components/ui/icon";
import { buttonVariants } from "@/components/ui";
import type { VariantProps } from "class-variance-authority";

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;

export function SubmitButton({
  label,
  icon,
  variant = "primary",
  disabled = false,
}: {
  label: string;
  icon?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();
  const inactive = pending || disabled;

  return (
    <button
      type="submit"
      disabled={inactive}
      aria-disabled={inactive}
      className={buttonVariants({ variant, size: "sm" })}
    >
      {icon ? <Icon icon={icon} width={18} height={18} /> : null}
      {pending ? "Enviando" : label}
    </button>
  );
}
