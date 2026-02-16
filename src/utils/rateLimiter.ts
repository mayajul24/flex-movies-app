interface RateLimiterConfig {
  maxRequests: number;
  windowMs: number;
}

interface RateLimiter {
  canMakeRequest: () => boolean;
  recordRequest: () => void;
}

export function createRateLimiter(config: RateLimiterConfig): RateLimiter {
  const timestamps: number[] = [];

  function pruneOld() {
    const cutoff = Date.now() - config.windowMs;
    while (timestamps.length > 0 && timestamps[0] < cutoff) {
      timestamps.shift();
    }
  }

  return {
    canMakeRequest(): boolean {
      pruneOld();
      return timestamps.length < config.maxRequests;
    },
    recordRequest(): void {
      pruneOld();
      timestamps.push(Date.now());
    },
  };
}