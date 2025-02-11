import { ifa, mercedes } from "../assets/images";
import {
    car,
    css,
    estate,
    django,
    git,
    github,
    html,
    javascript,
    linkedin,
    postgresql,
    awsgateway,
    powerbi,
    nextjs,
    nodejs,
    react,
    redux,
    flask,
    snapgram,
    summiz,
    tailwindcss,
    threads,
    typescript,
    ticket,
} from "../assets/icons";

export const skills = [
    {
        imageUrl: awsgateway,
        name: "Aws API Gateway",
        type: "Cloud Services",
    },
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: django,
        name: "Django",
        type: "Backend",
    },
    {
        imageUrl: flask,
        name: "Flask",
        type: "Backend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: postgresql,
        name: "Postgresql",
        type: "Database",
    },
    {
        imageUrl: powerbi,
        name: "Power BI",
        type: "Buisiness Intelligence",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: redux,
        name: "Redux",
        type: "State Management",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Frontend",
    }
];

export const experiences = [
    {
        title: "Full-Stack Developer",
        company_name: "Mercedes-Benz Vans, LLC",
        icon: mercedes,
        iconBg: "#fbc3bc",
        gradientType: 'blue',
        date: "Sep 2023 - Jan 2024",
        points: [
            "Collaborated in a team of 3 to develop a portable Raspberry-Pi small-part inventory scanning station using React, AWS (Lambda, S3, API Gateway), OpenCV, Tesseract OCR, and YOLOv8.",
            "Authored Software Requirements & Design Specification documents by gathering requirements from stakeholders then refining them for use in system design and planning.",
            "Achieved 98% accuracy in small-part scanning with real-time SAP inventory updates, utilizing RESTful APIs (running in AWS API Gateway) to consume SAP’s ’Inventory Management’ endpoints.",
        ],
    },
    {
        title: "Full-Stack Developer",
        company_name: "IFA Group",
        icon: ifa,
        iconBg: "#accbe1",
        gradientType: 'sunset',
        date: "Jan 2024 - May 2024",
        points: [
            "Collaborated in a team of 4 to develop a drone inventory scanning system using Next.js, Flask, PostgreSQL, OpenCV, PyZbar, YOLOv8, a DJI Tello drone, and DJI’s Mobile SDK.",
            "Implemented a drone localization system using a 3D grid combined with a custom A* algorithm for efficient path planning, optimized via heuristics for safety, accuracy, and battery life.",
        ],
    },
];

export const socialLinks = [
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/LeoGeorgeto',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/georgetol',
    }
];

export const projects = [
    {
        iconUrl: ticket,
        theme: 'btn-back-red',
        name: 'Cloud Resume Challenge',
        description: 'Engineered a cloud-native resume website using AWS services and Infrastructure as Code, featuring automated deployments, serverless visitor tracking, and multi-tool infrastructure management with Terraform and AWS SAM.',
        link: 'https://github.com/stars/LeoGeorgeto/lists/cloud-resume-challenge',
    },
    {
        iconUrl: threads,
        theme: 'btn-back-green',
        name: '3D Interactive Portfolio',
        description: 'Developed a responsive and immersive 3D portfolio website to showcase projects and skills. Leveraged React, Three.js, and React Three Fiber to create interactive scenes with animations, dynamic models, and performance optimizations. Features a contact form integrated with EmailJS and preloaded 3D assets for improved user experience.',
        link: 'https://github.com/LeoGeorgeto/Folio_Island',
    },
    {
        iconUrl: car,
        theme: 'btn-back-blue',
        name: 'PouncePass',
        description: 'Developed a full-stack event ticketing platform using Django and React that streamlines the buying and selling of event tickets.',
        link: 'https://github.com/PouncePass-Org',
    },
    {
        iconUrl: snapgram,
        theme: 'btn-back-pink',
        name: 'Coming Soon!',
        description: '',
        link: '',
    },
    {
        iconUrl: estate,
        theme: 'btn-back-black',
        name: 'Coming Soon!',
        description: '',
        link: '',
    },
    {
        iconUrl: summiz,
        theme: 'btn-back-yellow',
        name: 'Coming Soon!',
        description: '',
        link: '',
    }
];