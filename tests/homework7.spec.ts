import { test, expect, APIRequestContext } from '@playwright/test';

test.describe('FakeStoreAPI Products & Users Endpoints', () => {
  let apiContext: APIRequestContext;
  const baseURL = 'https://fakestoreapi.com';
  let createdProductId: number; 

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL,
    });
  });

  test('GET /products', async () => {
    const response = await apiContext.get('/products');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test('POST /users', async () => {
    const addNewUser = {
      id: 0,
      username: 'Hasmik',
      email: 'test@yopmail.com',
      password: 'Tester@1',
    };

    const response = await apiContext.post('/users', {
      data: addNewUser,
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    console.log('User Created:', body);
  });

  test('GET /users', async () => {
    const response = await apiContext.get('/users');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test('POST /products - Add New Product', async () => {
    const addNewProduct = {
      title: "Stationery",
      price: 0.1,
      description: "Red Pen",
      category: "pen",
      image: "http://example.com"
    };

    const response = await apiContext.post('/products', {
      data: addNewProduct,
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    console.log('Product Created:', body);
    createdProductId = body.id; 
  });

  test('PUT /products/:id - Update Product', async () => {
    const updatedProduct = {
      title: "Stationery - Blue Pen",
      price: 0.15,
      description: "Blue Pen with gel ink",
      category: "pen",
      image: "http://example.com/blue"
    };

    const response = await apiContext.put(`/products/${createdProductId}`, {
      data: updatedProduct,
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    console.log('Product Updated:', body);
  });
});
