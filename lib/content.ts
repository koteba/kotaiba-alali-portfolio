import type { SiteContent } from './types';

// This is the single default content object for the entire site.
// Every visible string lives here. The admin panel writes overrides to
// localStorage under the key `portfolio_content_overrides`, and
// lib/useContent.ts deep-merges those overrides on top of this default
// at render time. Nothing in the UI layer should hardcode copy.

export const defaultContent: SiteContent = {
  hero: {
    name: 'Kotaiba Alali',
    title: {
      en: 'Full Stack Developer & Business Analyst',
      ar: 'مطوّر برمجيات متكامل ومحلل أعمال',
    },
    tagline: {
      en: 'I write code until it works, then wonder why it worked.',
      ar: 'أكتب الكود حتى يعمل، ثم أكتشف لماذا عمل.',
    },
    valueProposition: {
      en: 'I build reliable, scalable products end to end, and I bring the business analysis instincts to make sure they solve the right problem in the first place. 3+ years turning requirements into shipped software.',
      ar: 'أبني منتجات برمجية موثوقة وقابلة للتوسّع من الألف إلى الياء، وأجمع إلى ذلك حسّ تحليل الأعمال الذي يضمن أننا نحل المشكلة الصحيحة من البداية. أكثر من 3 سنوات من تحويل المتطلبات إلى برمجيات فعلية.',
    },
    location: {
      en: 'Damascus, Syria — open to relocation',
      ar: 'دمشق، سوريا    ',
    },
    ctaPrimary: {
      en: 'View Projects',
      ar: 'عرض المشاريع',
    },
    ctaSecondary: {
      en: 'Download CV',
      ar: 'تحميل السيرة الذاتية',
    },
  },

  stats: [
    { id: 'experience', value: '3+', label: { en: 'Years of experience', ar: 'سنوات خبرة' } },
    { id: 'uptime', value: '99.9%', label: { en: 'Production uptime', ar: 'استمرارية التشغيل' } },
    { id: 'users', value: '1,000+', label: { en: 'Active users reached', ar: 'مستخدم نشط' } },
    { id: 'stack', value: 'End to end', label: { en: 'From idea to launch', ar: 'من الفكرة إلى الإطلاق' } },
  ],

  about: {
    heading: {
      en: 'About',
      ar: 'نبذة',
    },
    paragraph: {
      en: "I work both sides of the table: writing the code that ships, and asking the questions that decide what should get built. That dual lens — full-stack engineering paired with structured business analysis — means I design systems that hold up technically and make sense for the people paying for them. I'm currently completing a Master's in Web Science (2026), which keeps me close to how the web itself keeps changing.",
      ar: 'أعمل من الجانبين معًا: أكتب الشيفرة التي تصل إلى الإنتاج، وأطرح الأسئلة التي تحدد ما الذي يستحق أن يُبنى أصلًا. هذه الرؤية المزدوجة — هندسة برمجيات متكاملة إلى جانب تحليل أعمال منهجي — تجعلني أصمم أنظمة تصمد تقنيًا وتُفهم من قبل من يدفع ثمنها. أُتم حاليًا درجة الماجستير في علوم الويب (2026)، وهو ما يبقيني قريبًا من التحولات المستمرة في الويب نفسه.',
    },
    education: {
      en: "Master's in Web Science, 2026",
      ar: 'ماجستير في علوم الويب، 2026',
    },
  },

  services: [
    {
      id: 'web-development',
      title: { en: 'Web Development', ar: 'تطوير الويب' },
      description: {
        en: 'Reliable, responsive web products built with modern front-end and back-end tools.',
        ar: 'منتجات ويب موثوقة ومتجاوبة مبنية بأدوات حديثة للواجهة الأمامية والخلفية.',
      },
    },
    {
      id: 'business-analysis',
      title: { en: 'Business Analysis', ar: 'تحليل الأعمال' },
      description: {
        en: 'Clear requirements, user stories, and workflows that turn business needs into buildable plans.',
        ar: 'متطلبات وقصص مستخدم ومسارات عمل واضحة تحوّل احتياجات العمل إلى خطط قابلة للتنفيذ.',
      },
    },
    {
      id: 'systems-and-data',
      title: { en: 'Systems & Data', ar: 'الأنظمة والبيانات' },
      description: {
        en: 'Practical database design, integrations, and internal systems that scale with the work.',
        ar: 'تصميم عملي لقواعد البيانات والتكاملات والأنظمة الداخلية القابلة للتوسع مع العمل.',
      },
    },
  ],

  skillCategories: [
    {
      id: 'development',
      title: { en: 'Development', ar: 'التطوير' },
      skills: [
        { id: 'js', name: 'JavaScript / TypeScript', level: 92 },
        { id: 'react', name: 'React / Next.js', level: 90 },
        { id: 'node', name: 'Node.js / Express', level: 85 },
        { id: 'php', name: 'PHP (OOP)', level: 80 },
        { id: 'html-css', name: 'HTML5 / CSS / Tailwind', level: 93 },
      ],
    },
    {
      id: 'databases',
      title: { en: 'Databases', ar: 'قواعد البيانات' },
      skills: [
        { id: 'mysql', name: 'MySQL', level: 88 },
        { id: 'postgres', name: 'PostgreSQL', level: 78 },
        { id: 'mongo', name: 'MongoDB', level: 75 },
        { id: 'redis', name: 'Redis', level: 65 },
      ],
    },
    {
      id: 'business-analysis',
      title: { en: 'Business Analysis', ar: 'تحليل الأعمال' },
      skills: [
        { id: 'requirements', name: 'Requirements Gathering', level: 90 },
        { id: 'process-mapping', name: 'Process Mapping', level: 85 },
        { id: 'stakeholder', name: 'Stakeholder Management', level: 88 },
        { id: 'user-stories', name: 'User Stories & Backlogs', level: 90 },
      ],
    },
    {
      id: 'tools-methods',
      title: { en: 'Tools & Methods', ar: 'الأدوات والمنهجيات' },
      skills: [
        { id: 'git', name: 'Git / GitHub', level: 90 },
        { id: 'jira', name: 'Jira / Confluence', level: 85 },
        { id: 'agile', name: 'Agile / Scrum', level: 88 },
        { id: 'docker', name: 'Docker', level: 70 },
      ],
    },
  ],

  experience: [
    {
      id: 'freelance-developer',
      company: 'Freelance',
      role: {
        en: 'Full Stack Developer & Business Analyst',
        ar: 'مطوّر برمجيات متكامل ومحلل أعمال',
      },
      period: {
        en: '2022 — Present',
        ar: '2022 — حتى الآن',
      },
      location: {
        en: 'Remote',
        ar: 'عن بُعد',
      },
      summary: {
        en: 'Build and maintain websites and business systems for clients, owning features end-to-end from stakeholder interviews and requirements documentation to production deployment, while turning ideas into reliable, user-friendly digital products.',
        ar: 'أطوّر وأصون المواقع والأنظمة الخاصة بالعملاء، وأتولى الميزات من الألف إلى الياء بدءًا من مقابلات أصحاب المصلحة وتوثيق المتطلبات وصولًا إلى النشر، مع تحويل الأفكار إلى منتجات رقمية موثوقة وسهلة الاستخدام.',
      },
      achievements: [
        {
          id: 'freelance-websites',
          text: {
            en: 'Designed and developed responsive websites and web applications tailored to each client’s goals and audience.',
            ar: 'صممت وطورت مواقع وتطبيقات ويب متجاوبة تناسب أهداف كل عميل وجمهوره.',
          },
        },
        {
          id: 'freelance-full-stack',
          text: {
            en: 'Delivered full-stack features across front-end interfaces, back-end services, APIs, and database integrations.',
            ar: 'نفذت ميزات متكاملة شملت الواجهات الأمامية وخدمات الخلفية وواجهات API وربط قواعد البيانات.',
          },
        },
        {
          id: 'freelance-requirements',
          text: {
            en: 'Worked directly with clients to clarify requirements, plan solutions, and iterate from an initial idea to a working product.',
            ar: 'تعاونت مباشرة مع العملاء لفهم المتطلبات وتخطيط الحلول وتحويل الفكرة الأولية إلى منتج يعمل.',
          },
        },
        {
          id: 'freelance-maintenance',
          text: {
            en: 'Improved existing websites through performance, usability, SEO, maintenance, and ongoing technical support.',
            ar: 'حسّنت مواقع موجودة من خلال رفع الأداء وسهولة الاستخدام وتحسين SEO والصيانة والدعم التقني المستمر.',
          },
        },
        {
          id: 'freelance-uptime',
          text: {
            en: 'Maintained 99.9% uptime across production services through proactive monitoring and incident response.',
            ar: 'حافظتُ على نسبة تشغيل 99.9% للخدمات في بيئة الإنتاج عبر المراقبة الاستباقية والاستجابة السريعة للأعطال.',
          },
        },
        {
          id: 'freelance-traffic',
          text: {
            en: 'Grew organic traffic by 35% by leading SEO-focused technical improvements and content structure work.',
            ar: 'رفعتُ الزيارات العضوية بنسبة 35% من خلال قيادة تحسينات تقنية لمحركات البحث وإعادة هيكلة المحتوى.',
          },
        },
        {
          id: 'freelance-overhead',
          text: {
            en: 'Cut operational overhead by 18% by automating recurring manual workflows and reporting.',
            ar: 'خفّضتُ التكاليف التشغيلية بنسبة 18% عبر أتمتة المهام اليدوية المتكررة والتقارير.',
          },
        },
        {
          id: 'freelance-agile',
          text: {
            en: 'Led Agile ceremonies for cross-functional teams, translating business requirements into sprint-ready user stories.',
            ar: 'قدت فعاليات Agile لفرق متعددة التخصصات، وحوّلت متطلبات الأعمال إلى قصص مستخدم جاهزة للسبرنت.',
          },
        },
      ],
    },
  ],

  projects: [
    {
      id: 'smart-finance',
      name: {
        en: 'SmartFinance Expense Tracking Platform',
        ar: 'SmartFinance | منصة تتبع المصاريف الذكية',
      },
      description: {
        en: 'A complete Laravel and React web platform for personal expense management, with automatic expense categorization, live daily and monthly spending charts, proactive budget alerts, and full Sanctum authentication. Built for a smooth mobile and desktop experience with professional dark mode, gradient cards, and Framer Motion transitions.',
        ar: 'منصة ويب متكاملة مبنية بـ Laravel وReact لإدارة المصاريف الشخصية، مع تصنيف تلقائي للمصاريف، وشارتات تفاعلية حية لتتبع الإنفاق اليومي والشهري، وتنبيهات ميزانية استباقية، ونظام مصادقة كامل باستخدام Sanctum. صُممت لتجربة سلسة على الموبايل واللابتوب مع وضع ليلي احترافي وبطاقات متدرجة وحركات انتقالية ناعمة.',
      },
      images: ['/SmartFinance/preview.webp', '/SmartFinance/43.webp'],
      tech: ['Laravel', 'React', 'Sanctum', 'Charts', 'Framer Motion', 'Dark Mode'],
      link: '',
      repo: '',
      metric: {
        en: 'Clear, proactive visibility into personal spending and budget health',
        ar: 'رؤية واضحة واستباقية للإنفاق الشخصي وصحة الميزانية',
      },
    },
    {
      id: 'nawa-digital',
      name: {
        en: 'Nawa Digital SaaS Platform',
        ar: 'نواة | Nawa Digital',
      },
      description: {
        en: 'A full-featured SaaS platform for a digital agency, combining a marketing site with service catalogs, a multi-step order wizard, role-based dashboards, Kanban project management, real-time messaging, automated invoicing, and analytics reporting.',
        ar: 'منصة SaaS متكاملة لشركة خدمات رقمية، تجمع موقعًا تسويقيًا مع كتالوج خدمات وباقات، ومعالج طلب متعدد الخطوات، ولوحات تحكم حسب الدور، وإدارة مشاريع بنظام Kanban، ومحادثات فورية، وفواتير تلقائية، وتقارير تحليلية.',
      },
      images: [
        '/nawa/1 (1).png',
        '/nawa/1 (2).png',
        '/nawa/1 (3).png',
      ],
      tech: ['Laravel 12', 'React', 'TypeScript', 'REST API', 'RBAC', 'MySQL'],
      link: '',
      repo: '',
      metric: {
        en: 'One workspace for clients, project managers, team members, and administrators',
        ar: 'مساحة عمل موحدة للعملاء ومديري المشاريع وأعضاء الفريق والإدارة',
      },
    },
    {
      id: 'warehouse-management',
      name: {
        en: 'Warehouse Management System',
        ar: 'نظام إدارة المستودعات',
      },
      description: {
        en: 'An internal system for tracking inventory movement, stock levels, and order fulfillment in real time, built after mapping the client\u2019s existing paper-based process end to end.',
        ar: 'نظام داخلي لتتبع حركة المخزون ومستويات التوريد وتنفيذ الطلبات لحظيًا، بُني بعد رسم مسار العمل الورقي القائم لدى العميل بالكامل.',
      },
      tech: ['React', 'Node.js', 'MySQL', 'Express'],
      link: '',
      repo: '',
      metric: {
        en: 'Reduced stock-count discrepancies by automating manual entry points',
        ar: 'خفض التباين في جرد المخزون عبر أتمتة نقاط الإدخال اليدوي',
      },
    },
    {
      id: 'job-vacancy-ministry',
      name: {
        en: 'Job Vacancy Management (Ministry)',
        ar: 'نظام إدارة الشواغر الوظيفية (وزارة)',
      },
      description: {
        en: 'A government platform for publishing job vacancies, collecting applications, and routing candidates through a structured review pipeline.',
        ar: 'منصة حكومية لنشر الشواغر الوظيفية واستقبال الطلبات وتوجيه المرشحين عبر مسار مراجعة منظم.',
      },
      tech: ['PHP', 'MySQL', 'jQuery', 'Bootstrap'],
      link: '',
      repo: '',
      metric: {
        en: 'Digitized a fully manual, paper-based hiring workflow for a public sector client',
        ar: 'حوّل مسار توظيف ورقيًا بالكامل إلى نظام رقمي لجهة حكومية',
      },
    },
    {
      id: 'daleel-syria',
      name: {
        en: 'Daleel Syria',
        ar: 'دليل سوريا',
      },
      description: {
        en: 'A public directory platform connecting users to services and businesses across Syria, now serving over 1,000 active users.',
        ar: 'منصة دليل عام تربط المستخدمين بالخدمات والأعمال في سوريا، ويتجاوز عدد مستخدميها النشطين حاليًا 1000 مستخدم.',
      },
      images: [
        '/daleel/1 (1).png',
        '/daleel/1 (2).png',
        '/daleel/1 (3).png',
        '/daleel/1 (4).png',
      ],
      tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
      link: 'https://daleel-sy.com/',
      repo: '',
      metric: {
        en: '1,000+ active users since launch',
        ar: 'أكثر من 1000 مستخدم نشط منذ الإطلاق',
      },
    },
  ],

  certifications: [
    {
      id: 'google-agile',
      name: { en: 'Google Agile Project Management', ar: 'إدارة المشاريع الرشيقة من Google' },
      issuer: { en: 'Google / Coursera', ar: 'Google / Coursera' },
      year: '2023',
      pdf: '/certificate/agile%20project%20management.pdf',
      link: 'https://coursera.org/share/3ef78c4dc5f4581deeaa6c23c972b1b7',
    },
    {
      id: 'github-cert',
      name: { en: 'Git for Developers', ar: 'Git للمطورين' },
      issuer: { en: 'GitHub', ar: 'GitHub' },
      year: '2023',
      pdf: '/certificate/git%20for%20developers.pdf',
      link: 'https://coursera.org/share/4f7cb17e6851d5917f77ba31cfe52910',
    },
    {
      id: 'php-oop',
      name: { en: 'PHP Object-Oriented Programming', ar: 'البرمجة الكائنية بلغة PHP' },
      issuer: { en: 'Udemy', ar: 'Udemy' },
      year: '2022',
      pdf: '/certificate/learn%20object%20oriented%20programming.pdf',
      link: 'https://coursera.org/share/dfe6e86f23879ccac22f2ab76e63b56d',
    },
    {
      id: 'jira-cert',
      name: { en: 'Creating User Stories in Jira', ar: 'إنشاء قصص المستخدمين في برنامج جيرا' },
      issuer: { en: 'Atlassian', ar: 'Atlassian' },
      year: '2023',
      pdf: '/certificate/create%20user%20story%20in%20jira.pdf',
      link: 'https://coursera.org/share/7542afb92c72bcc56d243430bfe304b1',
    },
    {
      id: 'english-course',
      name: { en: 'English Language Course', ar: 'دورة اللغة الإنجليزية' },
      issuer: { en: 'Coursera', ar: 'Coursera' },
      year: '2023',
      pdf: '/certificate/speak%20english.pdf',
      link: 'https://coursera.org/share/279c0cb11560d3737585b85f3b81ce17',
    },
  ],

  languages: [
    { id: 'ar', name: { en: 'Arabic', ar: 'العربية' }, level: { en: 'Native', ar: 'اللغة الأم' }, proficiency: 100 },
    { id: 'en', name: { en: 'English', ar: 'الإنجليزية' }, level: { en: 'B1', ar: 'B1' }, proficiency: 55 },
    { id: 'de', name: { en: 'German', ar: 'الألمانية' }, level: { en: 'A1', ar: 'A1' }, proficiency: 20 },
  ],

  contact: {
    heading: { en: "Let's talk", ar: 'لنتحدث' },
    subheading: {
      en: "Have a project, a role, or just a question? I'm reachable directly — no forms required, but here's one anyway.",
      ar: 'لديك مشروع أو فرصة عمل أو مجرد سؤال؟ يمكنك التواصل معي مباشرة — لا حاجة لنموذج، لكن تفضّل به مع ذلك.',
    },
    formNamePlaceholder: { en: 'Your name', ar: 'اسمك' },
    formEmailPlaceholder: { en: 'Your email', ar: 'بريدك الإلكتروني' },
    formMessagePlaceholder: { en: 'Your message', ar: 'رسالتك' },
    formSubmitLabel: { en: 'Send message', ar: 'إرسال الرسالة' },
    formSuccessMessage: {
      en: "Thanks — I'll get back to you soon.",
      ar: 'شكرًا لك — سأعاود التواصل معك قريبًا.',
    },
  },

  social: {
    email: 'koteba.ali98@gmail.com',
    phone: '+963 937 022 083',
    github: 'https://github.com/koteba',
    linkedin: 'https://linkedin.com/in/kotaiba-alali',
  },
};
