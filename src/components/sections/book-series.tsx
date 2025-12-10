import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function BookSeries() {
  const books = [
    {
      id: 1,
      number: "Book 1",
      title: "Billy Lionheart",
      description: "After several attempts, Billy escapes from his foster home. Sort of. His lion nanny, Leonard, followed him on his quest, refusing to let him out of his sight. The pair gets hopelessly lost and settle in a land without any human in sight. Leonard meets the love of his life, the lioness Lina, and the pair adopts Billy as their eldest cub. Leonard and Lina have biological children of their own, raising their human cub with their lion cubs. Billy learns to talk to the animals and grows strong wrestling with young lions and living in the wild over the years. Billy finds a new lead on his biological parents and resumes his search, with his lion family in tow, dragging the entire pride into a series of wild adventures with Leonard masquerading as a human in the world of men, to watch over Billy.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/02ce17dc-4254-446e-825d-651a5175099d-billylionheart-com/assets/images/billylionheart-1764399456554-1.jpg",
      href: "/books/4"
    },
    {
      id: 2,
      number: "Book 2",
      title: "Billy & Bluma: Double Trouble",
      description: "Because of Leonard Lion's tooth mishap, Billy and Bluma stumble on a treasure map and a gold coin with Mathilda's face on it. Assuming that the map would lead them to Mathilda, they decide to follow the map and look for her. Leonard is against it, so they trick him and sneak out of St Lydia's Hearth, skipping orientation. Leonard pursues them and joins them in their quest. The map turns out to be a trap, leading them into the clutches of cult leader Junta. When they refuse to join Junta's cult, he sends Leonard away as trophy game in a private island while imprisoning Billy and Bluma in a dungeon. Can Billy and Bluma escape and save their lion guardian?",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/02ce17dc-4254-446e-825d-651a5175099d-billylionheart-com/assets/images/billybluma-1764399456893-2.jpg",
      href: "/books/5"
    },
    {
      id: 3,
      number: "Book 3",
      title: "Secret Hero & His Flying Lion",
      description: "Billy starts life afresh in boarding school, with Leonard Lion doing everything a lion can to watch over his human cub, even masquerading as a human adult with unconventional looks to go places where lions shouldn't, and comes back poisoned. His bestie, Bluma, and their new classmates team up to figure out who poisoned Leonard Lion. As the culprits get bolder, stakes increase. Can they stop the conspiracy before someone gets killed?",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/02ce17dc-4254-446e-825d-651a5175099d-billylionheart-com/assets/images/secrethero-1764399456948-3.jpg",
      href: "/books/6"
    }
  ];

  return (
    <section className="container py-16 bg-background/50 rounded-lg">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        The Book Series
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {books.map((book) => (
          <div
            key={book.id}
            data-slot="card"
            className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Link className="block" href={book.href}>
              <div className="relative aspect-[3/4] w-full bg-muted cursor-pointer hover:opacity-90 transition-opacity">
                <Image
                  alt={book.title}
                  src={book.image}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
              </div>
            </Link>
            <div data-slot="card-content" className="p-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{book.number}</p>
                <h3 className="text-xl font-bold">{book.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {book.description}
              </p>
              <Link href={book.href} className="block w-full">
                <button
                  data-slot="button"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 w-full"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}