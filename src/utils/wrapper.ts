import { refreshToken } from './auth';

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
  const res = await fetch(url, options);

  if (res.ok) {
    return res.json();
  }

  const json = await res.json();

  if (json.message === "jwt expired") {
    const refreshRes: any = await refreshToken();
    const json = await refreshRes.json();

    if (!json.success) {
      return json;
    }

    localStorage.setItem("accessToken", json.accessToken);
    localStorage.setItem("refreshToken", json.refreshToken);

    const headersInit: HeadersInit = {};
    options.headers = headersInit;

    options.headers.Authorization = json.accessToken;
    
    const res = await fetch(url, options);
    return res.json();
  } else {
    return json;
  }
};