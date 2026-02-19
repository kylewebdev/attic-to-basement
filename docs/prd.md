# Product Requirements Document: ABE Liquidators Website Rebuild

**Project:** abeliquidators.com redesign and rebuild
**Client:** Attic to Basement Estate Liquidators (ABE Liquidators)
**Owner:** Cortnee Beggs
**Date:** February 18, 2026
**Status:** Draft

---

## 1. Project Overview

### 1.1 Summary

Rebuild the existing ABE Liquidators website from its current website-builder platform (likely GoDaddy or Squarespace) into a modern, fast, custom-coded site. The new site should preserve the brand's core identity (compassionate expertise, full-service estate liquidation, trust) while dramatically improving design quality, content clarity, SEO, and conversion performance.

### 1.2 Business Goals

- Increase consultation requests (primary conversion event)
- Improve local SEO rankings for estate sale/liquidation queries across Northern California
- Establish stronger visual credibility and professionalism over competitors
- Make the site easy for the client to understand and maintain long-term
- Reduce reliance on third-party platforms (Yelp, EstateSales.net) as the sole discovery path

### 1.3 Target Audiences

**Primary: Families and individuals in transition**
- Adult children handling a parent's estate after death
- Seniors or couples downsizing
- Families clearing property for sale or relocation
- Emotional state: overwhelmed, uncertain, looking for someone trustworthy to take the lead

**Secondary: Estate sale shoppers/buyers**
- Bargain hunters, collectors, antique enthusiasts
- Looking for upcoming sale dates, locations, and what to expect

**Tertiary: Referral partners**
- Real estate agents, attorneys, senior living advisors
- Need a reliable estate liquidation partner they can recommend to clients

---

## 2. Brand and Design Direction

### 2.1 Brand Essence

ABE is the compassionate expert who handles everything from attic to basement so families in transition don't have to. The brand promise: "We take the overwhelm away, treat your belongings with respect, and get you the best outcome."

### 2.2 Tone of Voice

- Warm but professional. Think "reassuring handshake," not corporate stiffness.
- Lead with empathy, follow with competence.
- Avoid jargon. Speak plainly to people who may be going through one of the hardest seasons of their life.
- Confident without being salesy. The trust should feel earned, not claimed.

### 2.3 Visual Direction

- Clean, airy, and grounded. Avoid anything that feels sterile or overly corporate.
- Warm neutral color palette. Consider earth tones, muted sage or slate accents, warm whites. The palette should feel like a well-kept home, not a tech startup.
- Typography should be readable and warm. A humanist sans-serif for body text, potentially a soft serif for headlines to add character.
- Photography direction (for future shoots or stock selection): real homes, real objects, warm natural lighting. Avoid generic stock photos of handshakes or clipboards. Estate sale staging shots, detail shots of interesting items, and candid team photos would be ideal.
- Generous whitespace. Let the content breathe. These visitors are often stressed; the site should feel calming.

### 2.4 Logo and Branding Assets

- Assume the existing ABE Liquidators logo will be carried forward. Design around it.
- If the client provides updated branding assets later, the layout should accommodate them without a full redesign.

---

## 3. Technical Requirements

### 3.1 Tech Stack

- **Framework:** Next.js (App Router) with React
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment target:** Vercel (recommended) or any static/serverless host
- **Content approach:** All content hardcoded for initial launch. Structure components so content can be extracted to a CMS (Sanity, Contentful, or similar) later if the client wants editorial control.

### 3.2 Performance Targets

- Lighthouse Performance score: 90+
- Largest Contentful Paint: under 2.5 seconds
- Cumulative Layout Shift: under 0.1
- Total page weight: under 1MB per page (excluding lazy-loaded images)
- All images served in modern formats (WebP/AVIF) with responsive srcsets

### 3.3 Accessibility

- WCAG 2.1 AA compliance minimum
- Semantic HTML throughout
- Keyboard navigable
- Sufficient color contrast ratios
- Alt text on all images
- Focus indicators visible on all interactive elements

### 3.4 SEO Requirements

- Unique, descriptive title tags and meta descriptions for every page
- Proper heading hierarchy (single H1 per page, logical H2/H3 nesting)
- Schema.org structured data: LocalBusiness, Service, Review, BreadcrumbList
- XML sitemap generation
- Canonical URLs
- Open Graph and Twitter Card meta tags for social sharing
- Fast load times (Core Web Vitals passing)

### 3.5 Analytics and Tracking

