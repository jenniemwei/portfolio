import type { Metadata } from "next";

import { WorkPlaceholder } from "@/components/work/WorkPlaceholder";

export const metadata: Metadata = {
  title: "G2 AI — Jennie Wei",
  description: "Case study: G2 AI — Fall 2025.",
};

export default function G2AiProjectPage() {
  return <WorkPlaceholder title="G2 AI" period="Fall 2025" />;
}
