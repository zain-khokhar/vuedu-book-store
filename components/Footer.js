import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const vuEduLinks = [
    { title: 'Blogs', url: 'https://vuedu.dev/blogs' },
    { title: 'Online Quiz', url: 'https://vuedu.dev/quiz' },
    { title: 'Past Papers', url: 'https://vuedu.dev/past-papers' },
    { title: 'Study Material', url: 'https://vuedu.dev/study-material' },
    { title: 'VU Community', url: 'https://vuedu.dev/community' },
  ];

  const bookStoreLinks = [
    { title: 'Browse Books', url: '/books' },
    { title: 'Sell Books', url: '/seller' },
    { title: 'How it Works', url: '/how-it-works' },
    { title: 'FAQ', url: '/faq' },
  ];

  const supportLinks = [
    { title: 'Contact Us', url: '/contact' },
    { title: 'Terms of Service', url: '/terms' },
    { title: 'Privacy Policy', url: '/privacy' },
    { title: 'Help Center', url: '/help' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VU</span>
              </div>
              <span className="text-xl font-bold">VUEDU BOOK BANK</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Connecting Virtual University students across Pakistan. Buy and sell hardcopy books for all VU subjects.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://vuedu.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Visit VUEDU</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* VUEDU Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              VUEDU Resources
            </h3>
            <ul className="space-y-2">
              {vuEduLinks.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Book Store Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Book Store
            </h3>
            <ul className="space-y-2">
              {bookStoreLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.url}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.url}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} VUEDU BOOK BANK. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 sm:mt-0">
            Made with ❤️ for VU Students
          </p>
        </div>
      </div>
    </footer>
  );
}