- Google Analytics 4 integration
- Google Tag Manager container (so the client or a marketing partner can add tracking later)
- Conversion tracking on form submissions (consultation requests)
- Phone click tracking via GTM

### 3.6 Responsive Design

- Mobile-first approach
- Breakpoints: mobile (< 640px), tablet (640px to 1024px), desktop (1024px+)
- Navigation collapses to a hamburger/slide-out menu on mobile
- Touch-friendly tap targets (minimum 44x44px)
- No horizontal scrolling at any viewport

---

## 4. Site Architecture

### 4.1 Sitemap

```
/                     Homepage
/estate-sales         Estate Sales (full-service sale process)
/estate-liquidation   Estate Liquidation (buyouts, cleanouts, service types)
/appraisals           Appraisals (valuation services)
/our-promise          Our Promise (values, credentials, approach)
/reviews              Reviews (testimonials, social proof)
```

Six pages total. No blog, gallery, or FAQ at launch (these can be added later).

### 4.2 Navigation Structure

**Primary nav (header):**
- Estate Sales
- Estate Liquidation
- Appraisals
- Our Promise
- Reviews

**Persistent CTA button in header:** "Free Consultation" (links to contact section or triggers scroll-to-form)

**Footer nav:**
- All primary nav links
- Phone number (click-to-call)
- Email address
- Instagram link
- BBB link
- Yelp link
- EstateSales.net link
- EstateSales.org link
- Service area text
- Copyright notice

---

## 5. Page-by-Page Requirements

### 5.1 Homepage ( / )

**Purpose:** First impression. Establish who ABE is, what they do, who they serve, and why visitors should trust them. Drive visitors to request a consultation.

**Sections (top to bottom):**

1. **Hero Section**
   - Headline: Empathetic, benefit-driven. Something in the spirit of "We handle everything so you don't have to" (final copy TBD by client).
   - Subheadline: Brief expansion on what ABE does and for whom.
   - Primary CTA button: "Schedule a Free Consultation"
   - Secondary CTA: "Learn How It Works" (scrolls or links to services overview)
   - Background: Either a warm, high-quality photo (staged estate sale, inviting home interior) or a subtle gradient/texture. No generic stock.

2. **Trust Bar**
   - Compact horizontal strip showing key proof points.
   - Items: "20+ Years Combined Experience" / "Fully Insured & Bonded" / "BBB Accredited" / "4.5 Stars on Yelp"
   - Optional: small logos for BBB, Yelp, EstateSales.net

3. **Services Overview**
   - Brief intro paragraph: ABE collaborates with each client to create a tailored plan.
   - Three to four service cards:
     - Estate Sales
     - Estate Liquidation (Buyouts & Cleanouts)
     - Personal Property Appraisals
     - Post-Sale Cleanup & Donations (optional fourth card)
   - Each card: icon or small image, short description (2 to 3 sentences), link to the full service page.

4. **How It Works**
   - Simple 3- or 4-step visual process:
     - Step 1: Free Consultation (we visit your property and assess your needs)
     - Step 2: Custom Plan (we develop a strategy tailored to your situation)
     - Step 3: We Handle Everything (organizing, staging, pricing, marketing, execution)
     - Step 4: Post-Sale Support (cleanup, donations, final accounting)
   - This section helps anxious visitors see that the process is structured, professional, and hands-off for them.

5. **Service Area**
   - Map graphic or styled list of regions served.
   - Regions: Bay Area, Greater Sacramento, Placer County, El Dorado County
   - Specific cities mentioned: San Francisco, Sacramento, Auburn, Placerville
   - Brief copy: "Proudly serving Northern California families from the Bay to the Sierra foothills."

6. **Testimonial Highlight**
   - Two to three short, impactful client quotes.
   - Attribution with first name and general context (e.g., "Sarah M., Sacramento" or "Downsizing client, Auburn").
   - Link to full Reviews page.

7. **About / Meet Cortnee**
   - Brief introduction to Cortnee Beggs as the owner and driving force.
   - Photo of Cortnee (placeholder if not yet available).
   - Two to three sentences about her approach and why clients trust her.
   - This is important because Cortnee is a major differentiator per the reviews.

8. **Contact / Consultation CTA**
   - Headline: "Ready to Get Started?" or similar.
   - Short reassuring copy: free, no-obligation consultation.
   - Contact form with fields: Name, Phone, Email, Zip Code or City, Brief Description of Needs, Preferred Contact Method (phone/email).
   - Phone number displayed prominently (click-to-call on mobile).
   - Hours note: "We respond to inquiries 7 days a week."

