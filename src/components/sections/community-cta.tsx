import Link from 'next/link';

export default function CommunityCTA() {
  return (
    <section className="container py-16 text-center space-y-6">
      <h2 className="text-3xl font-bold">Join the Community</h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Register an account to rate and review the books, participate in
        discussions, and earn points to climb the leaderboard!
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/register">
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-10 rounded-md px-6 has-[>svg]:px-4">
            Get Started
          </button>
        </Link>
        <Link href="/characters">
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-6 has-[>svg]:px-4">
            Explore Characters
          </button>
        </Link>
      </div>
    </section>
  );
}