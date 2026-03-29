class userServices {
  static async login(data: any) {
    try {
      const response = await fetch("/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}
export { userServices };
