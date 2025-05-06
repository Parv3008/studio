'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Trash2 } from "lucide-react";
import type { Book } from "@/services/bookstore"; // Assuming type definition exists

interface WishlistClientContentProps {
  wishlistBooks: (Omit<Book, 'thumbnailUrl' | 'price'> & { thumbnailUrl: string; price: number; dataAiHint?: string })[];
}

export function WishlistClientContent({ wishlistBooks }: WishlistClientContentProps) {

  // TODO: Implement actual move to cart/purchase and remove functionality
  // These handlers now live in the client component
  const handleMoveToCart = (bookId: string) => {
    console.log("Move to Cart/Purchase:", bookId);
    // Add logic to interact with cart/purchase service
  };

  const handleRemoveFromWishlist = (bookId: string) => {
    console.log("Remove from Wishlist:", bookId);
    // Add logic to interact with wishlist service and update UI state
    // Might need useState here to manage the displayed list if removing items locally
  };

  return (
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
  );
}
