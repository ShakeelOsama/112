const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://wise-book-dea9d4bff7.strapiapp.com";

/**
 * Fetches product data from Strapi API
 * @returns {Promise<Array>} Array of products with their details
 */
export default async function fetchData() {
  try {
    console.log('Fetching all products...');
    
    const res = await fetch(`${API_URL}/api/products?populate[0]=image&populate[1]=category&populate[2]=category.image&pagination[pageSize]=1000`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      next: {
        revalidate: 60 // Cache for 1 minute
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    const products = json?.data || [];

    console.log(`Total products fetched: ${products.length}`);
    
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
