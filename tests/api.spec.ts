import { test, expect } from "./fixtures/qabuddy-test";

test("api login works", async ({ request }) => {
  const response = await request.post(
    `${process.env.API_BASE_URL}/auth/login`,
    {
      data: {
        email: process.env.TEST_USER_EMAIL,
        password: process.env.TEST_USER_PASSWORD,
      },
    }
  );

  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty("token");
});
