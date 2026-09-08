"use client";

import React, { useState } from "react";
import Carousel from "@/components/Carousel";
import ExportGallery from "@/components/ExportGallery";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"interactive" | "exports">("interactive");

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
        <div className="view-tabs">
          <button
            className={`tab-btn ${activeTab === "interactive" ? "active" : ""}`}
            onClick={() => setActiveTab("interactive")}
          >
            Interactive Carousel
          </button>
          <button
            className={`tab-btn ${activeTab === "exports" ? "active" : ""}`}
            onClick={() => setActiveTab("exports")}
          >
            Exported Slides (PNG)
          </button>
        </div>
      </header>

      <main className="main-wrapper">
        {activeTab === "interactive" ? <Carousel /> : <ExportGallery />}
      </main>

      <footer className="app-footer">
        <p>AVEN MEDIA — Local stories, made known. Built with Next.js.</p>
      </footer>
    </>
  );
}
