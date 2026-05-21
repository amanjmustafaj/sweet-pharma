import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import WebsiteContent from '@/models/WebsiteContent';
import { relaxedRateLimit } from '@/middleware/rateLimit';

export async function GET(request: NextRequest) {
  return relaxedRateLimit(request, async (req) => {
    try {
      await connectDB();

      // Get the latest website content
      let content = await WebsiteContent.findOne().sort({ updatedAt: -1 });

      // If no content exists, create default content
      if (!content) {
        content = await WebsiteContent.create({
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
          services: [],
          branches: [],
          about: {
            title: {
              en: 'About Our Company',
              ku: 'دەربارەی کۆمپانیاکەمان',
              ar: 'عن شركتنا',
            },
            description: {
              en: 'We are a leading provider of quality services.',
              ku: 'ئێمە پێشڕەوین لە دابینکردنی خزمەتگوزاری کوالیتیدار.',
              ar: 'نحن مزود رائد للخدمات عالية الجودة.',
            },
            mission: {
              en: 'To deliver exceptional services.',
              ku: 'دابینکردنی خزمەتگوزارییە تایبەتەکان.',
              ar: 'تقديم خدمات استثنائية.',
            },
            vision: {
              en: 'To be the most trusted service provider.',
              ku: 'بوون بە متمانەپێکراوترین دابینکەری خزمەتگوزاری.',
              ar: 'أن نكون مزود الخدمات الأكثر ثقة.',
            },
            values: {
              en: 'Excellence, Integrity, Innovation',
              ku: 'باشترین، دروستی، داهێنان',
              ar: 'التميز، النزاهة، الابتكار',
            },
          },
          socialMedia: [],
          seo: {
            title: {
              en: 'Premium Services | Your Company',
              ku: 'خزمەتگوزاری بەرز | کۆمپانیاکەت',
              ar: 'خدمات متميزة | شركتك',
            },
            description: {
              en: 'Leading provider of quality services.',
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
      }

      return NextResponse.json(
        { success: true, data: content },
        { status: 200 }
      );
    } catch (error) {
      console.error('Get website content error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  });
}
