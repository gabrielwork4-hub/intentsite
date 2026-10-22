# Estratégia de SEO — clusters, silagem e mapa de conteúdo

> Estado em 2026-10-22 (commit `1a4047e`). Documento irmão: [`seo-diagnostico.md`](seo-diagnostico.md).
> Números extraídos dos arquivos do repositório (sitemaps, canonicals e links internos do corpo das páginas).

## 1. Visão

A Intent Marketing vende três serviços (landing page, tráfego pago, consultoria de SEO). O blog captura demanda de busca em cada tema e leva o leitor à página de serviço correspondente. A arquitetura é **hub-and-spoke**: cada tema tem um **pilar** (`post-guia-completo-*`) que reúne o assunto, **spokes** que respondem a perguntas específicas (preço, nicho, ferramenta, comparação) e uma **página de serviço** que recebe a intenção comercial.

```
Home (/)
 ├── Serviços (intenção comercial)
 │    ├── /criacao-de-landing-page
 │    ├── /gestao-de-trafego-pago
 │    └── /consultoria-seo
 ├── /blog/  (índice: linka os 74 conteúdos)
 │    ├── Pilar SEO ............ post-guia-completo-seo ........... → /consultoria-seo
 │    ├── Pilar Meta Ads ....... post-guia-completo-meta-ads ...... → /gestao-de-trafego-pago
 │    ├── Pilar Tráfego Pago ... post-guia-completo-trafego-pago .. → /gestao-de-trafego-pago
 │    └── Pilar Landing Page ... post-guia-completo-landing-page .. → /criacao-de-landing-page
 └── Prova/dados: /blog/pesquisa-benchmarks-intent + dados/*.csv (CC BY 4.0)
```

## 2. Estrutura de silagem

A silagem é feita por **links internos e por sitemap temático**, não por pastas de URL: todas as URLs de blog ficam em `/blog/post-*` (estrutura plana) e a separação lógica aparece nos 6 sitemaps. É intencional: URLs curtas, sem aninhamento e sem redirects para refatorar.

**Regras 1, 2, 4, 5 e 6 estão em vigor (verificadas no código); a 3 é meta com lacuna:**

1. Todo spoke linka o **pilar do seu cluster** (0 exceções nos 4 clusters que têm pilar).
2. Spokes linkam entre si dentro do cluster (ex.: SEO: 221 de 289 links de saída ficam no próprio cluster; Landing pages: 99 de 146; Meta Ads: 90 de 136).
3. **Meta, ainda não cumprida:** todo spoke deveria linkar a **página de serviço** do seu cluster (bloco "Precisa de ajuda para executar?"). Hoje só o cluster Landing pages cumpre (15/15). Os demais: SEO 6/26, Meta Ads 2/15, Tráfego pago 2/9, Google Ads 1/5 (medido em 2026-10-22, links no corpo, sem navegação/rodapé). Ver oportunidade #1 na seção 4.
4. Links entre clusters existem onde há ponte temática real (ex.: `google-ads-vs-meta-ads`, `seo-ou-trafego-pago-2000`, `landing-page-para-advogados` ↔ `seo-advocacia`), sem linkagem cruzada em massa.
5. `/blog/` linka as 74 páginas de blog; nenhuma página é órfã.
6. URLs sempre em formato canônico (sem `.html`, sem barra final, exceto `/` e `/blog/`); 0 links usam `.html`.

**Regras para conteúdo novo:** link para o pilar no primeiro terço do texto; 2–4 links para spokes irmãos; 1 link para o serviço; 1–2 links recebidos de posts existentes **no mesmo PR** (evita nascer com 0 inlinks); entrar no sitemap temático correto e no `llms.txt`.

## 3. Mapa de conteúdo atual (80 URLs)

