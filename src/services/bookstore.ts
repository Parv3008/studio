/**
 * Represents a book in the bookstore.
 */
export interface Book {
  /**
   * The unique identifier of the book.
   */
id: string;
  /**
   * The title of the book.
   */
title: string;
  /**
   * The URL of the book's thumbnail image.
   */
thumbnailUrl: string;
  /**
   * The price of the book.
   */
price: number;
  /**
   * Optional hint for AI image generation based on title/content.
   */
  dataAiHint?: string;
}

// Mock data for demonstration purposes. Replace with actual API calls.
const mockBooks: Book[] = [
  { id: '1', title: 'Introduction to Algorithms', thumbnailUrl: 'https://picsum.photos/200/300?random=1', price: 59.99, dataAiHint: "algorithm textbook" },
  { id: '2', title: 'The Pragmatic Programmer', thumbnailUrl: 'https://picsum.photos/200/300?random=2', price: 45.50, dataAiHint: "programming book" },
  { id: '3', title: 'Clean Code: A Handbook of Agile Software Craftsmanship', thumbnailUrl: 'https://picsum.photos/200/300?random=3', price: 39.99, dataAiHint: "software development" },
  { id: '4', title: 'Design Patterns: Elements of Reusable Object-Oriented Software', thumbnailUrl: 'https://picsum.photos/200/300?random=4', price: 54.00, dataAiHint: "coding patterns" },
  { id: '5', title: 'Artificial Intelligence: A Modern Approach', thumbnailUrl: 'https://picsum.photos/200/300?random=5', price: 75.00, dataAiHint: "AI textbook" },
  { id: '6', title: 'Learning Python, 5th Edition', thumbnailUrl: 'https://picsum.photos/200/300?random=6', price: 49.95, dataAiHint: "python programming" },
  { id: '7', title: 'Cracking the Coding Interview', thumbnailUrl: 'https://picsum.photos/200/300?random=7', price: 35.99, dataAiHint: "interview preparation" },
  { id: '8', title: 'Structure and Interpretation of Computer Programs (SICP)', thumbnailUrl: 'https://picsum.photos/200/300?random=8', price: 62.50, dataAiHint: "computer science" },
];


/**
 * Asynchronously retrieves a list of all available books in the bookstore.
 *
 * @returns A promise that resolves to an array of Book objects.
 */
export async function getAllBooks(): Promise<Book[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  // TODO: Replace with actual API implementation
  return mockBooks;
}

/**
 * Asynchronously retrieves a book by its ID.
 *
 * @param id The ID of the book to retrieve.
 * @returns A promise that resolves to a Book object, or null if not found.
 */
export async function getBookById(id: string): Promise<Book | null> {
   // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 150));
  // TODO: Replace with actual API implementation
  const book = mockBooks.find(b => b.id === id);
  return book || null;
}

// TODO: Implement functions for wishlist management (add, remove, get)
// TODO: Implement functions for purchasing books (record purchase)
