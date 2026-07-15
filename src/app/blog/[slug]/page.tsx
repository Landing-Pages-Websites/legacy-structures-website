import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import blogPosts from "@/data/blog-posts";
import { absoluteUrl } from "@/lib/metadata";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.description,
    alternates: { canonical: absoluteUrl(`/blog/${post.slug}`) },
    openGraph: {
      type: "article",
      title: post.metaTitle,
      description: post.description,
      url: absoluteUrl(`/blog/${post.slug}`),
      images: [{ url: absoluteUrl(post.image), width: 1200, height: 630, alt: post.imageAlt }],
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.description,
      images: [absoluteUrl(post.image)],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div>
      {/* JSON-LD schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(post.schema) }}
      />

      {/* Hero */}
      <section
        style={{
          background: "#006580",
          padding: "clamp(40px, 6vw, 72px) 24px 32px",
          textAlign: "center",
          borderTop: "1px solid #efece8",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.75)",
              textTransform: "uppercase",
              letterSpacing: 1.5,
              margin: "0 0 8px",
            }}
          >
            {post.date} &middot; By {post.author}
          </p>
          <h1
            style={{
              color: "#fff",
              fontFamily: "var(--font-oswald), Impact, sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              lineHeight: 1.1,
              margin: "0 0 16px",
              textTransform: "uppercase",
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "clamp(15px, 1.5vw, 18px)",
              lineHeight: 1.5,
              maxWidth: 640,
              margin: "0 auto",
              fontFamily: "Georgia, serif",
            }}
          >
            {post.description}
          </p>
          <div
            aria-hidden="true"
            style={{
              height: 4,
              width: 72,
              background: "#ffc400",
              margin: "20px auto 0",
              borderRadius: 2,
            }}
          />
        </div>
      </section>

      {/* Featured image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 900,
          margin: "0 auto",
          aspectRatio: "1200 / 630",
          overflow: "hidden",
          borderRadius: "0 0 12px 12px",
        }}
      >
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 900px) 100vw, 900px"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* Article body */}
      <article
        style={{
          maxWidth: 740,
          margin: "0 auto",
          padding: "40px 20px 60px",
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: 18,
          lineHeight: 1.8,
          color: "#333",
        }}
        dangerouslySetInnerHTML={{ __html: post.body }}
      />

      {/* Back to blog link */}
      <div
        style={{
          textAlign: "center",
          padding: "0 20px 60px",
        }}
      >
        <Link
          href="/blog"
          style={{
            color: "#006580",
            fontWeight: 700,
            fontSize: 16,
            textDecoration: "none",
            fontFamily: "var(--font-poppins), sans-serif",
          }}
        >
          &larr; Back to Blog
        </Link>
      </div>

      <style>{`
        article a {
          color: #bd171f;
          text-decoration: underline;
          font-weight: 600;
        }
        article a:hover {
          color: #8a1015;
        }
        article img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 24px 0;
          display: block;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }
        article h2 {
          font-family: var(--font-poppins), sans-serif;
          font-size: clamp(22px, 2.5vw, 28px);
          font-weight: 700;
          color: #1a3a5c;
          margin: 40px 0 16px;
          line-height: 1.2;
        }
        article h3 {
          font-family: var(--font-poppins), sans-serif;
          font-size: clamp(18px, 2vw, 22px);
          font-weight: 600;
          color: #006580;
          margin: 32px 0 12px;
          line-height: 1.25;
        }
        article p {
          margin: 0 0 16px;
        }
        article ul, article ol {
          margin: 0 0 16px;
          padding-left: 24px;
        }
        article li {
          margin-bottom: 8px;
        }
        article .answer-capsule {
          background: #f0f4f8;
          border-left: 4px solid #bd171f;
          padding: 20px 24px;
          border-radius: 0 8px 8px 0;
          margin: 24px 0;
        }
        article .answer-capsule p:last-child {
          margin-bottom: 0;
        }
        article table {
          width: 100%;
          border-collapse: collapse;
          margin: 24px 0;
          font-size: 16px;
        }
        article th {
          background: #006580;
          color: #fff;
          padding: 12px 16px;
          text-align: left;
          font-family: var(--font-poppins), sans-serif;
        }
        article td {
          padding: 10px 16px;
          border-bottom: 1px solid #e8e4df;
        }
        article tr:nth-child(even) td {
          background: #f7f5f2;
        }
        article strong {
          color: #1a3a5c;
        }
      `}</style>
    </div>
  );
}
