"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Send, FileText, Lightbulb, MessageSquareQuestion } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { answerDoubts } from '@/ai/flows/answer-doubts';
import { summarizeChapter } from '@/ai/flows/summarize-chapter';
import { suggestLearningMaterials } from '@/ai/flows/suggest-learning-materials';
import type { AnswerDoubtsOutput } from '@/ai/flows/answer-doubts';
import type { SummarizeChapterOutput } from '@/ai/flows/summarize-chapter';
import type { SuggestLearningMaterialsOutput } from '@/ai/flows/suggest-learning-materials';

interface AIAssistantProps {
  bookTitle: string;
  currentPageContent: string;
  isLoading: boolean; // Loading state of the main page content
}

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string | React.ReactNode; // Allow React nodes for structured content
};

export function AIAssistant({ bookTitle, currentPageContent, isLoading: isPageLoading }: AIAssistantProps) {
  const [isAILoading, setIsAILoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async (queryType: 'doubt' | 'summary' | 'suggestions') => {
    if (isAILoading || isPageLoading) return;
    setIsAILoading(true);
    setError(null);

    let userMessageContent: string | React.ReactNode = '';
    let promptInput: any = {};
    let aiFunction: (input: any) => Promise<any>;

    switch (queryType) {
      case 'doubt':
        if (!userInput.trim()) {
          setError("Please enter your question.");
          setIsAILoading(false);
          return;
        }
        userMessageContent = `My question: ${userInput}`;
        promptInput = { bookTitle, pageContent: currentPageContent, userQuestion: userInput };
        aiFunction = answerDoubts;
        break;
      case 'summary':
        userMessageContent = "Can you summarize this part?";
        // Note: summarizeChapter expects 'chapterText'. We're using 'currentPageContent' as an approximation.
        // A real implementation might need to fetch the full chapter text.
        promptInput = { bookTitle, chapterText: currentPageContent };
        aiFunction = summarizeChapter;
        break;
      case 'suggestions':
        userMessageContent = "Suggest related learning materials.";
        promptInput = { bookTitle, pageContent: currentPageContent };
        aiFunction = suggestLearningMaterials;
        break;
    }

    setMessages(prev => [...prev, { role: 'user', content: userMessageContent }]);
    if (queryType === 'doubt') setUserInput(''); // Clear input only for doubts

    try {
      const result = await aiFunction(promptInput);
      let assistantResponse: string | React.ReactNode;

       // Format the response based on the query type
      if ('answer' in result) {
        assistantResponse = result.answer;
      } else if ('summary' in result) {
        assistantResponse = (
            <Card className="mt-2 bg-secondary/50">
                <CardHeader><CardTitle className="text-base flex items-center gap-2"><FileText size={16}/> Summary</CardTitle></CardHeader>
                <CardContent><p>{result.summary}</p></CardContent>
            </Card>
        );
      } else if ('suggestions' in result) {
        assistantResponse = (
             <Card className="mt-2 bg-secondary/50">
                <CardHeader><CardTitle className="text-base flex items-center gap-2"><Lightbulb size={16}/> Suggestions</CardTitle></CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                        {(result as SuggestLearningMaterialsOutput).suggestions.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </CardContent>
            </Card>
        );
      } else {
        assistantResponse = "Sorry, I couldn't process that request.";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: assistantResponse }]);

    } catch (err) {
      console.error(`Error calling AI flow (${queryType}):`, err);
      const errorMessage = `Sorry, an error occurred while processing your ${queryType}. Please try again.`;
      setError(errorMessage);
      setMessages(prev => [...prev, { role: 'system', content: errorMessage }]);
    } finally {
      setIsAILoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full pt-4">
      <ScrollArea className="flex-grow mb-4 pr-4 -mr-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`p-3 rounded-lg max-w-[85%] ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : msg.role === 'assistant'
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-destructive text-destructive-foreground w-full text-center' // System/Error message
                }`}
              >
                {typeof msg.content === 'string' ? <p className="text-sm">{msg.content}</p> : msg.content}
              </div>
            </div>
          ))}
          {isAILoading && (
            <div className="flex justify-start">
              <div className="p-3 rounded-lg bg-secondary text-secondary-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mt-auto border-t pt-4">
         {/* Quick Action Buttons */}
         <div className="flex gap-2 mb-3 justify-center">
             <Button
              variant="outline"
              size="sm"
              onClick={() => handleSendMessage('summary')}
              disabled={isAILoading || isPageLoading}
              className="flex-1"
            >
               <FileText size={16} className="mr-1"/> Summarize
             </Button>
             <Button
              variant="outline"
              size="sm"
              onClick={() => handleSendMessage('suggestions')}
              disabled={isAILoading || isPageLoading}
              className="flex-1"
             >
              <Lightbulb size={16} className="mr-1"/> Suggest
             </Button>
           </div>

        {/* Doubt Input */}
        <div className="flex gap-2">
          <Textarea
            placeholder="Ask a question about the content..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            rows={2}
            className="resize-none flex-grow"
            aria-label="Ask a question"
            disabled={isAILoading || isPageLoading}
          />
          <Button
            size="icon"
            onClick={() => handleSendMessage('doubt')}
            disabled={!userInput.trim() || isAILoading || isPageLoading}
            aria-label="Send question"
          >
            {isAILoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
        {isPageLoading && <p className="text-xs text-muted-foreground mt-1">Please wait for page content to load...</p>}
      </div>
    </div>
  );
}
