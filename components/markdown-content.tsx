"use client";

import Markdown from "markdown-to-jsx";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <Markdown
      options={{
        overrides: {
          h2: {
            component: ({ children, ...props }) => (
              <h2
                className="text-2xl font-bold mt-8 mb-4 text-primary"
                {...props}
              >
                {children}
              </h2>
            ),
          },
          h3: {
            component: ({ children, ...props }) => (
              <h3
                className="text-xl font-semibold mt-6 mb-3 text-foreground/80"
                {...props}
              >
                {children}
              </h3>
            ),
          },
          h4: {
            component: ({ children, ...props }) => (
              <h4
                className="text-lg font-medium mt-4 mb-2 text-foreground/70"
                {...props}
              >
                {children}
              </h4>
            ),
          },
          p: {
            component: ({ children, ...props }) => (
              <p className="mb-4 text-foreground/80" {...props}>
                {children}
              </p>
            ),
          },
          ul: {
            component: ({ children, ...props }) => (
              <ul className="list-disc list-inside mb-4 space-y-2" {...props}>
                {children}
              </ul>
            ),
          },
          li: {
            component: ({ children, ...props }) => (
              <li className="text-foreground/80" {...props}>
                {children}
              </li>
            ),
          },
          a: {
            component: ({ children, ...props }) => (
              <a
                className="text-primary hover:underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            ),
          },
        },
      }}
    >
      {content}
    </Markdown>
  );
}