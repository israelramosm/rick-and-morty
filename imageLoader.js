"use client";

export default function myImageLoader({ src, _width, _quality }) {
  if (src.includes("http") || src.includes("https")) {
    return src;
  }
  return `https://israelramosm.github.io/rick-and-morty${src}`;
}
