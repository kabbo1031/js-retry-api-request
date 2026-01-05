const statusEl = document.getElementById('status');

async function fetchWithRetry(url, retries = 3, delay = 1000){
  try{
    const res = await fetch(url);
    if(!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  }catch(err){
    if(retries === 0) throw err;
    statusEl.innerText = `Retrying... (${retries})`;
    await new Promise(r => setTimeout(r, delay));
    return fetchWithRetry(url, retries - 1, delay);
  }
}

async function load(){
  statusEl.innerText = 'Loading...';
  try{
    const data = await fetchWithRetry(
      'https://jsonplaceholder.typicode.com/invalid-url',
      3,
      1000
    );
    statusEl.innerText = 'Loaded ✔';
  }catch(err){
    statusEl.innerText = 'Failed after retries ❌';
  }
}
