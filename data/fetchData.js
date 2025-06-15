const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://wise-book-dea9d4bff7.strapiapp.com";

/**
 * Transform image URLs to absolute URLs
 */
function transformImageUrls(product) {
  if (product.attributes?.image?.data) {
    const imageData = product.attributes.image.data;
    if (Array.isArray(imageData)) {
      imageData.forEach(img => {
        if (img.attributes?.url) {
          img.attributes.url = img.attributes.url.startsWith('http') 
            ? img.attributes.url 
            : `${API_URL}${img.attributes.url}`;
          
          // Transform formats URLs
          if (img.attributes.formats) {
            Object.keys(img.attributes.formats).forEach(format => {
              if (img.attributes.formats[format].url) {
                img.attributes.formats[format].url = img.attributes.formats[format].url.startsWith('http')
                  ? img.attributes.formats[format].url
                  : `${API_URL}${img.attributes.formats[format].url}`;
              }
            });
          }
        }
      });
    } else if (imageData.attributes?.url) {
      imageData.attributes.url = imageData.attributes.url.startsWith('http')
        ? imageData.attributes.url
        : `${API_URL}${imageData.attributes.url}`;
      
      // Transform formats URLs
      if (imageData.attributes.formats) {
        Object.keys(imageData.attributes.formats).forEach(format => {
          if (imageData.attributes.formats[format].url) {
            imageData.attributes.formats[format].url = imageData.attributes.formats[format].url.startsWith('http')
              ? imageData.attributes.formats[format].url
              : `${API_URL}${imageData.attributes.formats[format].url}`;
          }
        });
      }
    }
  }
  return product;
}

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

    // Transform image URLs to absolute URLs
    const transformedProducts = products.map(product => transformImageUrls(product));

    console.log(`Total products fetched: ${transformedProducts.length}`);
    
    return transformedProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
