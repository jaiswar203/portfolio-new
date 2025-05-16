// Define the technology interface
interface Technology {
  name: string;
  image: string;
  showName?: boolean;
  description?: string;
}

// Define the technologies record type
type TechnologiesRecord = Record<string, Technology[]>;

// Export the technologies data
export const technologies: TechnologiesRecord = {
  frontend: [
    { name: "React JS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638968/Portpolio/icon/reactjs_auyqqi.png", description: "Component-based UI library" },
    { name: "Next JS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638969/Portpolio/icon/nextjs_mk077w.png", description: "React framework for SSR & SSG" },
    { name: "Typescript", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1677420771/Portpolio/icon/typescript_bwoe3t.png", description: "Typed JavaScript superset" },
    { name: "JavaScript", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638968/Portpolio/icon/javascript_vu2woi.png", description: "Dynamic scripting language" },
    { name: "HTML", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638968/Portpolio/icon/html_tpfjq5.png", description: "Web markup language" },
    { name: "CSS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638968/Portpolio/icon/css_a6lhvw.png", description: "Web styling language" },
    { name: "SASS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638969/Portpolio/icon/sass_lz7cw1.png", description: "CSS preprocessor" },
    { name: "Tailwind CSS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1725285692/png-transparent-tailwind-css-hd-logo_q7w1uq.png", showName: true, description: "Utility-first CSS framework" },
    { name: "React Query", image: "/images/react-query.png", description: "Data fetching library" },
    { name: "ShadCN UI", image: "/images/shadcn-ui.png", description: "UI component library" },
  ],
  backend: [
    { name: "Node JS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638969/Portpolio/icon/nodejs_mqnbin.png", description: "JavaScript runtime" },
    { name: "Express JS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638969/Portpolio/icon/expressjs_dhz6b2.png", description: "Web application framework" },
    { name: "Nest JS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1725285620/nestjs-icon-2048x2040-3rrvcej8_ckztk1.png", showName: true, description: "Progressive Node.js framework" },
  ],
  database: [
    { name: "MongoDB", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638969/Portpolio/icon/mongodb_ja4fwy.png", description: "NoSQL document database" },
    { name: "Redis", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1677420850/Portpolio/icon/icons8-redis-240_ixsphn.png", showName: true, description: "In-memory data structure store" },
  ],
  devops: [
    { name: "Git", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638968/Portpolio/icon/git_mqujeq.png", description: "Version control system" },
    { name: "GitHub", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1655638968/Portpolio/icon/github_rrpbxz.png", description: "Code hosting platform" },
    { name: "AWS", image: "https://res.cloudinary.com/dykwfe4cr/image/upload/v1677421030/Portpolio/icon/icons8-amazon-web-services-240_ntif5d.png", description: "Cloud computing services" },
  ],
  mobile: [
    { name: "React Native", image: "/images/react-native.png", description: "Cross-platform mobile framework" },
    { name: "Expo", image: "/images/expo.png", description: "React Native toolkit" },
  ],
  tools: [
    { name: "Cursor IDE", image: "/images/cursor.png", description: "AI-powered code editor" },
  ],
}; 