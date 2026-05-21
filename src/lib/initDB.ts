import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import WebsiteContent from '@/models/WebsiteContent';

/**
 * Initialize database with default admin user and content
 * This should be run once when setting up the application
 */
export async function initializeDatabase() {
  try {
    await connectDB();

    // Check if admin user exists
    const adminExists = await User.findOne({ username: 'admin' });

    if (!adminExists) {
      // Create default admin user
      const admin = await User.create({
        username: 'admin',
        email: 'admin@sweetplatform.com',
        password: process.env.ADMIN_DEFAULT_PASSWORD || 'admin123',
        role: 'admin',
        isActive: true,
      });

      console.log('✅ Default admin user created:', admin.username);
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Check if website content exists
    const contentExists = await WebsiteContent.findOne();

    if (!contentExists) {
      // Create default website content
      const content = await WebsiteContent.create({
        hero: {
          title: {
            en: 'Excellence in Every Service',
            ku: 'باشترین لە هەموو خزمەتگوزارییەکدا',
            ar: 'التميز في كل خدمة',
          },
          subtitle: {
            en: 'Your trusted partner for quality solutions across the region',
            ku: 'هاوبەشی متمانەپێکراوت بۆ چارەسەرە کوالیتیدارەکان لە سەرانسەری هەرێمدا',
            ar: 'شريكك الموثوق للحلول عالية الجودة عبر المنطقة',
          },
          backgroundImage: '',
          videoUrl: '',
        },
        services: [
          {
            id: '1',
            icon: 'FaHandHoldingHeart',
            title: {
              en: 'Quality Service',
              ku: 'خزمەتگوزاری کوالیتیدار',
              ar: 'خدمة عالية الجودة',
            },
            description: {
              en: 'Premium quality services with attention to detail',
              ku: 'خزمەتگوزاری کوالیتیدار لەگەڵ گرنگیدان بە وردەکاری',
              ar: 'خدمات عالية الجودة مع الاهتمام بالتفاصيل',
            },
            order: 1,
            isActive: true,
          },
          {
            id: '2',
            icon: 'FaClock',
            title: {
              en: '24/7 Support',
              ku: 'پاڵپشتی ٢٤/٧',
              ar: 'دعم على مدار الساعة',
            },
            description: {
              en: 'Round-the-clock customer support',
              ku: 'پاڵپشتی کڕیار لە هەموو کاتێکدا',
              ar: 'دعم العملاء على مدار الساعة',
            },
            order: 2,
            isActive: true,
          },
        ],
        branches: [],
        about: {
          title: {
            en: 'About Our Company',
            ku: 'دەربارەی کۆمپانیاکەمان',
            ar: 'عن شركتنا',
          },
          description: {
            en: 'We are a leading provider of quality services, committed to excellence.',
            ku: 'ئێمە پێشڕەوین لە دابینکردنی خزمەتگوزاری کوالیتیدار.',
            ar: 'نحن مزود رائد للخدمات عالية الجودة.',
          },
          mission: {
            en: 'To deliver exceptional services that exceed customer expectations.',
            ku: 'دابینکردنی خزمەتگوزارییە تایبەتەکان.',
            ar: 'تقديم خدمات استثنائية تتجاوز توقعات العملاء.',
          },
          vision: {
            en: 'To be the most trusted service provider in the region.',
            ku: 'بوون بە متمانەپێکراوترین دابینکەری خزمەتگوزاری لە هەرێمدا.',
            ar: 'أن نكون مزود الخدمات الأكثر ثقة في المنطقة.',
          },
          values: {
            en: 'Excellence, Integrity, Innovation, Customer Focus',
            ku: 'باشترین، دروستی، داهێنان، گرنگیدان بە کڕیار',
            ar: 'التميز، النزاهة، الابتكار، التركيز على العملاء',
          },
        },
        socialMedia: [
          {
            id: '1',
            platform: 'Facebook',
            icon: 'FaFacebook',
            url: 'https://facebook.com',
            order: 1,
            isActive: true,
          },
          {
            id: '2',
            platform: 'Instagram',
            icon: 'FaInstagram',
            url: 'https://instagram.com',
            order: 2,
            isActive: true,
          },
        ],
        seo: {
          title: {
            en: 'Premium Services | Your Company Name',
            ku: 'خزمەتگوزاری بەرز | ناوی کۆمپانیاکەت',
            ar: 'خدمات متميزة | اسم شركتك',
          },
          description: {
            en: 'Leading provider of quality services. Excellence, reliability, and customer satisfaction.',
            ku: 'پێشڕەوی دابینکردنی خزمەتگوزاری کوالیتیدار.',
            ar: 'المزود الرائد للخدمات عالية الجودة.',
          },
          keywords: {
            en: 'quality services, premium, professional',
            ku: 'خزمەتگوزاری کوالیتیدار، بەرز، پسپۆڕ',
            ar: 'خدمات عالية الجودة، متميز، احترافي',
          },
        },
      });

      console.log('✅ Default website content created');
    } else {
      console.log('ℹ️  Website content already exists');
    }

    console.log('✅ Database initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
}

// Run this script with: npm run db:init
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('Database initialization complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database initialization failed:', error);
      process.exit(1);
    });
}
