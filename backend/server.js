const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Portfolio data API
app.get('/api/portfolio', (req, res) => {
  res.json({
    name: "Aman Gupta",
    title: "Full Stack Developer & ML Enthusiast",
    subtitle: "B.Tech Computer Science @ JIIT Noida",
    phone: "+91-8960481388",
    email: "amangupta.05ob@gmail.com",
    linkedin: "https://www.linkedin.com/in/aman-gupta-632b14203",
    education: [
      {
        institution: "Jaypee Institute of Information Technology, Noida",
        degree: "Bachelor of Technology in Computer Science",
        score: "CGPA: 7.4",
        period: "2023–27"
      },
      {
        institution: "City Montessori School, Lucknow",
        degree: "10+2 in PCM — ISC Boards",
        score: "94.5%",
        period: "2021–22"
      }
    ],
    projects: [
      {
        name: "Nagarmitra",
        tagline: "Civic Issue Reporting Platform",
        description: "Developed the frontend for a web-based platform enabling citizens to report and track civic issues such as potholes, waste management, and streetlight faults. Built an intuitive, responsive UI for reporting issues and interacting with local authorities.",
        tech: ["HTML", "CSS", "JavaScript", "ReactJs", "REST APIs"],
        color: "#00d4aa"
      },
      {
        name: "Diabetes Prediction Model",
        tagline: "Machine Learning Project",
        description: "Built an ML model to predict the likelihood of diabetes based on medical and lifestyle data. Performed data preprocessing, feature selection, and model evaluation using Logistic Regression, Random Forest, and SVM.",
        tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
        color: "#ff6b6b"
      },
      {
        name: "Traffic Management System",
        tagline: "DSA-based Project",
        description: "Built a Traffic Management System utilizing DSA to optimize vehicle flow and reduce congestion. Implemented graphs, priority queues, and shortest path algorithms to simulate real-time traffic routing.",
        tech: ["C++", "Graph Algorithms", "Priority Queues"],
        color: "#ffd93d"
      },
      {
        name: "GrocerEase",
        tagline: "Online Grocery Shopping Website",
        description: "Designed and developed the frontend for an online grocery platform allowing users to browse, filter, and purchase groceries seamlessly with interactive UI components and shopping cart functionality.",
        tech: ["HTML", "CSS", "JavaScript", "ReactJs"],
        color: "#6bcb77"
      }
    ],
    skills: {
      "Languages": ["C++", "Python", "JavaScript", "HTML+CSS", "Java"],
      "Libraries & Frameworks": ["ReactJs", "NextJs", "Tailwind CSS", "C++ STL", "Scikit-learn"],
      "Tools": ["NodeJs", "Git", "GitHub", "VSCode"],
      "Databases": ["MongoDB", "Firebase", "MySQL"],
      "Machine Learning": ["Supervised Learning", "Model Evaluation", "Pandas", "NumPy"],
      "Soft Skills": ["Problem Solving", "Leadership", "Communication", "Adaptability"]
    },
    experience: [
      {
        role: "Social Media Team Lead",
        org: "INNOVATION – JIIT, Noida",
        period: "July 2025 – Present",
        points: [
          "Significant role in organizing national level ideathon RideHack'25",
          "Contributed to national level hackathon Innovate 3.0",
          "Managing and leadership role in society activities"
        ]
      }
    ],
    achievements: [
      "Awarded for academic excellence and outstanding performance in board exams",
      "Actively participated in national-level quiz competitions and Olympiads",
      "Participated in hackathons and vibe-coding competitions across various institutes"
    ]
  });
});

// Contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }
  // In production, configure nodemailer with real credentials
  console.log(`Contact from ${name} <${email}>: ${message}`);
  res.json({ success: true, message: 'Message received! Aman will get back to you soon.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