9. **Footer**
   - (See Section 4.2 for footer contents)

---

### 5.2 Estate Sales ( /estate-sales )

**Purpose:** Explain the full-service estate sale offering in detail. Answer the question: "What does an estate sale with ABE actually look like?"

**Sections:**

1. **Page Hero**
   - Headline: something like "Full-Service Estate Sales, Start to Finish"
   - Brief intro copy establishing that ABE handles every aspect of the sale.

2. **What We Do (Services Breakdown)**
   - Detailed list of included services, presented as a content grid or accordion:
     - Free on-site estimate
     - Organizing, cataloging, and setting up all items
     - Professional appraisal and pricing
     - Advertising and marketing (online listings, signage, social media)
     - Sale day execution and management
     - Itemized accounting of all sales
   - Each item gets a short paragraph of explanation.

3. **Sale Day Logistics**
   - How sale addresses are published: listed on EstateSales.net and EstateSales.org at 6 AM on sale day.
   - What to expect during a sale (hours, how pricing works, etc.).
   - This section helps both clients and buyers understand the process.

4. **Post-Sale Services**
   - Disposal of remaining items
   - Whole-house cleanout
   - Donation coordination to a nonprofit of the client's choice
   - Emphasize that the client gets a fully cleared property, not a half-finished job.

5. **CTA Section**
   - "Let's talk about your estate sale." Consultation form or link to homepage form.
   - Phone number.

---

### 5.3 Estate Liquidation ( /estate-liquidation )

**Purpose:** Explain the broader range of liquidation options beyond traditional estate sales. Clarify what buyouts and cleanouts are and when each is appropriate.

**Sections:**

1. **Page Hero**
   - Headline conveying comprehensive liquidation solutions.
   - Brief copy: not every situation calls for a traditional sale. ABE offers multiple paths.

2. **Service Types**
   - Three-column or tabbed layout:
     - **Estate Sales:** Full public sale (link to Estate Sales page for details).
     - **Buyouts:** ABE purchases the contents outright. Faster timeline, less hassle for the client. Ideal when speed matters or when a public sale isn't practical.
     - **Cleanouts:** Complete property clearing. Removal of all remaining items, trash-out, and broom-clean handoff.
   - For each type: who it's best for, what's included, typical timeline.

3. **Experience and Expertise**
   - 20+ years combined experience
   - Ability to handle any situation (hoarding, large estates, unique collections, tight timelines)
   - Tone: reassuring, "we've seen it all and handled it with care."

4. **Compliance and Trust**
   - Fully insured and bonded
   - All necessary certifications and licenses held
   - Commitment to legal compliance and ethical practices

5. **CTA Section**
   - Consultation form or link. Phone number.

---

### 5.4 Appraisals ( /appraisals )

**Purpose:** Detail the appraisal service as a standalone offering. Build confidence that ABE's pricing is fair, knowledgeable, and thorough.

**Sections:**

1. **Page Hero**
   - Headline about accurate, professional appraisals.
   - Brief intro: knowing what your belongings are worth is the foundation of a successful estate sale.

2. **What We Appraise**
   - Categories: household goods, collectibles, antiques, furniture, art, jewelry, specialty items.
   - Emphasize breadth: "from everyday household items to rare collectibles."

3. **Our Approach / How It Works**
   - Step-by-step process:
     - Schedule a free estimate
     - On-site walkthrough of the property
     - Item-by-item or category-based valuation
     - Pricing strategy designed to maximize returns
   - Note the team's deep market knowledge and 20+ years of experience.

4. **When You Might Need an Appraisal**
   - Preparing for an estate sale
   - Insurance documentation
   - Divorce or legal proceedings
   - Downsizing and wanting to understand value before selling
   - Curiosity about inherited items

5. **CTA Section**
   - "Wondering what your items are worth?" Consultation form or link. Phone number.

---

### 5.5 Our Promise ( /our-promise )

**Purpose:** Build deep trust. Lay out ABE's values and commitments explicitly. This page does the emotional heavy lifting for visitors who are comparing options or feeling uncertain.

**Sections:**

1. **Page Hero**
   - Headline: centered on commitment and care.
   - Opening copy that acknowledges the emotional difficulty of estate liquidation and frames ABE's values as a response to that reality.

