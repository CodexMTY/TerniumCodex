const API = 'https://codextern-4ny2.onrender.com/';

export async function postRequest(url, data) {
  let response = await (
    await fetch(`${API}${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
  })).json();
  
  return response;
}

export async function getRequest(url) {
  let response = await (
    await fetch(`${API}${url}`)
  ).json();
  return response;
}

export async function putRequest(url, data) {
  let response = await (
    await fetch(`${API}${url}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
  })).json();
  
  return response;
}