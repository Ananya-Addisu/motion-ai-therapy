# Dark Neo-Brutalism UI Transformation Plan - RehabAI

## Goal
Completely transform the RehabAI platform's UI/UX into a high-contrast **Dark Neo-Brutalism** aesthetic as requested by the user.

## Design Principles (Dark Neo-Brutalism)
- **High Contrast Palette**:
  - Background: Deep Dark (`#1a1a1a`).
  - Card Background: Charcoal (`#262626`).
  - Foreground/Text/Borders: Light Gray/Off-White (`#f0f0f0`).
  - Primary Accent: Dark Red (`#8b0000`).
  - Secondary Accent: Deep Blue (`#00008b`).
- **Heavy Borders**: Use `3px` or `4px` borders in `#f0f0f0` color.
- **Harsh Shadows**: Use non-blurred, offset light shadows (`#f0f0f0`) instead of black shadows to pop against the dark background.
- **Typography**: Bold, impactful, often uppercase and italicized for headings.
- **Sharp Corners**: Zero or minimal border-radius (`0px`).

## Implementation Steps

### 1. Style Definitions (`src/brutal.css`)
- Update CSS variables for the dark palette.
- Define `shadow-brutal` as `4px 4px 0px 0px #f0f0f0`.
- Update component classes (`.brutal-card`, `.brutal-btn`) to use the new colors and light shadows.

### 2. Global Layout & Components
- **Navbar**: Dark background with a thick bottom border and high-contrast links.
- **Buttons**: High-impact red/blue with thick borders and "click" animation (shadow removal).
- **Cards**: All cards across dashboards will be updated to the dark background with light borders and shadows.

### 3. Page Overhauls
- **Landing Page**: Hero section with dark backgrounds, framed images, and bold typography.
- **Patient/Clinician Dashboards**: High-contrast charts (using red/blue/white), status badges with thick borders, and dark-themed exercise cards.
- **Exercise Session**: Transform the AI HUD into a dark-brutalist interface with high-contrast skeletal tracking.
- **Auth**: Simplified dark-themed login/register forms with heavy light-colored shadows.

### 4. Component Refactoring
- Replace hardcoded color classes (e.g., `bg-white`, `bg-[#f3f4f6]`, `border-black`, `shadow-[...rgba(0,0,0,1)]`) with the new theme variables and utility classes.
