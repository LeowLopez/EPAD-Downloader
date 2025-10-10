fetch('latest.json')
  .then(res => res.json())
  .then(data => {
    document.querySelector('#latestRelease h2').innerText = `Versão: ${data.version}`;
    document.getElementById('notes').innerText = data.notes;
    document.getElementById('downloadLink').href = data.url;
  })
  .catch(err => console.error('Erro ao carregar releases:', err));