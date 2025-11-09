# VUEDU BOOK BANK - Bulk Upload JSON Format

## Example JSON Structure for Bulk Book Upload

When using the bulk upload feature, you need to provide a JSON array containing book objects. Each book object should follow this structure:

### Required Fields

- `title` (string): The book title
- `courseCode` (string): VU course code in lowercase (e.g., "cs101", "mth201")
- `price` (number): Price in Pakistani Rupees
- `description` (string): Detailed description of the book
- `condition` (string): One of "new", "like-new", "good", "fair"

### Optional Fields

- `author` (string): Author name
- `edition` (string): Edition information
- `isbn` (string): ISBN number
- `semester` (string): Semester information
- `tags` (array): Array of relevant tags

### Example JSON

```json
[
  {
    "title": "Introduction to Computer Science",
    "courseCode": "cs101",
    "price": 1500,
    "description": "Comprehensive textbook covering fundamentals of computer science. Excellent condition with minimal highlighting. Perfect for CS101 students.",
    "condition": "good",
    "author": "John Smith",
    "edition": "5th Edition",
    "isbn": "978-0123456789",
    "semester": "Fall 2024",
    "tags": ["programming", "computer science", "textbook"]
  },
  {
    "title": "Mathematics for Computer Science",
    "courseCode": "mth101",
    "price": 1200,
    "description": "Essential mathematics concepts for computer science students. Clean pages with no markings. Includes all chapters and exercises.",
    "condition": "like-new",
    "author": "Jane Doe",
    "edition": "3rd Edition",
    "isbn": "978-0987654321",
    "semester": "Spring 2024",
    "tags": ["mathematics", "algorithms", "discrete math"]
  }
]
```

### Course Code Categories

The system supports the following course categories:

- **CS**: Computer Science (cs101, cs201, etc.)
- **MGT**: Management Sciences (mgt101, mgt201, etc.)
- **MTH**: Mathematics (mth101, mth201, etc.)
- **EDU**: Education (edu101, edu201, etc.)
- **ENG**: English (eng101, eng201, etc.)
- **ECO**: Economics (eco101, eco201, etc.)
- **PSY**: Psychology (psy101, psy201, etc.)
- And many more...

### Upload Limits

- Maximum 200 books per upload
- Each course code must be valid VU course code
- All required fields must be present
- Price must be a positive number

### Tips for Success

1. Validate your JSON before uploading using online JSON validators
2. Ensure all course codes are in lowercase
3. Provide detailed descriptions to attract buyers
4. Use relevant tags to improve searchability
5. Be honest about book condition

### Common Errors

- **Invalid JSON format**: Check for missing commas, brackets, or quotes
- **Missing required fields**: Ensure all required fields are present
- **Invalid course codes**: Only VU course codes are accepted
- **Invalid condition**: Must be one of: new, like-new, good, fair
- **Invalid price**: Must be a positive number