import {
  FlowerDoodle,
  GrassDoodle,
  PatchDoodle,
  SmallGrassDoodle,
} from "@/components/doodles";
import { cn } from "@/lib/cn";

import styles from "./HeroDoodles.module.css";

export function HeroDoodles() {
  return (
    <div className={styles.layer} aria-hidden="true">
      <FlowerDoodle
        className={cn(styles.doodle, styles.leftFlower)}
        frameInterval={820}
        swayDelay={-3200}
        swayDuration={13200}
      />

      <SmallGrassDoodle
        className={cn(styles.doodle, styles.smallUpperLeft)}
        frameInterval={720}
        swayDelay={-900}
        swayDuration={9200}
      />
      <SmallGrassDoodle
        className={cn(styles.doodle, styles.smallUpperRight)}
        frameInterval={780}
        swayDelay={-2800}
        swayDuration={10800}
      />
      <GrassDoodle
        className={cn(styles.doodle, styles.middleGrass)}
        frameInterval={620}
        swayDelay={-1400}
        swayDuration={9800}
      />

      <PatchDoodle
        className={cn(styles.doodle, styles.patchLowerCenter)}
        frameInterval={780}
        swayDelay={-2100}
        swayDuration={12400}
      />

      <FlowerDoodle
        className={cn(styles.doodle, styles.rightFlower)}
        frameInterval={660}
        swayDelay={-3900}
        swayDuration={10200}
      />
    </div>
  );
}
