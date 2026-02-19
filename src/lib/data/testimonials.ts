export interface Testimonial {
  quote: string;
  name: string;
  source: "Yelp" | "BBB" | "EstateSales.org" | "EstateSales.net";
  rating: number;
  category: "settling" | "downsizing" | "buyer";
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Cortnee and her team turned what felt like an impossible task into something completely manageable. They organized my mother's entire home in just three days.",
    name: "Sarah M.",
    source: "Yelp",
    rating: 5,
    category: "settling",
  },
  {
    quote:
      "We were settling my father's estate from out of state and Cortnee handled every detail. The itemized report after the sale was incredibly thorough.",
    name: "David R.",
    source: "BBB",
    rating: 5,
    category: "settling",
  },
  {
    quote:
      "I've been to dozens of estate sales and ABE's are always the best organized. Fair prices, friendly staff, and the homes are staged beautifully.",
    name: "Linda K.",
    source: "EstateSales.org",
    rating: 5,
    category: "buyer",
  },
  {
    quote:
      "Made an impossible situation manageable. We were grieving and overwhelmed, and Cortnee treated everything with such care and respect.",
    name: "James T.",
    source: "Yelp",
    rating: 5,
    category: "settling",
  },
  {
    quote:
      "Professional from start to finish. The sale brought in more than we expected, and the donation coordination afterward was a wonderful touch.",
    name: "Patricia H.",
    source: "EstateSales.org",
    rating: 4,
    category: "settling",
  },
  {
    quote:
      "After my aunt passed, I had no idea where to start with her house full of antiques. Cortnee walked me through every step and made the whole process feel manageable.",
    name: "Michelle W.",
    source: "Yelp",
    rating: 5,
    category: "settling",
  },
  {
    quote:
      "We downsized from a four-bedroom to a condo and ABE handled everything we couldn't take with us. The staging was incredible and we got great value.",
    name: "Robert & Carol S.",
    source: "BBB",
    rating: 5,
    category: "downsizing",
  },
  {
    quote:
      "As a buyer, I keep coming back to ABE sales. Everything is clearly priced, well-organized, and the staff is always helpful and friendly.",
    name: "Tom D.",
    source: "EstateSales.net",
    rating: 5,
    category: "buyer",
  },
  {
    quote:
      "Cortnee's appraisal was thorough and fair. She found value in items we would have donated without thinking twice. Highly recommend for anyone going through this process.",
    name: "Angela F.",
    source: "Yelp",
    rating: 5,
    category: "settling",
  },
  {
    quote:
      "Moving to assisted living was overwhelming, but ABE made the transition so much easier. They were patient, respectful, and handled everything with care.",
    name: "Dorothy M.",
    source: "EstateSales.org",
    rating: 5,
    category: "downsizing",
  },
  {
    quote:
      "Great finds at fair prices. The sales are always well-organized and the team is knowledgeable about what they're selling. Will definitely be back.",
    name: "Kevin L.",
    source: "EstateSales.net",
    rating: 4,
    category: "buyer",
  },
];

export const homepageTestimonials = testimonials.slice(0, 5);

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  isBadge?: boolean;
  decimals?: number;
}

export const stats: Stat[] = [
  { value: 20, suffix: "+", label: "Years Combined Experience" },
  { value: 4.5, suffix: "", label: "Star Average Rating", decimals: 1 },
  { value: 49, suffix: "+", label: "Reviews on Yelp" },
  { value: 0, suffix: "", label: "BBB Accredited", isBadge: true },
];
