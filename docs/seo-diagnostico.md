# Diagnóstico técnico de SEO e indexação — intentmarketing.com.br

> Tarefas GAB-48 (diagnóstico) e GAB-47 (arquivos de referência).
> Data da auditoria: 2026-10-22. Base: commit `1a4047e` (main) + verificação ao vivo em `https://www.intentmarketing.com.br`.
> Documento irmão: [`seo-estrategia.md`](seo-estrategia.md).

## 1. Resumo executivo

O SEO técnico está **saudável**. Nenhum problema crítico: nada bloqueia a indexação, nenhum canonical está errado, nenhum `noindex` indevido, nenhum link interno quebrado, nenhum loop de redirect. Os achados são de gravidade **média** (2) e **baixa** (6) e dizem respeito, sobretudo, à manutenção do sitemap e a pequenos desvios de higiene.

| Gravidade | Qtde | Itens |
|---|---|---|
| Crítico | 0 | — |
| Médio | 2 | M1 (gerador do sitemap fora do repo), M2 (cadeia de 2 redirects no apex HTTP) |
| Baixo | 6 | B1 a B6 |

**Limite desta auditoria:** foi feita só com os arquivos do repositório e requisições HTTP públicas. **Não houve acesso ao Google Search Console**, então "indexação confirmada" aqui significa "nada no site impede ou confunde a indexação". A confirmação real (páginas indexadas, "Descobertas, mas não indexadas", cobertura do sitemap) precisa ser feita no GSC (seção 6).

## 2. Estado atual do SEO técnico

**Stack:** site 100% estático (HTML + CSS + JS), hospedado no Cloudflare Pages (`_redirects`, `CNAME`, `.nojekyll`). URLs sem extensão (`/blog/post-seo-tecnico`), domínio canônico `www`.

**Inventário:** 82 arquivos HTML = 80 URLs indexáveis + `404.html` + `blog/post-o-que-e-meta-ads.html` (redirecionado, ver B3).

### 2.1 robots.txt — OK

Servido ao vivo, idêntico ao repo.

```
User-agent: *
Disallow: /cdn-cgi/
Sitemap: https://www.intentmarketing.com.br/sitemap.xml
```

- O único bloqueio é `/cdn-cgi/` (infra do Cloudflare), correto.
- CSS, JS, imagens e CSV não estão bloqueados; o Googlebot renderiza a página completa.
- Referencia o índice de sitemaps com URL absoluta.
- Sem regras para crawlers de IA (GPTBot, ClaudeBot, PerplexityBot etc.), portanto todos são permitidos. Coerente com a estratégia de GEO e com o `llms.txt`.

### 2.2 sitemap.xml — OK, com ressalva operacional (M1)

Índice + 6 sitemaps temáticos, todos servidos ao vivo e idênticos ao repo.

| Sitemap | URLs | lastmod máx. (= índice) |
|---|---|---|
| sitemap-seo.xml | 26 | 2026-08-28 |
| sitemap-landing-pages.xml | 15 | 2026-08-28 |
| sitemap-meta-ads.xml | 15 | 2026-08-28 |
| sitemap-institucional.xml | 10 | 2026-08-29 |
| sitemap-trafego-pago.xml | 9 | 2026-08-25 |
| sitemap-google-ads.xml | 5 | 2026-08-25 |
| **Total** | **80** | |

Verificações:
- **0 URLs duplicadas** entre os sitemaps.
- **0 URLs sem página** correspondente e **0 páginas indexáveis ausentes** (as únicas fora são `404.html` e o post redirecionado, corretamente excluídos).
- **0 URLs `noindex`** no sitemap.
- Todos os `<loc>` batem exatamente com o canonical da página (https, www, sem extensão).
- `lastmod` em formato `AAAA-MM-DD` válido; o `lastmod` de cada sitemap no índice é igual ao maior `lastmod` das suas URLs (a divergência que existia foi corrigida em `1a4047e`).
- Nenhum `lastmod` está no futuro. O último commit de conteúdo é de 2026-08-29, igual ao maior `lastmod`.
- Os commits posteriores ao `lastmod` de 69 páginas são mecânicos (`loading="lazy"` em 150 imagens, correção de `</div>` órfão) e foram ignorados de propósito, conforme a política do commit `1a4047e`. Não é defeito.
- `llms.txt` lista todas as 80 URLs do sitemap.

