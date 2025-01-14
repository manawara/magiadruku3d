"use client";
import Fb from "@/components/icon/Fb";
import Instagram from "@/components/icon/Instagram";
import TikTok from "@/components/icon/TikTok";
import Youtube from "@/components/icon/Youtube";
import X from "@/components/icon/X";
import { useTranslations } from "next-intl";
import Link from "next/link";

const SocialNav = ({ color = "white" }: { color?: string }) => {
  const t = useTranslations("HomePage.Header");

  return (
    <nav aria-label="Social media navigation" className="inline-flex gap-3">
      <p id="social-heading">{t("follow-us")}:</p>
      <ul aria-labelledby="social-heading" className="flex items-center gap-3">
        <li>
          <Link href="#" aria-label="Facebook">
            <Fb size={22} color={color} />
          </Link>
        </li>
        <li>
          <Link href="#" aria-label="X platform">
            <X size={13} color={color} />
          </Link>
        </li>
        <li>
          <Link href="#" aria-label="TikTok">
            <TikTok size={19} color={color} />
          </Link>
        </li>
        <li>
          <Link href="#" aria-label="Youtube">
            <Youtube size={18} color={color} />
          </Link>
        </li>
        <li>
          <Link href="#" aria-label="Instagram">
            <Instagram size={17} color={color} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SocialNav;
