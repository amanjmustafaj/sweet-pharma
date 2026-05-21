export const initialWebsiteData = {
  hero: {
    en: {
      title: 'Excellence in Every Service',
      subtitle: 'Your trusted partner for quality solutions across the region',
      backgroundImage: '/images/hero-bg.jpg',
      videoUrl: '',
    },
    ku: {
      title: 'باشترین لە هەموو خزمەتگوزارییەکدا',
      subtitle: 'هاوبەشی متمانەپێکراوت بۆ چارەسەرە کوالیتیدارەکان لە سەرانسەری هەرێمدا',
      backgroundImage: '/images/hero-bg.jpg',
      videoUrl: '',
    },
    ar: {
      title: 'التميز في كل خدمة',
      subtitle: 'شريكك الموثوق للحلول عالية الجودة عبر المنطقة',
      backgroundImage: '/images/hero-bg.jpg',
      videoUrl: '',
    },
  },
  
  services: [
    {
      id: 1,
      icon: 'FaHandHoldingHeart',
      en: {
        title: 'Quality Service',
        description: 'Premium quality services with attention to detail and customer satisfaction',
      },
      ku: {
        title: 'خزمەتگوزاری کوالیتیدار',
        description: 'خزمەتگوزاری کوالیتیدار لەگەڵ گرنگیدان بە وردەکاری و ڕەزامەندی کڕیار',
      },
      ar: {
        title: 'خدمة عالية الجودة',
        description: 'خدمات عالية الجودة مع الاهتمام بالتفاصيل ورضا العملاء',
      },
    },
    {
      id: 2,
      icon: 'FaClock',
      en: {
        title: '24/7 Support',
        description: 'Round-the-clock customer support to address your needs anytime',
      },
      ku: {
        title: 'پاڵپشتی ٢٤/٧',
        description: 'پاڵپشتی کڕیار لە هەموو کاتێکدا بۆ چارەسەرکردنی پێداویستییەکانت',
      },
      ar: {
        title: 'دعم على مدار الساعة',
        description: 'دعم العملاء على مدار الساعة لتلبية احتياجاتك في أي وقت',
      },
    },
    {
      id: 3,
      icon: 'FaUsers',
      en: {
        title: 'Expert Team',
        description: 'Highly trained professionals dedicated to excellence',
      },
      ku: {
        title: 'تیمی پسپۆڕ',
        description: 'پسپۆڕانی ڕاهێنراو کە خۆیان تەرخان کردووە بۆ باشترین',
      },
      ar: {
        title: 'فريق خبراء',
        description: 'محترفون مدربون تدريباً عالياً ملتزمون بالتميز',
      },
    },
    {
      id: 4,
      icon: 'FaAward',
      en: {
        title: 'Trusted Brand',
        description: 'Years of experience building trust with our valued customers',
      },
      ku: {
        title: 'براندی متمانەپێکراو',
        description: 'ساڵانێک ئەزموون لە درووستکردنی متمانە لەگەڵ کڕیارە بەنرخەکانمان',
      },
      ar: {
        title: 'علامة تجارية موثوقة',
        description: 'سنوات من الخبرة في بناء الثقة مع عملائنا الكرام',
      },
    },
  ],
  
  branches: [
    {
      id: 1,
      images: ['/images/branch1-1.jpg', '/images/branch1-2.jpg', '/images/branch1-3.jpg'],
      mapLink: 'https://maps.google.com/?q=29.3759,47.9774',
      en: {
        title: 'Main Branch - Kuwait City',
        address: 'Al-Salhiya, Block 5, Building 123',
        phone: '+965 2222 3333',
      },
      ku: {
        title: 'لقی سەرەکی - کوێت سیتی',
        address: 'ساڵحیە، بلۆک ٥، بینا ١٢٣',
        phone: '+965 2222 3333',
      },
      ar: {
        title: 'الفرع الرئيسي - مدينة الكويت',
        address: 'الصالحية، قطعة 5، مبنى 123',
        phone: '+965 2222 3333',
      },
    },
    {
      id: 2,
      images: ['/images/branch2-1.jpg', '/images/branch2-2.jpg'],
      mapLink: 'https://maps.google.com/?q=29.3489,47.9858',
      en: {
        title: 'Hawally Branch',
        address: 'Hawally, Block 2, Street 15',
        phone: '+965 2233 4455',
      },
      ku: {
        title: 'لقی حەوەڵی',
        address: 'حەوەڵی، بلۆک ٢، شەقام ١٥',
        phone: '+965 2233 4455',
      },
      ar: {
        title: 'فرع حولي',
        address: 'حولي، قطعة 2، شارع 15',
        phone: '+965 2233 4455',
      },
    },
    {
      id: 3,
      images: ['/images/branch3-1.jpg'],
      mapLink: 'https://maps.google.com/?q=29.2825,48.0928',
      en: {
        title: 'Salmiya Branch',
        address: 'Salmiya, Salem Al-Mubarak Street',
        phone: '+965 2244 5566',
      },
      ku: {
        title: 'لقی سالمیە',
        address: 'سالمیە، شەقامی سالم موبارەک',
        phone: '+965 2244 5566',
      },
      ar: {
        title: 'فرع السالمية',
        address: 'السالمية، شارع سالم المبارك',
        phone: '+965 2244 5566',
      },
    },
  ],
  
  about: {
    en: {
      title: 'About Our Company',
      description: 'We are a leading provider of quality services, committed to excellence and customer satisfaction. With years of experience and a dedicated team of professionals, we continue to set the standard in our industry.',
      mission: 'To deliver exceptional services that exceed customer expectations while maintaining the highest standards of quality and integrity.',
      vision: 'To be the most trusted and preferred service provider in the region, recognized for innovation, reliability, and customer care.',
      values: 'Excellence, Integrity, Innovation, Customer Focus, Teamwork',
    },
    ku: {
      title: 'دەربارەی کۆمپانیاکەمان',
      description: 'ئێمە پێشڕەوین لە دابینکردنی خزمەتگوزاری کوالیتیدار، خۆمان تەرخان کردووە بۆ باشترین و ڕەزامەندی کڕیار. بە ساڵانێک ئەزموون و تیمێکی تەرخانکراوی پسپۆڕ، بەردەوامین لە دانانی ستانداردەکان لە پیشەسازییەکەماندا.',
      mission: 'دابینکردنی خزمەتگوزارییە تایبەتەکان کە لە چاوەڕوانییەکانی کڕیار تێدەپەڕێت لەگەڵ پاراستنی بەرزترین ستانداردەکانی کوالیتی و دروستی.',
      vision: 'بوون بە متمانەپێکراوترین و پەسەندکراوترین دابینکەری خزمەتگوزاری لە هەرێمدا، ناسراو بە داهێنان، متمانەپێکراوی و گرنگیدان بە کڕیار.',
      values: 'باشترین، دروستی، داهێنان، گرنگیدان بە کڕیار، کاری تیمی',
    },
    ar: {
      title: 'عن شركتنا',
      description: 'نحن مزود رائد للخدمات عالية الجودة، ملتزمون بالتميز ورضا العملاء. مع سنوات من الخبرة وفريق متفاني من المحترفين، نواصل وضع المعايير في صناعتنا.',
      mission: 'تقديم خدمات استثنائية تتجاوز توقعات العملاء مع الحفاظ على أعلى معايير الجودة والنزاهة.',
      vision: 'أن نكون مزود الخدمات الأكثر ثقة وتفضيلاً في المنطقة، معروفين بالابتكار والموثوقية ورعاية العملاء.',
      values: 'التميز، النزاهة، الابتكار، التركيز على العملاء، العمل الجماعي',
    },
  },
  
  socialMedia: [
    {
      id: 1,
      platform: 'Facebook',
      icon: 'FaFacebook',
      url: 'https://facebook.com',
    },
    {
      id: 2,
      platform: 'Instagram',
      icon: 'FaInstagram',
      url: 'https://instagram.com',
    },
    {
      id: 3,
      platform: 'Twitter',
      icon: 'FaTwitter',
      url: 'https://twitter.com',
    },
    {
      id: 4,
      platform: 'LinkedIn',
      icon: 'FaLinkedin',
      url: 'https://linkedin.com',
    },
  ],
  
  seo: {
    en: {
      title: 'Premium Services | Your Company Name',
      description: 'Leading provider of quality services in Kuwait. Excellence, reliability, and customer satisfaction.',
      keywords: 'quality services, Kuwait, premium, professional',
    },
    ku: {
      title: 'خزمەتگوزاری بەرز | ناوی کۆمپانیاکەت',
      description: 'پێشڕەوی دابینکردنی خزمەتگوزاری کوالیتیدار لە کوێت. باشترین، متمانەپێکراوی و ڕەزامەندی کڕیار.',
      keywords: 'خزمەتگوزاری کوالیتیدار، کوێت، بەرز، پسپۆڕ',
    },
    ar: {
      title: 'خدمات متميزة | اسم شركتك',
      description: 'المزود الرائد للخدمات عالية الجودة في الكويت. التميز والموثوقية ورضا العملاء.',
      keywords: 'خدمات عالية الجودة، الكويت، متميز، احترافي',
    },
  },
};
