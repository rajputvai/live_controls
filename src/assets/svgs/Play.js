import React from 'react';

export default function Play({ classes, ...props }) {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" {...props}>
      <defs>
        <path id="b" d="M13 0C5.824 0 0 5.824 0 13s5.824 13 13 13 13-5.824 13-13S20.176 0 13 0z" />
        <filter id="a" width="153.8%" height="153.8%" x="-26.9%" y="-19.2%" filterUnits="objectBoundingBox">
          <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2" />
          <feColorMatrix
            in="shadowBlurOuter1"
            values="0 0 0 0 0.690196078 0 0 0 0 0.690196078 0 0 0 0 0.690196078 0 0 0 0.5 0"
          />
        </filter>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g fillRule="nonzero" transform="translate(4 2)">
          <use fill="#000" filter="url(#a)" xlinkHref="#b" />
          <use fill="#0682C7" fillRule="evenodd" xlinkHref="#b" />
        </g>
        <path fill="#FFF" d="M22.667 15.5L14 22V9z" />
      </g>
    </svg>
  );
}
