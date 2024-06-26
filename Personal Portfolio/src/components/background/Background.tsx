import { useEffect } from "react";
import "./background.css";
import { useLocation } from "react-router-dom";

interface BackgroundProps {
  backgroundDisplay: string;
  setBackgroundDisplay: React.Dispatch<React.SetStateAction<string>>;
}

const Background = ({
  backgroundDisplay,
  setBackgroundDisplay,
}: BackgroundProps) => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setBackgroundDisplay("");
    } else {
      setBackgroundDisplay("none");
    }
  }, [location]);
  useEffect(() => {
    const interBubble = document.querySelector<HTMLDivElement>(".interactive")!;
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      curX += (tgX - curX) / 5;
      curY += (tgY - curY) / 5;
      interBubble.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(move);
    }

    window.addEventListener("mousemove", (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    });

    move();

    // Clean up function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div className="gradient-bg" style={{ display: backgroundDisplay }}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="gradients-container">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>
        <div className="interactive"></div>
      </div>
    </div>
  );
};

export default Background;
