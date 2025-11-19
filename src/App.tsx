import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Toast from "./component/Toast";
import ChatbotWidget from "./component/ChatbotWidget";
import profileImage from "./assets/profile.jpg";
import './index.css';
import projImg from "./assets/projectImage.png";
import {
  Home, User, Code, FolderOpen, Mail, ArrowUp,
  Download, ExternalLink, Github, Linkedin, Phone,
  Menu, X, Star, Zap, Globe, ChevronLeft, ChevronRight
} from 'lucide-react';
import emailjs from "emailjs-com";
import LightRays from './components/LightRays';
import GooeyNav from './components/GooeyNav';
import RotatingText from './components/RotatingText'
import MagicBento from './components/MagicBento'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({
    type: '',
    message: '',
  });
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;


  const skills = [
    // { name: 'HTML', icon: '🌐' },
    // { name: 'CSS', icon: '🎨' },
    // { name: 'JavaScript', icon: '⚡' },
    { name: 'Python', icon: '🐍' },
    { name: 'RAG', icon: '🤖' },
    { name: 'React.js', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Express.js', icon: '🚀' },
    { name: 'PHP (Laravel)', icon: '🐘' },
    { name: 'Vector DB', icon: '📦' },
    { name: 'MySQL', icon: '🗄️' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'Redis', icon: '🔴' },
    { name: 'Bootstrap', icon: '💜' }
  ];

  const projects = [

    {
      title: 'Doc Reader RAG!',
      description: 'Developed a Python-based document Q&A app using Groq, SentenceTransformers, FAISS, and Vector DB for Retrieval-Augmented Generation (RAG) from PDF, DOCX, and TXT files.',
      tech: ['Python', 'RAG', 'Groq', 'SentenceTransformers', 'FAISS', 'Vector DB'],
      liveLink: 'https://huggingface.co/spaces/Srijagatheeswaran/doc-reader-rag',
      githubLink: 'https://github.com/srijagatheeswaran/doc-reader-rag',
      image: 'https://images.pexels.com/photos/6334780/pexels-photo-6334780.jpeg',
      featured: false,
      new: true,
      type: 'ai'
    },
    {
      title: 'Employee Attendance Management',
      description: 'Advanced attendance tracking system using facial recognition technology with real-time monitoring and analytics dashboard.',
      tech: ['React', 'AWS Rekognition', 'Python', 'MongoDB'],
      liveLink: 'https://employee-management-jaga.netlify.app/profile',
      githubLink: 'https://github.com/srijagatheeswaran/Employee_Mangement_Frontend.git',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      type: 'full-stack'
    },
    {
      title: 'Social Media Web App',
      description: 'Real-time social platform with live messaging, post sharing',
      tech: ['MERN Stack', 'WebSockets'],
      liveLink: 'https://demo-socailmedia.netlify.app/',
      githubLink: 'https://github.com/srijagatheeswaran/social-media-client.git',
      image: 'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      type: 'full-stack'
    },
    {
      title: 'Dreamscape Studio!',
      description: 'Portfolio site for Dreamscape Studio ',
      tech: ['React', 'Tailwind CSS', 'EmailJS'],
      liveLink: 'https://dreamscape-studio.netlify.app/',
      githubLink: 'https://github.com/srijagatheeswaran/Dreamseape-client',
      image: projImg,
      featured: true,
      type: 'freelance'
    },
    {
      title: 'Employee management and empowerment for admins.',
      description: 'Admins can efficiently manage employee data through an intuitive interface. username : admin, password : admin, (or) username : admin1, password : admin',
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      liveLink: 'https://employee-data-admin.netlify.app/',
      githubLink: 'https://github.com/srijagatheeswaran/DEALSDRAY-ONLINE-PVT-LTD-Task_client',
      image: 'https://img.freepik.com/free-vector/illustration-with-multitasking-design_23-2148415704.jpg',
      featured: false,
      type: 'full-stack'
    },
    {
      title: 'Weather Dashboard',
      description: 'Interactive weather application with location-based forecasts, charts, and weather alerts.',
      tech: ['HTML', 'CSS', 'JS', 'Weather API'],
      liveLink: 'https://srijagatheeswaran.github.io/weather-checker-2.0/',
      githubLink: 'https://github.com/srijagatheeswaran/weather-checker-2.0',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      type: 'defult'
    },

    {
      title: 'Core PHP Signup Page',
      description: 'Secure user registration system with advanced caching, email verification, and robust security features.',
      tech: ['PHP', 'MySQL', 'MongoDB', 'Redis'],
      liveLink: 'https://core-php-login.onrender.com/',
      githubLink: 'https://github.com/srijagatheeswaran/php-core',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      type: 'defult'
    },
    {
      title: 'ToDo List App',
      description: 'A simple and responsive To-Do List app built with HTML, CSS, and JavaScript, allowing users to add, edit, and delete tasks with a clean UI',
      tech: ['HTML', 'CSS', 'JS'],
      liveLink: 'https://srijagatheeswaran.github.io/Todo-list/',
      githubLink: 'https://github.com/srijagatheeswaran/To-Do-Web_application_jQuery-',
      image: 'https://images.unsplash.com/photo-1598791318878-10e76d178023?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      featured: false,
      type: 'defult'
    },
    // {
    //   title: 'E-Commerce Platform',
    //   description: 'Full-featured online store with payment integration, inventory management, and admin dashboard.',
    //   tech: ['Laravel', 'Vue.js', 'MySQL', 'Stripe'],
    //   liveLink: '#',
    //   githubLink: '#',
    //   image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    //   featured: false
    // },


  ];
  const projectsType = [
    {
      name: 'All', id: 'all'
    },
    {
      name: 'Full Stack', id: 'full-stack'
    },
    {
      name: 'Freelance', id: 'freelance'
    },
    {
      name: 'AI', id: 'ai'
    }
  ];
  const [activeTab, setActiveTab] = useState(projectsType[0]?.id);

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) => project.type === activeTab);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowBackToTop(scrollPosition > 300);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    let newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.message) newErrors.message = "Message cannot be empty";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    emailjs
      .send(
        serviceID,
        templateID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        publicKey)
      .then(() => {
        setToast({ type: 'success', message: 'Your message has been sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setToast({ type: 'error', message: 'Failed to send message. Please try again.' });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // const items = [
  //   { id: 'home', label: 'Home', icon: Home },
  //   { id: 'about', label: 'About', icon: User },
  //   { id: 'skills', label: 'Skills', icon: Code },
  //   { id: 'projects', label: 'Projects', icon: FolderOpen },
  //   { id: 'contact', label: 'Contact', icon: Mail }
  // ];
  const items = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" }
  ];
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0  backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {/* R. Srijagatheeswaran */}Portfolio
              </h1>
            </div>

            {/* Desktop Menu */}

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8 nav">
                {[
                  { id: 'home', label: 'Home', icon: Home },
                  { id: 'about', label: 'About', icon: User },
                  { id: 'skills', label: 'Skills', icon: Code },
                  { id: 'projects', label: 'Projects', icon: FolderOpen },
                  { id: 'contact', label: 'Contact', icon: Mail }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeSection === id
                      ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800/50'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
            {/* <div className="hidden md:block relative">
              <div className="absolute inset-0 pointer-events-none bg-transparent"></div>
              <GooeyNav
                style={{ background: "transparent" }}
                className="!bg-transparent"
                items={items}
                particleCount={15}
                particleDistances={[90, 10]}
                particleR={100}
                initialActiveIndex={0}
                animationTime={600}
                timeVariance={300}
                colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                onSelect={(item) => scrollToSection(item.id)}
              />

            </div> */}


            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-blue-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-t border-gray-800">
              {[
                { id: 'home', label: 'Home', icon: Home },
                { id: 'about', label: 'About', icon: User },
                { id: 'skills', label: 'Skills', icon: Code },
                { id: 'projects', label: 'Projects', icon: FolderOpen },
                { id: 'contact', label: 'Contact', icon: Mail }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 flex items-center gap-2 ${activeSection === id
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"></div>
          {/* <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div> */}
          <div className="relative w-full h-[900px]">
            <LightRays
              raysOrigin="top-center"
              raysColor="#00ffff"
              raysSpeed={isMobile ? 0.5 : 1.5}
              lightSpread={0.7}
              rayLength={isMobile ? 5.0 : 1.0}
              followMouse={!isMobile}
              mouseInfluence={0.05}
              noiseAmount={0.05}
              distortion={0.03}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900/50"></div>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>


        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="space-y-8 animate-fadeInUp">
            {/* Main heading */}
            <div className="space-y-4 mt-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                Available for new opportunities
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
                <span className="block text-white mb-2">Hi, I'm</span>
                <span className="block pb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                  Srijagatheeswaran
                </span>
              </h1>

              <div className="space-y-2">


                <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light">
                  {/* Full Stack */}
                  <RotatingText
                    texts={['Full Stack', 'Backend', 'Frontend']}
                    mainClassName="px-2 text-light  !inline-block"

                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden  sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                  />
                  Web Developer & Freelancer
                </p>
                {/* <p className="text-lg sm:text-xl text-blue-400 font-medium">
                   PHP Developer
                </p> */}
              </div>
            </div>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              "Passionate about building dynamic and scalable web applications that make a difference."
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <a
                href="/Srijagatheeswaran-resume.pdf"
                download
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-blue-500/25 hover:scale-105"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Download Resume
              </a>
              {/* <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-blue-500/25 hover:scale-105">
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Download Resume
              </button> */}
              <button
                onClick={() => scrollToSection('contact')}
                className="group border-2 border-blue-500 text-blue-400 px-8 py-4 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center gap-3 hover:scale-105"
              >
                <Mail className="w-5 h-5 group-hover:animate-pulse" />
                Get In Touch
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6 pt-3 pb-2">
              <a
                href="https://github.com/srijagatheeswaran"
                target='_blank'
                className="w-12 h-12 bg-gray-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <Github className="w-6 h-6 group-hover:animate-pulse" />
              </a>
              <a
                href="http://www.linkedin.com/in/srijagatheeswaran"
                target='_blank'
                className="w-12 h-12 bg-gray-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <Linkedin className="w-6 h-6 group-hover:animate-pulse" />
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div> */}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              About <span className="text-blue-400">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto"></div>
          </div>
         
          <div className="grid lg:grid-cols-2 gap-12 items-center ">
            <div className="space-y-6">
              <div className="relative">
                <div className="w-80 h-80 profile-img bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl mx-auto flex items-center justify-center backdrop-blur-sm border border-gray-700">
                  {/* <User className="w-32 h-32 text-gray-400" /> */}
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover object-top rounded-2xl"
                  />
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  Hi, I’m <span className="text-blue-400 font-semibold">R. Srijagatheeswaran</span>, a Full Stack Developer with proven
                  experience in MERN, PHP (Laravel), and
                  Python (Flask). Contributed to the
                  development of scalable, secure web
                  applications and REST APIs at Dot Com
                  Infoway (DCI). Committed to writing
                  clean, efficient code and delivering
                  optimized, user-focused digital solutions.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 ">
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <span className="text-white font-medium">Experience</span>
                    </div>
                    <p className="text-gray-400 text-sm">Backend Developer</p>
                    <p className="text-blue-400 text-sm">Jan 2025 - Sep 2025</p>
                  </div>

                  <a className="bg-gray-800/50 p-4 rounded-xl border border-gray-700" onClick={() => scrollToSection('projects')}>
                    <div className="flex items-center gap-3 mb-2">
                      <Globe className="w-5 h-5 text-green-400" />
                      <span className="text-white font-medium">Projects</span>
                    </div>
                    <p className="text-gray-400 text-sm">3+ Completed</p>
                    <p className="text-green-400 text-sm">Full Stack Apps</p>
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-xl border border-blue-500/20">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-400" />
                  Education
                </h3>
                <div className="space-y-2">
                  <p className="font-medium text-blue-400">B.Com (Professional Accounting)</p>
                  <p className="text-gray-300">Erode Arts and Science College</p>
                  <p className="text-sm text-gray-400">2021 – 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Tech <span className="text-blue-400">Stack</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 text-center hover:scale-105 hover:bg-gray-800"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors duration-300">
                  {skill.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Featured <span className="text-blue-400">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A showcase of my recent work and technical expertise
            </p>
          </div>
          <div className="flex justify-center space-x-4 border-b border-gray-700 mb-6">
            {projectsType.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`px-4 py-2 rounded-t-xl transition-all duration-200 ${activeTab === type.id
                  ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                  : "text-gray-400 hover:text-blue-400"
                  }`}
              >
                {type.name}
              </button>
            ))}
          </div>

          <div className="relative slider_box">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                prevEl: '.swiper-button-prev-custom',
                nextEl: '.swiper-button-next-custom',
              }}
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet-custom',
                bulletActiveClass: 'swiper-pagination-bullet-active-custom',
              }}
              // autoplay={{
              //   delay: 5000,
              //   disableOnInteraction: false,
              // }}
              // loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="projects-swiper"
            >

              {filteredProjects.map((project, index) => (
                <SwiperSlide key={index}>
                  <div className="group bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300  h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                      {project.featured && (
                        <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      )}
                      {project.new && (
                        <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          New
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full border border-blue-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        <a
                          href={project.liveLink}
                          target='_blank'
                          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target='_blank'
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                          >
                            <Github className="w-4 h-4" />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            {/* <div className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 hover:bg-blue-600 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 group backdrop-blur-sm border border-gray-700 hover:border-blue-500">
              <ChevronLeft className="w-6 h-6 text-gray-300 group-hover:text-white" />
            </div>
            <div className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 hover:bg-blue-600 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 group backdrop-blur-sm border border-gray-700 hover:border-blue-500">
              <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-white" />
            </div> */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Get In <span className="text-blue-400">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Let's discuss your next project or collaboration opportunity
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email', value: 'srijagatheeswaran@gmail.com', href: 'mailto:srijagatheeswaran@gmail.com' },
                  { icon: Phone, label: 'Phone', value: '+91 9342991530', href: 'tel:+919342991530' },
                  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/srijagatheeswaran', href: 'http://www.linkedin.com/in/srijagatheeswaran' },
                  { icon: Github, label: 'GitHub', value: 'github.com/srijagatheeswaran', href: 'https://github.com/srijagatheeswaran' }
                ].map(({ icon: Icon, label, value, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target='_blank'
                    className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group hover:scale-105"
                  >
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white group-hover:text-blue-400 transition-colors duration-300">{label}</p>
                      <p className="text-gray-400 text-sm">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400`}
                    placeholder="Your Name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full px-4 py-3 bg-gray-700 border ${errors.message ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400`}
                    placeholder="Your message here..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 
    ${loading ? "opacity-50 cursor-not-allowed" : "hover:from-blue-700 hover:to-purple-700"}`}
                >
                  <Mail className="w-5 h-5" />
                  {loading ? "Sending..." : "Send Message"}
                </button>
                {status.message && (
                  <div
                    className={`mb-4 p-4 rounded-lg text-sm font-medium transition-all duration-300 ${status.type === 'success'
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'bg-red-100 text-red-800 border border-red-300'
                      }`}
                  >
                    {status.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                R. Srijagatheeswaran
              </span>
            </h3>
            <p className="text-gray-400 mb-6">Full Stack Web Developer
              {/* | Backend Developer */}
            </p>

            <div className="flex justify-center gap-6 mb-8">
              <a
                href="https://github.com/srijagatheeswaran"
                target='_blank'
                className="w-12 h-12 bg-gray-700 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <Github className="w-6 h-6 text-gray-300 group-hover:text-white" />
              </a>
              <a
                href="http://www.linkedin.com/in/srijagatheeswaran"
                target='_blank'
                className="w-12 h-12 bg-gray-700 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <Linkedin className="w-6 h-6 text-gray-300 group-hover:text-white" />
              </a>
            </div>

            <div className="border-t border-gray-700 pt-8">
              <p className="text-gray-500">
                © 2025 R. Srijagatheeswaran. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-28 right-7 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 z-50 hover:scale-110"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="relative">

        <ChatbotWidget />
      </div>
    </div>

  );
}

export default App;