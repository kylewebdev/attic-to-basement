import type { ReactNode } from "react";

export interface FAQItem {
    question: string;
    answer: ReactNode;
}

export const faq: FAQItem[] = [
    {
        question: "How does an estate sale work?",
        answer: (
            <>
                <p>
                    An estate sale is a multi-day public sale held inside the
                    home, where personal property is organized, priced, and sold
                    to walk-in buyers. We handle everything from setup to
                    cleanup.
                </p>
                <p>
                    Typically, we operate within the following stages to ensure
                    a complete sale process:
                </p>
                <ul>
                    <li>Organize sale items</li>
                    <li>
                        Carefully stage the sale for maximum returns
                    </li>
                    <li>
                        Promote the sale through a variety of on-line
                        advertising sites and other outlets
                    </li>
                    <li>
                        Conduct the sale with professionalism, attention to
                        detail and enthusiasm
                    </li>
                    <li>Dispose of any remaining unwanted items</li>
                    <li>Remove our property and clean as directed</li>
                </ul>
            </>
        ),
    },
    {
        question: "How much does it cost to have you handle my estate sale?",
        answer: (
            <>
                <p>
                    Attic to Basement Estate Liquidators will perform your sale
                    with no upfront costs.
                </p>
                <p>
                    We work on a percentage of the estate sale and our fee is
                    deducted from the money collected from the proceeds of the
                    sale. With our experience and dedicated staff, we handle the
                    sale from beginning to end so you don&apos;t have to.
                </p>
            </>
        ),
    },
    {
        question: "Do I need to do anything to prepare for the estate sale?",
        answer: (
            <>
                <p>
                    Here is a quick checklist of items to help guide you in
                    preparation for your estate sale:
                </p>
                <ol>
                    <li>
                        <strong>DO NOT</strong> throw anything away. As the
                        saying goes &ldquo;one man&apos;s trash is another
                        man&apos;s treasure&rdquo; and that is absolutely true.
                        There are consumers for almost anything, so please leave
                        everything behind that you don&apos;t want.
                    </li>
                    <li>
                        <strong>ONLY TAKE</strong> what you personally want and
                        leave the rest.
                    </li>
                    <li>
                        If you&apos;re unable to remove your personal items from
                        the home prior to the sale please safeguard them in a
                        locked room.
                    </li>
                    <li>
                        Give us clear instructions for items that are not to be
                        sold.
                    </li>
                    <li>
                        <strong>ABOVE ALL</strong> please don&apos;t stress
                        about what is left behind, it&apos;s our job to take
                        care of everything for you.
                    </li>
                </ol>
            </>
        ),
    },
    {
        question: "How is the estate sale promoted?",
        answer: (
            <>
                <p>
                    We list every sale on EstateSales.org and EstateSales.net,
                    and promote to our email list of 25,000+ subscribers.
                </p>
                <ul>
                    <li>EstateSales.org</li>
                    <li>EstateSales.net</li>
                    <li>
                        ABELs email distribution list (approximately 25,000
                        subscribers)
                    </li>
                    <li>
                        Some items may be listed on Craigslist or Offer Up.
                    </li>
                </ul>
            </>
        ),
    },
    {
        question: "How do you price items for sale?",
        answer: (
            <p>
                Each item is priced by researching sold items in the geographic
                region that the sale is being hosted in.
            </p>
        ),
    },
    {
        question: "What happens to unsold items after the sale?",
        answer: (
            <p>
                If the client has opted to have the property cleaned out after
                the sale, we will first invite charitable organizations to come
                for donations. We do our best to place all unsold items in the
                hands of those who will appreciate and use them. Once donations
                have been made the rest is loaded on a truck and taken to a
                refuse station.
            </p>
        ),
    },
    {
        question: "How far in advance should I book an estate sale?",
        answer: (
            <p>
                It is best to contact us 5 to 6 weeks prior to when the sale
                should be conducted. This allows us enough time to place you on
                our calendar and start planning your estate sale.
            </p>
        ),
    },
    {
        question: "What areas do you serve?",
        answer: (
            <p>
                We primarily handle estate sales in Sacramento and the
                surrounding counties. If you&apos;re outside this area, let us
                know and we&apos;ll see if we can help.
            </p>
        ),
    },
    {
        question: "How long does an estate sale typically last?",
        answer: (
            <p>
                Most estate sales run for two to three days, but the exact
                length depends on the size of the estate and buyer turnout.
            </p>
        ),
    },
    {
        question: "When will I receive payment from the sale?",
        answer: (
            <p>
                After the sale and any post-sale clean-out, we provide a
                detailed statement and send payment — usually within 7-10
                business days.
            </p>
        ),
    },
    {
        question: "Do I need to be present during the estate sale?",
        answer: (
            <p>
                No. Many clients prefer to let us manage the sale start to
                finish. You&apos;re welcome to attend, but it&apos;s not
                required.
            </p>
        ),
    },
    {
        question: "Are you licensed, bonded, and insured?",
        answer: (
            <p>
                Yes. We carry the appropriate licensing, bonding, and liability
                insurance to protect you, the property, and buyers throughout
                the process.
            </p>
        ),
    },
    {
        question: "What items can and can't be sold?",
        answer: (
            <p>
                We can sell everything from furniture and jewelry to vehicles and
                collectibles. Items that are hazardous, illegal, or recalled
                can&apos;t be included.
            </p>
        ),
    },
    {
        question:
            "How do you handle high-value items or specialty collections?",
        answer: (
            <p>
                High-value pieces are researched by certified appraisers and may
                be marketed to specialty buyers, collectors, or via online
                platforms to maximize returns.
            </p>
        ),
    },
    {
        question: "What security measures do you have in place?",
        answer: (
            <p>
                We limit entry, station staff in each room, and use locked
                display cases or security personnel when needed to safeguard
                valuable items.
            </p>
        ),
    },
];

