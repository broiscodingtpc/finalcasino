import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEOHead({
  title = "Joker's Arena - Premium Solana Casino | JOKER Token Gaming Platform",
  description = "Experience the ultimate cyberpunk casino on Solana blockchain. Play Coin Flip, Number Roll, and more games with JOKER tokens. Premium gaming with Phantom wallet integration.",
  image = "https://jokers-arena.replit.app/og-image.png",
  url = "https://jokers-arena.replit.app"
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Update Open Graph tags
    const ogTags: Array<{ property?: string; name?: string; content: string }> = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: "Joker's Arena" },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'keywords', content: 'Solana, Casino, Crypto, JOKER token, Blockchain gaming, Phantom wallet, Cyberpunk, Web3 gaming' },
      { name: 'author', content: "Joker's Arena Team" },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
    ];

    ogTags.forEach(tag => {
      const identifier = tag.property || tag.name;
      if (!identifier) return;
      
      const existing = document.querySelector(`meta[${tag.property ? 'property' : 'name'}="${identifier}"]`);
      
      if (existing) {
        existing.setAttribute('content', tag.content);
      } else {
        const meta = document.createElement('meta');
        if (tag.property) {
          meta.setAttribute('property', tag.property);
        } else if (tag.name) {
          meta.setAttribute('name', tag.name);
        }
        meta.content = tag.content;
        document.head.appendChild(meta);
      }
    });

    // Add structured data for gaming website
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "GameApplication",
      "name": "Joker's Arena",
      "description": description,
      "url": url,
      "image": image,
      "applicationCategory": "Casino Game",
      "operatingSystem": "Web Browser",
      "gamePlatform": "Solana Blockchain",
      "genre": "Casino",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@type": "Organization",
        "name": "Joker's Arena"
      }
    };

    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.textContent = JSON.stringify(structuredData);
    } else {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [title, description, image, url]);

  return null;
}