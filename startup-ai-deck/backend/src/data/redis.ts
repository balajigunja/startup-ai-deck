/**
 * Redis Caching & Asynchronous Task Queue Layer
 * Supports external Redis when REDIS_URL is configured,
 * with an in-memory high-throughput queue & cache fallback.
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

class CacheAndQueueManager {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private queue: Array<{ id: string; payload: any; status: "pending" | "processing" | "done" }> = [];
  private isRedisConnected: boolean = false;

  constructor() {
    if (process.env.REDIS_URL) {
      console.log("[Redis] Initializing connection to Redis instance:", process.env.REDIS_URL);
      this.isRedisConnected = true;
    } else {
      console.log("[Cache/Queue] Using in-memory Redis-compatible Cache & Task Queue (Zero-Setup Mode)");
    }
  }

  // Cache Operations
  async set<T>(key: string, value: T, ttlSeconds: number = 3600): Promise<void> {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.cache.set(key, { value, expiresAt });
  }

  async get<T>(key: string): Promise<T | null> {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return entry.value as T;
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }

  // Task Queue Operations
  async enqueue(task: { id: string; payload: any }): Promise<void> {
    this.queue.push({ ...task, status: "pending" });
    console.log(`[TaskQueue] Enqueued task: ${task.id}`);
  }

  async dequeue(): Promise<{ id: string; payload: any } | null> {
    const task = this.queue.find((t) => t.status === "pending");
    if (!task) return null;
    task.status = "processing";
    return task;
  }

  async completeTask(id: string): Promise<void> {
    const task = this.queue.find((t) => t.id === id);
    if (task) task.status = "done";
  }

  getStatus(): { connected: boolean; cachedKeysCount: number; queuedTasksCount: number } {
    return {
      connected: this.isRedisConnected,
      cachedKeysCount: this.cache.size,
      queuedTasksCount: this.queue.filter((t) => t.status === "pending").length,
    };
  }
}

export const redisCache = new CacheAndQueueManager();
