import http from "./http";

export const getFilters = async () => {
  const { data } = await http.get(`/filters`);
  return data;
};

// categories

export const getAllCategories = async () => {
  const { data } = await http.get(`/all-categories`);
  return data;
};

export const getHomeCategories = async () => {
  const { data } = await http.get(`/categories`);
  return data;
};
export const getCategoryBySlug = async (category: string) => {
  const { data } = await http.get(`/categories/${category}`);
  return data;
};
export const getProducts = async (params: string) => {
  const { data } = await http.get(`/products${params}`);
  return data;
};
export const getCategorySlugs = async () => {
  const { data } = await http.get(`/categories-slugs`);
  return data;
};
export const getCategoryTitle = async (category: string) => {
  const { data } = await http.get(`/category-title/${category}`);
  return data;
};
// sub Category

export const getSubCategoryTitle = async (subcategory: string) => {
  const { data } = await http.get(`/subcategory-title/${subcategory}`);
  return data;
};
export const getSubCategoryBySlug = async (subcategory: string) => {
  const { data } = await http.get(`/subcategories/${subcategory}`);
  return data;
};
export const getProductsBySubCategory = async (subcategory: string) => {
  const { data } = await http.get(`/subcategory/products/${subcategory}`);
  return data;
};
export const getSubCategorySlugs = async () => {
  const { data } = await http.get(`/subcategories-slugs`);
  return data;
};

// Product
export const getProductSlugs = async () => {
  const { data } = await http.get(`/products-slugs`);
  return data;
};
export const getProductTitle = async (category: string) => {
  const { data } = await http.get(`/category-title/${category}`);
  return data;
};
export const getProductBySlug = async (slug: string) => {
  const { data } = await http.get(`/products/${slug}`);
  return data;
};
export const singleDeleteFile = async (id: string) => {
  const { data } = await http.delete(`/delete-file/${id}`);
  return data;
};
export const addReview = async ({ ...payload }) => {
  const { data } = await http.post(`/reviews`, payload);
  return data;
};
export const getReviewsBySlug = async (pid: string) => {
  const { data } = await http.get(`/reviews/${pid}`);
  return data;
};
export const getReviews = async () => {
  const { data } = await http.get(`/reviews`);
  return data;
};
// order
export const placeOrder = async ({ ...payload }) => {
  const { data } = await http.post(`/orders`, payload);
  return data;
};
export const getBlogs = async () => {
  const { data } = await http.get(`/blogs`);
  return data;
};

export const getHomeBlogs = async () => {
  const { data } = await http.get(`/home/blogs`);
  return data;
};
export const getBlogBySlug = async (slug: string) => {
  const { data } = await http.get(`/blogs/${slug}`);
  return data;
};
export const getSearchFilters = async () => {
  const { data } = await http.get(`/search-filters`);
  return data;
};
export const search = async (query: string) => {
  const { data } = await http.get(`/search?query=${query}`);
  return data;
};
export const sendNewsletter = async ({ ...payload }) => {
  const { data } = await http.post(`/newsletter`, payload);
  return data;
};
