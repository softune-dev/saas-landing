import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";

/** Brand logos in their own colours, drawn as vectors so they stay sharp. */

function Facebook() {
  return <FaFacebook className="size-full" color="#1877F2" />;
}

function Instagram() {
  return (
    <>
      <svg aria-hidden width="0" height="0" className="absolute">
        <defs>
          <radialGradient id="signup-instagram" cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497" />
            <stop offset="10%" stopColor="#fdf497" />
            <stop offset="45%" stopColor="#fd5949" />
            <stop offset="60%" stopColor="#d6249f" />
            <stop offset="90%" stopColor="#285AEB" />
          </radialGradient>
        </defs>
      </svg>
      <FaInstagram className="size-full" style={{ fill: "url(#signup-instagram)" }} />
    </>
  );
}

/** The note with its cyan and red offsets behind it. */
function Tiktok() {
  return (
    <span className="relative block size-full">
      <SiTiktok className="absolute inset-[4%] size-[92%] -translate-x-[5%] -translate-y-[3%]" color="#25F4EE" />
      <SiTiktok className="absolute inset-[4%] size-[92%] translate-x-[5%] translate-y-[3%]" color="#FE2C55" />
      <SiTiktok className="absolute inset-[4%] size-[92%] text-black dark:text-white" />
    </span>
  );
}

function Youtube() {
  return <FaYoutube className="size-full" color="#FF0000" />;
}

export const SOCIAL_NETWORKS = [
  { key: "facebook", name: "Facebook", Logo: Facebook },
  { key: "instagram", name: "Instagram", Logo: Instagram },
  { key: "tiktok", name: "TikTok", Logo: Tiktok },
  { key: "youtube", name: "YouTube", Logo: Youtube },
] as const;

export type SocialKey = (typeof SOCIAL_NETWORKS)[number]["key"];
