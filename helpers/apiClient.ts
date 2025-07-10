import { APIRequestContext, request, APIResponse } from "@playwright/test";
import { config } from "./config";

class ApiClient {
  private api: APIRequestContext | null = null;
  private token: string | null = null;

  private async getApiContext(): Promise<APIRequestContext> {
    if (this.api) {
      return this.api;
    }
    this.api = await request.newContext({
      baseURL: config.qabuddyApiBaseUrl,
    });
    return this.api;
  }

  private async login(): Promise<void> {
    if (this.token) return;

    const api = await this.getApiContext();
    const response = await api.post("/auth/login", {
      data: {
        email: config.qabuddyEmail,
        password: config.qabuddyPassword,
      },
    });

    const body = await response.json();
    this.token = body.token;
  }

  private async getHeaders(
    additionalHeaders: Record<string, string> = {}
  ): Promise<Record<string, string>> {
    await this.login();
    return {
      ...additionalHeaders,
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  // --- Organizations ---
  async getOrganizations(): Promise<APIResponse> {
    const api = await this.getApiContext();
    return api.get("/organizations", { headers: await this.getHeaders() });
  }

  async getOrganizationById(id: string): Promise<APIResponse> {
    const api = await this.getApiContext();
    return api.get(`/organizations/${id}`, {
      headers: await this.getHeaders(),
    });
  }

  async createOrganization(
    name: string,
    description: string
  ): Promise<APIResponse> {
    const api = await this.getApiContext();
    return api.post("/organizations", {
      data: { name, description },
      headers: await this.getHeaders(),
    });
  }

  async updateOrganization(
    id: string,
    name: string,
    description: string
  ): Promise<APIResponse> {
    const api = await this.getApiContext();
    return api.put(`/organizations/${id}`, {
      data: { name, description },
      headers: await this.getHeaders(),
    });
  }

  async deleteOrganization(id: string): Promise<APIResponse> {
    const api = await this.getApiContext();
    return api.delete(`/organizations/${id}`, {
      headers: await this.getHeaders(),
    });
  }

  // --- Projects ---
  async createProject(
    name: string,
    description: string,
    organizationId: string
  ): Promise<APIResponse> {
    const api = await this.getApiContext();
    return api.post("/projects", {
      data: { name, description, organizationId },
      headers: await this.getHeaders(),
    });
  }

  async getProjectById(id: string): Promise<APIResponse> {
    const api = await this.getApiContext();
    return api.get(`/projects/${id}`, { headers: await this.getHeaders() });
  }

  async updateProject(
    id: string,
    name: string,
    description: string
  ): Promise<APIResponse> {
    const api = await this.getApiContext();
    return api.put(`/projects/${id}`, {
      data: { name, description },
      headers: await this.getHeaders(),
    });
  }

  async deleteProject(id: string): Promise<APIResponse> {
    const api = await this.getApiContext();
    return api.delete(`/projects/${id}`, { headers: await this.getHeaders() });
  }
}

export const apiClient = new ApiClient();
