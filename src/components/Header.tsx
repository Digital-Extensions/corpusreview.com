import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container-wide flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <span className="font-serif text-xl font-medium tracking-tight text-foreground">
            Corpus Review
          </span>
        </div>
        <nav className="flex items-center gap-6">
          <a 
            href="#philosophy" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Philosophy
          </a>
          <a 
            href="#workflow" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </a>
          <Button variant="cta" size="sm">
            Download Free Trial
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
