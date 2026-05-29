---
name: Engineered Precision
colors:
  surface: '#121317'
  surface-dim: '#121317'
  surface-bright: '#38393e'
  surface-container-lowest: '#0d0e12'
  surface-container-low: '#1a1b20'
  surface-container: '#1f1f24'
  surface-container-high: '#292a2e'
  surface-container-highest: '#343439'
  on-surface: '#e3e2e8'
  on-surface-variant: '#c4c5d9'
  inverse-surface: '#e3e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#8e90a2'
  outline-variant: '#434656'
  surface-tint: '#b8c3ff'
  primary: '#b8c3ff'
  on-primary: '#002387'
  primary-container: '#2d5bff'
  on-primary-container: '#efefff'
  inverse-primary: '#104af0'
  secondary: '#e0b6ff'
  on-secondary: '#4c007d'
  secondary-container: '#6d11ad'
  on-secondary-container: '#d7a4ff'
  tertiary: '#00dce5'
  on-tertiary: '#003739'
  tertiary-container: '#00797e'
  on-tertiary-container: '#bafbff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c3ff'
  on-primary-fixed: '#001355'
  on-primary-fixed-variant: '#0035bd'
  secondary-fixed: '#f2daff'
  secondary-fixed-dim: '#e0b6ff'
  on-secondary-fixed: '#2e004e'
  on-secondary-fixed-variant: '#6a0baa'
  tertiary-fixed: '#63f7ff'
  tertiary-fixed-dim: '#00dce5'
  on-tertiary-fixed: '#002021'
  on-tertiary-fixed-variant: '#004f53'
  background: '#121317'
  on-background: '#e3e2e8'
  surface-variant: '#343439'
  surface-deep: '#0B0C10'
  surface-elevated: '#1A1B23'
  surface-glass: rgba(26, 27, 35, 0.6)
  border-subtle: '#2E3039'
  text-dim: '#9499AD'
  accent-gradient: 'linear-gradient(135deg, #2D5BFF 0%, #9D4EDD 100%)'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  section-gap-lg: 120px
  section-gap-md: 80px
  card-padding: 32px
  stack-sm: 8px
  stack-md: 16px
---

## Brand & Style

The design system is crafted for a Product Engineer who bridges the gap between high-level aesthetic vision and technical execution. The brand personality is **sophisticated, technical, and high-performance**. It avoids the clutter of traditional portfolios in favor of a "IDE-meets-Luxury-Brand" aesthetic.

The visual style combines **Minimalism** with **Glassmorphism** and **Corporate Modern** influences. It utilizes a dark, atmospheric foundation to let technical content and vibrant accents shine. The interface should feel incredibly fast and responsive, evoking the reliability of well-written code and the polish of a premium consumer product.

## Colors

This design system utilizes a deep, multi-tonal dark theme. The foundation is a rich charcoal (`#0B0C10`), providing a high-contrast base for the electric primary and secondary colors.

- **Primary & Secondary:** Derived from the brand logo, these colors form a vibrant gradient used for key calls-to-action, active states, and focus indicators.
- **Tertiary:** A bright cyan used sparingly for "success" states or to highlight specific technical metrics and code highlights.
- **Neutral:** A range of slate grays and silvers used to define structural hierarchy without competing for attention.

Use gradients primarily for storytelling elements, such as project headers or progress indicators, while keeping functional UI components (buttons, inputs) in solid, high-legibility fills.

## Typography

The typography strategy emphasizes the "Engineering" and "Product" duality. 

- **Geist** provides a modern, geometric feel for headlines, offering the precision of a technical typeface with the elegance of a display font.
- **Inter** is the workhorse for body copy, ensuring long-form case studies and descriptions remain highly legible.
- **JetBrains Mono** is used for labels, metadata, and technical snippets. It acts as a visual cue for "Engineering" content, distinguishing facts and figures from narrative text.

Strictly adhere to the `label-caps` style for small headers and categories to maintain a disciplined, structured look.

## Layout & Spacing

The layout uses a **fixed-grid** approach for desktop and a **fluid-grid** for mobile. 
- **Desktop:** 12-column grid with a 1280px max-width. Use 24px gutters.
- **Mobile:** Single-column layout with 16px side margins.

Spacing follows a strict 8px base unit. Sections are separated by significant vertical whitespace (`section-gap-lg`) to allow the user to focus on one "chapter" of the portfolio at a time. Project cards should use asymmetrical layouts (e.g., 7-column image, 5-column text) to create a more editorial, high-end storytelling feel compared to simple centered stacks.

## Elevation & Depth

Depth in this design system is created through **Backdrop Blurs** and **Tonal Layering** rather than traditional heavy shadows.

- **Level 1 (Base):** The `surface-deep` background.
- **Level 2 (Cards):** `surface-elevated` with a 1px `border-subtle`. No shadow.
- **Level 3 (Overlays/Modals):** `surface-glass` with a 20px backdrop-blur and a subtle `white/10%` top border to simulate light catching the edge of a glass pane.
- **Interactive States:** When hovering over cards, apply a very soft, diffused shadow tinted with the primary blue (`rgba(45, 91, 255, 0.15)`) and a slight scale increase (1.02x).

## Shapes

The shape language is **Soft** and **Precise**. 
- Standard UI elements (buttons, inputs) use a 0.25rem (`4px`) radius to maintain a professional, sharp look.
- Larger containers like cards and sections use 0.75rem (`12px`) to feel modern and approachable without becoming "bubbly."
- Skill chips and tags use a full pill-shape to provide a distinct visual contrast against the rectangular grid of cards.

## Components

### Buttons
- **Primary:** Solid `accent-gradient` with white text. High-contrast, sharp corners.
- **Secondary:** Ghost style with `border-subtle` and a subtle hover fill of `white/5%`.
- **Icon Buttons:** Circular with a glass background.

### Skills Section (The "Grid")
Abandon progress bars. Use a **Categorized Bento Grid**. Each skill category (e.g., "Backend") is a card. Inside, individual skills are represented by text and a "proficiency indicator" that is a subtle, high-tech glyph or a minimalist sparkline rather than a percentage bar.

### Project Cards
- **Structure:** Large-scale imagery on one side, technical stack and "The Problem" text on the other.
- **Interaction:** On hover, the image should subtly zoom, and a "View Case Study" button should appear using a slide-in animation.
- **Metadata:** Use `label-caps` for tech stack tags at the top of the card.

### Journey Section
Replace the vertical line timeline with a **Horizontal Scroll** or **Step-based Layout**. Use a monospaced "Year" indicator as the primary anchor for each entry to emphasize the chronological engineering progression.

### Input Fields
Dark backgrounds (`#0B0C10`), 1px `border-subtle`, and a `primary_color` focus ring. Use `JetBrains Mono` for placeholder text to maintain the technical theme.