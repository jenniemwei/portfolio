import type { Metadata } from "next";

import { WorkPlaceholder } from "@/components/work/WorkPlaceholder";

export const metadata: Metadata = {
  title: "InTouch — Jennie Wei",
  description: "Case study: InTouch — Spring 2025.",
};

export default function IntouchProjectPage() {
  return <WorkPlaceholder title="InTouch" period="Spring 2025" />;
}
