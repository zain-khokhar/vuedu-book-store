import { CATEGORIES, COURSE_CODES } from '../../../lib/constants.js';

export async function GET() {
  try {
    const categoryStats = {};
    
    Object.keys(CATEGORIES).forEach(key => {
      const relatedCourses = COURSE_CODES.filter(code => 
        code.toLowerCase().startsWith(key.toLowerCase())
      );
      
      categoryStats[key] = {
        name: CATEGORIES[key],
        courseCount: relatedCourses.length,
        courses: relatedCourses
      };
    });

    return Response.json({
      success: true,
      data: {
        categories: categoryStats,
        totalCourses: COURSE_CODES.length,
        allCourseCodes: COURSE_CODES
      }
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}