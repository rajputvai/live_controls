import React from 'react';

export default function Stop({ classes, ...props }) {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" {...props}>
      <defs>
        <filter id="a" width="153.8%" height="153.8%" x="-26.9%" y="-19.2%" filterUnits="objectBoundingBox">
          <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2" />
          <feColorMatrix
            in="shadowBlurOuter1"
            result="shadowMatrixOuter1"
            values="0 0 0 0 0.737254902 0 0 0 0 0.737254902 0 0 0 0 0.737254902 0 0 0 0.5 0"
          />
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g fill="none" fillRule="evenodd" filter="url(#a)" transform="translate(4 2)">
        <rect width="25" height="24.962" x=".5" y=".5" fill="#F5F5F5" stroke="#C7C7C7" rx="12.481" />
        <path fill="#C0061D" d="M8.667 8.654h9.389v9.375H8.667z" />
      </g>
    </svg>
  );
}
