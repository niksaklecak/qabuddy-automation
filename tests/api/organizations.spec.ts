import { test, expect } from "@playwright/test";
import { apiClient } from "../../helpers/apiClient";

test.describe("Organizations API", () => {
  let organizationId: string;

  test.afterEach(async () => {
    // Clean up the created organization after each test to ensure isolation
    if (organizationId) {
      await apiClient.deleteOrganization(organizationId);
    }
  });

  test("should allow a user to create a new organization", async () => {
    const orgName = `Test Org ${Date.now()}`;
    const response = await apiClient.createOrganization(
      orgName,
      "Test Description"
    );

    expect(response.ok()).toBeTruthy();
    const orgData = await response.json();
    expect(orgData.name).toBe(orgName);

    // Set the ID for cleanup
    organizationId = orgData._id;
  });

  test("should allow a user to retrieve a single organization", async () => {
    // Setup: Create an organization to retrieve
    const orgName = `Test Org ${Date.now()}`;
    const createResponse = await apiClient.createOrganization(
      orgName,
      "Test Description"
    );
    const { _id } = await createResponse.json();
    organizationId = _id;

    // Test: Retrieve the organization
    const response = await apiClient.getOrganizationById(organizationId);
    expect(response.ok()).toBeTruthy();
    const orgData = await response.json();
    expect(orgData._id).toBe(organizationId);
    expect(orgData.name).toBe(orgName);
  });

  test("should allow a user to update an organization", async () => {
    // Setup: Create an organization to update
    const orgName = `Test Org ${Date.now()}`;
    const createResponse = await apiClient.createOrganization(
      orgName,
      "Test Description"
    );
    const { _id } = await createResponse.json();
    organizationId = _id;

    // Test: Update the organization
    const updatedName = `${orgName} (Updated)`;
    const response = await apiClient.updateOrganization(
      organizationId,
      updatedName,
      "Updated Desc"
    );
    expect(response.ok()).toBeTruthy();

    // Verify the update
    const getResponse = await apiClient.getOrganizationById(organizationId);
    const orgData = await getResponse.json();
    expect(orgData.name).toBe(updatedName);
  });
});
