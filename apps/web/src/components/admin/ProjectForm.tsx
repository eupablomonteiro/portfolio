"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { FormField, inputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { TechPicker } from "@/components/admin/TechPicker";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Tabs } from "@/components/admin/Tabs";
import { BrowserFrame, CarouselDots, PhoneFrame, ShotPlaceholder } from "@/components/ui/mockup-frames";
import { useCarousel } from "@/components/ui/use-carousel";
import type { ActionResult } from "@/app/(admin)/admin/projects/actions";
import type { Project } from "@/generated/prisma/client";

interface PreviewSnapshot {
  title: string;
  description: string;
  techs: string[];
  github: string;
  live: string;
  published: boolean;
}

function snapshotFrom(form: HTMLFormElement | null): PreviewSnapshot {
  if (!form) return { title: "", description: "", techs: [], github: "", live: "", published: false };
  const fd = new FormData(form);
  const csv = String(fd.get("techs") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return {
    title: String(fd.get("title") ?? ""),
    description: String(fd.get("description") ?? ""),
    techs: csv,
    github: String(fd.get("github") ?? ""),
    live: String(fd.get("live") ?? ""),
    published: fd.get("published") === "true" || fd.get("published") === "on",
  };
}

export function ProjectForm({
  mode,
  initial,
  suggestions = [],
  coverUrls,
  action,
  onDone,
}: {
  mode: "create" | "edit";
  initial?: Project;
  suggestions?: string[];
  coverUrls?: { desktopGallery?: string[]; mobileGallery?: string[] };
  action: (formData: FormData) => Promise<ActionResult>;
  onDone: () => void;
}) {
  const [state, formAction] = useFormState<ActionResult | null, FormData>(
    async (_prev, fd) => {
      const res = await action(fd);
      if (res.ok) onDone();
      return res;
    },
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [nativeOk, setNativeOk] = useState(mode === "edit");
  const [techs, setTechs] = useState<string[]>(initial?.techs ?? []);
  const [displayMode, setDisplayMode] = useState(initial?.displayMode ?? "both");
  const [desktopNew, setDesktopNew] = useState<string[]>([]);
  const [mobileNew, setMobileNew] = useState<string[]>([]);
  const [snapshot, setSnapshot] = useState<PreviewSnapshot | null>(null);
  const canSubmit = nativeOk && techs.length > 0;

  const desktopExisting = coverUrls?.desktopGallery ?? [];
  const mobileExisting = coverUrls?.mobileGallery ?? [];
  const desktopShots = [...desktopNew, ...desktopExisting];
  const mobileShots = [...mobileNew, ...mobileExisting];

  return (
    <form
      ref={formRef}
      action={formAction}
      onChange={() => setNativeOk(formRef.current?.checkValidity() ?? false)}
      className="grid min-w-0 gap-4"
    >
      {mode === "edit" && initial ? <input type="hidden" name="id" value={initial.id} /> : null}
      <Tabs
        onTabChange={(id) => {
          if (id === "preview") setSnapshot(snapshotFrom(formRef.current));
        }}
        tabs={[
          {
            id: "form",
            label: "Formulário",
            content: (
              <div className="grid gap-4">
                <div className="grid items-start gap-4 sm:grid-cols-2">
                  <FormField label="Título">
                    <input name="title" required minLength={3} defaultValue={initial?.title ?? ""} placeholder="Meu projeto" className={inputClass} />
                  </FormField>
                  <FormField label="Slug" aside="minúsculas, números e hífens">
                    <input
                      name="slug"
                      required
                      minLength={3}
                      pattern="[a-z0-9-]+"
                      defaultValue={initial?.slug ?? ""}
                      disabled={mode === "edit"}
                      placeholder="meu-projeto"
                      className={inputClass}
                    />
                  </FormField>
                </div>
<FormField label="Descrição">
                    <textarea name="description" required minLength={10} rows={5} defaultValue={initial?.description ?? ""} placeholder="O que o projeto resolve..." className={inputClass} />
                  </FormField>
                <div className="grid items-start gap-4 sm:grid-cols-2">
                  <FormField label="GitHub" hint="URL completa">
                    <input name="github" type="url" required defaultValue={initial?.github ?? ""} placeholder="https://github.com/..." className={inputClass} />
                  </FormField>
                  <FormField label="Demo (opcional)" hint="URL completa ou vazio">
                    <input name="live" type="url" defaultValue={initial?.live ?? ""} placeholder="https://..." className={inputClass} />
                  </FormField>
                </div>
                <FormField label="Techs" hint="Clique para adicionar, × para remover">
                  <TechPicker name="techs" defaultValue={initial?.techs ?? []} suggestions={suggestions} onChange={setTechs} />
                </FormField>
                <div className="grid items-start gap-4 sm:grid-cols-2">
                  <ImageUpload
                    label="Capas desktop"
                    name="coverDesktop"
                    hint="16:10, até 4MB cada — 1ª é a principal, resto vira carrossel (opcional)"
                    multiple
                    initialUrls={coverUrls?.desktopGallery}
                    onPreviews={setDesktopNew}
                  />
                  <ImageUpload
                    label="Capas mobile"
                    name="coverMobile"
                    hint="9:19, até 4MB cada — 1ª é a principal, resto vira carrossel (opcional)"
                    multiple
                    initialUrls={coverUrls?.mobileGallery}
                    onPreviews={setMobileNew}
                  />
                </div>
                <FormField label="Exibição" hint="Quais mockups aparecem no site">
                  <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Modo de exibição">
                    {[
                      { value: "both", label: "Web + App" },
                      { value: "web", label: "Somente web" },
                      { value: "mobile", label: "Somente mobile" },
                    ].map((o) => (
                      <label
                        key={o.value}
                        className={
                          displayMode === o.value
                            ? "cursor-pointer rounded-full bg-portfolio-text px-3 py-1.5 text-xs font-semibold text-white"
                            : "cursor-pointer rounded-full bg-portfolio-bg px-3 py-1.5 text-xs font-medium text-portfolio-text-secondary ring-1 ring-portfolio-border hover:text-portfolio-text"
                        }
                      >
                        <input
                          type="radio"
                          name="displayMode"
                          value={o.value}
                          checked={displayMode === o.value}
                          onChange={() => setDisplayMode(o.value)}
                          className="sr-only"
                        />
                        {o.label}
                      </label>
                    ))}
                  </div>
                </FormField>
                <div className="grid items-start gap-4 sm:grid-cols-2">
                  <FormField label="Ordem">
                    <input name="order" type="number" min={0} step={1} defaultValue={initial?.order ?? 0} className={inputClass} />
                  </FormField>
                  <FormField label="Visibilidade">
                    <label className="flex h-10 cursor-pointer items-center gap-2 text-sm text-portfolio-text">
                      <input
                        type="checkbox"
                        name="published"
                        value="true"
                        defaultChecked={initial?.published ?? false}
                        className="h-4 w-4 accent-portfolio-primary"
                      />
                      Publicado
                    </label>
                  </FormField>
                </div>
              </div>
            ),
          },
          {
            id: "preview",
            label: "Preview",
            content: <ProjectPreview snapshot={snapshot} desktopShots={desktopShots} mobileShots={mobileShots} displayMode={displayMode} />,
          },
        ]}
      />
      {state && !state.ok ? (
        <p role="alert" className="text-sm font-medium text-red-600">
          {state.error}
        </p>
      ) : null}
      {!canSubmit ? (
        <p className="font-mono text-xs text-portfolio-text-secondary">Preencha todos os campos e selecione ao menos 1 tech para liberar o envio.</p>
      ) : null}
      <div className="flex justify-end">
        <SubmitButton
          label={mode === "create" ? "Criar projeto" : "Salvar alterações"}
          icon="lucide:check"
          disabled={!canSubmit}
        />
      </div>
    </form>
  );
}

function PreviewImage({
  src,
  alt,
  sizes,
  className,
  onError,
}: {
  src: string;
  alt: string;
  sizes: string;
  className: string;
  onError?: () => void;
}) {
  if (src.startsWith("blob:")) {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} onError={onError} className={className} />
      </>
    );
  }

  return <Image src={src} alt={alt} fill sizes={sizes} onError={onError} className={className} />;
}

