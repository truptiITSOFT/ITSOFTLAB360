import { authStorage } from "./authStorage";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://backend-itsoftlab360-lb-1426004176.ap-south-1.elb.amazonaws.com/api/users/----";

export interface ApiErrorResponse {
  error?: string;
  detail?: string;
  message?: string;
  [key: string]: any;
}

export class ApiError extends Error {
  status: number;
  data: ApiErrorResponse;

  constructor(status: number, data: ApiErrorResponse) {
    const message = data.error || data.detail || data.message || `API Error (${status})`;
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  let url: string;
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    url = endpoint;
  } else if (endpoint.startsWith("/api/")) {
    const origin = BASE_URL.split("/api/")[0] || "http://127.0.0.1:8000";
    url = `${origin}${endpoint}`;
  } else if (endpoint.startsWith("api/")) {
    const origin = BASE_URL.split("/api/")[0] || "http://127.0.0.1:8000";
    url = `${origin}/${endpoint}`;
  } else {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
    url = `${BASE_URL.endsWith("/") ? BASE_URL : BASE_URL + "/"}${cleanEndpoint}`;
  }

  const token = authStorage.getAccessToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return {} as T;
  }

  let data: any;
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    if (response.status === 401 && typeof window !== "undefined") {
      const isLoginRequest = endpoint.includes("login") || url.includes("/login");
      if (!isLoginRequest) {
        authStorage.clear();
        const currentPath = window.location.pathname;
        const isAlreadyOnLoginPage =
          currentPath === "/login" ||
          currentPath.endsWith("/login") ||
          currentPath.includes("/login/");

        if (!isAlreadyOnLoginPage) {
          if (currentPath.startsWith("/admin")) {
            window.location.href = "/admin/login";
          } else if (currentPath.startsWith("/franchise")) {
            window.location.href = "/franchise/login";
          } else if (currentPath.startsWith("/org")) {
            window.location.href = "/org/login";
          } else {
            window.location.href = "/login";
          }
        }
      }
    }
    throw new ApiError(response.status, data);
  }

  return data as T;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "GET" }),
  post: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
  put: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),
  patch: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
