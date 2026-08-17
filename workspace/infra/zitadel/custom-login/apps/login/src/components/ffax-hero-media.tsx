/**
 * Source migration from Aurora:
 * workspace/src/components/sections/showcase/hero/HeroMedia.jsx
 *
 * The original component is a looping WebM layer with the planet WebP
 * positioned at the bottom. No screenshot or injected stylesheet is used.
 */
export function FfaxHeroMedia() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <div className="relative h-[40vh] w-full overflow-hidden sm:h-[50vh] md:h-[60vh] xl:h-[70vh]">
      <video className="absolute h-full w-full object-cover" autoPlay loop muted playsInline>
        <source src={`${basePath}/ffax/beam.webm`} type="video/webm" />
      </video>
      <img
        className="absolute bottom-[-1px] left-1/2 w-[150%] max-w-none -translate-x-1/2 sm:w-[120%] md:w-full"
        src={`${basePath}/ffax/planet.webp`}
        alt=""
      />
    </div>
  );
}
