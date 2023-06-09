const API = "https://codextern-4ny2.onrender.com/";

export async function postRequest(url, data, token) {
  let response = await (
    await fetch(`${API}${url}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": token
      }
  })).json();
  
  return response;
}

export async function getRequest(url, token) {
  let response = await (
    await fetch(`${API}${url}`, {
      headers: {
        "Authorization": token
      }
    })
  ).json();
  return response;
}

export async function putRequest(url, data, token) {
  let response = await (
    await fetch(`${API}${url}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": token
      }
  })).json();
  
  return response;
}

export async function putImage(url, file, token) {
  let formData = new FormData();
  formData.append("image", file);
  
  let response = await fetch(`${API}${url}`, {
    method: "PUT",
    body: formData,
    headers: {
      "Authorization": token
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export async function postData(url, file, token) {
  let response = await (
    await fetch(`${API}${url}`, {
      method: "POST",
      body: file,
      headers: {
        "Authorization": token
      }
  })).json();
  
  if (response.status === 500) {
    const error = new Error("Error 500: Hubo un error interno en el servidor. Revise que los datos ingresados sean correctos o intente de nuevo más tarde.");
    error.isServerError = true;
    throw error;
  }

  return response;
}