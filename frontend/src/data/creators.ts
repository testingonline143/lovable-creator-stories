export interface Creator {
  id: string;
  name: string;
  title: string;
  image: string;
  courses: number;
  monthlyRevenue: number;
  badge: string;
  specialty: string;
  bio: string;
  totalStudents: number;
  yearStarted: number;
  website?: string;
  twitter?: string;
  linkedin?: string;
  location: string;
  story: string;
  achievements: string[];
  recentCourses: Course[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  students: number;
  rating: number;
  thumbnail: string;
  category: string;
}

export const creators: Creator[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    title: "UX Design Mastery",
    image: "https://images.unsplash.com/photo-1494790108755-2616b9c817bb?w=400&h=400&fit=crop&crop=face",
    courses: 12,
    monthlyRevenue: 45000,
    badge: "Top Creator",
    specialty: "UX/UI Design",
    bio: "Former Google UX Designer turned educator. I help designers create user-centered products that people love and businesses value.",
    totalStudents: 15420,
    yearStarted: 2019,
    website: "sarahchen.design",
    twitter: "@SarahChenUX",
    linkedin: "/in/sarahchenux",
    location: "San Francisco, CA",
    story: "Started my journey at Google where I worked on Gmail's redesign. After seeing the impact of good design on millions of users, I realized I wanted to teach others to create meaningful user experiences. I quit my $180K job to start teaching online, and within 18 months built a design education business generating over $40K/month.",
    achievements: [
      "Former Google UX Designer",
      "15,000+ students taught",
      "Featured in Design Weekly",
      "Speaker at UX Conference 2023"
    ],
    recentCourses: [
      {
        id: "ux-fundamentals",
        title: "UX Design Fundamentals",
        description: "Master the basics of user experience design",
        price: 197,
        students: 3420,
        rating: 4.9,
        thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop",
        category: "Design"
      },
      {
        id: "design-systems",
        title: "Design Systems Masterclass",
        description: "Build scalable design systems from scratch",
        price: 297,
        students: 1850,
        rating: 4.8,
        thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138c1ac9?w=300&h=200&fit=crop",
        category: "Design"
      }
    ]
  },
  {
    id: "marcus-rivera",
    name: "Marcus Rivera",
    title: "Business Strategy",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    courses: 8,
    monthlyRevenue: 32000,
    badge: "Rising Star",
    specialty: "Business Strategy",
    bio: "MBA turned online entrepreneur. I teach business strategy and help solopreneurs scale their businesses to 6 figures.",
    totalStudents: 8930,
    yearStarted: 2020,
    website: "marcusrivera.co",
    twitter: "@MarcusRivera",
    location: "Austin, TX",
    story: "After getting my MBA from Wharton, I worked in consulting for 3 years before realizing I wanted to help small business owners directly. I started creating content about business strategy and gradually built an audience of entrepreneurs hungry for actionable advice.",
    achievements: [
      "Wharton MBA",
      "Former McKinsey Consultant",
      "8,000+ entrepreneurs mentored",
      "Author of 'Scale Smart'"
    ],
    recentCourses: [
      {
        id: "business-foundation",
        title: "Business Foundation Course",
        description: "Build a profitable business from the ground up",
        price: 247,
        students: 2140,
        rating: 4.7,
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
        category: "Business"
      }
    ]
  },
  {
    id: "elena-volkov",
    name: "Elena Volkov",
    title: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    courses: 15,
    monthlyRevenue: 67000,
    badge: "Expert",
    specialty: "Digital Marketing",
    bio: "Digital marketing expert with 10+ years experience. I've helped over 500 businesses grow their online presence and revenue.",
    totalStudents: 22100,
    yearStarted: 2018,
    website: "elenavolkov.com",
    twitter: "@ElenaVolkov",
    location: "New York, NY",
    story: "Started as a freelance marketer working with local businesses. Through trial and error, I developed a systematic approach to digital marketing that consistently delivers results. Now I teach that system to other marketers and business owners.",
    achievements: [
      "10+ years in digital marketing",
      "500+ businesses helped",
      "Featured in Marketing Land",
      "Google Ads Certified Trainer"
    ],
    recentCourses: [
      {
        id: "digital-marketing-mastery",
        title: "Digital Marketing Mastery",
        description: "Complete guide to online marketing success",
        price: 397,
        students: 4200,
        rating: 4.9,
        thumbnail: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=300&h=200&fit=crop",
        category: "Marketing"
      }
    ]
  },
  {
    id: "david-park",
    name: "David Park",
    title: "Web Development",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    courses: 6,
    monthlyRevenue: 28000,
    badge: "Mentor",
    specialty: "Full-Stack Development",
    bio: "Self-taught developer turned educator. I help aspiring developers land their first tech job through practical, project-based learning.",
    totalStudents: 12500,
    yearStarted: 2021,
    website: "davidpark.dev",
    twitter: "@DavidParkDev",
    location: "Seattle, WA",
    story: "Taught myself to code during the pandemic after being laid off from my marketing job. Within 8 months, I landed a senior developer role at a startup. Now I teach others the exact roadmap I used to break into tech.",
    achievements: [
      "Self-taught developer",
      "Senior Full-Stack Developer",
      "12,000+ students placed in tech jobs",
      "Open source contributor"
    ],
    recentCourses: [
      {
        id: "fullstack-bootcamp",
        title: "Full-Stack Web Development Bootcamp",
        description: "Go from zero to full-stack developer",
        price: 497,
        students: 3200,
        rating: 4.8,
        thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
        category: "Development"
      }
    ]
  },
  {
    id: "govardhan",
    name: "Govardhan",
    title: "Business & Entrepreneurship",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    courses: 9,
    monthlyRevenue: 38000,
    badge: "Rising Star",
    specialty: "Business & Entrepreneurship",
    bio: "Serial entrepreneur and business mentor. I help ambitious individuals build scalable businesses and achieve financial freedom through proven strategies.",
    totalStudents: 9800,
    yearStarted: 2020,
    website: "govardhanbusiness.com",
    twitter: "@GovardhanBiz",
    location: "Mumbai, India",
    story: "Started my first business at 22 with just $500. After building and selling 3 companies, I decided to share my knowledge and help others achieve entrepreneurial success. My courses focus on practical business building strategies that actually work.",
    achievements: [
      "Built 3 successful companies",
      "Generated $2M+ in business revenue",
      "Mentored 500+ entrepreneurs",
      "Featured in Entrepreneur Magazine"
    ],
    recentCourses: [
      {
        id: "business-mastery",
        title: "Business Building Mastery",
        description: "Complete guide to building a profitable business",
        price: 347,
        students: 2800,
        rating: 4.9,
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
        category: "Business"
      },
      {
        id: "entrepreneurship-101",
        title: "Entrepreneurship 101",
        description: "Master the fundamentals of starting a business",
        price: 197,
        students: 1950,
        rating: 4.7,
        thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop",
        category: "Business"
      }
    ]
  }
];