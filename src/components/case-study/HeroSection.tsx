import { CaseStudyMedia, type CaseStudyMediaProps } from "./CaseStudyMedia";
import { CASE_META_VALUE, CASE_NOTE } from "./caseStudyStyles";

type HeroSpec = {
  label: string;
  value: string;
};

type HeroSectionProps = {
  eyebrow?: string;
  title: string;
  media: CaseStudyMediaProps;
  specs: HeroSpec[];
  overview: string;
};

export function HeroSection({
  eyebrow,
  title,
  media,
  specs,
  overview,
}: HeroSectionProps) {
  return (
    <header className="flex flex-col gap-12" data-case-section="hero">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {eyebrow ? (
            <p className={`${CASE_NOTE} m-0 text-text-subtle`}>{eyebrow}</p>
          ) : null}
          <h1 className="m-0 w-full text-balance font-serif text-[36px] leading-[1.2] font-normal tracking-[-1.44px] text-[#4a4a4a]">
            {title}
          </h1>
        </div>
        <CaseStudyMedia {...media} />
      </div>

      <div className="grid gap-8 min-[864px]:grid-cols-[252px_500px] min-[864px]:gap-12">
        <div className="flex flex-col gap-6">
          {specs.map((spec) => (
            <div key={spec.label} className="flex flex-col gap-2">
              <p className={`${CASE_NOTE} m-0 text-text-subtle`}>{spec.label}</p>
              <p className={`${CASE_META_VALUE} m-0 text-text-default`}>
                {spec.value}
              </p>
            </div>
          ))}
        </div>
        <div className="flex w-full max-w-[600px] flex-col gap-2 min-[864px]:w-[500px]">
          <p className={`${CASE_NOTE} m-0 text-text-subtle`}>Overview</p>
          <p className="m-0 font-[family-name:var(--font-case-heading)] text-lg leading-[normal] font-semibold text-pretty text-[#2e2e2e]">
            {overview}
          </p>
        </div>
      </div>
    </header>
  );
}
