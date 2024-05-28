import { describe, expect, test } from "@jest/globals";
import { Client } from "../src/Client";
import { Parameters } from "../src/types";

describe("Test client module", () => {
  const client = new Client("USERNAME", "PASSWORD"),
    params: Parameters = {
      destinationID: 244,
      checkInDate: "2024-07-12",
      checkOutDate: "2024-07-13",
      numberOfAdults: 1,
      numberOfRooms: 1,
      numberOfChildren: 0,
      accommodationTypes: "Hotel",
      CustomerCountry: "FR",
      currencies: "USD",
      language: "EN",
    };

  test("test get availables hotels", async () => {
    const hotels = await client.get(params);

    expect(typeof hotels.count).toBe("number");
    expect(typeof hotels.hotels).toBe("object");
  });

  test("test get availables hotel by id", async () => {
    params.hotelIDs = "199899";

    const hotels = await client.get(params);

    expect(typeof hotels.count).toBe("number");
    expect(typeof hotels.hotels).toBe("object");
  });
});
