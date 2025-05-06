import Header from "@/components/layout/Header";
import { WishlistClientContent } from "@/components/wishlist/WishlistClientContent";
import Link from "next/link";


// Mock data - In a real app, this would likely come from a user-specific API call
const mockWishlistBooks = [
  { id: '2', title: 'The Pragmatic Programmer', thumbnailUrl: 'https://picsum.photos/200/300?random=2', price: 45.50, dataAiHint: "programming book" },
  { id: '4', title: 'Design Patterns', thumbnailUrl: 'https://picsum.photos/200/300?random=4', price: 54.00, dataAiHint: "coding patterns" },
];

export default function WishlistPage() {
  // In a real app, fetch wishlist items for the current user server-side
  const wishlistBooks = mockWishlistBooks; // Using mock data

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left text-primary">My Wishlist</h1>
        {wishlistBooks.length > 0 ? (
          <WishlistClientContent wishlistBooks={wishlistBooks} />
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            Your wishlist is empty. Add books from the <Link href="/" className="text-primary hover:underline">Home</Link> page.
          </div>
        )}
      </div>
    </>
  );
}
