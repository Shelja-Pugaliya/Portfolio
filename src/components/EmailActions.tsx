"use client";

import { useState } from "react";
import { profile } from "@/content/profile";

export default function EmailActions() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <span className="inline-flex items-stretch overflow-hidden rounded-full">
      <a
        href={profile.emailHref}
        className="bg-saffron px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-saffron-soft"
      >
        {profile.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className="border-l border-ink/20 bg-saffron px-3 text-sm font-medium text-ink transition hover:bg-saffron-soft"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </span>
  );
}
