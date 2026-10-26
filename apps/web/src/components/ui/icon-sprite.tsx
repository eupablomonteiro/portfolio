import auth0 from "@iconify-icons/simple-icons/auth0";
import cloudflare from "@iconify-icons/simple-icons/cloudflare";
import css3 from "@iconify-icons/simple-icons/css3";
import docker from "@iconify-icons/simple-icons/docker";
import express from "@iconify-icons/simple-icons/express";
import git from "@iconify-icons/simple-icons/git";
import github from "@iconify-icons/simple-icons/github";
import html5 from "@iconify-icons/simple-icons/html5";
import javascript from "@iconify-icons/simple-icons/javascript";
import jest from "@iconify-icons/simple-icons/jest";
import jsonwebtokens from "@iconify-icons/simple-icons/jsonwebtokens";
import linkedin from "@iconify-icons/simple-icons/linkedin";
import mongodb from "@iconify-icons/simple-icons/mongodb";
import nextdotjs from "@iconify-icons/simple-icons/nextdotjs";
import nodedotjs from "@iconify-icons/simple-icons/nodedotjs";
import postgresql from "@iconify-icons/simple-icons/postgresql";
import prisma from "@iconify-icons/simple-icons/prisma";
import react from "@iconify-icons/simple-icons/react";
import redis from "@iconify-icons/simple-icons/redis";
import socketdotio from "@iconify-icons/simple-icons/socketdotio";
import swagger from "@iconify-icons/simple-icons/swagger";
import tailwindcss from "@iconify-icons/simple-icons/tailwindcss";
import trello from "@iconify-icons/simple-icons/trello";
import typescript from "@iconify-icons/simple-icons/typescript";
import vitest from "@iconify-icons/simple-icons/vitest";

interface SimpleIconData {
  body: string;
  width?: number;
  height?: number;
}

const icons: Record<string, SimpleIconData> = {
  "simple-icons:auth0": auth0,
  "simple-icons:cloudflare": cloudflare,
  "simple-icons:css3": css3,
  "simple-icons:docker": docker,
  "simple-icons:express": express,
  "simple-icons:git": git,
  "simple-icons:github": github,
  "simple-icons:html5": html5,
  "simple-icons:javascript": javascript,
  "simple-icons:jest": jest,
  "simple-icons:jsonwebtokens": jsonwebtokens,
  "simple-icons:linkedin": linkedin,
  "simple-icons:mongodb": mongodb,
  "simple-icons:nextdotjs": nextdotjs,
  "simple-icons:nodedotjs": nodedotjs,
  "simple-icons:postgresql": postgresql,
  "simple-icons:prisma": prisma,
  "simple-icons:react": react,
  "simple-icons:redis": redis,
  "simple-icons:socketdotio": socketdotio,
  "simple-icons:swagger": swagger,
  "simple-icons:tailwindcss": tailwindcss,
  "simple-icons:trello": trello,
  "simple-icons:typescript": typescript,
  "simple-icons:vitest": vitest,
};

export function IconSprite() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      {Object.entries(icons).map(([name, data]) => (
        <symbol
          key={name}
          id={`icon-${name.replace(":", "-")}`}
          viewBox={`0 0 ${data.width ?? 24} ${data.height ?? 24}`}
          dangerouslySetInnerHTML={{ __html: data.body }}
        />
      ))}
    </svg>
  );
}
