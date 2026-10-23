# Briefs de novas URLs (GAB-56)

Lacunas encontradas depois da auditoria de linkagem (GAB-55). Os silos: SEO (hub `post-guia-completo-seo`), Meta Ads, Landing Pages, Tráfego Pago e Google Ads (sem pilar próprio).

## Status de aprovação

**Os 3 posts novos (GAB-57) foram aprovados pelo responsável em 23/10/2026**, junto com os briefs 01, 02 e 03. As capas reutilizadas ficam como estão (decisão do responsável). Os posts estão no PR #14, separado deste PR.

Itens que o responsável tinha de resolver:

1. Aprovar cada brief (01, 02 e 03) e a pauta correspondente. **Feito em 23/10/2026.**
2. Decidir a keyword alvo do brief 03. **Feito: "teste ab".**
3. Confirmar que a revisão das URLs existentes e o GAB-55 estão fechados. **Não registrado aqui.**
4. Conferir os fatos que os briefs sinalizam. **Posts aprovados em 23/10/2026.**
5. Definir as imagens de capa. **Feito: ficam as capas reutilizadas.**
6. Corrigir o envio do sitemap no Search Console (ver evidência abaixo), para que as URLs novas possam ser descobertas. **Em aberto.**

## Como as lacunas foram achadas

1. Inventário dos 80 URLs dos sitemaps temáticos contra o que um leitor de cada silo precisa em seguida (hub -> spoke).
2. Para cada candidato, busca no Google (pt-BR) e leitura do que ranqueia: formato, intenção e quem ocupa a SERP.
3. Candidatos descartados por já estarem cobertos: pesquisa de palavras-chave, topic clusters, SEO on-page/técnico, GEO, remarketing. Tipos de campanha cobre Performance Max só de passagem.

## Evidência do Search Console e do Bing (base: Linear, 22/10/2026)

Período de 21/07 a 20/10/2026. As tabelas de consultas e de páginas do Search Console são separadas, então nenhuma consulta é atribuída a uma URL.

- **Google Search Console** (propriedade de domínio, Pesquisa Web): 51 cliques, 10.113 impressões, CTR 0,5%, posição média 21,8.
- **Páginas do cluster de SEO** (cliques / impressões / posição): guia-completo-seo 0/496/41,9; google-search-console 0/96/48,5; pesquisa-palavras-chave 0/32/30,8; topic-clusters 0/13/66,7; conteudo-seo 0/11/74,3; o-que-e-seo 0/8/75,0. As páginas que sustentam os briefs 01 e 02 têm poucas impressões e posição baixa.
- **Indexação:** `post-geo` e `post-ia-generativa-seo` não estão no índice do Google. O teste ao vivo de `post-geo` em 22/10 mostrou página disponível e indexável.
- **Sitemap:** o enviado ao Google é `https://intentmarketing.com.br/sitemap.xml` (apex, sem www), com 0 páginas descobertas. O host canônico é `www`. É hipótese a investigar, não causa confirmada.
- **Bing Webmaster Tools:** 35 cliques e 18,4 mil impressões. Sitemap `https://www.intentmarketing.com.br/sitemap.xml` com 80 URLs descobertas. Escopo diferente do Google: não somar.

Leitura para a pauta: o cluster de SEO ainda tem pouca tração orgânica e parte dele nem está indexada. Isso pesa na decisão de criar URLs novas antes de resolver indexação.

## Estimativas Ahrefs (complementares)

Ahrefs Keywords Explorer, Brasil, média dos últimos 12 meses, extraído em 22/10/2026. São estimativas de volume e dificuldade e não provam desempenho de URL. KD 0 em cauda curta indica pouca amostra de SERP, e volume 0 é abaixo do limiar de medição, não demanda zero.

| Brief | Keyword alvo do brief | Volume (estimativa) | KD | TP |
|---|---|---|---|---|
| 01 | intenção de busca | 200 | 1 | 20 |
| 02 | schema markup | 800 | 59 | não confiável (parent topic com erro de grafia) |
| 03 | teste ab (escolhida em 23/10/2026; "teste A/B landing page" voltou 0) | 800 | 11 | 1.700 |
| 04 | performance max | 250 | 0 | 300 |

**Decisão no brief 03 (23/10/2026):** o responsável escolheu "teste ab" como keyword alvo (800, KD 11, TP 1.700).

## Fila

| # | Brief | Silo | Intenção | Status |
|---|-------|------|----------|--------|
| 01 | [Intenção de busca](01-intencao-de-busca.md) | SEO | Informacional | Post no PR #14, aprovado pelo responsável em 23/10/2026 |
| 02 | [Schema markup](02-schema-markup.md) | SEO | Informacional / how-to | Post no PR #14, aprovado pelo responsável em 23/10/2026 |
| 03 | [Teste A/B em landing page](03-teste-ab-landing-page.md) | Landing Pages | Informacional / how-to | Post no PR #14, aprovado pelo responsável em 23/10/2026 |
| 04 | [Performance Max](04-performance-max.md) | Google Ads | Informacional | Backlog |

## Lacunas menores (sem brief)

- Silo Google Ads sem pilar: `post-como-funciona-google-ads` faz o papel de hub. Considerar `guia-completo-google-ads`.
- GA4 e Google Tag Manager para tráfego pago: `roi-trafego-pago` cobre só o essencial.
- SEO para imobiliárias: o silo tem `landing-page-para-imobiliarias` e nenhuma vertical de SEO ou Meta Ads para o nicho.
