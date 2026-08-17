import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import { FfaxHeroMedia } from "./ffax-hero-media";
import { FfaxLogo } from "./ffax-logo";

const ZITADEL_LOGIN_SOURCE =
  "https://github.com/zitadel/zitadel/tree/a56d4bf0bc9212a25f11ad073c0172d3124e5414/apps/login";

/**
 * Source migration from Aurora DefaultAuthLayout.jsx.
 * The two-column layout, logo position, media position and provider-source
 * frame retain the template structure. ZITADEL children remain untouched.
 */
export function FfaxLoginLayout({ children, controls }: { children: ReactNode; controls?: ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-black md:grid-cols-2">
      <section className="relative hidden min-h-screen overflow-hidden border-r border-white/10 md:flex md:flex-col">
        <div className="absolute top-0 left-0 z-10 p-8 lg:p-10">
          <FfaxLogo />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <FfaxHeroMedia />
        </div>

        <div className="absolute bottom-0 left-0 z-10 p-8 lg:p-10">
          <a
            className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-3 text-sm font-medium text-white no-underline ring-1 ring-white/10"
            href={ZITADEL_LOGIN_SOURCE}
            target="_blank"
            rel="noreferrer"
          >
            <ShieldCheckIcon className="h-5 w-5" />
            <span>ZITADEL Login V2</span>
          </a>
        </div>
      </section>

      <section className="flex min-h-screen flex-col bg-black">
        <div className="flex flex-1 items-center justify-center">{children}</div>
        {controls && <div className="mx-auto flex w-full max-w-[440px] justify-end px-4 pb-6">{controls}</div>}
      </section>
    </div>
  );
}
