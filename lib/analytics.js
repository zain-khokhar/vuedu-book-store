// Analytics and Performance Monitoring
export const trackEvent = (eventName, properties = {}) => {
  if (typeof window !== 'undefined') {
    // Google Analytics 4 (replace with your tracking ID)
    if (window.gtag) {
      window.gtag('event', eventName, {
        ...properties,
        timestamp: new Date().toISOString()
      });
    }
    
    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', eventName, properties);
    }
  }
};

// Track page views
export const trackPageView = (url, title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_TRACKING_ID', {
      page_title: title,
      page_location: url,
    });
  }
};

// Track book searches
export const trackBookSearch = (searchTerm, results) => {
  trackEvent('book_search', {
    search_term: searchTerm,
    result_count: results,
    category: 'engagement'
  });
};

// Track book views
export const trackBookView = (bookId, bookTitle, courseCode) => {
  trackEvent('book_view', {
    book_id: bookId,
    book_title: bookTitle,
    course_code: courseCode,
    category: 'engagement'
  });
};

// Track orders
export const trackOrder = (orderId, totalAmount, bookCount) => {
  trackEvent('purchase', {
    transaction_id: orderId,
    value: totalAmount,
    currency: 'PKR',
    items: bookCount,
    category: 'ecommerce'
  });
};

// Performance monitoring
export const measurePerformance = (metricName, fn) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const startTime = performance.now();
    const result = fn();
    
    if (result && typeof result.then === 'function') {
      // Handle async functions
      return result.then(res => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        console.log(`Performance: ${metricName} took ${duration.toFixed(2)}ms`);
        trackEvent('performance_metric', {
          metric_name: metricName,
          duration: Math.round(duration),
          category: 'performance'
        });
        
        return res;
      });
    } else {
      // Handle sync functions
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      console.log(`Performance: ${metricName} took ${duration.toFixed(2)}ms`);
      trackEvent('performance_metric', {
        metric_name: metricName,
        duration: Math.round(duration),
        category: 'performance'
      });
      
      return result;
    }
  }
  
  return fn();
};

// Web Vitals monitoring
export const reportWebVitals = (metric) => {
  if (process.env.NODE_ENV === 'production') {
    trackEvent('web_vital', {
      metric_name: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating,
      category: 'web_vitals'
    });
  }
};

// Error tracking
export const trackError = (error, context = {}) => {
  console.error('Application Error:', error);
  
  trackEvent('error', {
    error_message: error.message,
    error_stack: error.stack?.substring(0, 500), // Limit stack trace length
    error_context: JSON.stringify(context),
    category: 'error'
  });
};