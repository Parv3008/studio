import { BookCatalog } from "@/components/books/BookCatalog";
import Header from "@/components/layout/Header";

// Mock data - Replace with actual API call using src/services/bookstore.ts
const mockBooks = [
  { id: '1', title: 'Introduction to Algorithms', thumbnailUrl: 'https://picsum.photos/200/300?random=1', price: 59.99, dataAiHint: "algorithm textbook" },
  { id: '2', title: 'The Pragmatic Programmer', thumbnailUrl: 'https://picsum.photos/200/300?random=2', price: 45.50, dataAiHint: "programming book" },
  { id: '3', title: 'Clean Code', thumbnailUrl: 'https://picsum.photos/200/300?random=3', price: 39.99, dataAiHint: "software development" },
  { id: '4', title: 'Design Patterns', thumbnailUrl: 'https://picsum.photos/200/300?random=4', price: 54.00, dataAiHint: "coding patterns" },
   { id: '5', title: 'Artificial Intelligence: A Modern Approach', thumbnailUrl: 'https://picsum.photos/200/300?random=5', price: 75.00, dataAiHint: "AI textbook" },
  { id: '6', title: 'Learning Python', thumbnailUrl: 'https://picsum.photos/200/300?random=6', price: 49.95, dataAiHint: "python programming" },
];

export default function HomePage() {
  // In a real app, fetch books using:
  // import { getAllBooks } from '@/services/bookstore';
  // const books = await getAllBooks();
  const books = mockBooks; // Using mock data for now

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left text-primary">Available Books</h1>
        <BookCatalog books={books} />
      </div>
    </>
  );
}
