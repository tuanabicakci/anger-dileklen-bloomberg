import { useState, useEffect } from "react";

type Section = "welcome" | "about" | "cv" | "projects" | "hobbies" | "contact";

const Index = () => {
  const [currentSection, setCurrentSection] = useState<Section>("welcome");
  const [displayedText, setDisplayedText] = useState("");
  const [clock, setClock] = useState("");

  // Live clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", { 
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      const dateString = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit"
      });
      setClock(`${dateString} ${timeString}`);
    };
    
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Content for each section
  const getContent = (section: Section): string => {
    switch (section) {
      case "welcome":
        return `> Welcome to my terminal.
> Authenticating... Success.
> Please select a command to begin.`;
      
      case "about":
        return `> ABOUT_ME.txt

Anger Ege Dileklen is a forward-thinking finance professional and a Master of Science in International Finance candidate at NEOMA Business School. His unique perspective on corporate strategy and investment is shaped by a powerful combination of hands-on experience within corporate finance departments, successful entrepreneurial leadership, and advanced quantitative research.

His professional journey is distinguished by his work from the client's perspective. Through finance internships at large industrial companies like Solva-REC and Chimirec Groupe, Anger was directly involved in the core financial planning and analysis that drives business. His responsibilities included building internal profitability and cash flow forecasting models, authoring analytical memos for senior management, and conducting variance analysis on quarterly results. This experience provided him with a ground-level understanding of the operational realities and capital needs that influence corporate decision-making.

This corporate insight was put into practice when he co-founded ImiGoose, a technology venture. As a founder, Anger led the end-to-end capital-raising process, a testament to his commercial acumen and execution ability. He developed the comprehensive 5-year financial model, authored the investor pitch deck, and successfully executed the transaction to secure CAD 20,000 in initial seed funding from the McGill Dobson Incubator program. This experience provided him with invaluable, real-world experience in transaction management, stakeholder relations, and building a business from the ground up.

Anger is currently deepening this analytical focus through his graduate thesis, "Measuring Capital Allocation Inefficiency through AI-Driven Performance Forecasting." This research leverages AI models to detect and predict when public companies are over- or under-investing, positioning him at the intersection of modern data science and traditional corporate strategy. He holds a Bachelor of Arts with a double major in Economics and International Development from McGill University.

Anger's non-traditional path, which includes moving from his home in Turkey to Canada at eighteen and now to France for his master's degree, has cultivated a high degree of resilience, cross-cultural fluency, and an ability to adapt quickly to new challenges. This unique combination of a founder's grit, an insider's corporate perspective, and an academic's quantitative rigor makes him a uniquely valuable candidate in roles requiring not just analytical skill, but also commercial intuition and a deep understanding of client needs.

Anger is proficient in a range of technical and financial skills, including Financial Modeling (3-Statement, DCF), Credit Risk Analysis, Python (Pandas, NumPy), SQL, Power BI, and the Bloomberg Terminal. He is a native speaker of English and Turkish and is conversationally proficient in French.`;
      
      case "cv":
        return `> CV_RESUME.txt

=== WORK EXPERIENCE ===

[Finance Intern] Solva-REC & Chimirec Groupe
• Built internal profitability and cash flow forecasting models
• Authored analytical memos for senior management
• Conducted variance analysis on quarterly results
• Provided ground-level understanding of operational realities

[Co-Founder] ImiGoose Technology Venture
• Led end-to-end capital-raising process
• Developed comprehensive 5-year financial model
• Authored investor pitch deck
• Secured CAD 20,000 seed funding from McGill Dobson Incubator

=== EDUCATION ===

Master of Science in International Finance
NEOMA Business School (Current)

Bachelor of Arts - Double Major
Economics & International Development
McGill University

=== SKILLS ===

Financial Modeling (3-Statement, DCF)
Credit Risk Analysis
Python (Pandas, NumPy)
SQL
Power BI
Bloomberg Terminal

Languages: English (Native), Turkish (Native), French (Conversational)

=== CURRENT RESEARCH ===

Thesis: "Measuring Capital Allocation Inefficiency through AI-Driven Performance Forecasting"
Focus: AI models to detect over/under-investment in public companies

> Download Full CV: [Contact for PDF]`;
      
      case "projects":
        return `> PROJECTS.txt

[01] BLOOMBERG TERMINAL PORTFOLIO
Description: Personal portfolio website built to emulate a classic Bloomberg Terminal interface. Features CRT monitor effects, terminal-style navigation, and retro-futuristic design.
Tech Stack: React, TypeScript, Tailwind CSS
Status: Active (You're looking at it!)
GitHub: https://github.com/AngerDileklen

[02] AI-DRIVEN CAPITAL ALLOCATION RESEARCH
Description: Master's thesis project leveraging AI models to detect and predict capital allocation inefficiency in public companies. Combines machine learning with traditional corporate finance.
Focus: Performance forecasting, investment optimization
Status: In Development

[03] IMIGOOSE FINANCIAL MODEL
Description: Comprehensive 5-year financial projection model for technology startup. Includes revenue forecasting, cost structure analysis, and investor pitch deck.
Result: CAD 20,000 seed funding secured
Status: Completed`;
      
      case "hobbies":
        return `> HOBBIES_INTERESTS.txt

When I'm not analyzing financial models or writing code, I enjoy exploring the intersection of technology and finance through various activities. I'm particularly interested in understanding how AI and data science are reshaping traditional financial analysis and investment strategies.

My multicultural background - moving from Turkey to Canada at eighteen and now studying in France - has given me a deep appreciation for different perspectives and approaches to problem-solving. This has fostered my interest in international economics, cross-border finance, and the global technology ecosystem.

I also enjoy staying current with developments in fintech, reading about entrepreneurship and venture capital, and exploring how quantitative methods can be applied to real-world business challenges.`;
      
      case "contact":
        return `> CONTACT_INFO.txt

=== GET IN TOUCH ===

Email:    angerdileklen@gmail.com
LinkedIn: https://www.linkedin.com/in/angerdileklen1/
GitHub:   https://github.com/AngerDileklen

=== LOCATION ===

Currently based in France
Open to opportunities in finance, fintech, and corporate strategy

> System ready for communications.
> All channels active.`;
      
      default:
        return "";
    }
  };

  // Faster typing effect
  useEffect(() => {
    const content = getContent(currentSection);
    setDisplayedText("");
    
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < content.length) {
        setDisplayedText((prev) => prev + content[index]);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 1); // Ultra-fast typing

    return () => clearInterval(typingInterval);
  }, [currentSection]);

  return (
    <>
      {/* Scanline overlay */}
      <div className="scanlines" />
      
      <div className="min-h-screen bg-background screen-flicker">
        {/* Bloomberg Header Bar */}
        <div className="bloomberg-header px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-terminal-orange font-bold text-sm bg-terminal-orange/20 px-3 py-1 border border-terminal-orange/30">
                ANGER DILEKLEN
              </span>
              <span className="text-terminal-white text-xs">Portfolio Terminal</span>
            </div>
            <div className="text-terminal-white text-xs font-mono">
              {clock}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-terminal-gray border-b border-border flex gap-0 px-4">
          <button
            onClick={() => setCurrentSection("about")}
            className={`terminal-tab ${currentSection === "about" ? "active" : ""}`}
          >
            About Me
          </button>
          <button
            onClick={() => setCurrentSection("cv")}
            className={`terminal-tab ${currentSection === "cv" ? "active" : ""}`}
          >
            CV / Resume
          </button>
          <button
            onClick={() => setCurrentSection("projects")}
            className={`terminal-tab ${currentSection === "projects" ? "active" : ""}`}
          >
            Projects
          </button>
          <button
            onClick={() => setCurrentSection("hobbies")}
            className={`terminal-tab ${currentSection === "hobbies" ? "active" : ""}`}
          >
            Hobbies
          </button>
          <button
            onClick={() => setCurrentSection("contact")}
            className={`terminal-tab ${currentSection === "contact" ? "active" : ""}`}
          >
            Contact
          </button>
        </div>

        {/* Main Content Panel */}
        <main className="p-4">
          <div className="terminal-panel p-6 h-[calc(100vh-140px)] overflow-y-auto">
            <pre className="text-terminal-amber terminal-glow font-mono whitespace-pre-wrap leading-relaxed text-sm">
              {displayedText}
              <span className="cursor"></span>
            </pre>
          </div>
        </main>
      </div>
    </>
  );
};

export default Index;
