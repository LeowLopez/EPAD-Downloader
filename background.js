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
      notifyUpdate(data.url, data.version);
    }
  } catch (err) {
    console.error('Erro ao checar atualização:', err);
  }
}

function notifyUpdate(downloadUrl, newVersion) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon.png',
    title: 'Nova versão disponível!',
    message: `Versão ${newVersion} está disponível. Clique para baixar.`,
    buttons: [{ title: 'Baixar agora' }]
  }, notifId => {
    chrome.notifications.onButtonClicked.addListener((id, btnIdx) => {
      if (id === notifId && btnIdx === 0) {
        chrome.tabs.create({ url: downloadUrl });
      }
    });
  });
}

// Checar ao iniciar e periodicamente
setInterval(checkForUpdate, 1000 * 60 * 60); // a cada 1 hora
checkForUpdate(); // ao iniciar
