import type { Metadata } from "next";
// components
import Providers from "@/providers";
import Navbar from "@/layout/_main/navbar";
import Footer from "@/layout/_main/footer";
import * as api from "@/services";

export const metadata: Metadata = {
  title: "Brodream",
  description:
    "Brodream est votre plateforme incontournable pour des solutions innovantes et des idées créatives. Découvrez nos services et comment nous pouvons vous aider à réussir.",
  keywords: "Brodream, solutions innovantes, idées créatives, services",
  authors: [{ name: "Brodream", url: "https://brodream.fr" }],
  creator: "Brodream",
  openGraph: {
    title: "Brodream",
    description: "Découvrez des solutions innovantes avec Brodream.",
    url: "https://brodream.fr",
    siteName: "Brodream",
    images: [
      {
        url: "https://brodream.fr/wp-content/uploads/2024/10/machine-broderie-copie-6707bfebc0e16.webp",
        width: 800,
        height: 600,
        alt: "Image de Brodream",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brodream",
    description: "Découvrez des solutions innovantes avec Brodream.",
    images: [
      "https://brodream.fr/wp-content/uploads/2024/10/machine-broderie-copie-6707bfebc0e16.webp",
    ],
  },
  icons: {
    icon: "/favicon.ico", // Chemin vers le favicon
    apple: "/favicon.ico", // Optionnel : Chemin vers l’icône Apple Touch
  },
};

export const revalidate = 60;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categoriesData = await api.getAllCategories();
  return (
    <html lang="en">
      <body>
        <Providers lang="en">
          {/* <Box height={78} /> */}
          <Navbar data={categoriesData} />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
