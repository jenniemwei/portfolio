"use client";

import Image from "next/image";
import { useId, type CSSProperties, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

import styles from "./PlantDoodle.module.css";

type DoodleSet =
  | "flower"
  | "wheat"
  | "grass"
  | "patch"
  | "smallGrass"
  | "xs"
  | "lines";

type DoodleSpec = {
  aspectRatio: `${number} / ${number}`;
  frames: readonly string[];
  height: number;
  swayDegrees: number;
  width: number;
};

const DOODLE_SPECS: Record<DoodleSet, DoodleSpec> = {
  flower: {
    aspectRatio: "1 / 1",
    frames: ["flower1.svg", "flower2.svg", "flower3.svg"],
    height: 72,
    swayDegrees: 1.5,
    width: 72,
  },
  wheat: {
    aspectRatio: "31 / 21",
    frames: ["wheat1.svg", "wheat2.svg", "wheat3.svg"],
    height: 105,
    swayDegrees: 1.25,
    width: 155,
  },
  grass: {
    aspectRatio: "8 / 3",
    frames: ["grass1.svg", "grass2.svg", "grass3.svg"],
    height: 36,
    swayDegrees: 0.5,
    width: 96,
  },
  patch: {
    aspectRatio: "10 / 3",
    frames: ["patch1.svg", "patch2.svg"],
    height: 36,
    swayDegrees: 0.35,
    width: 120,
  },
  smallGrass: {
    aspectRatio: "43 / 23",
    frames: ["s1.svg", "s2.svg", "s3.svg", "s4.svg", "s5.svg"],
    height: 23,
    swayDegrees: 1,
    width: 43,
  },
  xs: {
    aspectRatio: "16 / 17",
    frames: ["1.svg", "2.svg", "3.svg", "4.svg", "5.svg", "6.svg", "7.svg"],
    height: 17,
    swayDegrees: 1.5,
    width: 16,
  },
  lines: {
    aspectRatio: "1 / 1",
    frames: ["0.svg", "1.svg", "2.svg", "3.svg", "4.svg"],
    height: 18,
    swayDegrees: 0,
    width: 18,
  },
};

const DOODLE_FOLDERS: Record<DoodleSet, string> = {
  flower: "flower",
  grass: "grass",
  lines: "lines",
  patch: "patch",
  smallGrass: "small-grass",
  wheat: "wheat",
  xs: "xs",
};

type DoodleCSSProperties = CSSProperties & {
  "--doodle-aspect-ratio": string;
  "--doodle-frame-duration": string;
  "--doodle-sway-delay": string;
  "--doodle-sway-duration": string;
  "--doodle-sway-end": string;
  "--doodle-sway-start": string;
  "--doodle-width": string;
};

export type PlantDoodleProps = Omit<
  ComponentPropsWithoutRef<"span">,
  "aria-hidden" | "children"
> & {
  /** Milliseconds each hand-drawn frame remains visible. */
  frameInterval?: number;
  /** Negative delays make scattered instances begin at different sway phases. */
  swayDelay?: number;
  /** Full sway duration in milliseconds. */
  swayDuration?: number;
};

type PlantDoodleBaseProps = PlantDoodleProps & {
  set: DoodleSet;
};

function hashString(value: string): number {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
}

function makeXsSequence(frames: readonly string[], seed: number): string[] {
  const rangeLength = 2 + (seed % 3);
  const start = Math.floor(seed / 3) % (frames.length - rangeLength + 1);
  const ascending = frames.slice(start, start + rangeLength);

  return [...ascending, ...ascending.slice(0, -1).reverse()];
}

function PlantDoodleBase({
  set,
  className,
  frameInterval = 180,
  style,
  swayDelay = 0,
  swayDuration = 5600,
  ...props
}: PlantDoodleBaseProps) {
  const instanceId = useId();
  const spec = DOODLE_SPECS[set];
  const selectedFrames =
    set === "xs" ? makeXsSequence(spec.frames, hashString(instanceId)) : spec.frames;
  const frames = selectedFrames.map(
    (filename) => `/thumbnails/plants/${DOODLE_FOLDERS[set]}/${filename}`,
  );
  const frameClassName =
    frames.length === 7
      ? styles.frameSeven
      : frames.length === 5
      ? styles.frameFive
      : set === "xs"
        ? styles.frameSequenceThree
      : frames.length === 3
        ? styles.frameThree
        : styles.frameTwo;
  const sequenceLength = set !== "xs" && frames.length === 3 ? 4 : frames.length;
  const customProperties: DoodleCSSProperties = {
    "--doodle-aspect-ratio": spec.aspectRatio,
    "--doodle-frame-duration": `${frameInterval * sequenceLength}ms`,
    "--doodle-sway-delay": `${swayDelay}ms`,
    "--doodle-sway-duration": `${swayDuration}ms`,
    "--doodle-sway-end": `${spec.swayDegrees}deg`,
    "--doodle-sway-start": `${-spec.swayDegrees}deg`,
    "--doodle-width": `${spec.width}px`,
    ...style,
  };

  return (
    <span
      className={cn(styles.root, className)}
      style={customProperties}
      aria-hidden="true"
      {...props}
    >
      <span className={styles.sway}>
        {frames.map((src, index) => (
          <Image
            key={`${src}-${index}`}
            src={src}
            alt=""
            fill
            sizes={`${spec.width}px`}
            className={cn(styles.frame, frameClassName)}
            draggable={false}
            priority={false}
          />
        ))}
      </span>
    </span>
  );
}

export function FlowerDoodle(props: PlantDoodleProps) {
  return <PlantDoodleBase set="flower" {...props} />;
}

export function WheatDoodle(props: PlantDoodleProps) {
  return <PlantDoodleBase set="wheat" {...props} />;
}

export function GrassDoodle(props: PlantDoodleProps) {
  return <PlantDoodleBase set="grass" {...props} />;
}

export function PatchDoodle(props: PlantDoodleProps) {
  return <PlantDoodleBase set="patch" {...props} />;
}

export function SmallGrassDoodle(props: PlantDoodleProps) {
  return <PlantDoodleBase set="smallGrass" {...props} />;
}

export function ExtraSmallPlantDoodle(props: PlantDoodleProps) {
  return <PlantDoodleBase set="xs" {...props} />;
}

export function LineDoodle(props: PlantDoodleProps) {
  return <PlantDoodleBase set="lines" {...props} />;
}
