export const blogCategories = ["All", "AI & Future of Work", "AI Voice Ops"];

export const blogPosts = [
  {
    slug: "the-great-ai-divide",
    category: "AI & Future of Work",
    date: "August 24, 2026",
    dateTime: "2026-08-24",
    readingTime: "5 min read",
    title: "The Great AI Divide: Why Technology Handles the Repetitive and We Handle the Creative",
    excerpt: "Understanding the shift in the AI era: why technology handles repetitive work while people lead the creative, strategic, and empathetic parts.",
    image: "/blog/great-ai-divide.jpg",
    imageAlt: "Illustration contrasting artificial intelligence and human creativity",
    author: "Editorial Team",
    tags: ["Artificial Intelligence", "Future of Work", "Automation", "Creativity", "Human Impact", "AI Strategy"],
    introduction: [
      "Automation once brought to mind physical machines and assembly lines. Generative AI and other cognitive tools have moved that conversation into offices, creative teams, and everyday decisions. It is understandable that people now ask what this means for their jobs.",
      "A more useful question is how work changes when intelligent tools take on routine tasks. AI can process information and repeat defined workflows at remarkable scale. People remain responsible for the ideas, relationships, and decisions that give that work meaning. Understanding those different strengths is a way to work with the change rather than fear it.",
    ],
    quote: "Technology handles the repetitive. Humans handle the creative.",
    sections: [
      {
        id: "the-rise-of-the-digital-co-pilot-automating-the-mundane",
        heading: "The Rise of the Digital Co-Pilot: Automating the Mundane",
        paragraphs: [
          "Think of AI as a digital co-pilot for predictable, high-volume work. Its advantage is recognizing patterns and processing large amounts of information quickly without tiring. It can prepare first drafts, summarize research, organize schedules, and move information between systems while a person reviews the outcome.",
          "In operations, it can help spot patterns before a machine fails. Diagnostic systems can compare new information with a large history of examples. In customer support, AI can answer common first-line questions and pass complex conversations to a human. In logistics, it can assist with planning, supply chains, and coordination.",
          "The benefit is more than saved minutes. Moving repetitive tasks away from people can preserve their attention and energy for the work that requires care and judgment.",
        ],
        bullets: ["Drafting and research support", "Predictive insights and routine diagnostics", "First-line customer support", "Scheduling and logistics coordination"],
      },
      {
        id: "the-human-imperative-cultivating-the-creative-and-strategic",
        heading: "The Human Imperative: Cultivating the Creative and Strategic",
        paragraphs: [
          "A generated answer is only as useful as the context behind it. People understand the customer's needs, recognize an unexpected opportunity, and know when the obvious answer is the wrong one. They can ask why a result makes sense before deciding what to do with it.",
          "Original ideas come from experience, intuition, and curiosity. Trust in leadership, sales, negotiation, and support grows through empathy and relationships. Long-term strategy also requires people to decide which problems are worth solving, what a good outcome looks like, and where ethical boundaries belong.",
          "These human strengths shape products and services that feel relevant to real users, rather than simply efficient on paper.",
        ],
        bullets: ["Creativity and original thinking", "Critical thinking and context", "Empathy and relationship building", "Strategic vision and ethical judgment"],
      },
      {
        id: "thriving-in-the-ai-era-how-to-bridge-the-divide",
        heading: "Thriving in the AI Era: How to Bridge the Divide",
        paragraphs: [
          "Teams need a clear way to combine automation and human contribution: define where AI helps, keep people involved in important decisions, and measure whether the result actually improves the experience.",
          "Directing and evaluating AI output is becoming a practical skill. Let a tool accelerate a first pass, then apply human attention to nuance, quality, and originality. Listen closely to customers, ask better questions, and make sound decisions when the data is incomplete.",
          "Broad experience matters too. Reading across disciplines and working with different people builds the perspective that helps us see a possibility a system might miss.",
        ],
        bullets: ["Use AI to accelerate the first pass, then review its work", "Invest in empathy and clear communication", "Strengthen judgment, creativity, and domain knowledge"],
      },
      {
        id: "the-final-takeaway-a-partnership-for-impact",
        heading: "The Final Takeaway: A Partnership for Impact",
        paragraphs: [
          "The future of work is a partnership. Technology takes care of repetitive steps; people bring direction, imagination, and care. When each side plays to its strengths, teams can create better work and spend more time on the problems that matter. Productivity improves, but so can the meaning and impact of the work itself.",
        ],
      },
    ],
  },
  {
    slug: "outbound-tech-stack-showdown",
    category: "AI Voice Ops",
    date: "June 25, 2026",
    dateTime: "2026-06-25",
    readingTime: "6 min read",
    title: "The Outbound Tech Stack Showdown: Why I Moved Our Lead Ops to Bolavo AI",
    excerpt: "A practical comparison of Vapi, Bland AI, Retell AI, and Bolavo AI for outbound voice operations and lead workflows.",
    image: "/blog/tech-stack-showdown.png",
    imageAlt: "Illustration of an AI voice operations technology stack",
    author: "Editorial Team",
    tags: ["AI Voice", "Outbound Sales", "Bolavo AI", "Vapi", "Bland AI", "Retell AI"],
    introduction: [
      "Six months ago, our outbound process was struggling under the weight of manual lead operations. Outsourced SDR costs, staff turnover, and missed follow-up windows pushed us to look for a more consistent way to call prospects.",
      "Voice AI seemed promising, but pricing pages made it difficult to compare options. A low advertised minute rate can hide both extra services and engineering work. After building and operating more than 50,000 calling minutes across Vapi, Bland AI, and Retell AI, we moved the core workflow to Bolavo AI.",
      "The deciding factor was not a headline price. It was the full cost and effort of running the system day to day. Here are the trade-offs behind that decision.",
    ],
    sections: [
      {
        id: "the-hidden-trap-the-headline-rate-illusion",
        heading: 'The Hidden Trap: The "Headline Rate" Illusion',
        paragraphs: [
          "The entry numbers can look attractive: the source comparison cites Vapi at $0.05 per minute, Retell AI at $0.07, and Bland AI at $0.09. These figures describe the orchestration layer, not every component required to complete a production call.",
          "A working outbound voice system may also need a carrier such as Twilio, speech recognition, a language model, voice generation, and the engineering time to connect and maintain everything. Premium voice or processing models can raise the bill further.",
          "Before comparing vendors, add those parts together. The useful number is the loaded cost per minute plus the operational overhead required to keep campaigns running.",
        ],
        quote: "True cost = orchestration + telephony + speech-to-text + language model + text-to-speech + maintenance.",
      },
      {
        id: "total-cost-of-ownership-tco-comparison",
        heading: "Total Cost of Ownership (TCO) Comparison",
        paragraphs: [
          "Here is the source comparison for a 25,000-minute monthly outbound program using standard commercial configurations. It includes platform charges, supporting services, and estimated developer overhead. These are scenario estimates from June 2026, so current vendor pricing may differ.",
        ],
        table: {
          columns: ["Cost", "Bolavo AI", "Bland AI", "Vapi", "Retell AI"],
          rows: [
            ["Monthly subscription", "Included", "$299 Build Plan", "$0 PAYG", "$0 PAYG"],
            ["Base platform rate", "Bundled", "$0.12/min", "$0.05/min", "$0.07/min"],
            ["Telephony", "Included", "Included", "$0.02/min", "$0.02/min"],
            ["STT + LLM", "Included", "Included", "$0.03/min", "$0.012/min"],
            ["TTS", "Included", "Included", "$0.04/min", "$0.015/min"],
            ["Loaded per minute", "$0.14", "$0.12", "$0.14", "$0.117"],
            ["Developer overhead", "$0", "$500", "$1,500", "$1,000"],
            ["Total monthly spend", "$3,500", "$3,799", "$5,000", "$3,925"],
          ],
        },
      },
      {
        id: "why-i-ended-up-migrating-to-bolavo-ai",
        heading: "Why I Ended Up Migrating to Bolavo AI",
        paragraphs: [
          "Developer-focused platforms offer flexibility, but setup and maintenance have a cost. In our earlier workflow, developers had to manage webhooks, SIP routing, API keys, and usage limits. A failure in any connected service could stop the calling pipeline.",
          "Bolavo AI bundled more of that infrastructure into one workflow and one bill. Operations managers could launch a campaign without asking engineers to maintain every connection. Native CSV mapping also let us bring in lead data from a CRM or spreadsheet, match fields such as name and phone number, and start faster.",
          "Calling schedules were another practical concern. Built-in quiet-hours controls helped us keep outbound activity aligned with local time zones and avoid inappropriate calling times. These operational details mattered as much as the price comparison.",
        ],
      },
      {
        id: "the-final-verdict-which-platform-fits-your-team",
        heading: "The Final Verdict: Which Platform Fits Your Team?",
        paragraphs: [
          "There is no universal winner. The right choice depends on how much flexibility your team needs, what it can maintain, and how quickly it wants to launch. A team with dedicated engineers may value component-level control; an operations team may prefer a bundled workflow.",
        ],
        bullets: [
          "Bolavo AI: a fit for teams that want a more bundled outbound workflow with less infrastructure to manage.",
          "Vapi or Retell AI: a fit when your developers want control over the components and integrations.",
          "Bland AI: an option for large-scale operations building complex conversational paths in code.",
        ],
        platformLink: { label: "Explore Bolavo AI", href: "https://bolavoai.snazzerra.com/" },
      },
    ],
  },
];

export function getBlogPost(slug) {
  return blogPosts.find((post) => post.slug === slug);
}
