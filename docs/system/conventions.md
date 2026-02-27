# Conventions

## Code Style

- 4-space indentation
- TypeScript strict mode
- Prefer `const` over `let`

## File Organization

- Pages: `src/app/<route>/page.tsx` (one per route)
- Layout components: `src/components/layout/`
- UI primitives: `src/components/ui/`
- Page sections: `src/components/sections/`
- Forms: `src/components/forms/`
- Metadata: `src/lib/metadata.ts`
- Global styles: `src/styles/globals.css`

## Naming

- PascalCase for components and types
- camelCase for variables and functions
- kebab-case for route directories and CSS classes

## Component Patterns

- Pages are composed of section components
- Every page includes a hero, content sections, and a consultation CTA
- ConsultationForm is shared and reusable across pages
- Anti-spam: honeypot field on forms (no CAPTCHA unless spam becomes an issue)
