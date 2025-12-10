import Link from "next/link";
import { 
  BookOpen, 
  Book, 
  Users, 
  Library, 
  Trophy, 
  ChefHat, 
  Menu 
} from "lucide-react";

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 font-bold text-xl text-foreground"
          >
            <BookOpen className="h-6 w-6 text-primary" />
            <span>Billy Lionheart</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary text-primary"
            >
              <BookOpen className="h-4 w-4" />
              Home
            </Link>
            
            <Link 
              href="/books" 
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            >
              <Book className="h-4 w-4" />
              Books
            </Link>
            
            <Link 
              href="/characters" 
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            >
              <Users className="h-4 w-4" />
              Characters
            </Link>
            
            <Link 
              href="/book-club" 
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            >
              <Library className="h-4 w-4" />
              Book Club
            </Link>
            
            <Link 
              href="/leaderboard" 
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            >
              <Trophy className="h-4 w-4" />
              Leaderboard
            </Link>
            
            <Link 
              href="/secret-recipes" 
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
            >
              <ChefHat className="h-4 w-4" />
              Secret Recipes
            </Link>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button 
            type="button"
            className="items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] hover:bg-accent hover:text-accent-foreground h-8 rounded-md gap-1.5 px-3 hidden sm:inline-flex"
          >
            Login
          </button>
          
          <button 
            type="button"
            className="items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-8 rounded-md gap-1.5 px-3 hidden sm:inline-flex"
          >
            Register
          </button>
          
          <button 
            type="button"
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] hover:bg-accent hover:text-accent-foreground h-8 rounded-md gap-1.5 px-3 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}