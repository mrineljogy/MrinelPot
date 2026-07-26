import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { Send, User, Loader2, Plus, Paperclip } from 'lucide-react';
import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';

const assistantAvatarSrc = '/profile.jpeg';
const chatTransport = new DefaultChatTransport({
  api: '/api/chat',
});

const initialMessages: UIMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: 'Hi! Ask me anything about my work or background.',
      },
    ],
  },
];

const suggestedQuestions = [
  'Can you summarize this portfolio?',
  'What is Mrinel working on?',
  'What experience does Mrinel have?',
  'What are Mrinel’s strongest skills?',
];

const getMessageText = (message: UIMessage) =>
  message.parts.map((part) => (part.type === 'text' ? part.text : '')).join('');

const renderInlineMarkdown = (text: string) => {
  const parts: ReactNode[] = [];
  const markdownPattern = /(\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = markdownPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const content = match[2] ?? match[3] ?? match[4];
    parts.push(
      <strong key={`${match.index}-${content}`} className="font-medium text-foreground">
        {content}
      </strong>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length ? parts : text;
};

const FormattedMessage = ({ text }: { text: string }) => {
  const lines = text.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];
  let listType: 'ordered' | 'unordered' | null = null;

  const flushList = () => {
    if (!listItems.length) {
      return;
    }

    const ListTag = listType === 'ordered' ? 'ol' : 'ul';

    blocks.push(
      <ListTag
        key={`list-${blocks.length}`}
        className={`my-2 ml-4 space-y-1 ${
          listType === 'ordered' ? 'list-decimal' : 'list-disc'
        }`}
      >
        {listItems.map((item, index) => (
          <li key={`${item}-${index}`}>{renderInlineMarkdown(item)}</li>
        ))}
      </ListTag>
    );
    listItems = [];
    listType = null;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    const bulletMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (bulletMatch) {
      if (listType === 'ordered') {
        flushList();
      }
      listType = 'unordered';
      listItems.push(bulletMatch[1]);
      return;
    }

    const numberedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (numberedMatch) {
      if (listType === 'unordered') {
        flushList();
      }
      listType = 'ordered';
      listItems.push(numberedMatch[1]);
      return;
    }

    flushList();

    const headingMatch = trimmed.match(/^#{1,3}\s+(.+)$/);
    if (headingMatch) {
      blocks.push(
        <p key={`heading-${index}`} className="mt-2 font-medium text-foreground">
          {renderInlineMarkdown(headingMatch[1])}
        </p>
      );
      return;
    }

    blocks.push(
      <p key={`paragraph-${index}`} className="my-1">
        {renderInlineMarkdown(trimmed)}
      </p>
    );
  });

  flushList();

  return <>{blocks}</>;
};

const AssistantAvatar = () => {
  return (
    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border/70 bg-secondary shadow-sm">
      <img
        src={assistantAvatarSrc}
        alt="Mrinel Jogy"
        className="h-full w-full object-cover object-top"
        loading="lazy"
      />
    </div>
  );
};

const UserAvatar = () => {
  return (
    <div className="h-9 w-9 shrink-0 rounded-full bg-foreground flex items-center justify-center">
      <User className="w-4 h-4 text-background" />
    </div>
  );
};

export const ChatBot = () => {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status, error, clearError } = useChat({
    transport: chatTransport,
    messages: initialMessages,
  });

  const isLoading = status === 'submitted' || status === 'streaming';
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const showSuggestedQuestions = messages.length === initialMessages.length && !isLoading;

  // Keep scrolling inside the chat panel so the page itself does not jump.
  useEffect(() => {
    const messagesContainer = messagesContainerRef.current;
    if (!messagesContainer) {
      return;
    }

    messagesContainer.scrollTo({
      top: messagesContainer.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isLoading]);

  const sendQuestion = async (question: string) => {
    const text = question.trim();
    if (!text || isLoading) {
      return;
    }

    clearError();
    setInput('');
    await sendMessage({ text });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendQuestion(input);
  };

  return (
    <section className="py-16 px-6 sm:px-8 lg:px-12 bg-transparent">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 text-center space-y-2">
          <h2 className="text-3xl font-light text-foreground">AI Assistant</h2>
          <p className="text-foreground/60 font-light">
            Have a question? Chat with my AI representation.
          </p>
        </div>

        <div className="bg-background/55 border border-violet-300/20 rounded-2xl shadow-[0_18px_60px_rgba(76,29,149,0.18)] backdrop-blur-xl overflow-hidden flex flex-col h-[540px] min-h-0">
          <div className="flex items-center justify-between gap-3 border-b border-violet-300/15 bg-violet-950/10 px-4 py-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <AssistantAvatar />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">Mrinel's AI Assistant</p>
              </div>
            </div>
          </div>

          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto bg-transparent p-4 sm:p-6 space-y-5"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && <AssistantAvatar />}
                
                <div
                  className={`px-4 py-3 rounded-lg max-w-[82%] font-light shadow-sm ${
                    message.role === 'user'
                      ? 'bg-foreground text-background rounded-tr-sm shadow-none'
                      : 'bg-card text-foreground rounded-tl-sm border border-border/50'
                  }`}
                >
                  <div className="text-sm sm:text-base leading-relaxed">
                    {message.role === 'assistant' ? (
                      <FormattedMessage text={getMessageText(message)} />
                    ) : (
                      <p className="whitespace-pre-wrap">{getMessageText(message)}</p>
                    )}
                  </div>
                </div>

                {message.role === 'user' && <UserAvatar />}
              </div>
            ))}

            {showSuggestedQuestions && (
              <div className="ml-[52px] flex flex-wrap gap-2">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => sendQuestion(question)}
                    className="rounded-full border border-violet-300/25 bg-violet-500/5 px-3 py-2 text-left text-xs sm:text-sm font-light text-foreground/70 transition-all hover:border-violet-400/60 hover:bg-violet-500/10 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex gap-4 justify-start">
                <AssistantAvatar />
                <div className="px-4 py-3 rounded-lg bg-card text-foreground rounded-tl-sm border border-border/50 font-light flex items-center gap-2 shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-foreground/50" />
                  <span className="text-sm text-foreground/60">Thinking...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="flex gap-4 justify-start">
                <AssistantAvatar />
                <div className="px-4 py-3 rounded-lg bg-destructive/10 text-destructive rounded-tl-sm border border-destructive/20 font-light text-sm sm:text-base">
                  I'm not connected right now. This assistant needs to be deployed with an API key to work — try again once the site is live, or check back later!
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-transparent border-t border-violet-300/15">
            <form
              onSubmit={handleSubmit}
              className="container_chat_bot max-w-full"
            >
              <div className="container-chat-options">
                <div className="chat">
                  <div className="chat-bot">
                    <input
                      type="text"
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      placeholder="Ask about Mrinel's work..."
                      disabled={isLoading}
                    />
                  </div>
                  <div className="options">
                    <div className="btns-add" aria-hidden="true">
                      <button type="button" tabIndex={-1}><Plus className="w-4 h-4" /></button>
                      <button type="button" tabIndex={-1}><Paperclip className="w-4 h-4" /></button>
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || !input?.trim()}
                      className="btn-submit"
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
