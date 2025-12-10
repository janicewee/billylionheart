import { ExternalLink } from "lucide-react";

export default function DragonUnbound() {
  return (
    <section className="container py-16">
      <div className="text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm max-w-3xl mx-auto bg-primary/5">
        <div className="p-8 space-y-4">
          <h2 className="text-2xl font-bold">
            What happens after The Adventures of Billy Lionheart?
          </h2>
          <p className="text-muted-foreground">
            Fast forward to adulthood. <strong>Dragon Unbound</strong> by Janice
            Wee continues their story after graduation when Billy proposes to
            Bluma. The epic fantasy novel Dragon Unbound is for grown ups only
            because of mature themes.
          </p>
          <a href="https://www.janicewee.com/books/dragon-unbound">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 gap-2 outline-none">
              Learn More About Dragon Unbound
              <ExternalLink className="h-4 w-4" />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}