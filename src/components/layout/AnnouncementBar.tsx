import Link from "next/link";
import { getAnnouncementContent } from "@/lib/data/announcement";

export default function AnnouncementBar() {
    const content = getAnnouncementContent();
    if (!content) return null;

    return (
        <Link
            href={content.href}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-10 bg-sage-600 hover:bg-sage-700 transition-colors px-4"
        >
            <span className="text-sm font-sans font-medium tracking-wide text-white whitespace-nowrap overflow-hidden text-ellipsis">
                {content.text}
            </span>
        </Link>
    );
}
