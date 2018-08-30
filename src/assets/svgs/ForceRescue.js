import React from 'react';

export default function ForceRescue(props) {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" {...props}>
      <defs>
        <rect id="b" width="26" height="25.962" rx="12.981" />
        <filter id="a" width="153.8%" height="153.9%" x="-26.9%" y="-19.3%" filterUnits="objectBoundingBox">
          <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2" />
          <feColorMatrix
            in="shadowBlurOuter1"
            values="0 0 0 0 0.690263605 0 0 0 0 0.690263605 0 0 0 0 0.690263605 0 0 0 0.5 0"
          />
        </filter>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(4 2)">
          <use fill="#000" filter="url(#a)" xlinkHref="#b" />
          <use fill="#05A6AA" xlinkHref="#b" />
        </g>
        <g transform="translate(10 8)">
          <rect width="15" height="11" y="2" fill="#FFF" rx="1" />
          <rect width="6" height="2" x="4.5" y=".5" stroke="#FFF" rx="1" />
          <path
            fill="#05A6AA"
            fillRule="nonzero"
            d="M11.171 8.64V6.201a.351.351 0 0 0-.348-.348H8.987V4.02a.351.351 0 0 0-.348-.348H6.22a.351.351 0 0 0-.349.348v1.835H4.035a.351.351 0 0 0-.349.348V8.64c0 .19.159.348.349.348H5.87v1.836c0 .19.158.348.348.348h2.437c.19 0 .348-.158.348-.348V8.987h1.836c.174 0 .332-.158.332-.348z"
          />
        </g>
      </g>
    </svg>
  );
}
