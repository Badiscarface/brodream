"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Dialog, IconButton } from "@mui/material";

import { IoMdClose } from "react-icons/io";

interface FullscreenZoomProps {
  open: boolean | string;
  src: string | boolean;
  alt: string;
  onClose: () => void;
}

export default function FullscreenZoom({
  open,
  src,
  alt,
  onClose,
}: FullscreenZoomProps) {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    setScale((prev) =>
      Math.max(1, Math.min(prev + (e.deltaY > 0 ? -0.1 : 0.1), 3))
    );
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container && open) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      container?.removeEventListener("wheel", handleWheel);
    };
  }, [open]);

  return (
    <Dialog fullScreen open={Boolean(open)} onClose={onClose}>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={1000}
          height={1000}
          style={{
            transform: `scale(${scale})`,
            transition: "transform 0.2s ease",
            maxWidth: "90%",
            maxHeight: "90%",
            objectFit: "contain",
          }}
        />
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "#fff",
            zIndex: 10,
          }}
        >
          <IoMdClose />
        </IconButton>
      </div>
    </Dialog>
  );
}
