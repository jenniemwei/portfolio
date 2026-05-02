"use client";

import {
  FormEvent,
  type KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { isProjectPagePasswordValid } from "@/data/project-pages";

const STORAGE_KEY = "project-pages-password-unlocked";
const OPEN_FULL_PAGE_MESSAGE_TYPE = "project-password-unlocked";

type ProjectPasswordGateProps = {
  enabled: boolean;
  children: ReactNode;
};

export function ProjectPasswordGate({
  enabled,
  children,
}: ProjectPasswordGateProps) {
  const [ready, setReady] = useState(!enabled);
  const [unlocked, setUnlocked] = useState(!enabled);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!enabled) return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const ok = saved === "true";
    setUnlocked(ok);
    setReady(true);
  }, [enabled]);

  if (!enabled) return <>{children}</>;
  if (!ready) return null;
  if (unlocked) return <>{children}</>;

  const tryUnlock = useCallback(() => {
    if (!isProjectPagePasswordValid(value)) {
      setError("Incorrect password. Please try again.");
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, "true");
    setError("");
    setUnlocked(true);

    const inEmbedPreview =
      typeof window !== "undefined" &&
      (window.location.search.includes("embed=1") || window.parent !== window);
    if (inEmbedPreview) {
      window.parent.postMessage(
        {
          type: OPEN_FULL_PAGE_MESSAGE_TYPE,
          href: window.location.pathname,
        },
        window.location.origin,
      );
    }
  }, [value]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    tryUnlock();
  };

  const onPasswordKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    tryUnlock();
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[var(--content-max)] flex-col items-center justify-center px-[var(--page-gutter)] py-[var(--space-64)]">
      <form
        onSubmit={onSubmit}
        className="flex w-full max-w-md flex-col gap-[var(--space-m)] rounded-[var(--space-8)] border border-line bg-canvas p-[var(--space-lg)]"
      >
        <h1 className="type-page-heading text-default">Password Required</h1>
        <p className="type-body text-subtle">
          Enter the password to view this project page.
        </p>
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onPasswordKeyDown}
          className="type-body w-full rounded-[var(--space-4)] border border-line bg-canvas px-[var(--space-12)] py-[var(--space-8)] text-default outline-none focus-visible:ring-2 focus-visible:ring-default"
          placeholder="Password"
          autoComplete="current-password"
        />
        <button
          type="button"
          onClick={tryUnlock}
          className="type-body-sm w-fit rounded-full border border-line px-[var(--space-16)] py-[var(--space-8)] text-default transition-opacity hover:opacity-[var(--link-hover-opacity)]"
        >
          Submit
        </button>
        {error ? <p className="type-body-sm text-subtle">{error}</p> : null}
      </form>
    </main>
  );
}
