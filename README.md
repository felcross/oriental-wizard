# Oriental Wizard — apresentação de história de RPG

Wizard de apresentação audiovisual: aperta "Começar", o áudio narra a
história, e imagens acompanham (sincronizadas ou de forma ambiente).
100% estático — sem backend, sem auth.

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Build de produção (static export)

```bash
npm run build
```

Gera a pasta `out/` com HTML/CSS/JS puro. É só copiar essa pasta pra VPS
e servir via Nginx Proxy Manager — não precisa de processo Node rodando.

## Estrutura

```
app/                 rotas do Next (App Router)
components/          Wizard, TitleScreen, SyncedMode, AmbientMode, ScrollFrame
lib/types.ts         tipos das histórias
lib/useAudioTimeline.ts  hook que sincroniza a timeline com o <audio>
content/*.json        conteúdo de cada história (edite/adicione aqui)
public/audio/         arquivos de áudio (.mp3)
public/img/           imagens de cada história
```

## Adicionando uma história

1. Coloque o `.mp3` em `public/audio/` e as imagens em `public/img/`.
2. Crie um JSON em `content/` seguindo um dos dois formatos:

**Modo sincronizado** — imagem muda em pontos exatos do áudio:
```json
{
  "id": "minha-historia",
  "titulo": "Título",
  "subtitulo": "Subtítulo opcional",
  "modo": "sincronizado",
  "audio": "/audio/minha-historia.mp3",
  "timeline": [
    { "tempo": 0, "imagem": "/img/01.jpg", "legenda": "Texto opcional" },
    { "tempo": 12.5, "imagem": "/img/02.jpg" }
  ]
}
```
`tempo` é em segundos, a partir do início do áudio. Pra descobrir os
tempos certos, ouça o áudio com um cronômetro (ou abra em um editor
como Audacity e leia a régua de tempo) e anote quando cada imagem deve
trocar.

**Modo ambiente** — fotos aparecem aleatoriamente enquanto o áudio toca:
```json
{
  "id": "minha-historia-ambiente",
  "titulo": "Título",
  "modo": "ambiente",
  "audio": "/audio/minha-historia.mp3",
  "poolImagens": ["/img/01.jpg", "/img/02.jpg", "/img/03.jpg"],
  "intervaloMinSegundos": 4,
  "intervaloMaxSegundos": 9
}
```

3. Em `app/page.tsx`, troque o `import historia from "@/content/..."`
   pelo arquivo novo (ou monte uma lista de histórias com um seletor,
   se quiser mais de uma na mesma página — hoje o app carrega uma só).

## Design

Paleta e tipografia pensadas pra tema de fundação de mundo de fantasia
oriental — tinta, laca, papel de arroz, selo de artista:

- Cores em `tailwind.config.ts` (`sumi`, `indigo-void`, `washi`, `ember`,
  `lacquer`, `jade`)
- Fontes: `Shippori Mincho` (títulos) + `Zen Kaku Gothic New` (corpo),
  carregadas via `next/font/google` em `app/layout.tsx`
- O selo vermelho no canto da moldura (`ScrollFrame.tsx`) é o indicador
  de avanço da história no modo sincronizado — pulsa a cada troca de
  imagem

## Próximos passos sugeridos

- Testar os tempos reais da timeline com o áudio final gravado
- Ajustar `intervaloMinSegundos`/`intervaloMaxSegundos` do modo ambiente
  conforme a duração real do áudio e quantidade de fotos disponíveis
- Se quiser mais de uma história selecionável, criar uma tela de
  seleção antes do `TitleScreen`
