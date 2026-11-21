import Image from "next/image";
import AboutIntroReveal from "./AboutIntroReveal";

const strengths = [
  {
    title: "Teamwork",
    description: "Open collaboration keeps product decisions connected to the people who will use the software.",
  },
  {
    title: "Innovation",
    description: "We explore new technology where it can solve a practical problem, from voice interfaces to AI workflows.",
  },
  {
    title: "Quality",
    description: "Reliable engineering, thoughtful design and ongoing support shape every release.",
  },
];

const reasons = [
  {
    title: "Easy to use",
    description: "Useful software should feel clear from the first interaction. We put the user experience at the centre of the build.",
  },
  {
    title: "Competitive value",
    description: "We scope work carefully so quality and cost stay in balance.",
  },
  {
    title: "Flexible engagement",
    description: "Work with us for a focused project or a longer product partnership, with hourly, weekly or project arrangements.",
  },
];

const capabilities = [
  {
    title: "Hybrid mobile apps",
    description: "Android, iOS and cross-platform applications built around your requirements with Flutter, React Native and Ionic.",
  },
  {
    title: "Alexa skills & voice",
    description: "Custom voice experiences, games and business workflows that make everyday interactions more natural.",
  },
  {
    title: "Frontend & backend",
    description: "Web and mobile interfaces, data services and REST or GraphQL APIs using technologies including React, Node.js, Python and Firebase.",
  },
  {
    title: "Software architecture",
    description: "Technical foundations, API contracts, MVP scope and roadmaps designed before development begins.",
  },
  {
    title: "AI agents & LLM workflows",
    description: "Production-focused agents, tool-calling automations and retrieval workflows using models such as Claude and OpenAI.",
  },
  {
    title: "Technical consulting",
    description: "Architecture reviews, legacy codebase audits and practical guidance on bottlenecks, technical debt and build-versus-buy decisions.",
  },
];

const products = [
  {
    name: "MittiBite",
    category: "Hyperlocal food marketplace",
    description: "A pre-order tiffin marketplace connecting home chefs with nearby customers who want everyday meals.",
    highlights: ["Nearby verified kitchens", "Scheduled ordering that helps reduce food waste", "Dietary choices including Jain, low-oil and high-protein"],
  },
  {
    name: "Bolavo AI",
    category: "AI voice calling",
    description: "Outbound voice agents that reach leads, qualify interest and support sales conversations.",
    highlights: ["Branching conversations", "Low-latency voice responses", "Call recordings with synchronized transcripts"],
  },
  {
    name: "ChatAIWorks",
    category: "AI chatbot builder",
    description: "Website chatbots trained on business content to answer questions, capture leads and support bookings.",
    highlights: ["Simple website embed", "Content refreshes from site documentation", "Booking and support workflows"],
  },
  {
    name: "LeadMind",
    category: "Offline sales CRM",
    description: "A lead management app for sales teams to track pipelines, plan follow-ups and work without a constant connection.",
    highlights: ["Offline-first access", "Follow-up reminders", "Pipeline overview"],
  },
  {
    name: "IronE",
    category: "Expense tracking utility",
    description: "A focused app for recording ironing counts, monthly expenses and payment history.",
    highlights: ["Daily calendar view", "Automatic totals and balances", "Email OTP sign-in"],
  },
];

const process = [
  ["Discover", "Gather requirements and understand the people, goals and constraints behind the project."],
  ["Analyse", "Study the workflows and define the problem the product needs to solve."],
  ["Plan", "Set scope, priorities, milestones and a practical technical direction."],
  ["Design", "Shape the interface, experience and system structure before the build."],
  ["Develop", "Build the product in deliberate, reviewable stages."],
  ["Test", "Check the experience, functionality and reliability across real use cases."],
  ["Deploy", "Prepare and release the product to its intended environment."],
  ["Support", "Keep improving the product after launch as needs change."],
];

