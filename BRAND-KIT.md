# TMdevs — Brand Kit

## Identidad visual

Estética **dark, minimal, orgánica**. Fondo grafito oscuro con textura grain (SVG feTurbulence), viñeta radial y cursor personalizado. La paleta evita negros puros: el grafito cálido y los tonos stone/arena dan calidez sin frivolidad.

---

## Paleta de colores

### Grafito (fondos y superficies)

| Token | Hex | Uso |
|---|---|---|
| `graphite-950` | `#0f0f0d` | Fondo más profundo / sombras extremas |
| `graphite-900` | `#141412` | Track del scrollbar, overlays profundos |
| `graphite-800` | `#1a1a18` | `theme-color` meta, superficies elevadas |
| `graphite-700` | `#222220` | **Body background** (superficie base) |
| `graphite-600` | `#2e2e2b` | Thumb del scrollbar, bordes de inputs |
| `graphite-500` | `#3a3a36` | Bordes sutiles, separadores |

### Stone / Arena (textos y secundarios)

| Token | Hex | Uso |
|---|---|---|
| `stone-500` | `#a8a8a0` | Texto terciario / placeholders |
| `stone-400` | `#c0c0b8` | Texto secundario |
| `stone-300` | `#d0d0c8` | Texto de apoyo |
| `stone-200` | `#e0e0d8` | Cursor border, texto normal |
| `stone-100` | `#f2f2ea` | **Color de texto principal** (`body`) |

### Accent & Cream

| Token | Hex | Uso |
|---|---|---|
| `accent` | `#c8b89a` | Acento principal — CTA, focus, hover del cursor, selección de texto |
| `cream` | `#f5f4ee` | Disponible para superficies muy claras / contrastes máximos |

### Colores de sistema (UI)

| Valor | Uso |
|---|---|
| `rgba(10, 10, 8, 0.5)` | Viñeta radial del body (`::after`) |
| `rgba(46, 46, 43, 0.8)` | Border inferior de inputs en reposo |

---

## Tipografía

### Familia principal

**Inter** — Variable (opsz 14–32, weight 100–900, incluye itálica)  
Cargada desde Google Fonts con `display=swap`.

```
font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
```

Token CSS: `--font-display`

### Escala base

| Propiedad | Valor |
|---|---|
| Base `font-size` | `1.0625rem` (17 px) |
| Body color | `stone-100` (`#f2f2ea`) |
| Body background | `graphite-700` (`#222220`) |

### Clase utilitaria: `.hero-subtitle`

```css
font-size: clamp(0.68rem, 2.2vw, 0.9rem);
letter-spacing: 0.14em;        /* → 0.28em en ≥ 768px */
text-transform: uppercase;
line-height: 1.8;
```

---

## Efectos visuales de marca

| Efecto | Implementación |
|---|---|
| **Grain / ruido** | `body::before` — SVG feTurbulence fractalNoise, `opacity: 0.05`, `mix-blend-mode: overlay` |
| **Viñeta radial** | `body::after` — radial-gradient transparente → `rgba(10,10,8,0.5)` |
| **Cursor personalizado** | Círculo 18 px, border `stone-200`; al hover → 36 px, border `accent` |
| **Text selection** | `background: accent` + `color: graphite-900` |
| **Scrollbar** | 3 px, track `graphite-900`, thumb `graphite-600` |
| **Scroll behavior** | `smooth` |

---

## Tokens rápidos (CSS variables)

```css
--color-graphite-950: #0f0f0d;
--color-graphite-900: #141412;
--color-graphite-800: #1a1a18;
--color-graphite-700: #222220;
--color-graphite-600: #2e2e2b;
--color-graphite-500: #3a3a36;

--color-stone-500: #a8a8a0;
--color-stone-400: #c0c0b8;
--color-stone-300: #d0d0c8;
--color-stone-200: #e0e0d8;
--color-stone-100: #f2f2ea;

--color-accent: #c8b89a;
--color-cream:  #f5f4ee;

--font-display: "Inter", "Helvetica Neue", Arial, sans-serif;
```

---

## Resumen de personalidad

- **Oscuro pero cálido** — grafito con toque verdoso/beige, no negro frío
- **Minimalista con textura** — grain + viñeta dan profundidad sin elementos decorativos
- **Acento arena/camel** (`#c8b89a`) — único color de énfasis, evita azules/rojos corporativos
- **Tipografía neutra y variable** — Inter cubre todo el rango de peso en una sola familia
