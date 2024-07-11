import React from "react";
import style from "./hero.module.css";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const Hero = () => {
  return (
    <div className={style.main}>
      <section className={style.section}>
        <div className={style.row}>
          <div className={style.col}>
            <p>
              Start creating your directive by <br /> choosing a core tenet
              first.
            </p>
            <p>
              Choose one from the 4 tenets below and drag it to{" "}
              <span>"My core tenet" box.</span>
            </p>
            <p>
              This could be Emotional Intelligence, Ethical Decision-Making,
              Inclusivity and Diversity, or Social Responsibility. This tenet
              will serve as the foundation of your leadership style, influencing
              how you interpret and apply the various leadership styles.
            </p>
            <div className={style.arrow}>
              <MdOutlineArrowBackIosNew className={style.icon} />
            </div>
          </div>
          <div className={style.col}>
            <p>
              Next, <span>choose 4 leadership styles</span> from the right hand
              menu that resonate with you and drag them over onto your
            </p>
            <p>"Leaderships style" boxes.</p>
            <p>
              The Full Spectrum Leadership Framework encompasses fourteen styles
              of leadership each tailored to specific circumstances and
              challenges. These styles allow leaders to adapt their approach to
              suit different situations.
            </p>
            <div className={style.arrow}>
              <MdOutlineArrowBackIosNew className={style.icon} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
