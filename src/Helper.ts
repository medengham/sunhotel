"use strict";

import { XMLParser } from "fast-xml-parser";

/**
 * Helper class help you to get informations used in api like destinations or themes.
 * @module Helper
 * @author Mehdi Ait Mouh <aitmouh.mehdi.dev@gmail.com>
 * @version 1.1.2
 */
export class Helper {
  /**
   * @type {string}
   */
  protected userName: string;

  /**
   * @type {string}
   */
  protected password: string;

  /**
   * @type {URLSearchParams}
   */
  protected params: URLSearchParams;

  /**
   * @param {string} userName Username given from api service provider.
   * @param {string} password Password given from api service provider.
   */
  constructor(userName: string, password: string) {
    this.userName = userName;
    this.password = password;
    this.params = new URLSearchParams();
    this.params.set("userName", this.userName);
    this.params.set("password", this.password);
  }

  /**
   * Get all available languagues result from api.
   *
   * @returns {Promise<{count: any, languagues: any}>} Promise contain count result and list of languagues
   */
  public async languagues(): Promise<{ count: any; languagues: any }> {
    return fetch(
      `https://xml.sunhotels.net/15/PostGet/NonStaticXMLAPI.asmx/GetLanguages?${this.params.toString()}`
    )
      .then((response) => {
        return response.text();
      })
      .then((xml) => {
        return new XMLParser().parse(xml);
      })
      .then((data) => {
        if (data.hasOwnProperty("SearchResponse")) {
          throw new Error(data.SearchResponse.ReturnStatus.Exception);
        }
        return {
          count: data.getLanguagesResult.languages.language.length,
          languagues: data.getLanguagesResult.languages.language,
        };
      })
      .catch((reason) => {
        throw new Error(reason);
      });
  }
  /**
   * Get all available features.
   *
   * @param {string} lang languague translation of feature
   *
   * @returns {Promise<{count: any, features: any}>} Promise contain count result and list of features
   */
  public async features(lang: string): Promise<{ count: any; features: any }> {
    this.params.set("language", lang);
    return fetch(
      `https://xml.sunhotels.net/15/PostGet/NonStaticXMLAPI.asmx/GetFeatures?${this.params.toString()}`
    )
      .then((response) => {
        return response.text();
      })
      .then((xml) => {
        return new XMLParser().parse(xml);
      })
      .then((data) => {
        if (data.hasOwnProperty("SearchResponse")) {
          throw new Error(data.SearchResponse.ReturnStatus.Exception);
        }
        return {
          count: data.getFeaturesResult.features.feature.length,
          features: data.getFeaturesResult.features.feature,
        };
      })
      .catch((reason) => {
        throw new Error(reason);
      });
  }
  /**
   * Get all available meals.
   *
   * @param {string} lang languague translation of meals
   *
   * @returns {Promise<{count: any, meals: any}>} Promise contain count result and list of meals
   */
  public async meals(lang: string): Promise<{ count: any; meals: any }> {
    this.params.set("language", lang);
    return fetch(
      `https://xml.sunhotels.net/15/PostGet/NonStaticXMLAPI.asmx/GetMeals?${this.params.toString()}`
    )
      .then((response) => {
        return response.text();
      })
      .then((xml) => {
        return new XMLParser().parse(xml);
      })
      .then((data) => {
        if (data.hasOwnProperty("SearchResponse")) {
          throw new Error(data.SearchResponse.ReturnStatus.Exception);
        }
        return {
          count: data.getMealsResult.meals.meal.length,
          meals: data.getMealsResult.meals.meal,
        };
      })
      .catch((reason) => {
        throw new Error(reason);
      });
  }
  /**
   * Get all possible search destinations.
   *
   * @param {string} lang languague translation
   * @param {string | null} destinationCode
   * @param {string | null} sortBy
   * @param {string | null} sortOrder
   * @param {string | null} exactDestinationMatch
   *
   * @returns {Promise<{count: any, destinations: any}>} Promise contain count result and list of destinations
   */
  public async destinations(
    lang: string,
    destinationCode?: string,
    sortBy?: string,
    sortOrder?: string,
    exactDestinationMatch?: string
  ): Promise<{ count: any; destinations: any }> {
    this.params.set("language", lang);
    this.params.set("destinationCode", destinationCode ?? "");
    this.params.set("sortBy", sortBy ?? "");
    this.params.set("sortOrder", sortOrder ?? "");
    this.params.set("exactDestinationMatch", exactDestinationMatch ?? "");
    return fetch(
      `https://xml.sunhotels.net/15/PostGet/NonStaticXMLAPI.asmx/GetDestinations?${this.params.toString()}`
    )
      .then((response) => {
        return response.text();
      })
      .then((xml) => {
        return new XMLParser().parse(xml);
      })
      .then((data) => {
        if (data.hasOwnProperty("SearchResponse")) {
          throw new Error(data.SearchResponse.ReturnStatus.Exception);
        }
        return {
          count: data.DestinationList.Destinations.Destination.length,
          destinations: data.DestinationList.Destinations.Destination,
        };
      })
      .catch((reason) => {
        throw new Error(reason);
      });
  }
  /**
   * Get all available themes result from api.
   *
   * @returns {Promise<{count: any, themes: any}>} Promise contain count result and list of themes
   */
  public async themes(): Promise<{ count: any; themes: any }> {
    return fetch(
      `https://xml.sunhotels.net/15/PostGet/NonStaticXMLAPI.asmx/GetThemes?${this.params.toString()}`
    )
      .then((response) => {
        return response.text();
      })
      .then((xml) => {
        return new XMLParser().parse(xml);
      })
      .then((data) => {
        if (data.hasOwnProperty("SearchResponse")) {
          throw new Error(data.SearchResponse.ReturnStatus.Exception);
        }
        return {
          count: data.getThemesResult.themes.theme.length,
          themes: data.getThemesResult.themes.theme,
        };
      })
      .catch((reason) => {
        throw new Error(reason);
      });
  }
  /**
   * Get hotel information (name, location, description, images, room types...)
   *
   * @param {lang} lang
   * @param {string} hotelIDs
   *
   * @returns {Promise<any>} Promise contain object of hotel information
   */
  public async hotel(lang: string, hotelIDs: string): Promise<any> {
    this.params.set("language", lang);
    this.params.set("hotelIDs", hotelIDs);
    return fetch(
      `https://xml.sunhotels.net/15/PostGet/NonStaticXMLAPI.asmx/GetStaticHotelsAndRooms?${this.params.toString()}&destination=&resortIDs=&accommodationTypes=&sortBy=&sortOrder=&exactDestinationMatch=`
    )
      .then((response) => {
        return response.text();
      })
      .then((xml) => {
        return new XMLParser().parse(xml);
      })
      .then((data) => {
        if (data.hasOwnProperty("SearchResponse")) {
          throw new Error(data.SearchResponse.ReturnStatus.Exception);
        }
        return data.getStaticHotelsAndRoomsResult.hotels.hotel ?? {};
      })
      .catch((reason) => {
        throw new Error(reason);
      });
  }

  /**
   * Get room types
   *
   * @param {lang} lang
   *
   * @returns {Promise<{ count: number; roomTypes: any }>} Promise contain object of room types
   */
  public async roomTypes(
    lang: string
  ): Promise<{ count: number; roomTypes: any }> {
    this.params.set("language", lang);
    return fetch(
      `https://xml.sunhotels.net/15/PostGet/NonStaticXMLAPI.asmx/GetRoomTypes?${this.params.toString()}`
    )
      .then((response) => {
        return response.text();
      })
      .then((xml) => {
        return new XMLParser().parse(xml);
      })
      .then((data) => {
        if (data.getRoomTypesResult.hasOwnProperty("Error")) {
          throw new Error(data.getRoomTypesResult.Error.Message);
        }
        return {
          count: data.getRoomTypesResult.roomTypes.roomType.length,
          roomTypes: data.getRoomTypesResult.roomTypes.roomType,
        };
      })
      .catch((reason) => {
        throw new Error(reason);
      });
  }
}
