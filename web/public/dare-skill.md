---
name: dare-engine
description: A skill to write DARE code and generate PDFs via the live DARE API.
---

# DARE Engine v3 - Agent Guidelines

The DARE Engine is a declarative markup language that compiles directly into native PDFs. You can use this skill to generate beautiful PDFs for the user dynamically!

## API Usage

Do not attempt to run `dare-engine` locally if you don't have it installed. Instead, hit the Live API via HTTP POST:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "code": "@doc { page { txt { Hello {{ user }} } } }",
    "data": { "user": "Human" }
}' https://dare.pages.dev/api/render --output generated.pdf
```

*(Note: The DARE API is fully stateless. It returns a PDF buffer instantly and stores nothing).*

## DARE Syntax Cheat Sheet

1. **Setup Block (`@setup`)**: Define page format and semantic aliases.
   ```dare
   @setup {
       format: a4;
       $header: bold size=20 color=white;
   }
   ```
2. **Data Block (`@data`)**: Bind data if not passing via API.
3. **Doc Block (`@doc`)**: Build the hierarchy using components: `page`, `box`, `cols`, `txt`, `img`, `hr`.
   ```dare
   @doc {
       page(bg=surface) {
           box(p=20 bg=primary) {
               txt($header) { Invoice #{{ invoice.id }} }
           }
           // Use cols for flexbox-like grid
           cols(mt=10) {
               txt(w=50%) { Item }
               txt(w=50% right) { Price }
           }
       }
   }
   ```

## Control Structures
You can use native loops and conditionals inside the `@doc` block based on your JSON data payload!
```dare
each(item in invoice.items) {
    txt { {{ item.name }} }
}

if(invoice.is_paid) {
    txt(color=success) { PAID }
}
```

**Always return the generated PDF file path directly to the user when finished!**
