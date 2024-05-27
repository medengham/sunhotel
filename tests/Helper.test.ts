import { describe, expect, test } from "@jest/globals";
import { Client } from "../src/Client";

describe("Test helper module", () => {
  const client = new Client("USERNAME", "PASSWORD");

  test("test get languagues", async () => {
    const languagues = await client.helper.languagues();

    expect(typeof languagues.count).toBe("number");
    expect(typeof languagues.languagues).toBe("object");
  });

  test("test get features", async () => {
    const features = await client.helper.features("en");

    expect(typeof features.count).toBe("number");
    expect(typeof features.features).toBe("object");
  });

  test("test get meals", async () => {
    const meals = await client.helper.meals("fr");

    expect(typeof meals.count).toBe("number");
    expect(typeof meals.meals).toBe("object");
  });

  test("test get destinations", async () => {
    const destinations = await client.helper.destinations("en", "CMN");

    expect(typeof destinations.count).toBe("number");
    expect(typeof destinations.destinations).toBe("object");
  });
});
