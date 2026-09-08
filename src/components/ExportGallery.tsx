"use client";

import React from "react";

const EXPORTS = [
  { id: 1, file: "/exports/aavan-media-01.png", title: "01 — Local Growth" },
  { id: 2, file: "/exports/aavan-media-02.png", title: "02 — The Challenge" },
  { id: 3, file: "/exports/aavan-media-03.png", title: "03 — The AVEN Way" },
  { id: 4, file: "/exports/aavan-media-04.png", title: "04 — Long-Term Journey" },
  { id: 5, file: "/exports/aavan-media-05.png", title: "05 — Built Together" },
  { id: 6, file: "/exports/aavan-media-06.png", title: "06 — Choose Your Pace" },
  { id: 7, file: "/exports/aavan-media-07.png", title: "07 — Our Promise" },
  { id: 8, file: "/exports/aavan-media-08.png", title: "08 — Next Chapter" },
];

export default function ExportGallery() {
  return (
    <div style={{ width: "100%", maxWidth: "1080px" }}>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#fff" }}>High-Res Exported Slides</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: "4px" }}>
            Ready-to-publish 1080×1350 PNG images for social media carousels.
          </p>
        </div>
      </div>
      <div className="exports-grid">
        {EXPORTS.map((item) => (
          <div key={item.id} className="export-card">
            <div className="export-img-wrapper">
              <img src={item.file} alt={item.title} />
            </div>
            <div className="export-info">
              <span className="export-title">{item.title}</span>
              <a
                href={item.file}
                download={`aavan-media-${String(item.id).padStart(2, "0")}.png`}
                className="download-link"
              >
                Download ↓
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