### 2.3 Canonical — OK

- 81 das 82 páginas têm exatamente **1** `<link rel="canonical">`, auto-referente e idêntico à URL servida; `og:url` bate com o canonical em todas.
- Exceção esperada: `404.html` (sem canonical, com `noindex`).
- Nenhuma página aponta canonical para outra URL, nem para URL que redireciona.
- `/` e `/blog/` usam barra final (é a URL servida; `/blog` faz 308 para `/blog/`).

### 2.4 hreflang — não aplicável

Site monolíngue pt-BR (`<html lang="pt-BR">` em 82/82 páginas, `og:locale pt_BR`). Não há versões em outros idiomas ou países, então **a ausência de hreflang é correta**. Não adicionar hreflang auto-referente sem alternativas. Revisitar só se surgir versão em outro idioma/país.

### 2.5 Redirects — OK, com 1 cadeia (M2)

Testados ao vivo:

| Origem | Resultado | Hops |
|---|---|---|
| `http://www.…/` | 301 → `https://www.…/` | 1 |
| `https://intentmarketing.com.br/` (apex) | 301 → `https://www.…/` | 1 |
| `http://intentmarketing.com.br/` (apex, HTTP) | 301 → `https://intentmarketing.com.br/` → 301 → `https://www.…/` | **2 (M2)** |
| `/index.html`, `/blog/index.html` | 308 → `/`, `/blog/` | 1 |
| `/blog` | 308 → `/blog/` | 1 |
| `/qualquer-pagina.html` e `/qualquer-pagina/` | 308 → `/qualquer-pagina` | 1 |
| `/blog/post-o-que-e-meta-ads` (e `.html`) | 301 → `/blog/post-guia-completo-meta-ads` | 1 |
| URL inexistente | **404 real** (status 404, não soft-404) | 0 |

- Nenhum loop. Nenhum destino de redirect é outro redirect.
- 0 links internos usam `.html`; os 308 do Cloudflare Pages só ocorrem para links externos ou históricos.
- `_redirects` contém só a consolidação de canibalização (`post-o-que-e-meta-ads` → pilar), com destino final 200.
- O redirect apex→www é uma Redirect Rule da zona Cloudflare (fora do repo), conforme o comentário do próprio `_redirects`.
- URLs com maiúscula (`/Blog/...`) retornam 404, comportamento normal do Pages, sem impacto.

### 2.6 Meta robots — OK

- 81 páginas com `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`.
- O único `noindex, follow` é `404.html`, correto.
- Nenhum `X-Robots-Tag` nos headers de resposta.
- As ocorrências da palavra "noindex" em `post-google-search-console` e `post-seo-ecommerce` são texto editorial, não diretiva.

### 2.7 Outros sinais verificados

- **Links internos quebrados:** 0 (82 páginas varridas, links relativos resolvidos).
- **`<title>`:** únicos em todas as páginas, nenhum acima de 70 caracteres.
- **H1:** exatamente 1 em todas as páginas indexáveis.
- **Meta descriptions:** únicas; 5 acima de 165 caracteres (B4).
- **Dados estruturados:** Article, FAQPage, BreadcrumbList e Organization presentes nos posts (não validados no Rich Results Test nesta rodada).
- **Arquitetura de links:** todo post de cluster linka o pilar do seu cluster; `/blog/` linka as 74 páginas de blog; nenhuma página órfã. Detalhes em `seo-estrategia.md`.

## 3. Problemas encontrados

### Críticos
Nenhum.

### Médios

