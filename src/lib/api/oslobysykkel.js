import axios from 'axios';

const BASE_URL = 'https://gbfs.urbansharing.com/oslobysykkel.no/';

const self = {
  /**
  * Fetches JSON from the url specified using the supplied opts parameter for optional
  * axios configuration. The method automatically retries failed requests for a maximum
  * 10 attempts within a total time limit of 10 seconds.
  *
  * @param {string} url url to fetch data from
  * @param {Object} opts axios request config <https://github.com/axios/axios#request-config>
  * @param {number} retryAttempts counter to keep track of request retry attempts
  * @private
  * @param {number} timeStarted timestamp in ms for first request attempt
  * @private
  * @return {Promise<Object>} a JSON object from the endpoint
  */
  async fetchData(url, opts = {}, retryAttempts = 0, timeStarted = 0) {
    if (!url || typeof url !== 'string') {
      throw Error(`Provide an URL string as the first argument. You provided: ${url} which is a ${typeof url}`);
    }

    const maxTime = 10 * 1000; // Maximum amount time in ms we should spend on trying to fetch data
    const maxRetryAttempts = 10; // Maximum request attempts

    if (timeStarted === 0) {
      timeStarted = Date.now();
    } else if (Date.now() - timeStarted >= maxTime || retryAttempts >= maxRetryAttempts) {
      throw Error('Did not receive data from endpoint within acceptable time');
    }

    // Merge provided options with default options
    const requestConfig = {...{
      baseURL: BASE_URL,
      headers: {'Client-Identifier': 'haakonranum-demoapp'},
      url,
      method: 'get',
      timeout: 1500,
    }, ...opts};

    try {
      return await axios.request(requestConfig);
    } catch (err) {
      retryAttempts = retryAttempts + 1;
      return await self.fetchData(url, opts, retryAttempts, timeStarted);
    }
  },

  /**
  * Store something in localStorage with a expiry set from Date.now() + ttl in ms.
  *
  * @param {string} key
  * @param {Object} data
  * @param {number} ttl how long in ms that the item will exist before being invalidated
  * @return {void}
  */
  writeCache(key, data, ttl) {
    const cache = {
      ttl,
      data,
    };
    localStorage.setItem(key, JSON.stringify(cache));
  },

  /**
  * Retrieve an cached item from localStorage if not expired. Otherwise it returns null.
  *
  * @param {string} key
  * @return {Array<{}>|null} The Object, or null if the 'ttl' property is less than Date.now()
  */
  readCache(key) {
    const cache = JSON.parse(localStorage.getItem(key));
    if (cache && cache.ttl > Date.now()) {
      return cache.data;
    }
    return null;
  },

  /**
  * Get station information from <https://gbfs.urbansharing.com/oslobysykkel.no/system_information.json>
  * The method will return a cached response if the previous request was fetched less than 5 minutes ago.
  *
  * @return {Promise<Array<{
  *   station_id: string,
  *   name: string,
  *   address: string,
  *   lat: number,
  *   lon: number,
  *   capacity: number
  * }>>}
  */
  async getStationInformation() {
    const cacheKey = 'station_information';
    const ttl = Date.now() + (5 * 60 * 1000);
    const stationCache = self.readCache(cacheKey);
    if (!stationCache) {
      const stations = await self.fetchData('station_information.json');
      if (stations && stations.data && stations.data.data && Array.isArray(stations.data.data.stations)) {
        self.writeCache(cacheKey, stations.data.data.stations, ttl);
        return stations.data.data.stations;
      } else {
        throw Error('Unexpected response from service endpoint');
      }
    }
    return stationCache;
  },

  /**
  * Get station status from <https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json>
  * The method will return a cached response if the last response was fetched less than 10 seconds ago.
  *
  * @return {Promise<Array<{
  *  is_installed: number,
  *  is_renting: number,
  *  num_bikes_available: number,
  *  num_docks_available: number,
  *  last_reported: number,
  *  is_returning: number,
  *  station_id: string
  * }>>}
  */
  async getStationStatuses() {
    const lastUpdatedModifier = 10;
    const cacheKey = 'station_status';
    const stationStatusCache = self.readCache(cacheKey);
    if (!stationStatusCache) {
      const stationStatuses = await self.fetchData('station_status.json');
      if (stationStatuses && stationStatuses.data && stationStatuses.data.data &&
          Array.isArray(stationStatuses.data.data.stations)) {
        const lastUpdated = new Date().getTime() / 1000;
        const ttl = (lastUpdated + lastUpdatedModifier) * 1000;
        self.writeCache(cacheKey, stationStatuses.data.data.stations, ttl);
        return stationStatuses.data.data.stations;
      } else {
        throw Error('Unexpected response from service endpoint');
      }
    }

    return stationStatusCache;
  },

  /**
  * Returns an array of stations with includes both station information and station status.
  *
  * @return {Promise<Array<{
  *  name: string,
  *  address: string,
  *  lat: number,
  *  lon: number,
  *  capacity: number,
  *  station_id: string,
  *  status: Array<{
  *     station_id: string,
  *     is_installed: number,
  *     is_renting: number,
  *     num_bikes_available: number,
  *     num_docks_available: number,
  *     is_returning: number,
  *     last_reported: number}>
  * }>>}
  */
  async getStationData() {
    const stations = [];
    // Get all the station information
    const stationInformation = await self.getStationInformation();

    stationInformation.forEach((si) => {
      stations.push(si);
    });

    const stationStatuses = await self.getStationStatuses();

    stationStatuses.forEach((ss) => {
      const stationIndex = stationInformation.findIndex((si) => si.station_id === ss.station_id);
      const station = stations[stationIndex];
      if (station.status && stations.status.last_reported === ss.last_reported) {
        return; // Status has not changed. Continue to next station.
      } else {
        stations[stationIndex] = {...stations[stationIndex], status: ss};
      }
    });

    return stations;
  },
};

export default self;
