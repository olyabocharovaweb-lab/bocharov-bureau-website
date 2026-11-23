# Motion notes

Annotations from the Figma component **Motion note** (`260:57`, "Yellow annotation
for motion/dev notes"). They describe future animation and are **not rendered** on the
site — iteration 1 is fully static.

Source: page «Main direction» › section «2» (`256:68174`). Collected via the Plugin API
(all instances of `260:57`), text copied verbatim.

| Page | Block (Figma layer path) | Note | Figma node |
|---|---|---|---|
| Home (Homepage — Variant 1b (light)) | — | *No Motion note instances on this frame* | `256:68175` |
| Home | Manifesto | **Implemented (client request 2026-11-16, not a Figma note; ref. outcrowd.io):** no pin (client: no hold on the block). Characters reveal over the text's whole pass through the viewport — from its top entering at the bottom edge until its bottom reaches 30% (~900px at 1440×900); soft leading edge 64 chars; eased catch-up 0.06 so wheel steps glide; unrevealed text is a faint ghost (opacity 0.12) that fills to black. `components/home/RevealText.tsx`; reduced motion / no JS → full text. | `256:68196` |
| Case (all) | Challenge | **Implemented (client request 2026-11-16, not a Figma note):** same scroll reveal as Home Manifesto (`RevealText`), whole text text/primary (Figma: second part secondary). `components/case/CasePage.tsx`; reduced motion / no JS → full text. | `256:70805` |
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
| Home (mobile) | Footer «Back to top» | **Implemented (client brief 2026-11-17):** smooth scroll to the top; instant with prefers-reduced-motion. `components/ds/Footer.tsx` | `325:5114` |
| Work | Hero / filters | фільтр перемикає кейси без перезавантаження: картки плавно перебудовуються (FLIP) — **filtering implemented without animation** | `262:5033` |
| Work | Case grid | фото «відкривається» маскою знизу при скролі; на hover — легкий zoom і курсор-кнопка «View» | `262:5085` |
| Work | Index | на hover рядок підсвічується, фото проєкту випливає за курсором і нахиляється — **plate + static tilted photo implemented; follow / fade not** | `262:5154` |
| Case — LINQUE | Frame (stats) | лічильники від 0 | `344:7089` |
| About | Who we are, Idea to launch | **Implemented (client request 2026-11-23, not a Figma note):** same scroll reveal as Home Manifesto (RevealText), whole text text/primary (Figma: second part grey); hero title and CTA heading all black too. `components/about/AboutPage.tsx` | `421:6202`, `421:6250` |
