import { Order } from "@/zustand/types";

export class OrdersDB {
  private static readonly DB_NAME = "OrdersDB";
  private static readonly STORE_NAME = "orders";
  private static readonly DB_VERSION = 1;

  private static openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => reject(request.error);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME);
        }
      };

      request.onsuccess = () => resolve(request.result);
    });
  }

  static async upsertOrder(id: string, value: any): Promise<void> {
    try {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.STORE_NAME, "readwrite");
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.put(value, id);

        request.onerror = () => {
          db.close();
          reject(request.error);
        };

        request.onsuccess = () => {
          db.close();
          resolve();
        };
      });
    } catch (error) {
      console.error("Error saving to IndexedDB:", error);
      throw error;
    }
  }

  static async deleteOrder(id: string): Promise<void> {
    try {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.STORE_NAME, "readwrite");
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.delete(id);

        request.onerror = () => {
          db.close();
          reject(request.error);
        };

        request.onsuccess = () => {
          db.close();
          resolve();
        };
      });
    } catch (error) {
      console.error("Error deleting from IndexedDB:", error);
      throw error;
    }
  }

  static async getAllOrders(): Promise<Order[]> {
    try {
      const db = await this.openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(this.STORE_NAME, "readonly");
        const store = transaction.objectStore(this.STORE_NAME);
        const request = store.getAll();

        request.onerror = () => {
          db.close();
          reject(request.error);
        };

        request.onsuccess = () => {
          db.close();
          resolve(request.result);
        };
      });
    } catch (error) {
      console.error("Error getting all orders from IndexedDB:", error);
      throw error;
    }
  }
}