**M1 — Gerador do sitemap não está versionado.**
O commit `1a4047e` diz que a geração do `lastmod` foi automatizada, mas o `.gitignore` tem `*.py` ("Scripts de build / geracao") e nenhum script está no repo. Quem clonar o projeto não consegue regenerar os sitemaps, e o `lastmod` volta a congelar quando a máquina/pessoa que tem o script deixar de rodá-lo. Foi exatamente esse o problema corrigido em agosto (80 URLs com data anterior à última mudança real).
*Origem do gerador: desconhecida.* Não há script em nenhum branch nem no histórico git (só `script.js` e `blog/blog-script.js`, que são do front-end), nem workflow de CI. O texto do commit descreve a regra (lastmod = último commit que mudou conteúdo), mas não o programa. Provavelmente é um `.py` local de quem fez o commit (o `.gitignore` o esconde) ou ação manual. **Ação pendente:** perguntar ao autor do commit `1a4047e` onde o script está e versioná-lo; se não for recuperável, reescrever (a regra é simples de reimplementar em Node com `git log -1 --format=%cs -- <arquivo>`).
*Resolução:* versionar o gerador (ex.: `scripts/gerar-sitemap.js`, ou `.py` com exceção no `.gitignore`), documentar a regra (lastmod = último commit que mudou o conteúdo, ignorando commits mecânicos) e rodar em CI ou pre-commit. Esforço: baixo.

**M2 — Cadeia de redirects no apex em HTTP.**
`http://intentmarketing.com.br/` → `https://intentmarketing.com.br/` → `https://www.intentmarketing.com.br/` (2 hops). O Google segue cadeias e repassa sinal, então o impacto é pequeno, mas gasta crawl e latência em links antigos ou backlinks sem https.
*Resolução:* na Redirect Rule da zona Cloudflare, redirecionar direto `http(s)://intentmarketing.com.br/*` → `https://www.intentmarketing.com.br/$1` (301) numa única regra. Mudança fora do repo, exige acesso ao painel Cloudflare.
*Status: ação pendente de infra.* O repo não tem `vercel.json` nem `next.config`; o hosting é Cloudflare Pages e o `_redirects` não consegue tratar o apex (ele só vê requisições já recebidas no host `www`). A regra do apex vive na zona Cloudflare, onde nenhum arquivo versionado a alcança, então não há correção possível por PR.

### Baixos

| ID | Problema | Resolução sugerida |
|---|---|---|
| B1 | Cobertura real de indexação **não verificada** (sem GSC). | Seção 6: checar GSC (Páginas, Sitemaps, Inspeção de URL). |
| B2 | A home não linka nenhum dos 4 pilares `guia-completo-*` (só blog, 3 serviços, pesquisa de benchmarks e privacidade). | Adicionar bloco "Guias completos" na home com os 4 pilares. |
| B3 | `blog/post-o-que-e-meta-ads.html` continua no repo, com canonical auto-referente, embora o `_redirects` o redirecione. Se o redirect for removido por engano, o conteúdo volta a canibalizar o pilar. | Excluir o arquivo (o 301 já cobre a URL) ou apontar o canonical para o pilar. |
| B4 | Meta descriptions acima de ~160 caracteres: `post-seo-local` (208), `post-meta-ads-para-industria` (193), `criacao-de-landing-page` (173), `consultoria-seo` (170), `gestao-de-trafego-pago` (167). Serão truncadas no SERP. | Reescrever para ≤ 155 caracteres; as 3 páginas de serviço primeiro. |
| B5 | 12 páginas com só 1–2 links de entrada vindos do corpo de outras páginas: `post-como-aparecer-no-google` (1), `post-ia-generativa-seo`, `post-seo-construtoras`, `post-seo-ecommerce`, `post-seo-odontologia`, `post-seo-white-hat-black-hat` e 6 posts de nicho/ferramenta de Meta Ads (`meta-ads-para-clinicas`, `-cursos`, `-ecommerce`, `-industria`, `-negocios-locais` e `meta-business-suite`), com 2 cada. | Adicionar 1–2 links contextuais vindos de posts do mesmo cluster. |
| B6 | `post-seo-ou-trafego-pago-2000` tem número no slug, que "envelhece" a URL. | Não mudar agora; se mudar, usar 301 e atualizar sitemap, `llms.txt` e links. |

