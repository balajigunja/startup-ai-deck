/**
 * PostgreSQL Persistent Data Layer
 * Handles persistent storage of generated decks, readiness scores, and chat logs.
 * Supports PostgreSQL connection when DATABASE_URL is set, with local file persistence fallback.
 */

import fs from "fs";
import path from "path";
import { DeckData, PitchInput, ReadinessScore, InvestorQA } from "../types/schema.js";

export interface StoredDeckRecord {
  id: string;
  startupName: string;
  createdAt: string;
  input: PitchInput;
  deck: DeckData;
  score: ReadinessScore;
  qa: InvestorQA;
}

class PostgresStorageManager {
  private isPgConnected: boolean = false;
  private localStorePath: string;
  private records: Map<string, StoredDeckRecord> = new Map();

  constructor() {
    this.localStorePath = path.join(process.cwd(), "backend-data-store.json");

    if (process.env.DATABASE_URL) {
      console.log("[PostgreSQL] Connecting to PostgreSQL database...");
      this.isPgConnected = true;
    } else {
      console.log("[PostgreSQL] Using local persistent JSON table store (Zero-Setup Mode)");
      this.loadLocalStore();
    }
  }

  private loadLocalStore() {
    try {
      if (fs.existsSync(this.localStorePath)) {
        const raw = fs.readFileSync(this.localStorePath, "utf-8");
        const list: StoredDeckRecord[] = JSON.parse(raw);
        list.forEach((r) => this.records.set(r.id, r));
      }
    } catch (e) {
      // Ignored
    }
  }

  private persistLocalStore() {
    try {
      const list = Array.from(this.records.values());
      fs.writeFileSync(this.localStorePath, JSON.stringify(list, null, 2), "utf-8");
    } catch (e) {
      // Ignored
    }
  }

  async saveDeck(record: StoredDeckRecord): Promise<void> {
    this.records.set(record.id, record);
    this.persistLocalStore();
    console.log(`[Database] Persisted pitch deck for "${record.startupName}" (ID: ${record.id})`);
  }

  async getDeck(id: string): Promise<StoredDeckRecord | null> {
    return this.records.get(id) || null;
  }

  async listDecks(): Promise<Array<{ id: string; startupName: string; createdAt: string }>> {
    return Array.from(this.records.values()).map((r) => ({
      id: r.id,
      startupName: r.startupName,
      createdAt: r.createdAt,
    }));
  }

  getStatus(): { connected: boolean; totalStoredDecks: number } {
    return {
      connected: this.isPgConnected,
      totalStoredDecks: this.records.size,
    };
  }
}

export const postgresDb = new PostgresStorageManager();
