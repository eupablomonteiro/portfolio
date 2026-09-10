"use client";

import { useFormStatus } from "react-dom";
import { Icon } from "@iconify/react";
import { buttonVariants } from "@/components/ui";

export function SubmitButton({
  label,
  icon,
}: {
  label: string;
  icon?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={buttonVariants({ variant: "tertiary", size: "sm" })}
    >
      {icon ? <Icon icon={icon} width={18} height={18} /> : null}
      {pending ? "Enviando" : label}
    </button>
  );
}
