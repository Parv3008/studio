"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { BookCard } from "./BookCard";
import type { Book } from "@/services/bookstore"; // Assuming type definition exists
import { Search } from "lucide-react";

interface BookCatalogProps {
  books: (Book & { dataAiHint?: string })[]; // Books with optional AI hint
}

export function BookCatalog({ books }: BookCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = useMemo(() => {
    if (!searchTerm) {
      return books;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return books.filter((book) =>
      book.title.toLowerCase().includes(lowerCaseSearchTerm)
      // Add || book.subject.toLowerCase().includes(lowerCaseSearchTerm) if subject is available
    );
  }, [books, searchTerm]);

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search books by title or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full md:w-1/2 lg:w-1/3"
          aria-label="Search books"
        />
      </div>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          No books found matching your search.
        </div>
      )}
    </div>
  );
}
