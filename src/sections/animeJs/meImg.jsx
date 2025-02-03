import React, { useEffect, useRef } from "react";
import "./ImageGrid.css";
import { gsap } from "gsap";
import me from '../../img/pp.png'

const ImageGrid = () => {
  const placeholderRef = useRef(null);

  useEffect(() => {
    const options = {
      imgSrc: me,
      rows: 5,
      columns: 5,
      margin: 2.5,
      animTime: 0.3,
    };

    const { imgSrc, rows, columns, margin, animTime } = options;

    const placeholder = placeholderRef.current;
    const container = document.createElement("div");
    container.className = "gridContainer";
    placeholder.appendChild(container);

    const w = (container.offsetWidth / columns) - margin;
    const h = (container.offsetHeight / rows) - margin;

    for (let i = 0, l = rows * columns; i < l; i++) {
      const gridTile = document.createElement("div");
      gridTile.className = "gridTile";
      gridTile.style.backgroundImage = `url(${imgSrc})`;

      const arr = [
        (w + margin) * (i % columns),
        (h + margin) * Math.floor(i / columns),
        (w + margin) * (i % columns) + w - margin,
        (h + margin) * Math.floor(i / columns),
        (w + margin) * (i % columns) + w - margin,
        (h + margin) * Math.floor(i / columns) + h - margin,
        (w + margin) * (i % columns),
        (h + margin) * Math.floor(i / columns) + h - margin,
      ];

      gsap.set(gridTile, {
        clipPath: `polygon(${arr[0]}px ${arr[1]}px, ${arr[2]}px ${arr[3]}px, ${arr[4]}px ${arr[5]}px, ${arr[6]}px ${arr[7]}px)`,
      });

      container.appendChild(gridTile);
      fixTilePosition(gridTile, i);
    }

    placeholder.addEventListener("mouseover", () => {
      const allTiles = placeholder.querySelectorAll(".gridTile");
      allTiles.forEach((tile) =>
        gsap.to(tile, animTime, { backgroundPosition: "0px 0px" })
      );
    });

    placeholder.addEventListener("mouseleave", () => {
      const allTiles = placeholder.querySelectorAll(".gridTile");
      allTiles.forEach((tile, index) => fixTilePosition(tile, index, animTime));
    });

    function fixTilePosition(tile, index, time = 0) {
      const centr = Math.floor((columns * rows) / 2);
      const centrCol = Math.ceil(centr / columns);
      const centrRow = Math.ceil(centr / rows);

      const offsetW = w / centrCol;
      const offsetH = h / centrRow;

      const left = Math.round((index % columns - centrCol + 1) * offsetW);
      const top = Math.round((Math.floor(index / columns) - centrRow + 1) * offsetH);

      gsap.to(tile, time, { backgroundPosition: `${left}px ${top}px` });
    }
  }, []);

  return <div ref={placeholderRef} className="placeholder"></div>;
};

export default ImageGrid;
