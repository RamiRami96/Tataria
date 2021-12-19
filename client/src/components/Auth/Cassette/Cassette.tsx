import React from "react";
import neonCircle from "../images/neonCircle.png";
import clsx from "clsx";

import * as styles from "./cassette.module.scss";

export const Cassette = () => {
  return (
    <>
      <img className={styles.circle} src={neonCircle} alt="circle" />
      <div className={styles.cassette}>
        <div className={styles.head}></div>
        <div className={styles.label}>
          <div className={styles.cutout}>
            <div className={styles.reel_hole}>
              <div className={styles.gear}></div>
            </div>
            <div className={styles.reel_hole}>
              <div className={styles.gear}></div>
            </div>
            <div className={styles.window}>
              <div className={styles.spool}></div>
              <div className={styles.spool}></div>
            </div>
          </div>
        </div>
        <div className={styles.accents}>
          <div className={clsx(styles.screw, "i1")}></div>
          <div className={clsx(styles.screw, "i2")}></div>
          <div className={clsx(styles.screw, "i3")}></div>
          <div className={clsx(styles.screw, "i4")}></div>
          <div className={clsx(styles.screw, "i5")}></div>
          <div className={clsx(styles.hole, "i1")}></div>
          <div className={clsx(styles.hole, "i2")}></div>
          <div className={clsx(styles.hole, "i3")}></div>
          <div className={clsx(styles.hole, "i4")}></div>
        </div>
      </div>
    </>
  );
};
