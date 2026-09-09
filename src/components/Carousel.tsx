"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const TOTAL_SLIDES = 9;

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // CTA Form State
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    requirements: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setFormStatus({ type: "error", msg: "Please enter your Name and Phone number." });
      return;
    }
    setIsSubmitting(true);
    setFormStatus(null);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormStatus({ type: "success", msg: "Booking request submitted successfully! We will contact you soon." });
        setFormData({ name: "", company: "", phone: "", requirements: "" });
      } else {
        setFormStatus({ type: "error", msg: data.error || "Failed to submit booking." });
      }
    } catch {
      setFormStatus({ type: "error", msg: "Network error. Please try again or click Contact Now." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const showNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TOTAL_SLIDES);
  }, []);

  const showPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showNext, showPrev]);

  // Touch handlers for manual swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 35) showNext();
    if (diff < -35) showPrev();
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <main
        className={`stage ${current === 8 ? "stage-s9" : ""}`}
        aria-label="AVEN Media local growth carousel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slide 1 */}
        <section className={`slide s1 ${current === 0 ? "active" : ""}`} data-slide="1">
          <div className="grain"></div>
          <div className="topline">
            <span className="brand"><i></i>AVEN MEDIA</span>
            <span className="progress">
              {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                <b
                  key={i}
                  className={i === current ? "on" : ""}
                  onClick={() => setCurrent(i)}
                  title={`Go to slide ${i + 1}`}
                />
              ))}
            </span>
          </div>
          <div className="copy reveal d1">
            <p className="eyebrow">Local growth, made visible</p>
            <h1>AVEN<br /><em>MEDIA</em></h1>
            <p className="dek">Taking local businesses beyond their location.</p>
          </div>
          <div className="scene">
            <div className="ambient-line float"></div>
            <div className="radius pulse"></div>
            <div className="city">
              <div className="store grow">
                <div className="store-door"></div>
                <div className="store-window"></div>
              </div>
            </div>
            <div className="pin pulse"></div>
            <img className="team reveal d3" src="/assets/aavan-team.png" alt="AVEN Media team" />
          </div>
          <div className="signature">
            <span><strong>Your business.</strong> Our content.</span>
            <span className="mark">01 / 09</span>
          </div>
        </section>

        {/* Slide 2 */}
        <section className={`slide s2 ${current === 1 ? "active" : ""}`} data-slide="2">
          <div className="grain"></div>
          <div className="topline">
            <span className="brand"><i></i>AVEN MEDIA</span>
            <span className="progress">
              {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                <b key={i} className={i === current ? "on" : ""} onClick={() => setCurrent(i)} />
              ))}
            </span>
          </div>
          <div className="copy reveal d1">
            <p className="eyebrow">The challenge</p>
            <h1>Great businesses<br />deserve to be <em>seen.</em></h1>
            <p className="dek">A great service means little if the right local people never discover it.</p>
          </div>
          <div className="scene">
            <div className="spotlight pulse"></div>
            <div className="store grow">
              <div className="store-door"></div>
              <div className="store-window"></div>
            </div>
            <svg className="connect" viewBox="0 0 400 210">
              <path className="flow" d="M9 170 C99 23 243 188 390 40" />
            </svg>
            <div className="crowd">
              <span className="person reveal d2"></span>
              <span className="person reveal d3"></span>
              <span className="person reveal d4"></span>
              <span className="person reveal d2"></span>
              <span className="person reveal d3"></span>
              <span className="person reveal d4"></span>
            </div>
            <div className="attention reveal d4">Local attention →</div>
          </div>
          <div className="signature">
            <span><strong>Be noticed.</strong> Be remembered.</span>
            <span className="mark">02 / 09</span>
          </div>
        </section>

        {/* Slide 3 */}
        <section className={`slide s3 ${current === 2 ? "active" : ""}`} data-slide="3">
          <div className="grain"></div>
          <div className="topline">
            <span className="brand"><i></i>AVEN MEDIA</span>
            <span className="progress">
              {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                <b key={i} className={i === current ? "on" : ""} onClick={() => setCurrent(i)} />
              ))}
            </span>
          </div>
          <div className="copy reveal d1">
            <p className="eyebrow">The AVEN way</p>
            <h1>Business → content → <em>local people</em></h1>
            <p className="dek">Ideas that move your business from a nearby place to a familiar name.</p>
          </div>
          <div className="flow-board">
            <svg viewBox="0 0 800 330">
              <path className="flow" d="M40 42 C240 10 193 137 365 137 S508 230 738 276" />
            </svg>
            <div className="step reveal d1"><div className="bubble">⌂</div><span>Business</span></div>
            <div className="step reveal d2"><div className="bubble">✦</div><span>AVEN</span></div>
            <div className="step reveal d3"><div className="bubble">▷</div><span>Content</span></div>
            <div className="step reveal d4"><div className="bubble">♟</div><span>People</span></div>
          </div>
          <div className="phone float">
            <div className="phone-screen">
              <div className="mini-brand">AVEN MEDIA</div>
              <div className="mini-head">Made<br />local.</div>
              <div className="mini-reel"></div>
              <div className="mini-lines"><b></b><b></b></div>
            </div>
          </div>
          <div className="signature">
            <span><strong>Clear idea.</strong> Wider reach.</span>
            <span className="mark">03 / 09</span>
          </div>
        </section>

        {/* Slide 4 */}
        <section className={`slide s4 ${current === 3 ? "active" : ""}`} data-slide="4">
          <div className="grain"></div>
          <div className="topline">
            <span className="brand"><i></i>AVEN MEDIA</span>
            <span className="progress">
              {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                <b key={i} className={i === current ? "on" : ""} onClick={() => setCurrent(i)} />
              ))}
            </span>
          </div>
          <div className="copy reveal d1">
            <p className="eyebrow">A long-term journey</p>
            <h1>More than a<br /><em>promo</em> video.</h1>
            <p className="dek">We build a story people can keep seeing, remembering and responding to.</p>
          </div>
          <div className="timeline-line flow"></div>
          <div className="timeline">
            <div className="content-card grow" style={{ "--h": "42%" } as React.CSSProperties}><b>Content</b></div>
            <div className="content-card grow d1" style={{ "--h": "56%" } as React.CSSProperties}><b>Visibility</b></div>
            <div className="content-card grow d2" style={{ "--h": "72%" } as React.CSSProperties}><b>Engagement</b></div>
            <div className="content-card grow d3" style={{ "--h": "90%" } as React.CSSProperties}><b>Growth</b></div>
          </div>
          <p className="note reveal d4">One post → an ongoing presence</p>
          <div className="signature">
            <span><strong>Consistency</strong> creates connection.</span>
            <span className="mark">04 / 09</span>
          </div>
        </section>

        {/* Slide 5 */}
        <section className={`slide s5 ${current === 4 ? "active" : ""}`} data-slide="5">
          <div className="grain"></div>
          <div className="topline">
            <span className="brand"><i></i>AVEN MEDIA</span>
            <span className="progress">
              {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                <b key={i} className={i === current ? "on" : ""} onClick={() => setCurrent(i)} />
              ))}
            </span>
          </div>
          <div className="copy reveal d1">
            <p className="eyebrow">Built together</p>
            <h1>We can build your <em>page</em> with you.</h1>
            <p className="dek">The right support around one strong social home for your business.</p>
          </div>
          <div className="orbit">
            <span className="service reveal d1">Content creation</span>
            <span className="service reveal d2">Page development</span>
            <span className="service reveal d3">Promotional video</span>
            <span className="service reveal d4">Social management</span>
            <span className="service reveal d2">Page takeover</span>
            <span className="service reveal d3">Long-term strategy</span>
          </div>
          <div className="phone float">
            <div className="phone-screen">
              <div className="mini-brand">YOUR PAGE</div>
              <div className="mini-head">Your local<br />story.</div>
              <div className="mini-reel"></div>
              <div className="mini-lines"><b></b><b></b></div>
            </div>
          </div>
          <div className="signature">
            <span><strong>Your page.</strong> A stronger presence.</span>
            <span className="mark">05 / 09</span>
          </div>
        </section>

        {/* Slide 6 */}
        <section className={`slide s6 ${current === 5 ? "active" : ""}`} data-slide="6">
          <div className="grain"></div>
          <div className="topline">
            <span className="brand"><i></i>AVEN MEDIA</span>
            <span className="progress">
              {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                <b key={i} className={i === current ? "on" : ""} onClick={() => setCurrent(i)} />
              ))}
            </span>
          </div>
          <div className="copy reveal d1">
            <p className="eyebrow">Choose your pace</p>
            <h1>Built around<br />your <em>business.</em></h1>
          </div>
          <div className="packages">
            <article className="package reveal d1">
              <span className="number">01</span>
              <h2>15-day<br />package</h2>
              <p>Regular promotional content for your immediate needs.</p>
            </article>
            <article className="package featured reveal d2">
              <span className="number">02</span>
              <h2>Monthly<br />package</h2>
              <p>Consistent content and promotion throughout the month.</p>
            </article>
            <article className="package reveal d3">
              <span className="number">03</span>
              <h2>Page<br />management</h2>
              <p>Support to develop and manage your social presence.</p>
            </article>
            <article className="package reveal d4">
              <span className="number">04</span>
              <h2>Custom<br />package</h2>
              <p>A focused plan designed around your business goals.</p>
            </article>
          </div>
          <div className="signature">
            <span><strong>Flexible support.</strong> Real growth.</span>
            <span className="mark">06 / 09</span>
          </div>
        </section>

        {/* Slide 7 */}
        <section className={`slide s7 ${current === 6 ? "active" : ""}`} data-slide="7">
          <div className="grain"></div>
          <div className="topline">
            <span className="brand"><i></i>AVEN MEDIA</span>
            <span className="progress">
              {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                <b key={i} className={i === current ? "on" : ""} onClick={() => setCurrent(i)} />
              ))}
            </span>
          </div>
          <div className="copy reveal d1">
            <p className="eyebrow">Our promise</p>
            <h1>Our goal is <em>simple.</em></h1>
          </div>
          <svg className="network" viewBox="0 0 800 520">
            <path className="flow" d="M91 453 C99 141 312 471 389 242 S637 78 761 277" />
            <path className="flow" d="M79 285 C337 86 497 487 720 160" />
          </svg>
          <div className="promise">
            <b className="reveal d1"><i></i>Better content.</b>
            <b className="reveal d2"><i></i>Wider reach.</b>
            <b className="reveal d3"><i></i>Stronger visibility.</b>
            <b className="reveal d4"><i></i>Long-term growth.</b>
          </div>
          <div className="signature">
            <span><strong>Local today.</strong> Known tomorrow.</span>
            <span className="mark">07 / 09</span>
          </div>
        </section>

        {/* Slide 8 */}
        <section className={`slide s8 ${current === 7 ? "active" : ""}`} data-slide="8">
          <div className="grain"></div>
          <div className="topline">
            <span className="brand"><i></i>AVEN MEDIA</span>
            <span className="progress">
              {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                <b key={i} className={i === current ? "on" : ""} onClick={() => setCurrent(i)} />
              ))}
            </span>
          </div>
          <div className="copy reveal d1">
            <p className="eyebrow">Your next chapter</p>
            <h1>Let’s grow <em>together.</em></h1>
            <p className="dek">Your business already has something valuable. We help more local people know it.</p>
          </div>
          <svg className="network-final" viewBox="0 0 900 540">
            <path className="flow" d="M73 475 C112 89 404 553 470 226 S729 83 851 385" />
            <path className="flow" d="M32 282 C234 82 563 526 864 158" />
          </svg>
          <div className="lockup reveal d3">
            <img src="/assets/aavan-logo.png" alt="AVEN Media logo" />
            <p>Your business. Our content.<br /><strong>Wider reach.</strong></p>
          </div>
          <img className="team reveal d2" src="/assets/aavan-team.png" alt="AVEN Media team" />
          <div className="signature">
            <span><strong>AVEN MEDIA</strong> — Local stories, made known.</span>
            <span className="mark">08 / 09</span>
          </div>
        </section>

        {/* Slide 9 - CTA Booking & Contact */}
        <section className={`slide s9 ${current === 8 ? "active" : ""}`} data-slide="9">
          <div className="grain"></div>
          <div className="topline">
            <span className="brand"><i></i>AVEN MEDIA</span>
            <span className="progress">
              {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                <b key={i} className={i === current ? "on" : ""} onClick={() => setCurrent(i)} title={`Go to slide ${i + 1}`} />
              ))}
            </span>
          </div>

          <div className="cta-container">
            <div className="copy cta-header reveal d1">
              <p className="eyebrow">Start your growth</p>
              <h1>Book a <em>Session</em></h1>
              <p className="dek">Get in touch to elevate your local business presence.</p>
            </div>

            <form onSubmit={handleBookSubmit} className="cta-form reveal d2">
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="cta-name">Full Name *</label>
                  <input
                    id="cta-name"
                    type="text"
                    name="name"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="cta-company">Company / Business Name *</label>
                  <input
                    id="cta-company"
                    type="text"
                    name="company"
                    placeholder="e.g. Apex Local Cafe"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="cta-phone">Phone Number *</label>
                  <input
                    id="cta-phone"
                    type="tel"
                    name="phone"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-field full-width">
                  <label htmlFor="cta-req">Your Requirements / Queries</label>
                  <textarea
                    id="cta-req"
                    name="requirements"
                    rows={3}
                    placeholder="Describe your requirements or questions..."
                    value={formData.requirements}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>

              {formStatus && (
                <div className={`form-alert ${formStatus.type}`}>
                  {formStatus.msg}
                </div>
              )}

              <div className="form-actions">
                <a href="tel:+916379363647" className="btn-contact-now" title="Call AVEN Media directly">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span>Contact Now</span>
                </a>

                <button type="submit" className="btn-book-now" disabled={isSubmitting}>
                  {isSubmitting ? "Booking..." : "Book Now"}
                </button>
              </div>
            </form>
          </div>

          <div className="signature">
            <span><strong>AVEN MEDIA</strong> — Ready when you are.</span>
            <span className="mark">09 / 09</span>
          </div>
        </section>
      </main>

      {/* Control Bar */}
      <nav className="controls-bar" aria-label="Carousel controls">
        <button className="ctrl-btn" onClick={showPrev} aria-label="Previous slide">
          ←
        </button>
        <span className="counter-text">
          {String(current + 1).padStart(2, "0")} / {String(TOTAL_SLIDES).padStart(2, "0")}
        </span>
        <button className="ctrl-btn" onClick={showNext} aria-label="Next slide">
          →
        </button>
      </nav>
    </div>
  );
}