(Contagem de inlinks: links no corpo da página, excluindo navegação e rodapé; `/blog/` linka todos, então ninguém é órfão.)

## 4. Estratégia de resolução

Ordem recomendada (menor esforço e maior retorno de manutenção primeiro):

1. **M1** — versionar o gerador de sitemap e documentar a regra de `lastmod`. *(repo; sem risco de ranking)*
2. **M2** — consolidar o redirect apex→www em 1 hop. *(Cloudflare; sem risco de ranking)*
3. **B1** — validar a indexação no GSC e preencher a linha de base da seção 5. *(desbloqueia métricas reais)*
4. **B4** — reescrever as 5 descrições longas, começando pelas 3 páginas de serviço. *(CTR)*
5. **B3** — remover o arquivo do post redirecionado.
6. **B2/B5** — reforçar a linkagem interna (home → pilares; posts com 1–2 inlinks), junto com o roadmap de `seo-estrategia.md`.

O que **não** fazer: não mexer em canonical, robots.txt, hreflang ou meta robots (estão corretos); não alterar `lastmod` em commits mecânicos.

## 5. Métricas-alvo

Não há linha de base de GSC/GA4 no repositório. Os alvos abaixo são de **saúde técnica** (mensuráveis hoje) e de **indexação** (medir no GSC; preencher "Linha de base" na primeira leitura). Alvos de tráfego e posição devem ser definidos depois dessa linha de base.

| Métrica | Linha de base | Alvo | Como medir |
|---|---|---|---|
| Problemas críticos de SEO técnico | 0 | 0 (manter) | Repetir esta auditoria a cada release grande |
| URLs do sitemap indexadas | _preencher (GSC)_ | ≥ 95% das 80 URLs em até 60 dias | GSC > Sitemaps / Páginas |
| URLs em "Descobertas/Rastreadas, mas não indexadas" | _preencher (GSC)_ | ≤ 5 | GSC > Páginas |
| 404/soft-404 vindos de URLs do sitemap | 0 | 0 | Crawl + GSC |
| Canonical ≠ URL servida | 0 | 0 | Script de auditoria |
| Redirects com mais de 1 hop | 1 (apex HTTP) | 0 | `curl -L -w '%{num_redirects}'` |
| Sitemap com `lastmod` defasado | 0 hoje | 0, garantido por gerador versionado | Gerador + CI |
| Meta descriptions > 160 caracteres | 5 | 0 | Script de auditoria |
| Páginas com ≤ 2 inlinks de corpo | 12 | 0 | Script de auditoria |
| Core Web Vitals (LCP/INP/CLS) | _não medido_ | "Bom" em 75% das URLs (CrUX) | GSC > Core Web Vitals / PageSpeed |

## 6. Verificações pendentes que exigem acesso externo

- **GSC:** cobertura de indexação, status do sitemap enviado, URLs excluídas, ações manuais, relatório de CWV.
- **Cloudflare:** conferir a Redirect Rule do apex (M2).
- **Rich Results Test:** validar Article/FAQPage/BreadcrumbList em uma amostra de posts.

## 7. Como reproduzir a auditoria

Checks usados (Node 18+, sem dependências): varrer todos os `.html`; extrair `canonical`, `meta robots`, `title`, `description`, `h1`, `hreflang` e `href`s (resolvendo links relativos); cruzar com os `<loc>` dos sitemaps; testar redirects com `curl -s -o /dev/null -L -w '%{url_effective} %{http_code} %{num_redirects}'`. Sugestão: transformar isso em `scripts/auditar-seo.js`, junto com a resolução de M1.
