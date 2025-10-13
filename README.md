# EPAD Downloader

[Disponível no GitHub Pages](https://leowlopez.github.io/EPAD-Downloader/) – Acesse o tutorial e baixe a última versão facilmente.

Extensão Chrome para baixar documentos automaticamente do SIGADAER e SILOMS, com organização de nomes e versão automatizada.

---

## Estrutura do projeto

```
EPAD-Downloader/
├─ background.js         # Service Worker, checagem de updates e alteração de ícone
├─ content.js            # Script injetado nas páginas de SIGADAER e SILOMS
├─ icon.png              # Ícone ativo da extensão
├─ icon_inactive.png     # Ícone inativo
├─ manifest.json         # Configurações da extensão
├─ latest-version.js     # Script para página principal puxar última versão
├─ index.html            # Página principal GitHub Pages (tutorial, link última versão, etc)
├─ popup/
│  ├─ index.html         # Popup HTML
│  ├─ popup.js           # Ações do popup (envio de mensagens para background.js e content.js)
│  └─ style.css          # Estilos do popup
└─ releases/
   ├─ latest.json        # Informação da última versão disponível
   ├─ index.html         # Página de releases (downloads e changelog)
   └─ *.zip              # Arquivos compactados de cada versão
```

---

## Permissões utilizadas

- `"tabs"` e `"activeTab"` → acesso às abas do navegador para alterar ícone.  
- `"scripting"` → injetar scripts em páginas específicas.  
- `"host_permissions"` → acesso apenas aos domínios internos SIGADAER e SILOMS.

---

## Fluxo da extensão

1. **Alteração de ícone**  
   O `background.js` ouve mensagens do `content.js` e altera o ícone dependendo da URL atual.

2. **Checagem de atualizações**  
   Ao iniciar ou periodicamente, o `background.js` verifica `latest.json` e compara com `manifest.json`.  
   Se houver nova versão, abre a página `/releases/` para download.

3. **Popup**  
   Permite interação rápida e controle de configurações da extensão pelo usuário.

4. **Content script**  
   Injetado nas páginas SIGADAER e SILOMS para capturar dados necessários.

---

## Observações

- Compatível com **Chrome Manifest V3**.