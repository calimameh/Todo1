export const api = {
  get: async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  },
  post: async (url: string, data: any) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  },
};

**C. Create API Hooks:**