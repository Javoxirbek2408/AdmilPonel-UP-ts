interface QueuedRequest {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}

interface RetriableRequest {
  config: {
    headers: Record<string, string>;
  };
  retry: () => Promise<unknown>;
}

export class RequestQueue {
  private queue: QueuedRequest[] = [];
  private isRefreshing = false;

  add(request: RetriableRequest): Promise<unknown> {
    return new Promise<string | null>((resolve, reject) => {
      this.queue.push({ resolve, reject });
    }).then((token) => {
      if (token && request.config.headers) {
        request.config.headers.Authorization = `Bearer ${token}`;
      }
      return request.retry();
    });
  }

  processAll(token: string | null = null): void {
    this.queue.forEach((p) => p.resolve(token));
    this.clear();
  }

  rejectAll(error: unknown): void {
    this.queue.forEach((p) => p.reject(error));
    this.clear();
  }

  clear(): void {
    this.queue = [];
  }

  get refreshing(): boolean {
    return this.isRefreshing;
  }

  set refreshing(status: boolean) {
    this.isRefreshing = status;
  }
}

export const requestQueue = new RequestQueue();
