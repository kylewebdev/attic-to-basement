import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPublishedResourcePosts, getResourcePost } from "@/lib/mdx";
import { siteUrl, siteName } from "@/lib/metadata";
import JsonLd from "@/components/seo/JsonLd";
import ConsultationCTA from "@/components/sections/ConsultationCTA";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getPublishedResourcePosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getResourcePost(slug);
    if (!post) return {};

    const url = `${siteUrl}/resources/${slug}`;

    return {
        title: `${post.title} | ${siteName}`,
        description: post.description,
        alternates: { canonical: url },
        openGraph: {
            title: post.title,
            description: post.description,
            url,
            siteName,
            type: "article",
            publishedTime: post.publishedAt,
            ...(post.image && {
                images: [{ url: `${siteUrl}${post.image}` }],
            }),
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
        },
    };
}

export default async function ResourcePostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = getResourcePost(slug);
    if (!post) notFound();

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        ...(post.image && {
            image: `${siteUrl}${post.image}`,
        }),
        publisher: {
            "@type": "Organization",
            name: siteName,
            url: siteUrl,
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${siteUrl}/resources/${slug}`,
        },
    };

    return (
        <>
            <JsonLd data={articleSchema} />
            <article className="pt-[10.5rem] pb-16 md:pt-[12.5rem] md:pb-24 bg-bg-primary">
                <div className="max-w-3xl mx-auto px-4">
                    <Link
                        href="/resources"
                        className="inline-flex items-center gap-1 text-sm text-sage-300 hover:text-sage-500 transition-colors mb-8"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Resources
                    </Link>

                    <header className="mb-10">
                        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-heading leading-tight">
                            {post.title}
                        </h1>
                        {post.publishedAt && (
                            <time
                                dateTime={post.publishedAt}
                                className="block mt-4 text-sm text-text-muted"
                            >
                                {new Date(
                                    post.publishedAt + "T00:00:00"
                                ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                        )}
                    </header>

                    {post.image && (
                        <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-10">
                            <Image
                                src={post.image}
                                alt=""
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 768px) 100vw, 768px"
                                priority
                            />
                        </div>
                    )}

                    <div className="prose prose-lg max-w-none text-text-body prose-headings:font-serif prose-headings:text-text-heading prose-a:text-sage-300 prose-a:hover:text-sage-500 prose-strong:text-text-heading">
                        <MDXRemote source={post.content} />
                    </div>
                </div>
            </article>

            <ConsultationCTA />
        </>
    );
}
