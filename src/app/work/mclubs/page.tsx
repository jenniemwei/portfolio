import type { Metadata } from "next";

import { WorkPlaceholder } from "@/components/work/WorkPlaceholder";

export const metadata: Metadata = {
  title: "Mclubs — Jennie Wei",
  description: "Case study: Mclubs — Summer 2024.",
};

export default function MclubsProjectPage() {
  return <WorkPlaceholder title="Mclubs" period="Summer 2024" />;
}
