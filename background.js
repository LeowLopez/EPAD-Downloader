// Listener para mensagens (alteração de ícone)
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.action === 'verificar_site') {
    const tab = sender.tab;
    const url = tab?.url || '';

    console.log('URL recebida:', url);

    let iconPath = 'icon_inactive.png';

    if (url.includes('sigadaer.intraer') || url.includes('siloms.intraer')) {
      iconPath = 'icon.png';
    }

    if (tab?.id !== undefined) {
      console.log(`Definindo ícone: ${iconPath} para a aba ${tab.id}`);
      chrome.action.setIcon({
        path: {
          "16": iconPath,
          "32": iconPath,
          "48": iconPath,
          "128": iconPath
        },
        tabId: tab.id
      });
    } else {
      console.warn('tabId ausente. Não foi possível alterar o ícone.');
    }
  }
});

// --- Função de checagem de atualização ---
async function checkForUpdate() {
  try {
    const res = await fetch('https://leowlopez.github.io/EPAD-Downloader/releases/latest.json');
    if (!res.ok) throw new Error('Falha ao buscar versão');
    
    const data = await res.json();
    const currentVersion = chrome.runtime.getManifest().version;

    if (data.version !== currentVersion) {
      // Abre a página de releases
      chrome.tabs.create({ url: `https://leowlopez.github.io/EPAD-Downloader/releases/?version=${data.version}` });
    }
  } catch (err) {
    console.error('Erro ao checar atualização:', err);
  }
}

// Checar ao iniciar e periodicamente
checkForUpdate(); // ao iniciar
setInterval(checkForUpdate, 1000 * 60 * 60); // a cada 1 hora