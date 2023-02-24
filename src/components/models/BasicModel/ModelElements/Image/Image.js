import React from "react";
import { ICON_SIZE } from "../../../../Constants";
import "./Image.css";

export default function Image({ cssClass, imgSrc, altText, onClick }) {
  return (
    <img
      className={cssClass}
      src={imgSrc}
      onClick={onClick}
      width={ICON_SIZE}
      height={ICON_SIZE}
      alt={altText}
    />
  );
}
