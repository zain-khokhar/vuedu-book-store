const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzYzMDA4ZDkyMmY0YTQ4OTFkOWMyODRkNiIsImlhdCI6MTczNDU1NDkwMSwiZXhwIjoxNzM1MTU5NzAxfQ.2W5V0VfJU6BoKdYfKzrIrZpNVB8OVjP3D7dv3d8AeDM";

const testData = [{
  title: "Test Book",
  author: "Test Author", 
  isbn: "123456789",
  price: 299,
  description: "Test description",
  category: "Fiction",
  stock: 10
}];

async function testBulkUpload() {
  try {
    console.log("Testing bulk upload with token:", token.substring(0, 20) + "...");
    
    const response = await fetch("http://localhost:3000/api/books/bulk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(testData)
    });
    
    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));
    
    const data = await response.text();
    console.log("Response body:", data);
    
  } catch (error) {
    console.error("Error:", error);
  }
}

testBulkUpload();