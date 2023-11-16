export function apiRequest<T>(url: string, opts: object = {}) : Promise<T> {
  const baseURL = 'http://localhost:7070';
  const endpoint = url.startsWith('/') ? url : `/${url}`;
  return fetch(`${baseURL}${endpoint}`, opts).then(async function(response) {
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Не удалось загрузить данные с сервера (HTTP ${response.status})`);
    }
    let data;
    try {
      data = await response.json();
    } catch (err) {
      return;
    }
    return data;
  })
}
