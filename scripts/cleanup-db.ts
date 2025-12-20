import { db } from "../src/db";
import { books } from "../src/db/schema";
import { inArray } from "drizzle-orm";

async function main() {
  await db.delete(books).where(inArray(books.id, [13, 14, 15]));
  console.log("Deleted duplicate books 13, 14, 15");
  process.exit(0);
}

main().catch(console.error);
