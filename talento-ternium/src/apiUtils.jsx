const API = 'https://codextern-4ny2.onrender.com/';

export async function postRequest(url, data) {
  const response = await fetch(`${API}${url}`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getRequest(url) {
  const response = await fetch(`${API}${url}`, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
    },
  });
  return response.json();
}