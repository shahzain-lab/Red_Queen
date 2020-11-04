import React, { useEffect, useRef } from "react";
import "./App.css";


export const RedQueen = () => {
  let alice_Sprite = useRef(null);
  let foreground = useRef(null);
  let background = useRef(null);

  useEffect(() => {
    let spriteFrames = [
      { transform: "translateY(0)" },
      { transform: "translateY(-100%)" },
    ];

    let alice = alice_Sprite.current.animate(spriteFrames, {
      easing: "steps(7, end)",
      direction: "reverse",
      duration: 1200,
      playbackRate: 1,
      iterations: Infinity,
    });

    setInterval(function () {
      if (alice.playbackRate > 0.4) {
        alice.playbackRate -= 0.1;
        adjustSceneryPlayback();
      }
    }, 3000);

    let sceneryFrames = [
      { transform: "translateX(100%)" },
      { transform: "translateX(-100%)" },
    ];

    let sceneryTimingBackground = {
      duration: 6000,
      iterations: Infinity,
    };

    let sceneryTimingForeground = {
      duration: 2000,
      iterations: Infinity,
    };

    let foregroundMovement = foreground.current.animate(
      sceneryFrames,
      sceneryTimingForeground
    );
    let backgroundMovement = background.current.animate(
      sceneryFrames,
      sceneryTimingBackground
    );

    let sceneries = [foregroundMovement, backgroundMovement];

    let adjustSceneryPlayback = () => {



      if (alice.playbackRate < 0.8) {
        sceneries.forEach(function (anim) {
          anim.playbackRate = (alice.playbackRate / 2) * -1;
        });
      } else if (alice.playbackRate > 1.2) {
        sceneries.forEach(function (anim) {
          anim.playbackRate = alice.playbackRate / 2;
        });
      } else {
        sceneries.forEach(function (anim) {
          anim.playbackRate = 0;
        });
      }
    };
    adjustSceneryPlayback();

    const goFaster = () => {
      alice.playbackRate += 0.2;
      adjustSceneryPlayback();
    };

    window.addEventListener("click", goFaster);
  });

  return (
    <div className="main_div">
      <div className="sky"></div>
      <div className="earth">
        <div className="alice">
          <img
            className="alice_Sprite"
            ref={alice_Sprite}
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png"
            alt=" "
          />
        </div>
      </div>

      <div className="scenery" id="foreground" ref={foreground}>
        <img
          id="treefore"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png"
          alt=" "
        />
      </div>

      <div className="scenery background1" ref={background}>
        <img
          className="pawn"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png"
          alt=" "
        />
        <img
          className="pawn2"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png"
          alt=" "
        />
        <img
          className="treeback"
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png"
          alt=" "
        />
      </div>
    </div>
  );
}

export default RedQueen;
