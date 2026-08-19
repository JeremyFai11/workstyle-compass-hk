import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "職場型格｜自適應深度辨型";
  const description = "給初入職場人士的繁體中文性格探索工具：40 題職場核心，按需要追加針對性追問，了解你的思考、協作與成長模式。";
  const image = new URL("/og-preview.jpg", origin).toString();

  return {
    metadataBase: new URL(origin),
    applicationName: "職場型格",
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "zh_HK",
      siteName: "職場型格",
      images: [{
        url: image,
        secureUrl: image,
        type: "image/jpeg",
        width: 1200,
        height: 630,
        alt: "職場型格：40 題職場情境深度辨型",
      }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-HK">
      <body>{children}</body>
    </html>
  );
}
