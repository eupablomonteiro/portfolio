"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const ACCEPT = "image/png,image/jpeg,image/webp,image/gif,image/heic,image/heif,.heic,.heif";

export function ImageUpload({
  label,
  name,
  hint,
  multiple = false,
  initialUrls = [],
  onPreviews,
}: {
  label: string;
  name: string;
  hint?: string;
  multiple?: boolean;
  initialUrls?: string[];
  onPreviews?: (urls: string[]) => void;
}) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [broken, setBroken] = useState<string[]>([]);
  const transfer = useRef<DataTransfer | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sync = (next: string[]) => {
    setPreviews(next);
    setBroken((prev) => prev.filter((u) => next.includes(u)));
    onPreviews?.(next);
  };

  const handleChange = () => {
    const files = inputRef.current?.files;
    if (!files) return;
    if (!multiple) {
      const f = files[0];
      sync(f ? [URL.createObjectURL(f)] : []);
      return;
    }
    if (!transfer.current) transfer.current = new DataTransfer();
    const urls: string[] = [];
    for (const f of files) {
      transfer.current.items.add(f);
      urls.push(URL.createObjectURL(f));
    }
    if (inputRef.current) inputRef.current.files = transfer.current.files;
    setPreviews((prev) => {
      const next = [...prev, ...urls];
      onPreviews?.(next);
      return next;
    });
  };

  const removePreview = (url: string, index: number) => {
    URL.revokeObjectURL(url);
    if (multiple && transfer.current && inputRef.current) {
      const next = new DataTransfer();
      [...transfer.current.files].forEach((f, i) => {
        if (i !== index) next.items.add(f);
      });
      transfer.current = next;
      inputRef.current.files = next.files;
      setPreviews((prev) => {
        const nextUrls = prev.filter((u) => u !== url);
        setBroken((b) => b.filter((u) => nextUrls.includes(u)));
        onPreviews?.(nextUrls);
        return nextUrls;
      });
    } else {
      if (inputRef.current) inputRef.current.value = "";
      sync([]);
    }
  };

  return (
    <div className="block min-w-0">
      <span className="text-sm font-semibold text-portfolio-text">{label}</span>
      {hint ? (
        <span className="mt-0.5 block font-mono text-xs text-portfolio-text-secondary">{hint}</span>
      ) : null}
      <label className="mt-1.5 block cursor-pointer rounded-12 border border-dashed border-portfolio-border bg-portfolio-bg p-4 text-sm">
        <input
          ref={inputRef}
          type="file"
          name={name}
          multiple={multiple}
          accept={ACCEPT}
          className="hidden"
          onChange={handleChange}
        />
        {initialUrls.length > 0 ? (
          <div className="mb-2 flex flex-wrap gap-1.5" aria-label={`${label} atuais`}>
            {initialUrls.map((u, i) => (
              <Image
                key={`${u}_${i}`}
                src={u}
                alt={`${label} atual ${i + 1}`}
                width={80}
                height={56}
                sizes="80px"
                className="h-14 w-20 rounded-12 object-cover ring-1 ring-portfolio-border"
              />
            ))}
          </div>
        ) : null}
        {previews.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {previews.map((u, idx) => (
              <span key={u} className="relative inline-block">
                {broken.includes(u) ? (
                  <span className="flex h-14 w-20 items-center justify-center rounded-12 bg-portfolio-surface px-1 text-center font-mono text-[10px] ring-1 ring-portfolio-border">
                    será convertida no envio
                  </span>
                ) : (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={u}
                      alt={`Nova ${label} ${idx + 1}`}
                      onError={() => setBroken((prev) => (prev.includes(u) ? prev : [...prev, u]))}
                      className="h-14 w-20 rounded-12 object-cover ring-2 ring-portfolio-primary"
                    />
                  </>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    removePreview(u, idx);
                  }}
                  aria-label={`Remover imagem ${idx + 1}`}
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-portfolio-text text-[10px] font-bold text-white hover:bg-red-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        ) : initialUrls.length === 0 ? (
          <p className="font-mono text-xs text-portfolio-text-secondary">clique para selecionar{multiple ? " (várias)" : ""}</p>
        ) : null}
      </label>
    </div>
  );
}