const featuredWork = [
  {
    name: "Collabera · Conect",
    category: "Employee experience",
    description: "An employee portal bringing timesheets, requests, rewards and support into one mobile experience.",
    stack: "React Native · Node.js · REST APIs",
  },
  {
    name: "Chatkazz",
    category: "Restaurant ordering",
    description: "A mobile ordering app for Chatkazz Australia that brings its extensive menu to customers.",
    stack: "React Native · Node.js · Firebase",
  },
  {
    name: "OnGuardian",
    category: "Caregiving",
    description: "A caregiving experience with Amazon Alexa integration to support care recipients and their families.",
    stack: "Flutter · Amazon Alexa · Firebase",
  },
  {
    name: "RedRoute",
    category: "Voice automation",
    description: "A voice-enabled workflow for ride-hailing operations, connected with CRM processes.",
    stack: "React Native · Voice AI · CRM integration",
  },
];

const moreWork = [
  ["Frontend & Backend", "Web platforms and APIs", "Node.js · Python · React"],
  ["Amazon Alexa Skills", "Voice experiences", "Node.js · ASK SDK · React"],
  ["LTRconnect", "Relationship app", "Flutter · PostgreSQL · Go"],
  ["Pullman Tour Eiffel", "Employee application", "Flutter · Firebase"],
  ["BearsLooking", "Community app", "React Native · Firebase"],
  ["Eatables", "Online grocery", "Flutter · Firebase"],
  ["Foodelux", "Food wholesale", "Flutter · Node.js"],
  ["Goalish", "Goal reminders", "Flutter · Local notifications"],
  ["Khadamaty", "Local services marketplace", "React Native · RTL support"],
  ["Matrubharti", "Vernacular content platform", "React Native · Node.js"],
  ["Osaka", "Multilingual food ordering", "React Native · Node.js"],
  ["planX", "Shared planning", "Flutter · Firebase"],
  ["Prediction Pundit", "Cricket predictions", "React Native · Live data"],
  ["Say Dil Se", "Greeting cards", "React Native · Image processing"],
  ["Travel App", "Travel booking", "Flutter · Travel APIs"],
  ["Lawyer Diary", "Legal case management", "React Native · Notifications"],
];

