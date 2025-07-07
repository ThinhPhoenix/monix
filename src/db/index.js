import Dexie from "dexie";
import { XataClient } from "@xata.io/client";

export const db = new Dexie("monix_db");
db.version(1).stores({
  users:
    "++id, username, passsword, email, avatar, createdAt, updatedAt, deletedAt",
  expenses:
    "++id, userId, amount, category, date, note, createdAt, updatedAt, deletedAt",
  categories: "++id, name, icon, createdAt, updatedAt, deletedAt",
});

const xata = new XataClient({
  apiKey: import.meta.env.VITE_XATA_API_KEY,
  branch: "main",
});

export async function syncUserToXata(userId) {
  const user = await db.users.get(userId);
  if (!user) return;
  const existing = await xata.db.users.read(userId);
  if (existing) {
    await xata.db.users.update(userId, user);
  } else {
    await xata.db.users.create({ ...user, id: userId });
  }
}

export async function syncUserFromXata(userId) {
  const xataUser = await xata.db.users.read(userId);
  if (!xataUser) return;
  await db.users.put(xataUser);
}
