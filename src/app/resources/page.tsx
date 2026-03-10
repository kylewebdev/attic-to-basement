import { getPublishedResourcePosts } from "@/lib/mdx";
import {
    partners,
    externalResources,
    categoryLabels,
    categoryOrder,
} from "@/lib/data/partners";
import ResourcesPageClient from "./ResourcesPageClient";

export default function ResourcesPage() {
    const posts = getPublishedResourcePosts();

    const groupedPartners = categoryOrder
        .map((cat) => ({
            category: cat,
            label: categoryLabels[cat],
            items: partners.filter((p) => p.category === cat),
        }))
        .filter((group) => group.items.length > 0);

    return (
        <ResourcesPageClient
            groupedPartners={groupedPartners}
            externalResources={externalResources}
            posts={posts}
        />
    );
}
