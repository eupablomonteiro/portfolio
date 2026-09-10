"use client";

import { useState } from "react";

export function ImageUpload({ label, name }: { label: string; name: string }) {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <label className="block rounded-12 border border-dashed border-portfolio-border bg-portfolio-bg p-4 text-sm cursor-pointer">
      {label}
      <input
        type="file"
        name={name}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) setPreview(URL.createObjectURL(f));
        }}
      />
      {preview ? (
        <img
          src={preview}
          alt="preview"
          className="mt-2 h-24 rounded-12 object-cover"
        />
      ) : (
        <p className="mt-2 font-mono text-xs text-portfolio-text-secondary">
          clique para selecionar
        </p>
      )}
    </label>
  );
}
