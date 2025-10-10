fetch('releases/latest.json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('version').innerText = `Versão: ${data.version}`;
    document.getElementById('notes').innerText = data.notes;
    document.getElementById('downloadLink').href = `releases/${data.url}`;
  })
  .catch(err => console.error('Erro ao carregar última versão:', err));