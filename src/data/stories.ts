export interface SuccessStory {
  id: string;
  title: string;
  subtitle: string;
  creatorId: string;
  creatorName: string;
  creatorImage: string;
  timeframe: string;
  revenue: {
    before: number;
    after: number;
    monthly: number;
  };
  thumbnail: string;
  category: string;
  readTime: number;
  publishedAt: string;
  content: StorySection[];
  metrics: StoryMetric[];
  keyTakeaways: string[];
  tags: string[];
}

export interface StorySection {
  title: string;
  content: string;
  image?: string;
  quote?: {
    text: string;
    author: string;
  };
}

export interface StoryMetric {
  label: string;
  value: string;
  change?: string;
  icon: string;
}

export const successStories: SuccessStory[] = [
  {
    id: "sarah-chen-design-systems",
    title: "From $0 to $50K/month teaching design systems",
    subtitle: "How a Google designer built a design education empire",
    creatorId: "sarah-chen",
    creatorName: "Sarah Chen",
    creatorImage: "https://images.unsplash.com/photo-1494790108755-2616b9c817bb?w=400&h=400&fit=crop&crop=face",
    timeframe: "8 months",
    revenue: {
      before: 0,
      after: 50000,
      monthly: 45000
    },
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    category: "Design",
    readTime: 12,
    publishedAt: "2024-01-15",
    content: [
      {
        title: "The Breaking Point",
        content: "I was sitting in my Google office at 11 PM, again. Despite having my dream job as a UX designer on the Gmail team, I felt empty. I was designing for millions of users, but I wasn't helping individual people grow. That's when I realized I wanted to teach others what I'd learned about design systems.\n\nThe irony wasn't lost on me - I was helping Google scale their design to billions of users, but I couldn't figure out how to share my knowledge with even a handful of aspiring designers."
      },
      {
        title: "The First Course",
        content: "I started by creating a simple course about design systems fundamentals. I spent my weekends recording videos in my tiny apartment, using my phone and a cheap microphone. The production quality was terrible, but the content was gold.\n\nI priced it at $97 and shared it with my 200 Twitter followers. To my surprise, 12 people bought it in the first week. That $1,164 was more meaningful than my Google salary because it proved people valued what I had to teach.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=300&fit=crop"
      },
      {
        title: "The Validation",
        content: "The feedback from those first 12 students changed everything. They weren't just learning - they were getting promotions, landing better jobs, and building confidence in their design skills. One student, Maria, messaged me saying she got a 40% salary increase after implementing what she learned.\n\nI realized I had stumbled onto something bigger than a side project. I was solving real problems for real people.",
        quote: {
          text: "Sarah's course didn't just teach me design systems - it gave me the confidence to speak up in meetings and propose solutions that actually got implemented.",
          author: "Maria Rodriguez, Senior Designer at Airbnb"
        }
      },
      {
        title: "Scaling the System",
        content: "By month 3, I had created two more courses and my monthly revenue hit $8,000. I was working 60+ hour weeks between Google and my courses, but I was energized in a way I'd never felt before.\n\nI implemented the same systematic approach I used for design systems at Google to my course creation process. I created templates, workflows, and repeatable processes that allowed me to scale without burning out."
      },
      {
        title: "The Leap",
        content: "Month 6 was the turning point. My course revenue hit $25,000 and I knew I had to make a choice. Stay at Google with my comfortable $180K salary, or bet on myself and go all-in on education.\n\nI chose the scary path. I gave my notice at Google, despite the shocked faces of my colleagues who thought I was crazy for leaving such a prestigious position.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop"
      },
      {
        title: "The Growth Explosion",
        content: "Once I went full-time on my courses, everything accelerated. I had time to focus on marketing, improving course quality, and building relationships with students. By month 8, I hit $50,000 in monthly revenue.\n\nThe key was treating education like a product design challenge. I used user research to understand my students' pain points, iterative design to improve my courses, and data-driven decisions to optimize my marketing."
      },
      {
        title: "Today and Beyond",
        content: "Now I've taught over 15,000 students and built a sustainable business that gives me the freedom to work from anywhere while making a real impact. I've proven that you can turn your expertise into a thriving business if you're willing to serve others genuinely.\n\nMy goal isn't just to teach design - it's to show other experts that they can create freedom and impact by sharing what they know."
      }
    ],
    metrics: [
      {
        label: "Monthly Revenue",
        value: "$50,000",
        change: "+5000%",
        icon: "TrendingUp"
      },
      {
        label: "Students Taught",
        value: "15,420",
        change: "8 months",
        icon: "Users"
      },
      {
        label: "Course Completion Rate",
        value: "89%",
        change: "+23%",
        icon: "BookOpen"
      },
      {
        label: "Student Success Rate",
        value: "73%",
        change: "Job improvements",
        icon: "Award"
      }
    ],
    keyTakeaways: [
      "Start with your existing expertise - you know more than you think",
      "Focus on solving real problems, not just sharing knowledge",
      "Use feedback loops to improve your content constantly",
      "Apply systematic thinking to your course business like any other product",
      "Don't wait for perfect - ship and iterate based on real user feedback",
      "Build for impact first, revenue will follow"
    ],
    tags: ["Design Systems", "UX Design", "Course Creation", "Career Change", "Google"]
  },
  {
    id: "marcus-rivera-coaching-empire",
    title: "How I built a 7-figure coaching business in 2 years",
    subtitle: "From McKinsey consultant to entrepreneur mentor helping hundreds scale their businesses",
    creatorId: "marcus-rivera",
    creatorName: "Marcus Rivera",
    creatorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    timeframe: "24 months",
    revenue: {
      before: 0,
      after: 1200000,
      monthly: 100000
    },
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    category: "Business",
    readTime: 15,
    publishedAt: "2024-02-20",
    content: [
      {
        title: "The McKinsey Burnout",
        content: "After three years at McKinsey, I was earning $200K+ and working with Fortune 500 CEOs, but I felt disconnected from real impact. I was optimizing spreadsheets while small business owners - the real backbone of our economy - struggled without access to strategic thinking.\n\nI realized I wanted to democratize business strategy, bringing enterprise-level consulting to entrepreneurs who couldn't afford McKinsey's $50K monthly retainers."
      },
      {
        title: "Testing the Waters",
        content: "I started by offering free strategy sessions to local business owners on weekends. The results were immediate - a restaurant owner increased revenue by 40% in two months, a consultant doubled their pricing and won better clients.\n\nI charged my first client $500 for a strategy session. Within three months, I was doing $3,000 per month in weekend consulting while still working at McKinsey.",
        image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=300&fit=crop"
      },
      {
        title: "The Systematic Approach",
        content: "I applied McKinsey's structured problem-solving methodology to small businesses. Instead of abstract frameworks, I created practical, actionable strategies that entrepreneurs could implement immediately.\n\nI developed a signature 90-day business transformation program that combined strategic planning with hands-on execution support. This wasn't just consulting - it was business coaching with measurable outcomes.",
        quote: {
          text: "Marcus didn't just give me a strategy - he taught me how to think strategically about every decision in my business. That mindset shift was worth more than the $50K in revenue growth.",
          author: "Jennifer Kim, E-commerce Founder"
        }
      },
      {
        title: "Going Full-Time",
        content: "By month 8, my side coaching business was generating $15,000 monthly. I created an online version of my program and started getting clients from across the country.\n\nLeaving McKinsey was terrifying - I was walking away from a clear path to partner and millions in lifetime earnings. But I knew I could create more impact (and potentially more income) by serving entrepreneurs directly."
      },
      {
        title: "Scaling Through Systems",
        content: "The key breakthrough came when I stopped selling my time and started selling transformation. I created a group coaching program that could serve 20 entrepreneurs simultaneously while maintaining the quality of support.\n\nI used McKinsey's change management principles to help entrepreneurs not just plan but actually execute their strategies. This combination of strategy + execution became my unique differentiator.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop"
      },
      {
        title: "The Million Dollar Year",
        content: "Year two was explosive growth. I launched a mastermind program for $10K, created online courses, and started speaking at conferences. By month 18, I hit $100K monthly revenue.\n\nWhat surprised me wasn't the money - it was the impact. My clients collectively added over $50 million in revenue to their businesses. I had created a system that multiplied business success at scale."
      },
      {
        title: "Building the Empire",
        content: "Today, I run multiple programs serving over 500 entrepreneurs annually. My business generates 7 figures while giving me the freedom to work from anywhere and focus on what energizes me most: helping smart people build successful businesses.\n\nThe irony is that by leaving the prestigious consulting world, I've had more strategic impact than I ever could have at McKinsey."
      }
    ],
    metrics: [
      {
        label: "Annual Revenue",
        value: "$1.2M",
        change: "+∞%",
        icon: "DollarSign"
      },
      {
        label: "Entrepreneurs Coached",
        value: "500+",
        change: "24 months",
        icon: "Users"
      },
      {
        label: "Client Revenue Growth",
        value: "$50M",
        change: "Collective impact",
        icon: "TrendingUp"
      },
      {
        label: "Program Completion Rate",
        value: "94%",
        change: "Industry leading",
        icon: "Target"
      }
    ],
    keyTakeaways: [
      "Leverage your professional expertise to serve an underserved market",
      "Start with 1:1 services to validate your approach before scaling",
      "Focus on measurable outcomes, not just knowledge transfer",
      "Create systems that deliver consistent results at scale",
      "Price for transformation, not time",
      "Impact and income can grow together when you serve others genuinely"
    ],
    tags: ["Business Coaching", "McKinsey", "Entrepreneurship", "Strategy", "Scaling"]
  },
  {
    id: "elena-volkov-marketing-mastery",
    title: "The marketing course that changed everything",
    subtitle: "From freelancer struggles to running a $800K/year digital marketing education business",
    creatorId: "elena-volkov",
    creatorName: "Elena Volkov",
    creatorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    timeframe: "12 months",
    revenue: {
      before: 48000,
      after: 800000,
      monthly: 67000
    },
    thumbnail: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&h=400&fit=crop",
    category: "Marketing",
    readTime: 10,
    publishedAt: "2024-03-10",
    content: [
      {
        title: "The Freelancer Plateau",
        content: "After 8 years as a freelance digital marketer, I was stuck at $4K monthly revenue. I was trading time for money, constantly hustling for new clients, and had no scalable business model.\n\nI was good at marketing for others but terrible at marketing myself. The irony was painful - I could 10x my clients' revenue but couldn't figure out how to scale my own income beyond the hours I could work."
      },
      {
        title: "The Accidental Course",
        content: "A client asked if I could train their team on Facebook ads. Instead of a simple training session, I created a comprehensive curriculum covering everything from strategy to execution.\n\nThe training was so successful that word spread. Other companies started asking for the same program. I realized I had accidentally created something valuable - a systematic approach to digital marketing that actually worked.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=300&fit=crop"
      },
      {
        title: "From Training to Teaching",
        content: "I decided to package my training into an online course. I spent two months creating 'Digital Marketing Mastery' - 8 hours of content covering everything I'd learned in 8 years of client work.\n\nI priced it at $497 and promoted it to my email list of 800 subscribers. In the first week, 47 people bought it. That $23,339 was more than I usually made in 6 months of freelancing.",
        quote: {
          text: "Elena's course wasn't just theory - it was battle-tested strategies that I could implement immediately. My ROI was 10x in the first month.",
          author: "David Chen, SaaS Founder"
        }
      },
      {
        title: "The Content Machine",
        content: "I realized content marketing was the key to scaling. I started sharing my marketing wins and failures on LinkedIn and Twitter. Each post taught something practical while positioning me as an expert.\n\nWithin 6 months, my email list grew from 800 to 15,000 subscribers. More importantly, these weren't just random subscribers - they were business owners actively looking for marketing help."
      },
      {
        title: "The High-Ticket Pivot",
        content: "While my course was successful, I wanted to help people implement the strategies, not just learn them. I launched a $3,000 group coaching program that combined the course with live implementation support.\n\nThe transformation was incredible. Instead of selling many low-priced courses, I was serving fewer people at a higher level. My monthly revenue jumped from $8K to $35K almost overnight.",
        image: "https://images.unsplash.com/photo-1553028826-f4804151e04b?w=600&h=300&fit=crop"
      },
      {
        title: "Scaling the System",
        content: "By month 10, I launched a $10,000 mastermind for agency owners and consultants who wanted to scale their marketing businesses. I was essentially teaching other marketers to build what I had built.\n\nThe mastermind filled in 72 hours. These weren't just customers - they became case studies, referral sources, and collaborators who helped me refine my methods."
      },
      {
        title: "The $800K Business",
        content: "Twelve months after launching my first course, my education business hit $800K in annual revenue. More importantly, I had helped over 2,000 businesses improve their marketing and hundreds of marketers build their own successful agencies.\n\nI had transformed from a solo freelancer into an educator and community builder. The income was great, but the impact was addictive."
      }
    ],
    metrics: [
      {
        label: "Annual Revenue",
        value: "$800K",
        change: "+1567%",
        icon: "TrendingUp"
      },
      {
        label: "Students Taught",
        value: "2,000+",
        change: "12 months",
        icon: "Users"
      },
      {
        label: "Course Completion Rate",
        value: "76%",
        change: "Above average",
        icon: "BookOpen"
      },
      {
        label: "Client Success Rate",
        value: "85%",
        change: "ROI positive",
        icon: "Target"
      }
    ],
    keyTakeaways: [
      "Package your experience into systematic, teachable methods",
      "Start with training for existing networks before going online",
      "Content marketing is the best way to build an audience of buyers",
      "Higher-priced programs with implementation support create better outcomes",
      "Teaching others to do what you do scales impact beyond your time",
      "Focus on results and case studies to build credibility"
    ],
    tags: ["Digital Marketing", "Facebook Ads", "Course Creation", "Freelancing", "Scaling"]
  }
];