/**
 * Plain-text versions of FAQ answers for JSON-LD schema.
 * Strips JSX down to simple text.
 */
export const faqPlainText: { question: string; answer: string }[] = [
    {
        question: "How does an estate sale work?",
        answer: "An estate sale is a multi-day public sale held inside the home, where personal property is organized, priced, and sold to walk-in buyers. We handle everything from setup to cleanup. Typically, we operate within the following stages to ensure a complete sale process: organize sale items, carefully stage the sale for maximum returns, promote the sale through a variety of on-line advertising sites and other outlets, conduct the sale with professionalism, attention to detail and enthusiasm, dispose of any remaining unwanted items, and remove our property and clean as directed.",
    },
    {
        question: "How much does it cost to have you handle my estate sale?",
        answer: "Attic to Basement Estate Liquidators will perform your sale with no upfront costs. We work on a percentage of the estate sale and our fee is deducted from the money collected from the proceeds of the sale. With our experience and dedicated staff, we handle the sale from beginning to end so you don't have to.",
    },
    {
        question: "Do I need to do anything to prepare for the estate sale?",
        answer: "Here is a quick checklist of items to help guide you in preparation for your estate sale: DO NOT throw anything away — there are consumers for almost anything, so please leave everything behind that you don't want. ONLY TAKE what you personally want and leave the rest. If you're unable to remove your personal items from the home prior to the sale please safeguard them in a locked room. Give us clear instructions for items that are not to be sold. ABOVE ALL please don't stress about what is left behind, it's our job to take care of everything for you.",
    },
    {
        question: "How is the estate sale promoted?",
        answer: "We list every sale on EstateSales.org and EstateSales.net, and promote to our email list of 25,000+ subscribers. Some items may also be listed on Craigslist or Offer Up.",
    },
    {
        question: "How do you price items for sale?",
        answer: "Each item is priced by researching sold items in the geographic region that the sale is being hosted in.",
    },
    {
        question: "What happens to unsold items after the sale?",
        answer: "If the client has opted to have the property cleaned out after the sale, we will first invite charitable organizations to come for donations. We do our best to place all unsold items in the hands of those who will appreciate and use them. Once donations have been made the rest is loaded on a truck and taken to a refuse station.",
    },
    {
        question: "How far in advance should I book an estate sale?",
        answer: "It is best to contact us 5 to 6 weeks prior to when the sale should be conducted. This allows us enough time to place you on our calendar and start planning your estate sale.",
    },
    {
        question: "What areas do you serve?",
        answer: "We primarily handle estate sales in Sacramento and the surrounding counties. If you're outside this area, let us know and we'll see if we can help.",
    },
    {
        question: "How long does an estate sale typically last?",
        answer: "Most estate sales run for two to three days, but the exact length depends on the size of the estate and buyer turnout.",
    },
    {
        question: "When will I receive payment from the sale?",
        answer: "After the sale and any post-sale clean-out, we provide a detailed statement and send payment — usually within 7-10 business days.",
    },
    {
        question: "Do I need to be present during the estate sale?",
        answer: "No. Many clients prefer to let us manage the sale start to finish. You're welcome to attend, but it's not required.",
    },
    {
        question: "Are you licensed, bonded, and insured?",
        answer: "Yes. We carry the appropriate licensing, bonding, and liability insurance to protect you, the property, and buyers throughout the process.",
    },
    {
        question: "What items can and can't be sold?",
        answer: "We can sell everything from furniture and jewelry to vehicles and collectibles. Items that are hazardous, illegal, or recalled can't be included.",
    },
    {
        question: "How do you handle high-value items or specialty collections?",
        answer: "High-value pieces are researched by certified appraisers and may be marketed to specialty buyers, collectors, or via online platforms to maximize returns.",
    },
    {
        question: "What security measures do you have in place?",
        answer: "We limit entry, station staff in each room, and use locked display cases or security personnel when needed to safeguard valuable items.",
    },
];
