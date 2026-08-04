# Fonts

Both typefaces are self-hosted rather than loaded from Google Fonts. That keeps the
app free of any third-party request, so it paints in full on a dead gym connection,
and it means the service worker can store the type on the phone with everything else.

| File | Family | Covers |
|---|---|---|
| `figtree-latin.woff2`     | Figtree 400–800 | Basic Latin |
| `figtree-latin-ext.woff2` | Figtree 400–800 | Latin Extended |
| `mulish-latin.woff2`      | Mulish 400–800  | Basic Latin |
| `mulish-latin-ext.woff2`  | Mulish 400–800  | Latin Extended |
| `mulish-vietnamese.woff2` | Mulish 400–800  | Vietnamese |

All five are variable fonts: one file per subset covers every weight from 400 to 800.

## Why there are two families

**Figtree has no Vietnamese glyphs.** Nothing in `U+1EA0–U+1EF9` — that's ạ ả ấ ầ ậ ắ
ế ề ệ ị ọ ố ồ ộ ớ ợ ụ ứ ừ ữ and the rest of the toned vowels. Set Vietnamese in
Figtree and the phone silently borrows a second typeface for those letters only, so
"Bắt đầu tập" arrives in two fonts at once.

Mulish covers Vietnamese completely and has the same humanist-geometric shapes, high
x-height and open apertures as Figtree, so the two languages look like one product.
`styles.css` applies it through `:lang(vi)` — the two never meet inside a word.

## Replacing or updating them

The files came from Google Fonts. To refresh one, fetch the family's CSS with a modern
browser user-agent, take the `.woff2` URL for the subset you want, and keep both the
file name and the `unicode-range` in `styles.css` in step with the source:

```bash
curl -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120" \
  "https://fonts.googleapis.com/css2?family=Mulish:wght@400..800&display=swap"
```

If you swap in a different family, check it actually covers Vietnamese first — most
don't. Both Figtree and Mulish are licensed under the SIL Open Font License 1.1.
