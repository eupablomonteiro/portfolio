"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

const sanitizeOptions = {
  allowedTags: [
    "p",
    "br",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "a",
    "ul",
    "ol",
    "li",
    "blockquote",
    "code",
    "pre",
    "img",
  ],
  allowedAttributes: {
    a: ["href", "title", "rel", "target"],
    img: ["src", "alt", "title", "width", "height"],
    code: ["className"],
  },
  allowedSchemes: ["https", "http", "mailto", "data"],
  protocols: {
    a: { href: ["https", "http", "mailto"] },
    img: { src: ["https", "http", "data"] },
  },
  transform: (tag: string, props: Record<string, unknown>, isExit: boolean) => {
    if (tag === "a" && !isExit) {
      props.rel = "noopener noreferrer";
      props.target = "_blank";
    }
  },
};

export function Markdown({ text }: { text: string }) {
  if (!text) return null;
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeOptions]]}
      components={{
        p: ({ node, ...props }) => <p className="mb-3 last:mb-0 text-sm leading-relaxed text-portfolio-text-secondary" {...props} />,
        ul: ({ node, ...props }) => <ul className="mb-3 list-disc pl-5 space-y-1 last:mb-0" {...props} />,
        ol: ({ node, ...props }) => <ol className="mb-3 list-decimal pl-5 space-y-1 last:mb-0" {...props} />,
        li: ({ node, ...props }) => <li className="text-sm leading-relaxed text-portfolio-text-secondary" {...props} />,
        strong: ({ node, ...props }) => <strong className="font-semibold text-portfolio-text" {...props} />,
        em: ({ node, ...props }) => <em className="italic" {...props} />,
        u: ({ node, ...props }) => <u className="underline decoration-2 underline-offset-2" {...props} />,
        a: ({ node, ...props }) => (
          <a className="text-portfolio-primary underline decoration-1 underline-offset-2 hover:text-portfolio-primary/80" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className="mb-3 border-l-2 border-portfolio-border pl-4 text-sm italic text-portfolio-text-secondary last:mb-0" {...props} />
        ),
        code: ({ node, ...props }) => (
          <code className="rounded bg-portfolio-bg px-1.5 py-0.5 font-mono text-xs text-portfolio-text-secondary" {...props} />
        ),
        pre: ({ node, ...props }) => (
          <pre className="mb-3 overflow-x-auto rounded-lg bg-portfolio-bg p-3 text-xs text-portfolio-text-secondary last:mb-0" {...props} />
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}
