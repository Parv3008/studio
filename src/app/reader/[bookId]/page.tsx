"use client"; // Required for hooks and state

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Bookmark, StickyNote, Sun, Moon, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { AIAssistant } from '@/components/reader/AIAssistant';
import { Card, CardContent } from '@/components/ui/card';

// Mock data - Replace with actual book data fetching and PDF rendering logic
const mockBook = {
  title: 'Introduction to Algorithms',
  totalPages: 50, // Example total pages
  // In a real app, you'd likely have a URL to the PDF or fetch page content
  getPageContent: async (page: number): Promise<string> => {
    // Simulate fetching page content
    await new Promise(resolve => setTimeout(resolve, 50)); // Simulate network delay
    return `This is the content for page ${page} of "Introduction to Algorithms". It discusses complex data structures and efficiency. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Section ${Math.ceil(page / 10)} focuses on sorting techniques.`;
  }
};

export default function ReaderPage() {
  const params = useParams();
  const bookId = params.bookId as string;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(mockBook.totalPages);
  const [pageContent, setPageContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [notes, setNotes] = useState<{ [key: number]: string }>({}); // Page number -> note content
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const fetchPage = async () => {
      setIsLoading(true);
      try {
        const content = await mockBook.getPageContent(currentPage);
        setPageContent(content);
        // In a real app, fetch book metadata (like total pages) here if not already known
        // setTotalPages(fetchedTotalPages);
      } catch (error) {
        console.error("Error fetching page content:", error);
        setPageContent("Error loading page content.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPage();
  }, [currentPage, bookId]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5));

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(prev => ({ ...prev, [currentPage]: e.target.value }));
     console.log(`Note saved for page ${currentPage}:`, e.target.value); // Add console log or toast
  };

  const toggleBookmark = () => {
    setBookmarks(prev =>
      prev.includes(currentPage)
        ? prev.filter(p => p !== currentPage)
        : [...prev, currentPage].sort((a, b) => a - b)
    );
     console.log(`Bookmark ${bookmarks.includes(currentPage) ? 'removed from' : 'added to'} page ${currentPage}`); // Add console log or toast
  };

  return (
    <div className={`flex flex-col h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Header */}
      <header className="flex items-center justify-between p-2 border-b bg-background sticky top-0 z-10">
        <h1 className="text-lg font-semibold truncate text-primary">{mockBook.title}</h1>
        <div className="flex items-center gap-1 md:gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Take Notes">
                <StickyNote className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Notes for Page {currentPage}</SheetTitle>
              </SheetHeader>
              <Textarea
                placeholder="Write your notes here..."
                className="mt-4 h-4/5 resize-none"
                value={notes[currentPage] || ''}
                onChange={handleNoteChange}
              />
              {/* TODO: Add save indicator/button */}
            </SheetContent>
          </Sheet>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleBookmark}
            aria-label={bookmarks.includes(currentPage) ? "Remove Bookmark" : "Add Bookmark"}
            className={bookmarks.includes(currentPage) ? 'text-accent' : ''}
            >
            <Bookmark className={`h-5 w-5 ${bookmarks.includes(currentPage) ? 'fill-current' : ''}`} />
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
         {/* AI Assistant Trigger */}
         <Sheet open={isAIAssistantOpen} onOpenChange={setIsAIAssistantOpen}>
            <SheetTrigger asChild>
               <Button variant="ghost" size="icon" className="text-accent hover:text-accent/90" aria-label="Open AI Assistant">
                 <Bot className="h-5 w-5" />
               </Button>
            </SheetTrigger>
             <SheetContent className="w-full sm:max-w-md flex flex-col">
              <SheetHeader>
                 <SheetTitle className="flex items-center gap-2">
                   <Bot className="h-5 w-5 text-accent"/> AI Assistant
                 </SheetTitle>
               </SheetHeader>
               <AIAssistant
                 bookTitle={mockBook.title}
                 currentPageContent={pageContent || ""}
                 isLoading={isLoading}
               />
             </SheetContent>
           </Sheet>
        </div>
      </header>

      {/* Reader Content */}
      <ScrollArea className="flex-grow bg-secondary/50 p-4">
         {/* Placeholder for PDF viewer */}
        <Card className="max-w-3xl mx-auto shadow-lg bg-background">
          <CardContent className="p-6 md:p-10 min-h-[60vh] overflow-auto" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}>
             {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : (
              <div className="prose dark:prose-invert max-w-none">
                 {/* In a real PDF viewer, you'd render the actual page here */}
                <p style={{ whiteSpace: 'pre-wrap' }}>{pageContent}</p>
               </div>
            )}
           </CardContent>
         </Card>
       </ScrollArea>

      {/* Footer / Controls */}
       <footer className="flex items-center justify-between p-2 border-t bg-background sticky bottom-0 z-10">
         <div className="flex items-center gap-1">
           <Button variant="outline" size="icon" onClick={handleZoomOut} disabled={zoomLevel <= 0.5}>
             <ZoomOut className="h-5 w-5" />
           </Button>
           <span className="text-sm w-10 text-center">{Math.round(zoomLevel * 100)}%</span>
           <Button variant="outline" size="icon" onClick={handleZoomIn} disabled={zoomLevel >= 2}>
             <ZoomIn className="h-5 w-5" />
           </Button>
         </div>
         <div className="flex items-center gap-2">
           <Button variant="outline" size="icon" onClick={handlePrevPage} disabled={currentPage <= 1}>
             <ChevronLeft className="h-5 w-5" />
           </Button>
           <span className="text-sm text-muted-foreground">
             Page {currentPage} of {totalPages}
           </span>
           <Button variant="outline" size="icon" onClick={handleNextPage} disabled={currentPage >= totalPages}>
             <ChevronRight className="h-5 w-5" />
           </Button>
         </div>
         {/* Placeholder for Jump to Page */}
         <div className="w-16"></div>
       </footer>
     </div>
   );
}
