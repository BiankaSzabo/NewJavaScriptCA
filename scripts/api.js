export const getProducts = async () => {
  try {
    const response = await fetch('https://v2.api.noroff.dev/rainy-days');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}

export const getUniqueProduct = async (id) => {
  try {
    const response = await fetch(`https://v2.api.noroff.dev/rainy-days/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}