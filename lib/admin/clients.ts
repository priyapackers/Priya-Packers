import "server-only";
import { sql } from "./db";

export interface Client {
  id: string;
  name: string;
  createdAt: string;
}

export interface ClientItem {
  id: string;
  clientId: string;
  itemName: string;
  length: number;
  breadth: number;
  height: number;
  bandhan: 1 | 2;
  ply: 3 | 5 | 7;
  flapKind: "center" | "over";
  price: number;
  createdAt: string;
  updatedAt: string;
}

function mapClient(row: Record<string, unknown>): Client {
  return {
    id: String(row.id),
    name: String(row.name),
    createdAt: String(row.created_at),
  };
}

function mapClientItem(row: Record<string, unknown>): ClientItem {
  return {
    id: String(row.id),
    clientId: String(row.client_id),
    itemName: String(row.item_name),
    length: Number(row.length),
    breadth: Number(row.breadth),
    height: Number(row.height),
    bandhan: Number(row.bandhan) as 1 | 2,
    ply: Number(row.ply) as 3 | 5 | 7,
    flapKind: row.flap_kind as "center" | "over",
    price: Number(row.price),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export async function getClients() {
  const rows = await sql(`
    SELECT *
    FROM clients
    ORDER BY name ASC
  `);

  return rows.map(mapClient);
}

export async function getClient(id: string) {
  const [row] = await sql(
    "SELECT * FROM clients WHERE id = $1",
    [id],
  );

  return row ? mapClient(row) : null;
}

export async function getClientItems(clientId: string) {
  const rows = await sql(
    `
      SELECT *
      FROM client_items
      WHERE client_id = $1
      ORDER BY item_name ASC
    `,
    [clientId],
  );

  return rows.map(mapClientItem);
}

export async function getClientItem(id: string) {
  const [row] = await sql(
    "SELECT * FROM client_items WHERE id = $1",
    [id],
  );

  return row ? mapClientItem(row) : null;
}