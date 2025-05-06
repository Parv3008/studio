import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data - Replace with actual API calls and user-specific data
const mockAcademicBooks = [
   { id: '1', bookId: '1', title: 'Introduction to Algorithms', thumbnailUrl: 'https://picsum.photos/200/300?random=1', status: 'Reading', dataAiHint: "algorithm textbook" },
   { id: '5', bookId: '5', title: 'Artificial Intelligence: A Modern Approach', thumbnailUrl: 'https://picsum.photos/200/300?random=5', status: 'Not Started', dataAiHint: "AI textbook" },
];

const mockPurchasedBooks = [
  { id: '1', bookId: '1', title: 'Introduction to Algorithms', thumbnailUrl: 'https://picsum.photos/200/300?random=1', status: 'Reading', dataAiHint: "algorithm textbook" },
  { id: '6', bookId: '6', title: 'Learning Python', thumbnailUrl: 'https://picsum.photos/200/300?random=6', status: 'Completed', dataAiHint: "python programming" },
   { id: '2', bookId: '2', title: 'The Pragmatic Programmer', thumbnailUrl: 'https://picsum.photos/200/300?random=2', status: 'Not Started', dataAiHint: "programming book" },
];

const BookGrid = ({ books }: { books: any[] }) => (
   books.length > 0 ? (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {books.map((book) => (
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
             <p className={`text-sm font-medium ${
                book.status === 'Completed' ? 'text-green-600' :
                book.status === 'Reading' ? 'text-blue-600' :
                'text-muted-foreground'
              }`}>
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
       No books in this section.
     </div>
   )
);


export default function LibraryPage() {
  // In a real app, fetch academic and purchased books based on user
  const academicBooks = mockAcademicBooks;
  const purchasedBooks = mockPurchasedBooks;

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left text-primary">My Library</h1>

         <Tabs defaultValue="academic" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="purchased">Purchased</TabsTrigger>
          </TabsList>
          <TabsContent value="academic">
            <BookGrid books={academicBooks} />
           </TabsContent>
          <TabsContent value="purchased">
             <BookGrid books={purchasedBooks} />
           </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
