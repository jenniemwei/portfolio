"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";

import { isProjectPagePasswordValid } from "@/data/project-pages";

const STORAGE_KEY = "project-pages-password-unlocked";

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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isProjectPagePasswordValid(value)) {
      setError("Incorrect password. Please try again.");
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, "true");
    setError("");
    setUnlocked(true);
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
          className="type-body w-full rounded-[var(--space-4)] border border-line bg-canvas px-[var(--space-12)] py-[var(--space-8)] text-default outline-none focus-visible:ring-2 focus-visible:ring-default"
          placeholder="Password"
          autoComplete="current-password"
        />
        <button
          type="submit"
          className="type-body-sm w-fit rounded-full border border-line px-[var(--space-16)] py-[var(--space-8)] text-default transition-opacity hover:opacity-[var(--link-hover-opacity)]"
        >
          Submit
        </button>
        {error ? <p className="type-body-sm text-subtle">{error}</p> : null}
      </form>
    </main>
  );
}
