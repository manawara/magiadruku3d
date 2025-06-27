"use client";

import { useCallback, useEffect, useState } from "react";
import SliderItem from "./SliderItem";
import Dots from "./Dots";
import { Arrow } from "./Arrow";
import { AnimatePresence, useMotionValue, motion, PanInfo } from "motion/react";
import { SliderItemType } from "@/types";
type SliderProps = {
  slides: SliderItemType[];
  options?: {
    dots?: boolean;
    autoPlay?: boolean;
    time?: number;
    arrows?: boolean;
  };
};

const Slider = ({ slides, options = {} }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const [isDragging, setIsDragging] = useState(false);
  const { dots = false, autoPlay = true, time = 10, arrows = false } = options;
  const x = useMotionValue(0);
  const dragThreshold = 50; // Minimum drag distance to trigger slide change
  console.log(slides);
  const autoPlayInterval = time * 1000; // Autoplay interval in milliseconds
  const nextSlide = useCallback(() => {
    setDirection("right");
    return currentIndex < slides.length - 1
      ? setCurrentIndex((prev) => prev + 1)
      : setCurrentIndex(0);
  }, [currentIndex, slides.length]);
  const prevSlide = () => {
    setDirection("left");
    return currentIndex >= 1
      ? setCurrentIndex((prev) => prev - 1)
      : setCurrentIndex(slides.length - 1);
  };
  const handleDragEnd = (_: MouseEvent | TouchEvent, info: PanInfo) => {
    setIsDragging(false);
    const dragDistance = info.offset.x;

    if (Math.abs(dragDistance) > dragThreshold) {
      if (dragDistance > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  };
  useEffect(() => {
    if (!autoPlay || isDragging) return;
    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [nextSlide, autoPlayInterval, autoPlay, isDragging]);

  return (
    <motion.div className="min-h-[400px] max-h-[400px] max-sm:max-h-max max-sm:pb-11 bg-gray-50 w-full relative rounded-md overflow-hidden flex items-center flex-nowrap">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentIndex].id}
          className="w-full h-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          style={{ x }}
        >
          <SliderItem
            {...slides[currentIndex]}
            currentSlide={currentIndex}
            direction={direction}
          />
        </motion.div>
      </AnimatePresence>

      {dots && (
        <div className="absolute max-sm:bottom-8 bottom-10 left-10 flex gap-2">
          {slides.map((slide, index) => (
            <Dots key={slide.id} isActive={index === currentIndex} />
          ))}
        </div>
      )}

      {arrows && (
        <div className="flex gap-2 absolute bottom-4 right-7">
          <Arrow
            icon="ChevronLeft"
            intent="secondary"
            type="round"
            onAction={prevSlide}
          />
          <Arrow
            icon="ChevronRight"
            intent="secondary"
            type="round"
            onAction={nextSlide}
          />
        </div>
      )}
    </motion.div>
  );
};

export default Slider;
