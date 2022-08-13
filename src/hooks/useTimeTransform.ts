import { RefObject, useEffect } from "react";

export interface UseTimeTransformProps {
  sHandRef: RefObject<HTMLDivElement>, 
  mHandRef: RefObject<HTMLDivElement>, 
  hHandRef: RefObject<HTMLDivElement>, 
  s: string | number | null,
  m: string | number | null,
  h: string | number | null,
}

const SECONDS = 60;
const MINUTES = 60;
const HOURS = 12;

const CLOCK_DEGREE = 360;
const START_DEGREE = 90;

export const useTimeTransform = ({ sHandRef, mHandRef, hHandRef, s, m, h }: UseTimeTransformProps) => {
  const sHand = sHandRef.current;
  const mHand = mHandRef.current;
  const hHand = hHandRef.current;
  useEffect(() => {
    let timer;
    if (sHand && s) {
      const sDegrees = ((+s / SECONDS) * CLOCK_DEGREE) + START_DEGREE;
      if (sDegrees === START_DEGREE) {
        sHand.style.transform = `translateY(-50%) rotate(${sDegrees + 360}deg)`;
        timer = setTimeout(() => {
          sHand.style.transition = 'none';
          sHand.style.transform = `rotate(${sDegrees}deg)`;
          sHand.style.transition = 'transform 0.5s ease-in-out';
        }, 1000);
      } else {
        sHand.style.transform = `translateY(-50%) rotate(${sDegrees}deg)`;
        sHand.style.transition = 'transform 0.5s ease-in-out';
      }
    }
    if (mHand && m) {
      const mDegrees = ((+m / MINUTES) * CLOCK_DEGREE) + START_DEGREE;
      mHand.style.transform = `translateY(-50%) rotate(${mDegrees}deg)`;
    }
    if (hHand && h) {
      const hDegrees = ((+h / HOURS) * CLOCK_DEGREE) + START_DEGREE;
      hHand.style.transform = `translateY(-50%) rotate(${hDegrees}deg)`;
    }

    return () => {
      clearTimeout(timer);
    };
  }, [h, hHand, m, mHand, s, sHand, sHandRef]);
};