2. **Values / Commitments**
   - Presented as a series of content blocks (not a generic bulleted list). Each value gets a heading and a short paragraph:
     - **Trust and Transparency:** Open communication at every step. Honest appraisals. No hidden fees or surprises.
     - **Expertise and Accuracy:** Certified team with deep market knowledge. Reliable evaluations backed by 20+ years of experience.
     - **Confidentiality and Respect:** Handling sensitive personal matters with discretion. Recognizing the emotional weight items carry for families.
     - **Timely, Efficient Service:** Meeting deadlines without cutting corners. Respecting the client's timeline.
     - **Good Neighbors:** Minimizing disruption to the surrounding community during sales. Professional conduct that reflects well on the client and the neighborhood.

3. **Credentials and Compliance**
   - Fully insured and bonded
   - All necessary certifications and licenses
   - BBB Accredited
   - This can be a compact, badge-style display.

4. **Client-Centered Approach**
   - Copy about sensitivity to nostalgia, understanding that every item has a story.
   - Mention of Cortnee's personal involvement and hands-on leadership.
   - This is where the emotional core of the brand lives.

5. **CTA Section**
   - "Experience the ABE difference." Consultation link. Phone number.

---

### 5.6 Reviews ( /reviews )

**Purpose:** Let clients speak for ABE. Social proof is critical for this type of service where trust is the deciding factor.

**Sections:**

1. **Page Hero**
   - Headline: something like "What Our Clients Say"
   - Brief intro: the best measure of a company is the experience of the people they serve.

2. **Testimonial Grid / Cards**
   - Curated client quotes displayed as cards.
   - Each card: quote text, client first name, context (city or situation type), star rating if available.
   - Organize by theme if enough content exists:
     - Families praising care and professionalism
     - Seamless, stress-free experiences
     - Buyers complimenting pricing and staging
     - Praise for Cortnee specifically
   - Placeholder content is fine for launch; the client will supply real quotes.

3. **Ratings Snapshot**
   - Visual display of aggregate ratings:
     - Yelp: ~4.5 stars, 49 reviews
     - BBB: Accredited
     - EstateSales.org rating (if available)
   - Link out to each platform so visitors can read full reviews.

4. **CTA Section**
   - "Ready to see what we can do for you?" Consultation link. Phone number.

---

## 6. Global Components

### 6.1 Header

- ABE Liquidators logo (left)
- Primary navigation links (center or right)
- "Free Consultation" CTA button (right, visually distinct)
- Sticky on scroll (header shrinks slightly on scroll-down, remains accessible)
- Mobile: hamburger menu with slide-out drawer

### 6.2 Footer

- Company name and logo
- Phone: (916) 521-1077 (click-to-call)
- Location: Sacramento, CA 95821
- Instagram: @abe.liquidators (linked)
- External profile links: BBB, Yelp, EstateSales.net, EstateSales.org
- Navigation links (all pages)
- Service area summary
- Copyright 2026 Attic to Basement Estate Liquidators. All Rights Reserved.

### 6.3 Contact / Consultation Form

- Reusable component that appears on the homepage and can be embedded or linked from other pages.
- Fields: Name, Phone, Email, City or Zip Code, Brief Description, Preferred Contact Method
- On submission: sends an email notification to the client (use Formspree, Resend, or a serverless function). Displays a confirmation message to the user.
- Form validation: required fields marked, email format validated, phone format flexible.
- No CAPTCHA at launch unless spam becomes an issue; use honeypot field instead for cleaner UX.

### 6.4 Click-to-Call

- Phone number displayed on every page (footer at minimum, often in CTA sections).
- On mobile, tapping the number initiates a phone call.
- Track clicks via GTM for conversion data.

---

## 7. Content Requirements

### 7.1 Copy

- All page copy needs to be written or rewritten for the new site. The current site's copy is overly formal in places ("Greetings from your prospective Estate Liquidator") and can be modernized while keeping the warm, trustworthy tone.
- Copy should be written at approximately an 8th-grade reading level. Clear, direct, and human.
- Every page should have a clear primary message and a single primary CTA.

### 7.2 Photography

- Placeholder images should be used during development.
- Recommend the client invest in:
  - Professional headshot of Cortnee
  - Before/after or in-progress photos of estate sale setups
  - Detail shots of interesting items (antiques, collectibles, furniture)
  - Team working shots (candid, not posed)
- All placeholder images should have descriptive alt text indicating what the final image should depict.

### 7.3 Testimonials

- Client will supply approved testimonial quotes.
- Use placeholder quotes during development, clearly marked as such.
- Each testimonial should have: quote text, first name, city or region, and optionally a star rating.

---

## 8. Third-Party Integrations

