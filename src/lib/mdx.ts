import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/resources");

export interface ResourcePost {
    slug: string;
    title: string;
    description: string;
    publishedAt: string;
    image?: string;
    draft?: boolean;
}

export interface ResourcePostWithContent extends ResourcePost {
    content: string;
}

export function getAllResourcePosts(): ResourcePost[] {
    if (!fs.existsSync(CONTENT_DIR)) return [];

    const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

    const posts = files.map((filename) => {
        const slug = filename.replace(/\.mdx$/, "");
        const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
        const { data } = matter(raw);

        return {
            slug,
            title: data.title ?? slug,
            description: data.description ?? "",
            publishedAt: data.publishedAt ?? "",
            image: data.image ?? undefined,
            draft: data.draft ?? false,
        };
    });

    // Sort by date, newest first
    return posts.sort(
        (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
    );
}

export function getPublishedResourcePosts(): ResourcePost[] {
    return getAllResourcePosts().filter((post) => !post.draft);
}

export function getResourcePost(slug: string): ResourcePostWithContent | null {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        publishedAt: data.publishedAt ?? "",
        image: data.image ?? undefined,
        draft: data.draft ?? false,
        content,
    };
}
