import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { ChatMessage } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/spinner";

export default function ChatInterface() {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { data: messages, isLoading } = useQuery({
    queryKey: ['/api/chat'],
  });
  
  const mutation = useMutation({
    mutationFn: async (message: string) => {
      return apiRequest('POST', '/api/chat', {
        isUser: true,
        message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/chat'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      mutation.mutate(message);
      setMessage("");
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Chat Header */}
      <div className="bg-primary text-white p-4 flex items-center">
        <i className="ri-robot-line text-2xl mr-3"></i>
        <div>
          <h3 className="font-semibold">MediBot Assistant</h3>
          <p className="text-xs text-white/80">Online | Replies instantly</p>
        </div>
      </div>
      
      {/* Chat Body */}
      <div className="h-96 p-4 overflow-y-auto" id="chat-messages">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <LoadingSpinner size="lg" />
          </div>
        ) : messages && messages.length > 0 ? (
          <>
            {messages.map((msg: ChatMessage) => (
              <div key={msg.id} className={`chat-bubble ${msg.isUser ? 'user' : 'ai'}`}>
                <p>{msg.message}</p>
              </div>
            ))}
          </>
        ) : (
          <div className="chat-bubble ai">
            <p>Hello! I'm MediBot, your medical assistant. How can I help you today?</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat Input */}
      <div className="border-t border-gray-200 p-4">
        <form className="flex items-center" onSubmit={handleSubmit}>
          <Input 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your medical question here..." 
            className="flex-grow mr-2"
            disabled={mutation.isPending}
          />
          <Button 
            type="submit" 
            className="bg-primary text-white rounded-lg p-2 hover:bg-primary/90 transition-all"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <LoadingSpinner size="sm" className="text-white" />
            ) : (
              <i className="ri-send-plane-fill text-xl"></i>
            )}
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          Note: This chat provides general information only and is not a substitute for professional medical advice.
        </p>
      </div>
    </div>
  );
}
