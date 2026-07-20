export const personal = {
  name: 'Faran Raheel Raja',
  title: 'Full Stack Web Developer',
  email: 'faranraja011@gmail.com',
  phone: '0314-1943059',
  github: 'https://github.com/FaranRaja',
  linkedin: 'https://www.linkedin.com/in/faran-raja-6b7145288/',
  instagram: 'https://www.instagram.com/raja_faran_03/',
  location: 'Islamabad, Pakistan',
  summary:
    'Software Engineering student at COMSATS University Islamabad with hands-on experience in full stack web development, cloud backends, and AI-integrated applications. Currently seeking an internship to apply and grow my technical skills in a real-world environment.',
  roles: ['Full Stack Developer', 'MERN Stack Engineer', 'Next.js Developer', 'Web App Builder'],
};

export const skills = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'WebSockets'],
  },
  {
    category: 'Cloud & Databases',
    items: ['Firebase', 'Supabase', 'MongoDB', 'PostgreSQL'],
  },
  {
    category: 'Tools & Workflow',
    items: ['Git', 'GitHub', 'Vite', 'Vercel', 'VS Code'],
  },
];

export const projects = [
  {
    id: 1,
    title: 'SkillUp AI',
    subtitle: 'AI-Powered Educational Platform',
    description:
      'A full-featured educational web platform built with Next.js, TypeScript, and Firebase. Features AI-generated quizzes, intelligent keyword search powered by the Cohere API, user authentication, and real-time progress tracking.',
    tags: ['Next.js', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Cohere API'],
    github: 'https://github.com/FaranRaja/SkillUp---Web',
    live: null,
    featured: true,
    color: '#7c6aff',
  },
  {
    id: 2,
    title: 'StreamIT',
    subtitle: 'Streaming Web Application',
    description:
      'A TypeScript-based streaming platform with a modern UI, content browsing, and dynamic media delivery. Built with a focus on performance and clean component architecture.',
    tags: ['TypeScript', 'React', 'Node.js'],
    github: 'https://github.com/FaranRaja/StreamIT',
    live: null,
    featured: false,
    color: '#a78bfa',
  },
  {
    id: 3,
    title: 'Real-Time Chat App',
    subtitle: 'WebSocket Chat with File Transfer',
    description:
      'A real-time chat web application built with Node.js and Supabase. Features WebSocket-based instant messaging, secure file transfer, user authentication, and cloud storage for scalable data handling.',
    tags: ['Node.js', 'Supabase', 'WebSockets', 'JavaScript'],
    github: 'https://github.com/FaranRaja/Chat-App',
    live: null,
    featured: false,
    color: '#c4b5fd',
  },
  {
    id: 4,
    title: 'YT Video Downloader',
    subtitle: 'YouTube Media Downloader Tool',
    description:
      'A web-integrated tool for downloading YouTube videos in multiple formats and resolutions. Clean interface with format selection and download progress tracking.',
    tags: ['Python', 'Node.js', 'JavaScript'],
    github: 'https://github.com/FaranRaja/YT-Video-Downloader',
    live: null,
    featured: false,
    color: '#818cf8',
  },
  {
    id: 5,
    title: 'Facial Detection Attendance',
    subtitle: 'Computer Vision System',
    description:
      'A computer vision system using OpenCV for real-time face detection and recognition. Designed for automated attendance tracking — detects, extracts features, and identifies individuals from pre-registered face data.',
    tags: ['OpenCV', 'Computer Vision', 'Java', 'Java Swing'],
    github: 'https://github.com/FaranRaja',
    live: null,
    featured: false,
    color: '#6d6aff',
  },
  {
    id: 6,
    title: 'StudySync',
    subtitle: 'Study Management App',
    description: 'A study productivity platform that helps students sync their study materials and schedule effectively. Built with modern JavaScript.',
    tags: ['JavaScript', 'Web Platform'],
    github: 'https://github.com/FaranRaja/StudySync',
    live: null,
    featured: false,
    color: '#34d399',
  },
];

export const education = [
  {
    institution: 'COMSATS University Islamabad',
    degree: 'Bachelor of Science in Software Engineering',
    period: '2023 – 2027',
    detail: 'GPA: 3.3 · Semester 7',
    current: true,
  },
  {
    institution: 'Fazaia Inter College',
    degree: 'O & A Levels',
    period: '2017 – 2023',
    detail: 'O-Levels: A · A-Levels: A',
    current: false,
  },
];

export const experience = [
  {
    title: 'Software Engineer Intern',
    company: 'Decimal Solutions',
    period: 'July – August 2027',
    description: 'Built scalable web applications in a professional development environment.',
  }
];

// Chatbot knowledge base
export const chatbotKnowledge = `
You are Faran's professional portfolio assistant. Answer questions about Faran Raheel Raja in a friendly, professional manner. Keep answers concise and helpful.

ABOUT FARAN:
- Full name: Faran Raheel Raja
- Role: Full Stack Web Developer
- Location: Islamabad, Pakistan
- Currently: Software Engineering student at COMSATS University Islamabad (2023-2027), Semester 6, GPA 3.3
- Previously: O & A Levels at Fazaia Inter College (A grades in both)
- Seeking: Internship opportunities in web development

CONTACT:
- Email: faranraja011@gmail.com
- Phone: 0314-1943059
- GitHub: github.com/FaranRaja
- LinkedIn: linkedin.com/in/faran-raja-6b7145288
- Instagram: @raja_faran_03

SKILLS (Web Focus):
- Frontend: React, Next.js, TypeScript, JavaScript, HTML5, Tailwind CSS
- Backend: Node.js, Express.js, REST APIs, WebSockets
- Cloud & DB: Firebase, Supabase, MongoDB, PostgreSQL
- Tools: Git, GitHub, Vite, Vercel

PROJECTS:
1. SkillUp AI (Featured) - Educational web platform with Next.js, TypeScript, Firebase, Cohere AI API for quizzes and search
2. StreamIT - TypeScript streaming web application
3. Real-Time Chat App - Node.js + Supabase + WebSockets with file transfer
4. YT Video Downloader - YouTube media downloader tool
5. Facial Detection Attendance System - Computer vision project using OpenCV

AVAILABILITY: Open to internship opportunities and freelance web projects.

Answer only questions related to Faran's professional background, skills, projects, and contact info. If asked something unrelated, politely redirect to professional topics.
`;
