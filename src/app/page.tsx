import React from "react";
import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <>
      <header className="app-header">
        <div className="brand-title">
          <div className="brand-dot"></div>
          <div>
            <div className="brand-name">AVEN MEDIA</div>
            <div className="brand-sub">Local growth, made visible</div>
          </div>
        </div>
      </header>

      <main className="main-wrapper">
        <Carousel />
      </main>

      <footer className="app-footer">
        <p>AVEN MEDIA — Local stories, made known.</p>
      </footer>
    </>
  );
}
