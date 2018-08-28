import React from 'react';

export default function QueueBreak(props) {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" {...props}>
      <defs>
        <rect id="b" width="26" height="25.962" rx="12.981" />
        <filter id="a" width="153.8%" height="153.9%" x="-26.9%" y="-19.3%" filterUnits="objectBoundingBox">
          <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2" />
          <feColorMatrix
            in="shadowBlurOuter1"
            values="0 0 0 0 0.738600128 0 0 0 0 0.738600128 0 0 0 0 0.738600128 0 0 0 0.5 0"
          />
        </filter>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(4 2)">
          <use fill="#000" filter="url(#a)" xlinkHref="#b" />
          <use fill="#139902" xlinkHref="#b" />
        </g>
        <path
          fill="#FFF"
          fillRule="nonzero"
          d="M12.752 18.079H9.417v1.482h3.335v1.112a.37.37 0 0 0 .586.302l2.596-1.853a.37.37 0 0 0 0-.604l-2.596-1.853a.37.37 0 0 0-.586.302v1.112zm-1.112-5.93v-1.482H23.5v1.482H11.64zm0 3.706v-1.482H23.5v1.482H11.64zm5.93 3.706V18.08h5.93v1.482h-5.93z"
        />
      </g>
    </svg>
  );
}
