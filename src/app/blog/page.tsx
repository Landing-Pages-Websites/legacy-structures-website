import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import blogPosts from "@/data/blog-posts";
import PageHero from "@/components/PageHero";
import FadeIn from "@/components/FadeIn";
import { createPageMetadata } from "@/lib/metadata";

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

const POSTS_PER_PAGE = 12;

// Newest first; slug breaks ties so posts sharing a date keep a stable order.
const sortedPosts = [...blogPosts].sort((a, b) => {
  if (a.date !== b.date) return a.date < b.date ? 1 : -1;
  return a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0;
});

const totalPages = Math.max(1, Math.ceil(sortedPosts.length / POSTS_PER_PAGE));

function parsePageParam(value: string | string[] | undefined): number | null {
  if (value === undefined) return 1;
  if (typeof value !== "string" || !/^[1-9]\d{0,5}$/.test(value)) return null;
  const page = Number(value);
  return page <= totalPages ? page : null;
}

function pageHref(page: number) {
  return page === 1 ? "/blog" : `/blog?page=${page}`;
}

export const metadata: Metadata = createPageMetadata({
  title: "Blog | Legacy Structures",
  description:
    "Read expert tips and inspiration from Legacy Structures for storage sheds, backyard barns, portable buildings, and more in Hudson Falls, NY.",
  path: "/blog",
  canonicalHost: "https://www.legacystructuresusa.com",
});

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const currentPage = parsePageParam((await searchParams).page);
  if (currentPage === null) notFound();

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = sortedPosts.slice(start, start + POSTS_PER_PAGE);

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
            {pagePosts.map((post) => (
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
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time> &middot; By {post.author}
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

            {totalPages > 1 && (
              <nav aria-label="Blog pagination" className="blog-pagination">
                {currentPage > 1 && (
                  <Link
                    href={pageHref(currentPage - 1)}
                    className="blog-pagination-link blog-pagination-step"
                    rel="prev"
                  >
                    <span aria-hidden="true">&larr;</span> Previous
                    <span className="blog-pagination-sr"> page</span>
                  </Link>
                )}
                <ul className="blog-pagination-list">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <li key={page}>
                        <Link
                          href={pageHref(page)}
                          className="blog-pagination-link"
                          aria-current={page === currentPage ? "page" : undefined}
                          aria-label={`Page ${page}`}
                        >
                          {page}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
                {currentPage < totalPages && (
                  <Link
                    href={pageHref(currentPage + 1)}
                    className="blog-pagination-link blog-pagination-step"
                    rel="next"
                  >
                    Next<span className="blog-pagination-sr"> page</span>{" "}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </nav>
            )}
          </div>
        </section>
      </FadeIn>

      <style>{`
        .blog-card-link:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .blog-pagination {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 8px;
          padding-top: 32px;
          border-top: 1px solid #e8e4df;
          font-family: var(--font-poppins);
        }
        .blog-pagination-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .blog-pagination-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          min-width: 44px;
          min-height: 44px;
          padding: 0 14px;
          border-radius: 8px;
          border: 1px solid #e8e4df;
          background: #f7f5f2;
          color: #1a3a5c;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .blog-pagination-link:hover {
          border-color: #1a3a5c;
        }
        .blog-pagination-link:focus-visible {
          outline: 3px solid #1a3a5c;
          outline-offset: 2px;
        }
        .blog-pagination-link[aria-current="page"] {
          background: #1a3a5c;
          border-color: #1a3a5c;
          color: #fff;
        }
        .blog-pagination-sr {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
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