| Integration | Purpose | Implementation |
|---|---|---|
| Google Analytics 4 | Traffic and behavior tracking | Script tag via GTM |
| Google Tag Manager | Tag management container | Script in document head |
| Formspree or Resend | Form submission handling | API integration on form submit |
| Google Maps embed (optional) | Service area visualization | Embedded iframe or static map image |
| Schema.org JSON-LD | Structured data for SEO | Script blocks in page head |

---

## 9. File and Folder Structure (Suggested)

```
/
├── public/
│   ├── images/              # Optimized images and placeholders
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout (header, footer, metadata)
│   │   ├── page.tsx         # Homepage
│   │   ├── estate-sales/
│   │   │   └── page.tsx
│   │   ├── estate-liquidation/
│   │   │   └── page.tsx
│   │   ├── appraisals/
│   │   │   └── page.tsx
│   │   ├── our-promise/
│   │   │   └── page.tsx
│   │   └── reviews/
│   │       └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   └── TestimonialCard.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── TrustBar.tsx
│   │   │   ├── ServicesOverview.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── ServiceArea.tsx
│   │   │   ├── TestimonialHighlight.tsx
│   │   │   ├── MeetCortnee.tsx
│   │   │   └── ConsultationCTA.tsx
│   │   └── forms/
│   │       └── ConsultationForm.tsx
│   ├── lib/
│   │   └── metadata.ts      # Centralized SEO metadata
│   └── styles/
│       └── globals.css       # Tailwind base, global styles
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

---

## 10. SEO Metadata (Per Page)

| Page | Title Tag | Meta Description |
|---|---|---|
| Homepage | Estate Sale Services Sacramento | ABE Liquidators | Full-service estate sales, buyouts, cleanouts, and appraisals across Northern California. Free consultation. 20+ years experience. |
| Estate Sales | Estate Sale Management | ABE Liquidators | Professional estate sale services from setup to cleanup. Free estimates, expert pricing, and full marketing included. |
| Estate Liquidation | Estate Liquidation Services | ABE Liquidators | Estate sales, buyouts, and cleanouts for Northern California families. Fully insured, bonded, and experienced. |
| Appraisals | Personal Property Appraisals | ABE Liquidators | Accurate appraisals for household goods, antiques, collectibles, and more. Expert valuations backed by 20+ years of experience. |
| Our Promise | Our Commitment to You | ABE Liquidators | Transparent, respectful, and professional estate liquidation. Learn about ABE's values and client-centered approach. |
| Reviews | Client Reviews and Testimonials | ABE Liquidators | See what families across Northern California say about working with ABE Liquidators. 4.5 stars across review platforms. |

---

## 11. Launch Checklist

Pre-launch items to verify before going live:

- [ ] All six pages built and content reviewed by client
- [ ] Contact form tested end-to-end (submission, email delivery, confirmation)
- [ ] Click-to-call tested on mobile devices
- [ ] Responsive design tested at mobile, tablet, and desktop breakpoints
- [ ] Lighthouse audit passing (Performance 90+, Accessibility 90+, SEO 90+)
- [ ] All images optimized and served in WebP/AVIF
- [ ] Schema.org structured data validated (Google Rich Results Test)
- [ ] XML sitemap generated and submitted to Google Search Console
- [ ] robots.txt configured correctly
- [ ] Google Analytics 4 and GTM firing correctly
- [ ] Open Graph and Twitter Card tags rendering correct previews
- [ ] 301 redirects configured if any existing URLs change
- [ ] SSL certificate active (HTTPS)
- [ ] Favicon and touch icons in place
- [ ] 404 page styled and helpful
- [ ] Cookie/privacy notice if required by analytics setup
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)

---

## 12. Out of Scope (for initial launch)

The following items are explicitly not part of the initial build but could be added later:

- Blog or content marketing section
- Photo gallery page (currently handled via Yelp and Instagram)
- Online scheduling/calendar booking integration
- E-commerce or online auction functionality
- CMS integration (content is hardcoded initially)
- Live chat widget
- Multi-language support
- Client portal or dashboard
- FAQ page (could be a strong addition in a Phase 2)

---

## 13. Success Metrics

How to measure whether the new site is working:

- **Consultation form submissions per month** (primary KPI; track via GA4 + form provider)
- **Phone call clicks per month** (tracked via GTM)
- **Organic search traffic** (GA4, compared to baseline if available)
- **Keyword rankings** for target terms: "estate sale Sacramento," "estate liquidation Northern California," "estate sale company near me"
- **Bounce rate and time on site** (directional indicators of content quality)
- **Page speed scores** (Lighthouse, PageSpeed Insights)
