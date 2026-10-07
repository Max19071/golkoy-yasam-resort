export default function ResortLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 175" preserveAspectRatio="xMidYMid meet" className={className} role="img" aria-label="Gölköy Yaşam Resort amblemi">
      <g fill="#2f6f49">
        <circle cx="55" cy="62" r="34"/><circle cx="42" cy="92" r="30"/><circle cx="70" cy="96" r="35"/>
        <circle cx="165" cy="62" r="34"/><circle cx="178" cy="92" r="30"/><circle cx="150" cy="96" r="35"/>
      </g>
      <path d="M110 8c-38 0-62 24-62 53 0 19 13 31 29 44 12 10 22 25 25 44h16c3-19 13-34 25-44 16-13 29-25 29-44 0-29-24-53-62-53z" fill="#63b458"/>
      <circle cx="110" cy="48" r="19" fill="white"/>
      <path d="M61 48c25 22 36 55 38 112M159 48c-25 22-36 55-38 112" fill="none" stroke="white" strokeWidth="12" strokeLinecap="round"/>
      <path d="M18 164c58-8 126-8 184 0" fill="none" stroke="#6b3b31" strokeWidth="8" strokeLinecap="round"/>
    </svg>
  );
}
