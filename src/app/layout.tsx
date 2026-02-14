import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kushagra Singhal | AI Systems Architect",
  description: "Founding Engineer & AI Systems Architect — Building production AI systems across EdTech, AdTech, Fleet Intelligence, Defense & Conversational AI.",
  keywords: ["AI", "Systems Architect", "Founding Engineer", "LangChain", "LangGraph", "FastAPI", "Next.js"],
  openGraph: {
    title: "Kushagra Singhal — Architect of Intelligent Systems",
    description: "11 AI agents. 6 microservices. 5 systems deployed. From RAG pipelines to drone detection.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
