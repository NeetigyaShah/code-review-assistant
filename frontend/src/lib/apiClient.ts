const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
    ...options
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const api = {
  uploadFile(data: { filename: string; language: string; content: string }): Promise<{ fileId: string; reused?: boolean }> {
    return request('/files', { method: 'POST', body: JSON.stringify(data) });
  },
  listFiles(): Promise<{ files: any[] }> { return request('/files'); },
  createReview(fileId: string): Promise<{ reviewId: string }> { return request('/reviews', { method: 'POST', body: JSON.stringify({ fileId }) }); },
  listReviews(): Promise<{ reviews: any[] }> { return request('/reviews'); },
  getReview(id: string): Promise<{ review: any }> { return request(`/reviews/${id}`); }
};
