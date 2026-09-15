# DARE v3 (Document Assembly & Render Engine)

![DARE Engine](https://dare.pages.dev/og.png)

DARE is a deterministic, token-efficient markup language built specifically for AI Agents. It compiles directly into native PDF buffers on the Cloudflare Edge in 0ms.

## Why DARE?
HTML is incredibly token-heavy and verbose, making it expensive and slow for AI models to generate complex documents. Traditional PDF generators (like `pdfmake`) require massive nested JSON structures that are highly prone to hallucination by LLMs.

DARE solves this by providing a hyper-compact, declarative syntax that strips away the complexities of web design. 

## Documentation
The complete syntax, component library, and API guidelines are available on the live documentation platform:
👉 **[dare.pages.dev/docs](https://dare.pages.dev/docs)**

## AI Agent Integration
To give your autonomous agent native PDF generation superpowers, simply drop the `dare-skill.md` file into your agent's workspace.

```bash
# Add the DARE Skill to an Agent Workspace
curl -s https://dare.pages.dev/dare-skill.md > .agents/skills/dare-engine/SKILL.md
```

## Local Development (DARE Platform)
The DARE v3 website is built with Next.js 15 and deployed on Cloudflare Pages using `next-on-pages`.

```bash
cd web
npm install
npm run dev
```

To build and test the Edge API locally:
```bash
npm run build
npx @cloudflare/next-on-pages
npx wrangler pages dev .vercel/output/static --compatibility-flags="nodejs_compat"
```

## License
MIT