function SectionIntro({ eyebrow, title, description, id }) {
  return (
    <div className="company-section-intro" data-motion>
      <p className="company-eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description && <p className="company-intro-copy">{description}</p>}
    </div>
  );
}
export default function CompanySections() {
  return (
    <>
      <section className="company-about" id="about" aria-labelledby="about-heading">
        <div className="company-container">
          <AboutIntroReveal />
          <div className="company-strengths">
            {strengths.map(({ title, description }, index) => (
              <article key={title}>
                <span className="company-small-index">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="company-values" aria-labelledby="values-heading">
        <div className="company-container">
          <SectionIntro eyebrow="Our values" title="Good work should feel good to use." id="values-heading" />
          <div className="company-value-grid">
            {reasons.map(({ title, description }, index) => (
              <article key={title} data-motion style={{ "--motion-delay": `${index * 70}ms` }}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className="recognitions-heading" data-motion>
            <p className="company-eyebrow">Recognition</p>
            <h3>Registered to build with confidence.</h3>
          </div>
          <div className="company-recognitions" aria-label="Registrations and recognition">
            <article className="recognition-card" data-motion>
              <div className="recognition-card-top">
                <Image src="/recognition/startup-india.webp" width={200} height={80} alt="DPIIT Startup India" className="recognition-logo startup-logo" />
                <span className="recognition-mark" aria-hidden="true">✦</span>
              </div>
              <h4>DPIIT Recognized Startup</h4>
              <p className="recognition-subtitle">Startup India Initiative</p>
              <p className="recognition-description">Recognized as a startup by the Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce &amp; Industry, Government of India. This recognition reflects a commitment to innovation, technology development and job creation.</p>
              <div className="recognition-card-bottom"><span>Ministry of Commerce &amp; Industry</span><strong>Active recognition</strong></div>
            </article>
            <article className="recognition-card" data-motion style={{ "--motion-delay": "70ms" }}>
              <div className="recognition-card-top">
                <Image src="/recognition/msme.svg" width={3000} height={3000} alt="Ministry of MSME Udyam registration seal" className="recognition-logo msme-logo" unoptimized />
                <span className="recognition-mark" aria-hidden="true">✓</span>
              </div>
              <h4>MSME Registered Enterprise</h4>
              <p className="recognition-subtitle">Udyam Registration</p>
              <p className="recognition-description">Registered under the Ministry of Micro, Small &amp; Medium Enterprises (MSME), Government of India. Udyam registration recognizes the business as an enterprise and supports participation in relevant government initiatives and technology schemes.</p>
              <div className="recognition-card-bottom"><span>Ministry of MSME, Govt of India</span><strong>Certified registry</strong></div>
            </article>
          </div>
        </div>
      </section>

      <section className="company-capabilities" id="capabilities" aria-labelledby="capabilities-heading">
        <div className="company-container">
          <SectionIntro
            eyebrow="What we do"
            title="The right expertise for the whole product."
            description="From an early technical plan to a shipped application, we bring the right skills together around the work."
            id="capabilities-heading"
          />
          <div className="capability-grid">
            {capabilities.map(({ title, description }, index) => (
              <article className="capability-item" key={title} data-motion style={{ "--motion-delay": `${(index % 2) * 70}ms` }}>
                <span className="company-small-index">{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="company-products" id="products" aria-labelledby="products-heading">
        <div className="company-container">
          <SectionIntro
            eyebrow="Our products"
            title="Ideas we turned into products."
            description="Five focused platforms built for everyday needs, from local commerce to AI-assisted sales."
            id="products-heading"
          />
          <div className="product-grid">
            {products.map(({ name, category, description, highlights }, index) => (
              <article className="product-card" key={name} data-motion style={{ "--motion-delay": `${(index % 3) * 65}ms` }}>
                <div className="product-card-top">
                  <span className="company-small-index">0{index + 1} / 05</span>
                  <span className="product-symbol" aria-hidden="true">{name.slice(0, 1)}</span>
                </div>
                <p className="product-category">{category}</p>
                <h3>{name}</h3>
                <p className="product-description">{description}</p>
                <ul>{highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="company-portfolio" id="portfolio" aria-labelledby="portfolio-heading">
        <div className="company-container">
          <SectionIntro
            eyebrow="Selected work"
            title="Different challenges. Useful outcomes."
            description="A selection of applications, platforms and voice experiences built across teams and industries."
            id="portfolio-heading"
          />
          <div className="portfolio-featured">
            {featuredWork.map(({ name, category, description, stack }, index) => (
              <article className="portfolio-feature" key={name} data-motion style={{ "--motion-delay": `${(index % 2) * 70}ms` }}>
                <div className="portfolio-feature-top"><span className="company-small-index">0{index + 1}</span><span>{category}</span></div>
                <div className={`portfolio-feature-art portfolio-feature-art-${index + 1}`} aria-hidden="true"><span /><span /><span /></div>
                <h3>{name}</h3>
                <p>{description}</p>
                <span className="portfolio-stack">{stack}</span>
              </article>
            ))}
          </div>
          <h3 className="portfolio-more-heading" data-motion>More of our work <span>16 projects</span></h3>
          <div className="portfolio-directory">
            {moreWork.map(([name, category, stack]) => (
              <div className="portfolio-directory-row" key={name} data-motion>
                <strong>{name}</strong><span>{category}</span><span>{stack}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="company-process" id="process" aria-labelledby="process-heading">
        <div className="company-container">
          <SectionIntro
            eyebrow="How we work"
            title="A clear path from idea to launch."
            description="Our process keeps the work understandable, collaborative and ready to evolve after release."
            id="process-heading"
          />
          <ol className="process-grid">
            {process.map(([title, description], index) => (
              <li key={title} data-motion style={{ "--motion-delay": `${(index % 4) * 60}ms` }}>
                <span className="company-small-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3><p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
