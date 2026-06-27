---
name: sanity-content
description: Sanity schema and content modeling conventions. Use when creating or editing Sanity schemas, GROQ queries, or deciding what becomes CMS content vs hardcoded.
---

# Sanity Content Modeling

## When Sanity earns its place

Model in Sanity only what the client will actually edit: blog posts, case studies, team, jobs, testimonials, legal pages. Hero copy, nav labels, and one-off marketing sections stay in code unless the client explicitly needs to edit them. Every schema is maintenance; default to fewer documents.

## Schema conventions

- One document type per file in sanity/schemas/documents/, shared objects in sanity/schemas/objects/, all registered in sanity/schemas/index.ts
- Use defineType / defineField everywhere (typed, validated)
- Every document gets: title (required), slug (required, source title), seo object (metaTitle, metaDescription, ogImage)
- Images: always image type with hotspot: true, and a required alt field on the image object itself
- Rich text: portable text named body, with a deliberately limited block set: h2, h3, normal, blockquote, link, image-with-alt. No h1 in rich text, no free embeds unless scoped
- References over inline duplication: author, category, relatedProjects are references
- Validation on everything user-facing: required(), max() on titles and meta descriptions (60/160)
- orderRankField or a manual order number for anything the client will reorder
- Preview config on every document so the Studio list is readable

## Naming

- Document types: singular camelCase: post, caseStudy, teamMember
- Fields: camelCase, no abbreviations: publishedAt not pubDate

## GROQ

- Queries live in one file per stack: src/lib/sanity/queries.ts. No inline GROQ in components
- Always project explicit fields, never *[...]{ ... } returning whole documents
- Slug lookups: *[_type == "post" && slug.current == $slug][0]
- Images resolved through @sanity/image-url builder with explicit width and auto format

## Astro stack

- Fetch at build time in the page frontmatter. Dynamic routes via getStaticPaths
- Webhook from Sanity triggers a rebuild on publish (set up on the host)

## Next.js stack

- Fetch in Server Components via the sanity client with revalidateTag / time-based ISR
- Draft mode wired for previews when the project needs editor preview

## Anti-patterns

- A "page builder" of 20 generic section types for a 5 page marketing site
- Storing design decisions (colors, spacing, layout variants) as editable CMS fields
- Rich text fields where a plain string does the job
- Singleton settings documents stuffed with everything; split: siteSettings, navigation, redirects
