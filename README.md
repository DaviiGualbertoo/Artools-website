# ARTOOLS.PRO — A Caneta Mais Tecnológica do Mundo

Landing Page de Luxo e Alta Performance com Animações GSAP 60FPS, Scrub Intra-Keyframe, Customizador de Atelier em Tempo Real e Fundo Cinematográfico.

---

## 🏛️ Visão Geral da Arquitetura

O projeto foi construído seguindo os mais rigorosos padrões da arquitetura e tipografia suíça (*Swiss Modernism & Monolithic Design*), combinando design gráfico de alto padrão com tecnologia web de última geração:

1. **Dobra 01 — Hero 3D Parallax Pin & Scrub (Apple Style):**
   - Controle de scrub intra-frame sincronizado ao scroll via **GSAP 3** e **ScrollTrigger**.
   - Parallax em múltiplos planos (marca d'água monumental, palcos de storytelling e botões com feixes magnéticos).
   - Efeito de preenchimento de lettering líquido horizontal.

2. **Dobra 02 — Engenharia Suíça & Precisão Molecular:**
   - Palco óptico com detalhe macro 10x, pinos anatômicos pulsantes e HUD glassmorphism.
   - Navegação segmentada interativa (01 Alumínio 7075-T6, 02 Nanocarbono, 03 Grip Ra 0.8µm, 04 Prancheta Virtual).
   - Prancheta interativa em HTML5 Canvas para teste tátil de traço com espessuras de 0.10mm, 0.20mm e 0.35mm.

3. **Dobra 03 — Calibração & Atelier Customizador:**
   - Sistema de coloração vetorial em tempo real para o chassi da caneta (*Carbon Black, Pure White, Prussian Blue, Sepia Bronze*).
   - Gravação a laser personalizada em tempo real alinhada longitudinalmente ao cilindro (+38.4°).
   - Feixe ótico de varredura laser verde a cada tecla digitada.
   - Bento Grid com benchmarks científicos homologados ISO 14145-2 (0.04s de secagem, 14.500m de autonomia, 572 MPa de rigidez).

4. **Dobra 04 — Física Cinematográfica & Zero Resistência:**
   - Palco de vídeo em looping contínuo com vinheta radial dark.
   - Caixa monumental com efeito de halo difuso (*glowPulse*), feixe rotativo 360° (*conic-gradient*), e flashlight tracking.
   - Áudio ASMR sintetizado via Web Audio API reproduzindo o som do atrito da ponta de tungstênio sobre o papel.

5. **Dobra 05 — Arquitetura do Pensamento:**
   - Flashlight cards com iluminação radial no hover (Fluxo Contínuo, Silêncio Absoluto, Equilíbrio Neutro).

6. **Dobra 06 — Compra de Luxo & Rodapé Monolítico:**
   - Card monumental com feixe giratório contínuo.
   - Rodapé editorial com relógio duplo de Zurique (CET) e São Paulo (BRT).
   - Validador interativo de número de série / monograma.

---

## 📁 Estrutura de Diretórios

```
artools/
├── index.html                      # Ponto de entrada canônico de produção
├── index-site.html                 # Cópia idêntica de compatibilidade
├── robots.txt                      # Diretrizes de rastreamento para buscadores
├── sitemap.xml                     # Mapa do site indexável
├── vercel.json                     # Configuração otimizada para deploy na Vercel
├── netlify.toml                    # Configuração otimizada para deploy no Netlify
├── package.json                    # Scripts e metadados do projeto
├── .gitignore                      # Filtro profissional de arquivos de sistema e temporários
├── README.md                       # Documentação técnica do projeto
└── assets/
    ├── raw_files/                  # Vídeos 60fps e fotografias macro de alta resolução
    │   ├── videoof.mp4             # Vídeo do Hero 3D Scrub
    │   ├── video.mp4               # Vídeo da Quarta Dobra Cinematográfica
    │   ├── pen_studio_showcase.jpg # Fotografia base para customização do Atelier
    │   └── artools_tech_macro_enhanced.jpg # Fotografia macro 10x
    └── templates/                  # Sistemas de design, componentes e bibliotecas
        └── design_system_oficial1.html
```

---

## 🚀 Como Executar Localmente

### Opção 1: Sem dependências (Qualquer navegador)
Basta abrir diretamente o arquivo `index.html` em qualquer navegador moderno (Chrome, Edge, Safari, Firefox).

### Opção 2: Servidor local HTTP rápido
```bash
npx serve .
# ou
python -m http.server 3000
```
Acesse em: `http://localhost:3000`

---

## 🌐 Como Fazer Deploy

O projeto está 100% pronto para deploy com 1 clique nas principais plataformas:

### 1. Vercel
- Conecte seu repositório no [Vercel Dashboard](https://vercel.com).
- Clique em **Import** e depois em **Deploy**.
- O arquivo `vercel.json` cuidará automaticamente do cache e rotas limpas.

### 2. Netlify
- Arraste a pasta do projeto diretamente para o [Netlify Drop](https://app.netlify.com/drop) ou conecte via Git.
- O arquivo `netlify.toml` aplica os cabeçalhos de segurança e cache instantaneamente.

### 3. GitHub Pages
- No repositório GitHub, acesse **Settings** > **Pages**.
- Selecione a branch `main` e a pasta `/ (root)`.
- Clique em **Save**. Seu site estará no ar em poucos segundos.

