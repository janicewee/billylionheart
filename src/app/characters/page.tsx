"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

interface Character {
  id: number;
  name: string;
  description: string;
  species: string;
  type: string;
  appearsInBooks: number[];
}

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState("");
  const [bookFilter, setBookFilter] = useState<string>("all");
  const [speciesFilter, setSpeciesFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    filterCharacters();
  }, [characters, search, bookFilter, speciesFilter, typeFilter]);

  const fetchCharacters = async () => {
    try {
      setError(null);
      const response = await fetch("/api/characters?limit=100");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received");
      }
      
      setCharacters(data);
      setFilteredCharacters(data);
    } catch (err) {
      console.error("Failed to fetch characters:", err);
      setError(err instanceof Error ? err.message : "Failed to load characters");
    } finally {
      setLoading(false);
    }
  };

  const filterCharacters = () => {
    let filtered = characters;

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (char) =>
          char.name?.toLowerCase().includes(search.toLowerCase()) ||
          char.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Book filter
    if (bookFilter !== "all") {
      const bookNum = parseInt(bookFilter);
      filtered = filtered.filter((char) =>
        Array.isArray(char.appearsInBooks) && char.appearsInBooks.includes(bookNum)
      );
    }

    // Species filter
    if (speciesFilter !== "all") {
      filtered = filtered.filter((char) => char.species === speciesFilter);
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((char) => char.type === typeFilter);
    }

    setFilteredCharacters(filtered);
  };

  const uniqueSpecies = Array.from(
    new Set(characters.map((c) => c.species).filter(Boolean))
  );
  const uniqueTypes = Array.from(
    new Set(characters.map((c) => c.type).filter(Boolean))
  );

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-12">
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-destructive mb-4">Error: {error}</p>
              <Button onClick={fetchCharacters}>Try Again</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Character Directory
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore the wonderful characters from The Adventures of Billy Lionheart
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search characters..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={bookFilter} onValueChange={setBookFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Book" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Books</SelectItem>
                  <SelectItem value="1">Book 1</SelectItem>
                  <SelectItem value="2">Book 2</SelectItem>
                  <SelectItem value="3">Book 3</SelectItem>
                </SelectContent>
              </Select>

              <Select value={speciesFilter} onValueChange={setSpeciesFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Species</SelectItem>
                  {uniqueSpecies.map((species) => (
                    <SelectItem key={species} value={species}>
                      {species}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {uniqueTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(bookFilter !== "all" || speciesFilter !== "all" || typeFilter !== "all" || search) && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {bookFilter !== "all" && (
                  <Badge variant="secondary">Book {bookFilter}</Badge>
                )}
                {speciesFilter !== "all" && (
                  <Badge variant="secondary">{speciesFilter}</Badge>
                )}
                {typeFilter !== "all" && (
                  <Badge variant="secondary">{typeFilter}</Badge>
                )}
                {search && (
                  <Badge variant="secondary">Search: "{search}"</Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearch("");
                    setBookFilter("all");
                    setSpeciesFilter("all");
                    setTypeFilter("all");
                  }}
                >
                  Clear all
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredCharacters.length} of {characters.length} characters
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading characters...</p>
          </div>
        ) : filteredCharacters.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                No characters found matching your filters.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCharacters.map((character) => (
              <Card key={character.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{character.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline">{character.species}</Badge>
                      <Badge variant="secondary">{character.type}</Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {character.description}
                  </p>
                  
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Appears in:</p>
                    <div className="flex gap-1">
                      {Array.isArray(character.appearsInBooks) && character.appearsInBooks.map((bookNum) => (
                        <Badge key={bookNum} variant="default" className="text-xs">
                          Book {bookNum}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}