| Cluster (sitemap) | URLs | Pilar | Serviço de destino | Observação |
|---|---|---|---|---|
| SEO | 26 | `post-guia-completo-seo` | `/consultoria-seo` | Maior cluster: técnico, on-page, off-page, local, GEO e nichos |
| Landing pages | 15 | `post-guia-completo-landing-page` | `/criacao-de-landing-page` | Inclui custos, copy, conversão e 4 nichos |
| Meta Ads | 15 | `post-guia-completo-meta-ads` | `/gestao-de-trafego-pago` | Pilar absorveu `post-o-que-e-meta-ads` via 301 |
| Tráfego pago | 9 | `post-guia-completo-trafego-pago` | `/gestao-de-trafego-pago` | Visão geral, ROI, gestor, comparativos |
| Google Ads | 5 | _(usa o pilar de tráfego pago)_ | `/gestao-de-trafego-pago` | Sem pilar nem página de serviço próprios |
| Institucional | 10 | — | — | Home, blog, 3 serviços, privacidade, pesquisa de benchmarks e 3 posts de agência/advocacia |

### 3.1 Cluster SEO (26)
- **Pilar:** guia-completo-seo
- **Fundamentos:** o-que-e-seo, como-aparecer-no-google, seo-white-hat-black-hat, quanto-custa-seo
- **Técnico, on-page e off-page:** seo-tecnico, core-web-vitals, seo-on-page, conteudo-seo, pesquisa-palavras-chave, seo-off-page, link-building, auditoria-seo, topic-clusters
- **Ferramentas:** ferramentas-seo, google-search-console
- **Local:** seo-local, google-meu-negocio
- **GEO e IA:** geo, ia-generativa-seo
- **Nichos:** seo-advocacia, seo-clinicas, seo-odontologia, seo-construtoras, seo-ecommerce, seo-pequenas-empresas

### 3.2 Cluster Landing pages (15)
- **Pilar:** guia-completo-landing-page
- **Fundamentos:** o-que-e-landing-page, landing-page-vs-site, como-criar-landing-page, elementos-landing-page-alta-conversao
- **Conversão e copy:** copywriting-landing-page, taxa-de-conversao-landing-page, exemplos-landing-pages, landing-page-com-ia
- **Preço:** quanto-custa-landing-page, quanto-custa-site
- **Nichos:** landing-page-para-advogados, -clinicas, -cursos, -imobiliarias

### 3.3 Cluster Meta Ads (15)
- **Pilar:** guia-completo-meta-ads
- **Operação:** gerenciador-de-anuncios, meta-business-suite, pixel-facebook, publicos-meta-ads, criativos-meta-ads, remarketing-meta-ads, instagram-ads
- **Preço e comparativo:** quanto-custa-meta-ads, google-ads-vs-meta-ads
- **Nichos:** meta-ads-para-clinicas, -cursos, -ecommerce, -industria, -negocios-locais

### 3.4 Clusters Tráfego pago (9) e Google Ads (5)
- **Tráfego pago:** guia-completo-trafego-pago, o-que-e-trafego-pago, como-fazer-trafego-pago, gestor-de-trafego, roi-trafego-pago, trafego-pago-vs-organico, seo-ou-trafego-pago-2000, trafego-pago-para-clinicas, trafego-pago-para-ecommerce
- **Google Ads:** como-funciona-google-ads, tipos-de-campanha-google-ads, quanto-custa-google-ads, remarketing-google-ads, google-ads-para-advogados

### 3.5 Institucional e prova (10)
`/`, `/blog/`, `/criacao-de-landing-page`, `/gestao-de-trafego-pago`, `/consultoria-seo`, `/privacidade`, `/blog/pesquisa-benchmarks-intent`, `post-como-escolher-agencia-trafego`, `post-quanto-custa-agencia-marketing`, `post-marketing-para-advogados`.

O dataset aberto `dados/benchmarks-intent-marketing-brasil-2026.csv` (CC BY 4.0, 26 linhas) é ativo de GEO: favorece citação por IAs e backlink natural. Está linkado de 5 páginas.

## 4. Lacunas e oportunidades

Em ordem de esforço × efeito esperado. Validar volume de busca antes de produzir (o repo não tem dados de keyword).

