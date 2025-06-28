"use client";

import { Check, ChevronUp } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StaticImageData } from "next/image";
import { country as countries } from "@/lib/data/country";
import useCookie from "@/hooks/useCookie";
import { NEXT_LOCALE } from "@/constants/cookies";
import { findIndexCountry } from "@/lib/helper";
import useCloseOutside from "@/hooks/useCloseOutside";

interface CountryItem {
  id: number;
  name: string;
  short: string;
  tag: string;
  icon: StaticImageData;
}

interface SelectCountryProps {
  items: CountryItem[];
}

const SelectCountry = ({ items }: SelectCountryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookie, setCookie] = useCookie(NEXT_LOCALE);
  const [selectedCountry, setSelectedCountry] = useState<CountryItem>(() => {
    try {
      const id = findIndexCountry(cookie as string);
      return items[id] || items[0];
    } catch {
      return items[0];
    }
  });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const id = findIndexCountry(cookie as string);
      setSelectedCountry(items[id]);
    } catch (error) {
      console.error("Error setting country:", error);
      setSelectedCountry(items[0]);
    }
  }, [items, cookie]);

  const handleToggleSelect = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  useCloseOutside(buttonRef, () => {
    setIsOpen(false);
  });

  const handleSelectCountry = useCallback(
    (countryTag: string) => {
      try {
        const id = findIndexCountry(countryTag);
        const newCountry = countries[id];

        setSelectedCountry(newCountry);
        setIsOpen(false);

        if (typeof setCookie === "function") {
          setCookie(countryTag, {});
        }
        router.push("/" + countryTag);
      } catch (error) {
        console.error("Error selecting country:", error);
      }
    },
    [setCookie, router]
  );

  const CountryOption = ({ item }: { item: CountryItem }) => {
    const isSelected = item.name === selectedCountry.name;

    return (
      <li
        role="option"
        aria-selected={isSelected}
        className={`
          flex gap-3 font-semibold items-center py-2 px-3 text-sm
          ${!isSelected && "cursor-pointer hover:bg-gray-100"}
        `}
        onClick={() => !isSelected && handleSelectCountry(item.tag)}
      >
        <Image src={item.icon} className="size-4" alt={item.name} />
        <div className="text-gray-500">{item.name}</div>
        {isSelected && <Check size={16} className="text-orange-500 ml-auto" />}
      </li>
    );
  };

  return (
    <nav aria-label="Country selection" ref={buttonRef}>
      <div className="relative top-0 left-0 min-w-[60px] z-[99]">
        <button
          className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm bg-gray-100 py-2 px-3"
          onClick={handleToggleSelect}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {selectedCountry?.icon && (
            <Image
              src={selectedCountry.icon}
              alt={selectedCountry.name}
              className="size-4"
            />
          )}
          {selectedCountry?.short}
          <ChevronUp
            strokeWidth={2}
            className={`transform transition-transform duration-200 size-4 ${
              !isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <ul
            role="listbox"
            className="z-10 bg-white w-36 absolute top-10 -left-14 sm:-left-10 rounded-sm flex py-2 flex-col justify-center border-1 border border-gray-200"
          >
            {items.map((item) => (
              <CountryOption key={item.id} item={item} />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default SelectCountry;
