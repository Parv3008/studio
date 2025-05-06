import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import type { Book } from "@/services/bookstore"; // Assuming type definition exists

interface BookCardProps {
  book: Book & { dataAiHint?: string }; // Include optional AI hint
}

export function BookCard({ book }: BookCardProps) {
  // TODO: Implement actual Add to Wishlist and Purchase functionality
  const handleAddToWishlist = () => console.log("Add to Wishlist:", book.id);
  const handlePurchase = () => console.log("Purchase:", book.id);

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
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
      <CardFooter className="p-4 flex justify-between gap-2">
        <Button variant="outline" size="sm" onClick={handleAddToWishlist} aria-label={`Add ${book.title} to wishlist`}>
          <Heart className="h-4 w-4 mr-1" />
          Wishlist
        </Button>
        <Button size="sm" onClick={handlePurchase} className="bg-accent hover:bg-accent/90 text-accent-foreground" aria-label={`Purchase ${book.title}`}>
          <ShoppingCart className="h-4 w-4 mr-1" />
          Purchase
        </Button>
      </CardFooter>
    </Card>
  );
}
