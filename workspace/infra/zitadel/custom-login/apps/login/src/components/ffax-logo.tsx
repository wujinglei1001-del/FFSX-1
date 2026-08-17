/** Source migration from workspace/src/components/common/Logo.jsx. */
export function FfaxLogo() {
  return (
    <a className="flex items-center text-white no-underline" href="/">
      <svg aria-hidden="true" className="h-10 w-[26px]" viewBox="0 0 26 40">
        <path
          d="M0.428711 1.68945V13.9413C0.428711 16.3924 2.77965 18.5801 6.30599 19.4106L16.7827 21.8779L22.9541 23.3334C22.9602 23.3334 22.9664 23.3377 22.9725 23.3377C24.6079 23.7284 25.4287 24.7331 25.4287 25.7335V9.39644C25.4287 8.46903 24.7252 7.54162 23.3181 7.09934L16.7827 5.55366L0.428711 1.68945Z"
          fill="url(#ffax-logo-a)"
        />
        <path
          d="M4.85352 19.0703V34.2138C4.85352 33.222 5.66196 32.2259 7.27269 31.8266L22.9972 28.1212C24.6141 27.7262 25.4287 26.7301 25.4287 25.734C25.4287 24.7379 24.6079 23.7288 22.9725 23.3381L16.7827 21.8826L4.85352 19.0703Z"
          fill="url(#ffax-logo-b)"
        />
        <path
          d="M4.85352 34.2131C4.85352 35.2178 5.68048 36.2225 7.32823 36.6132L17.2842 38.9609C19.0945 39.3876 21.0039 38.5104 21.0039 37.2519V28.5928L7.27266 31.8259C5.66196 32.2252 4.85352 33.2213 4.85352 34.2131Z"
          fill="url(#ffax-logo-c)"
        />
        <defs>
          <linearGradient id="ffax-logo-a" x1="14.7" y1="4.8" x2="10.3" y2="23.5">
            <stop stopColor="#20DE99" stopOpacity="0" />
            <stop offset="1" stopColor="#20DE99" />
          </linearGradient>
          <linearGradient id="ffax-logo-b" x1="9" y1="21.8" x2="11.3" y2="31.3">
            <stop stopColor="#20DE99" stopOpacity="0" />
            <stop offset="1" stopColor="#20DE99" />
          </linearGradient>
          <linearGradient id="ffax-logo-c" x1="16.8" y1="29.9" x2="14.8" y2="40.2">
            <stop stopColor="#20DE99" stopOpacity="0" />
            <stop offset="1" stopColor="#20DE99" />
          </linearGradient>
        </defs>
      </svg>
      <span className="ml-2 text-[29.5px] leading-none font-medium tracking-[-0.8px]">FFAX</span>
    </a>
  );
}