| # | Oportunidade | Motivo |
|---|---|---|
| 1 | **Bloco de CTA para o serviço nos spokes** | Só 26 dos 70 posts dos 5 clusters temáticos linkam o serviço (SEO 6/26, Meta Ads 2/15, Tráfego pago 2/9, Google Ads 1/5; Landing pages 15/15). É a maior lacuna do funil conteúdo → conversão. Replicar o bloco "Precisa de ajuda para executar?" já usado nos posts que o têm, começando pelos posts de intenção comercial (`quanto-custa-*`, `*-para-*`, `seo-on-page`, `roi-trafego-pago`) |
| 1b | **Pilar e serviço de Google Ads** | O cluster tem 5 spokes e nenhum pilar próprio; a autoridade vai para o pilar de tráfego pago. Opção A: criar `post-guia-completo-google-ads`. Opção B: mover o cluster para dentro de Tráfego pago no sitemap. Decidir com dados do GSC |
| 2 | **Home → pilares** | A home não linka nenhum dos 4 pilares; um bloco "Guias completos" distribui autoridade para os hubs |
| 3 | **Reforçar spokes com 1–2 inlinks** | 12 páginas (lista em `seo-diagnostico.md`, B5) |
| 4 | **Nichos faltantes entre clusters** | Há assimetria nicho × canal: Google Ads só tem advocacia; Landing page não tem e-commerce nem indústria; SEO não tem cursos; Meta Ads não tem advocacia. Escolher pelos nichos de maior LTV do portfólio |
| 5 | **Mais prova proprietária** | Estudos de caso e atualização anual da pesquisa de benchmarks alimentam E-E-A-T, GEO e backlinks |
| 6 | **Reescrever descrições longas** | 5 páginas com meta description > 160 caracteres (3 são páginas de serviço) |

**Canibalização:** um caso já tratado (`o-que-e-meta-ads` → pilar, 301). Monitorar pares com intenção parecida: `quanto-custa-site` × `quanto-custa-landing-page`; `como-aparecer-no-google` × `o-que-e-seo` × `guia-completo-seo`; `trafego-pago-vs-organico` × `seo-ou-trafego-pago-2000`; `google-meu-negocio` × `seo-local` (escopo já separado em 2026-08-28). Critério: se duas URLs disputarem a mesma consulta no GSC por 4+ semanas, consolidar com 301 na URL de melhor posição.

## 5. Governança e operação

- **Sitemaps:** gerados por script (ver M1 em `seo-diagnostico.md`); `lastmod` = data do último commit que mudou o conteúdo editorial, ignorando commits mecânicos.
- **Redirects:** só em `_redirects` (Cloudflare Pages) e na Redirect Rule do apex; sempre 301 direto ao destino final; atualizar sitemap, `llms.txt` e links internos junto.
- **Checklist por URL nova:** canonical auto-referente sem extensão; `meta robots` `index, follow, max-snippet:-1, max-image-preview:large`; 1 H1; title ≤ 60–70 caracteres; description ≤ 155; JSON-LD (Article + BreadcrumbList, FAQPage quando houver FAQ); entrada no sitemap temático e no `llms.txt`; ≥ 2 inlinks de corpo.
- **Cadência:** repetir a auditoria técnica a cada release grande; revisar mapa de conteúdo e canibalização todo mês com dados do GSC.

## 6. Métricas-alvo da estratégia

A linha de base de GSC/GA4 ainda não está registrada. Primeiro passo: exportar os últimos 3 meses e preencher.

| Métrica | Linha de base | Alvo (90 dias) |
|---|---|---|
| URLs indexadas (de 80) | _preencher_ | ≥ 76 (95%) |
| Cliques orgânicos / mês (GSC) | _preencher_ | +30% sobre a linha de base |
| Impressões em consultas dos 4 pilares | _preencher_ | +40% |
| Posição média dos 4 pilares | _preencher_ | Top 10 em ≥ 2 pilares |
| Leads vindos de orgânico (GA4 + formulário/WhatsApp) | _preencher_ | +25% |
| Páginas com ≥ 3 inlinks de corpo | 67 de 80 (13 abaixo: as 12 do B5 + `/privacidade`, que não precisa) | 79 de 80 |
| Citações em IA (Perplexity, ChatGPT, AI Overviews) para o dataset | _não medido_ | Medir mensalmente; meta: citado em ≥ 3 consultas-alvo |

Os alvos de crescimento são hipóteses de planejamento, não projeções; recalibrar depois da linha de base.
