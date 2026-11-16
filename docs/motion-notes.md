# Motion notes

Annotations from the Figma component **Motion note** (`260:57`, "Yellow annotation
for motion/dev notes"). They describe future animation and are **not rendered** on the
site — iteration 1 is fully static.

Source: page «Main direction» › section «2» (`256:68174`). Collected via the Plugin API
(all instances of `260:57`), text copied verbatim.

| Page | Block (Figma layer path) | Note | Figma node |
|---|---|---|---|
| Home (Homepage — Variant 1b (light)) | — | *No Motion note instances on this frame* | `256:68175` |
| Home | Manifesto | **Implemented (client request 2026-11-16, not a Figma note):** characters reveal one after another with scroll, soft gradient on the leading edge (48 chars), eased catch-up (0.06); unrevealed text is a faint ghost (opacity 0.12) that fills to black, as in the Studio Figma note. Range: top at 85% → bottom at 40% of the viewport. Slowed on client request 2026-11-16 (ref. outcrowd.io). `components/home/RevealText.tsx`; reduced motion / no JS → full text. | `256:68196` |
| Home | In numbers | **Implemented (client request 2026-11-17):** counters run from 0 to 700+ / 5.0 / 93% once when the block is 40% in view, 1.6 s ease-out; width reserved by the final value; reduced motion / no JS → final value. `components/home/CountUp.tsx` | `256:68281` |
| All pages | Footer | **Implemented (client request 2026-11-17):** while the footer scrolls in, its fill goes white → black with the scroll; text flips black → white at the halfway point and crossfades over 700ms (`--duration-surface`), as does the floating CTA. Update: crossfade added on client request (the flip felt abrupt). `components/ds/Footer.tsx` | `260:33` |
| Home | Services | **Implemented (client request 2026-11-16):** hovered row turns grey (`bg/surface`), its photo appears in a 220×290 frame tilted 3° (Figma «Photo U1» `307:8638`) and follows the cursor with a little extra tilt; soft synthesized tick on hover (after the first click/tap — browser audio policy). Mouse/trackpad only; reduced motion → no follow/tilt animation, no transitions. `components/home/ServicesList.tsx`, `lib/hover-sound.ts` | `256:68199` |
| Work | Hero | фільтр перемикає кейси без перезавантаження: картки плавно перебудовуються (FLIP) | `262:5033` |
| Work | Frame (case grid) | фото «відкриваються» маскою знизу при скролі; на hover — легкий zoom і курсор-кнопка «View» | `262:5085` |
| Work | Index › Frame | на hover рядок підсвічується, фото проєкту випливає за курсором і нахиляється | `262:5154` |
| Studio / About | Hero | букви заголовка підіймаються по черзі; фото розкриваються з маски, ліве — повільний zoom | `262:5189` |
| Studio / About | Manifesto | слова «засвічуються» з сірого в чорний у такт скролу | `262:5192` |
| Studio / About | Principles | рядок, що в кадрі, стає чорним; на hover поруч випливає фото | `262:5195` |
| Studio / About | In numbers | лічильники від 0, коли блок у кадрі | `262:5216` |
| Studio / About | Team | на hover портрет змінюється на AI-версію тієї ж людини | `262:5219` |
| Studio / About | Awards › Frame | на hover рядка фото проєкту випливає за курсором | `262:5222` |
| Studio / About | Clients | логотипи по одному змінюються в комірках, як табло | `262:5225` |
| Studio / About | Studios | годинники йдуть у реальному часі · двокрапка блимає раз на секунду · статус Open / Opens at рахується за місцевим часом | `262:5228` |
| Case — NOVA | Product · Home & chat media | центральний Home анімований (поле вводу); мобільні екрани виїжджають знизу по черзі | `262:4322` |
| Case — NOVA | Frame (stats) | лічильники від 0 | `262:4362` |
| Case — IndustryLens | Frame (stats) | лічильники від 0 | `262:4539` |
| Case — PulseFit | Frame (stats) | лічильники від 0 | `262:4716` |
| Case — Graaho | Frame (stats) | лічильники від 0 | `262:4876` |

Block names marked "Frame" are unnamed frames in Figma; the bracketed hint will be
replaced with the exact section name once each page is built (step 3–4).
