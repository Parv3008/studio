/**
 * Represents a purchase.
 */
export interface Purchase {
  /**
   * The unique identifier of the purchase.
   */
id: string;
  /**
   * The ID of the book purchased.
   */
bookId: string;
  /**
   * The user ID of the purchaser. (Assumed to be a specific user for mock data)
   */
userId: string;
  /**
   * The date of the purchase.
   */
purchaseDate: Date;
}

/**
 * Represents possible status of a book purchase for tracking the state of
 * a user's read book.
 */
export type BookStatus = 'Reading' | 'Completed' | 'Not Started';


// Mock data for demonstration. Replace with actual API/DB calls.
// Assume a single user "user1" for simplicity
const mockUserPurchases: Purchase[] = [
    { id: 'p1', bookId: '1', userId: 'user1', purchaseDate: new Date(2024, 5, 1) },
    { id: 'p2', bookId: '6', userId: 'user1', purchaseDate: new Date(2024, 6, 15) },
    { id: 'p3', bookId: '2', userId: 'user1', purchaseDate: new Date(2024, 7, 1) },
];

const mockBookStatuses: { [key: string]: BookStatus } = { // Key: "userId-bookId"
    'user1-1': 'Reading',
    'user1-6': 'Completed',
    'user1-2': 'Not Started',
    'user1-5': 'Not Started', // Academic book, might not be 'purchased' but available
};


/**
 * Asynchronously records a book purchase for a user.
 *
 * @param bookId The ID of the book purchased.
 * @param userId The ID of the user who made the purchase.
 * @returns A promise that resolves to a Purchase object.
 */
export async function recordPurchase(bookId: string, userId: string): Promise<Purchase> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 200));
  // TODO: Implement this by calling an API or database.
  const newPurchase: Purchase = {
    id: `p${mockUserPurchases.length + 1}`, // Simple ID generation for mock
    bookId: bookId,
    userId: userId,
    purchaseDate: new Date(),
  };
  mockUserPurchases.push(newPurchase);
  // Set initial status
  mockBookStatuses[`${userId}-${bookId}`] = 'Not Started';
  console.log("Mock Purchase Recorded:", newPurchase);
  return newPurchase;
}

/**
 * Gets books already purchased by a user.
 *
 * @param userId ID of the user who made the purchase.
 * @returns A promise that resolves to an array of Purchase objects.
 */
export async function getPurchasedBooks(userId: string): Promise<Purchase[]> {
   // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 250));
  // TODO: Implement this by calling an API or database.
  return mockUserPurchases.filter(p => p.userId === userId);
}

/**
 * Gets status of purchased books.
 *
 * @param bookId ID of the book purchased.
 * @param userId ID of the user who made the purchase.
 * @returns A promise that resolves to a BookStatus.
 */
export async function getPurchasedBookStatus(
  bookId: string,
  userId: string
): Promise<BookStatus> {
   // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 50));
  // TODO: Implement this by calling an API or database.
  return mockBookStatuses[`${userId}-${bookId}`] || 'Not Started';
}

/**
 * Updates the status of a purchased book.
 *
 * @param bookId ID of the book.
 * @param userId ID of the user.
 * @param status The new status to set.
 * @returns A promise that resolves when the status is updated.
 */
export async function updatePurchasedBookStatus(
  bookId: string,
  userId: string,
  status: BookStatus
): Promise<void> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));
  // TODO: Implement this by calling an API or database.
  mockBookStatuses[`${userId}-${bookId}`] = status;
  console.log(`Mock Status Updated for ${userId}-${bookId}: ${status}`);
}

// TODO: Implement functions for academic book management (if different from purchase)
