import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import blogPosts from "@/data/blog-posts";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Blog | Legacy Structures",
  description:
    "Read expert tips and inspiration from Legacy Structures for storage sheds, backyard barns, portable buildings, and more in Hudson Falls, NY.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <div>
      <PageHero
        title="Legacy Structures Blog"
        subtitle="Expert tips, ideas, and inspiration for your next backyard building project."
        variant="navy"
      />

      <FadeIn>
        <section style={{ background: "#fff", padding: "48px 24px 80px" }}>
          <div
            style={{
              maxWidth: 860,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 32,
            }}
          >
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 24,
                  textDecoration: "none",
                  background: "#f7f5f2",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid #e8e4df",
                  transition: "box-shadow 0.2s ease",
                }}
                className="blog-card-link"
              >
                <div
                  style={{
                    position: "relative",
                    width: 280,
                    minHeight: 200,
                    flexShrink: 0,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="280px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div
                  style={{
                    flex: 1,
                    padding: "20px 20px 20px 0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: 13,
                      color: "#8899aa",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      margin: "0 0 6px",
                      fontFamily: "var(--font-poppins)",
                    }}
                  >
                    {post.date} &middot; By {post.author}
                  </p>
                  <h2
                    style={{
                      fontSize: 22,
                      color: "#1a3a5c",
                      fontFamily: "var(--font-poppins)",
                      fontWeight: 700,
                      lineHeight: 1.25,
                      margin: "0 0 8px",
                    }}
                  >
                    {post.title}
                  </h2>
                  <p
                    style={{
                      fontSize: 15,
                      color: "#5a6c7e",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </FadeIn>

      <style>{`
        .blog-card-link:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        @media (max-width: 640px) {
          .blog-card-link {
            flex-direction: column !important;
          }
          .blog-card-link > div:first-child {
            width: 100% !important;
            min-height: 200px !important;
          }
          .blog-card-link > div:last-child {
            padding: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