function ProjectPreview({
  snapshot,
  desktopShots,
  mobileShots,
  displayMode,
}: {
  snapshot: PreviewSnapshot | null;
  desktopShots: string[];
  mobileShots: string[];
  displayMode: string;
}) {
  const title = snapshot?.title || "Título do projeto";
  const description = snapshot?.description || "A descrição aparecerá aqui.";
  const techs = snapshot?.techs ?? [];
  const showDesktop = displayMode !== "mobile";
  const showMobile = displayMode !== "web";
  const shots = desktopShots;
  const { index: shotIndex } = useCarousel(shots.length, 3000);
  const phoneShots = mobileShots;
  const { index: phoneIndex } = useCarousel(phoneShots.length, 3500);
  const [mobileBroken, setMobileBroken] = useState(false);
  useEffect(() => setMobileBroken(false), [mobileShots]);
  return (
    <div className="overflow-hidden rounded-16 bg-portfolio-surface ring-1 ring-portfolio-border">
      <div className="flex items-center gap-1.5 border-b border-portfolio-border bg-portfolio-bg px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <span className="ml-2 font-mono text-xs text-portfolio-text-secondary">preview — {displayMode === "both" ? "web + app" : displayMode === "web" ? "web" : "mobile"}</span>
      </div>
      <div className={`grid gap-4 p-4 ${showDesktop && showMobile ? "sm:grid-cols-[1fr_200px]" : ""}`}>
        {showDesktop ? (
        <div className="min-w-0">
          <BrowserFrame
            title={title}
            dots={<CarouselDots total={shots.length} active={shotIndex} label={`${shots.length} prints, mostrando ${shotIndex + 1}`} />}
          >
            {shots.length > 0 ? (
              shots.map((src, d) => (
                <PreviewImage
                  key={`${src}_${d}`}
                  src={src}
                  alt={d === 0 ? title : `${title} — print ${d + 1}`}
                  sizes="(min-width: 1024px) 550px, 90vw"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${d === shotIndex ? "opacity-100" : "opacity-0"}`}
                />
              ))
            ) : (
              <ShotPlaceholder label="sem capa desktop" />
            )}
          </BrowserFrame>
          <p className="mt-3 font-heading text-lg font-bold text-portfolio-text">{title}</p>
          <p className="mt-1 line-clamp-2 text-sm text-portfolio-text-secondary">{description}</p>
          {techs.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {techs.map((t) => (
                <span key={t} className="rounded-full bg-portfolio-bg px-2 py-0.5 text-xs ring-1 ring-portfolio-border">
                  {t}
                </span>
              ))}
            </div>
          ) : null}
          {snapshot?.published ? (
            <span className="mt-2 inline-block rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-500/20">
              publicado
            </span>
          ) : (
            <span className="mt-2 inline-block rounded-full bg-portfolio-bg px-2 py-0.5 text-xs font-semibold text-portfolio-text-secondary ring-1 ring-portfolio-border">
              rascunho
            </span>
          )}
        </div>
        ) : null}
        {showMobile ? (
        <div className={showDesktop ? "mx-auto w-full max-w-[220px] sm:mx-0 sm:w-full" : "mx-auto w-[200px]"}>
          <PhoneFrame large hiddenOnMobile={false}>
            {phoneShots.length > 0 && !mobileBroken ? (
              phoneShots.map((src, d) => (
                <PreviewImage
                  key={`${src}_${d}`}
                  src={src}
                  alt={d === 0 ? "Prévia mobile" : `Prévia mobile — print ${d + 1}`}
                  sizes="220px"
                  onError={() => setMobileBroken(true)}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${d === phoneIndex ? "opacity-100" : "opacity-0"}`}
                />
              ))
            ) : (
              <ShotPlaceholder label={phoneShots.length > 0 ? "convertendo no envio" : "mobile"} compact />
            )}
          </PhoneFrame>
          {!showDesktop ? (
            <>
              <p className="mt-3 font-heading text-lg font-bold text-portfolio-text">{title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-portfolio-text-secondary">{description}</p>
            </>
          ) : null}
        </div>
        ) : null}
      </div>
    </div>
  );
}
