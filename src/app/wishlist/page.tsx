import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Trash2 } from "lucide-react";

// Mock data - Replace with actual Wishlist management logic
const mockWishlistBooks = [
  { id: '2', title: 'The Pragmatic Programmer', thumbnailUrl: 'https://picsum.photos/200/300?random=2', price: 45.50, dataAiHint: "programming book" },
  { id: '4', title: 'Design Patterns', thumbnailUrl: 'https://picsum.photos/200/300?random=4', price: 54.00, dataAiHint: "coding patterns" },
];

export default function WishlistPage() {
  // In a real app, fetch wishlist items for the current user
  const wishlistBooks = mockWishlistBooks; // Using mock data

  // TODO: Implement actual move to cart/purchase and remove functionality
  const handleMoveToCart = (bookId: string) => console.log("Move to Cart/Purchase:", bookId);
  const handleRemoveFromWishlist = (bookId: string) => console.log("Remove from Wishlist:", bookId);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left text-primary">My Wishlist</h1>
        {wishlistBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {wishlistBooks.map((book) => (
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
                   <p className="text-primary font-medium">${book.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter className="p-4 flex flex-col gap-2 items-stretch">
                   <Button size="sm" onClick={() => handleMoveToCart(book.id)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                     <ShoppingCart className="h-4 w-4 mr-2" />
                     Purchase
                   </Button>
                   <Button variant="outline" size="sm" onClick={() => handleRemoveFromWishlist(book.id)}>
                     <Trash2 className="h-4 w-4 mr-2" />
                     Remove
                   </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            Your wishlist is empty. Add books from the <a href="/" className="text-primary hover:underline">Home</a> page.
          </div>
        )}
      </div>
    </>
  );
}
