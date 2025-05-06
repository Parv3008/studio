import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data - Replace with actual API call using src/services/purchase.ts
const mockPurchasedBooks = [
  { id: '1', bookId: '1', title: 'Introduction to Algorithms', thumbnailUrl: 'https://picsum.photos/200/300?random=1', status: 'Reading', dataAiHint: "algorithm textbook" },
  { id: '2', bookId: '6', title: 'Learning Python', thumbnailUrl: 'https://picsum.photos/200/300?random=6', status: 'Completed', dataAiHint: "python programming" },
];

export default function ShopPage() {
   // In a real app, fetch purchased books using:
  // import { getPurchasedBooks } from '@/services/purchase';
  // const purchased = await getPurchasedBooks(userId); // Need user context
  // Then fetch book details and status for each purchased bookId
  const purchasedBooks = mockPurchasedBooks; // Using mock data

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left text-primary">My Purchased Books</h1>
        {purchasedBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {purchasedBooks.map((book) => (
              <Card key={book.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                <CardHeader className="p-0 relative aspect-[2/3]">
                  <Image
                    src={book.thumbnailUrl}
                    alt={book.title}
                    layout="fill"
                    objectFit="cover"
                     data-ai-hint={book.dataAiHint || "book cover"}
                  />
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-lg font-semibold mb-1 line-clamp-2">{book.title}</CardTitle>
                   <p className={`text-sm font-medium ${book.status === 'Completed' ? 'text-green-600' : 'text-blue-600'}`}>
                     Status: {book.status}
                   </p>
                </CardContent>
                <CardFooter className="p-4">
                   <Link href={`/reader/${book.bookId}`} passHref legacyBehavior>
                     <Button size="sm" className="w-full">
                       <BookOpen className="h-4 w-4 mr-2" />
                       Open Book
                     </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            You haven't purchased any books yet. Browse the <Link href="/" className="text-primary hover:underline">Home</Link> page to find books.
          </div>
        )}
      </div>
    </>
  );
}
