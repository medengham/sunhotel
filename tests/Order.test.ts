import { describe, expect, test } from "@jest/globals";
import { Client } from "../src/Client";
import { Book, BookingGetter } from "../src/types";

describe("Test client module", () => {
  const client = new Client("USERNAME", "PASSWORD");

  test("test pre book", async () => {
    const preBook = await client.order
      .preBook({
        currency: "USD",
        language: "en",
        searchPrice: 38,
        checkInDate: "2024-06-01",
        checkOutDate: "2024-06-02",
        email: "aitmouh.mehdi.dev@gmail.com",
        rooms: 1,
        yourRef: "ZERF7832",
        roomId: "176936782",
        mealId: "3",
        adults: 1,
        children: 0,
        infant: 0,
        customerCountry: "FR",
        childrenAges: "",
        hotelId: "",
        roomtypeId: "",
        blockSuperDeal: "0",
        showPriceBreakdown: "",
        B2C: "",
        specialrequest: "",
      })
      .then((resp) => {
        return resp;
      });

    expect(preBook).toMatchObject({
      status: expect.any(Boolean),
      preBookCode: expect.any(String),
      price: expect.any(String),
      notes: expect.any(Array),
      cancellationPolicies: expect.any(Array),
    });
  });

  test("test book", async () => {
    const params: Book = {
      currency: "USD",
      language: "en",
      checkInDate: "2024-06-01",
      checkOutDate: "2024-06-02",
      email: "aitmouh.mehdi.dev@gmail.com",
      rooms: "1",
      roomId: "176936782",
      mealId: "3",
      adults: "1",
      children: "0",
      infant: "0",
      customerCountry: "FR",
      b2c: "",
      specialrequest: "",
      yourRef: "DERF89",
      preBookCode: "84838394f-3324-439-a132-50592450997f",
      customerEmail: "aitmouh.mehdi.dev@gmail.com",
      paymentMethodId: "1",
      creditCardType: "",
      creditCardNumber: "",
      creditCardHolder: "",
      creditCardCVV2: "",
      creditCardExpYear: "",
      creditCardExpMonth: "",
      invoiceRef: "",
      commissionAmountInHotelCurrency: "",
    };

    const guests = [
      {
        type: "adult",
        firstName: "Mehdi",
        lastName: "Ait Mouh",
      },
    ];

    const book = await client.order
      .book(
        {
          currency: "USD",
          language: "en",
          searchPrice: 38,
          checkInDate: "2024-06-01",
          checkOutDate: "2024-06-02",
          email: "aitmouh.mehdi.dev@gmail.com",
          rooms: 1,
          yourRef: "ZERF7832",
          roomId: "176936782",
          mealId: "3",
          adults: 1,
          children: 0,
          infant: 0,
          customerCountry: "FR",
          childrenAges: "",
          hotelId: "",
          roomtypeId: "",
          blockSuperDeal: "0",
          showPriceBreakdown: "",
          B2C: "",
          specialrequest: "",
        },
        guests
      )
      .then((resp) => {
        return resp;
      });

    expect(book).toBeInstanceOf(Object);
  });

  test("test get booking", async () => {
    const params: BookingGetter = {
      language: "en",
      bookingID: "237287",
      reference: "",
      createdDateFrom: "",
      createdDateTo: "",
      arrivalDateFrom: "",
      arrivalDateTo: "",
      showGuests: 0,
    };

    const get = client.order.get(params).then((resp) => {
      return resp;
    });
    expect(get).toBeInstanceOf(Object);
  });

  test("test cancel booking", async () => {
    const cancellation = client.order
      .cancel("3627736", "en")
      .then((resp) => resp);

    expect(cancellation).toBeInstanceOf(Object);
  });
});
