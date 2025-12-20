import { db } from "../src/db";
import { books } from "../src/db/schema";

async function main() {
  const allBooks = await db.select().from(books);
  console.log(JSON.stringify(allBooks, null, 2));
  process.exit(0);
}

main().catch(console.error);
