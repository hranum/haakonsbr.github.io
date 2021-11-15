import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import oslobysykkel from '../../lib/api/oslobysykkel';
import stationInformation from '../../__fixtures__/station_information.json';
import stationStatus from '../../__fixtures__/station_status.json';
const {performance} = require('perf_hooks');

let mock;

beforeEach(() => {
  mock = new MockAdapter(axios);
});

describe('fetchData', () => {
  it('should attempt to fetch data a maximum of 10 times within 10 seconds', async () => {
    const start = performance.now();

    mock = new MockAdapter(axios, {delayResponse: 1000});
    mock.onGet(`station_information.json`).reply(500, stationInformation);

    const result = oslobysykkel.fetchData('station_information.json');
    await expect(result).rejects.toThrow();

    expect(mock.history.get.length).toBeLessThanOrEqual(10);
    expect(mock.history.get[0].url).toEqual(`station_information.json`);

    const end = performance.now();
    expect(start - end).toBeLessThanOrEqual(11000);

    mock = new MockAdapter(axios);
  }, 12 * 1000);
});

describe('getStationInformation', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    mock.reset();
  });

  it('should return a list of stations and check localStorage first', async () => {
    mock.onGet(`station_information.json`).reply(200, stationInformation);
    const spy = jest.spyOn(oslobysykkel, 'readCache');
    const result = await oslobysykkel.getStationInformation();
    expect(spy).toHaveBeenCalledWith('station_information');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(stationInformation.data.stations);
  });

  it('should store the stations in localStorage before returning', async () => {
    mock.onGet(`station_information.json`).reply(200, stationInformation);
    const spy = jest.spyOn(oslobysykkel, 'writeCache');
    const result = await oslobysykkel.getStationInformation();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('station_information', stationInformation.data.stations, expect.any(Number));
    expect(result).toEqual(stationInformation.data.stations);
  });
});

describe('getStationStatuses', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    mock.reset();
  });

  it('should return a list of station statuses and check localStorage first', async () => {
    mock.onGet(`station_status.json`).reply(200, stationStatus);
    const spy = jest.spyOn(oslobysykkel, 'readCache');
    const result = await oslobysykkel.getStationStatuses();
    expect(spy).toHaveBeenCalledWith('station_status');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(stationStatus.data.stations);
  });

  it('should store the station statuses in localStorage before returning', async () => {
    mock.onGet(`station_status.json`).reply(200, stationStatus);
    const spy = jest.spyOn(oslobysykkel, 'writeCache');
    const result = await oslobysykkel.getStationStatuses();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('station_status', stationStatus.data.stations, expect.any(Number));
    expect(result).toEqual(stationStatus.data.stations);
  });

  it('should use localStorage for stationStatus instead of new request when TTL is within timeframe', async () => {
    mock.onGet(`station_status.json`).reply(200, stationStatus);
    const result = await oslobysykkel.getStationStatuses();

    // Check that localStorage was used to store the data
    expect(localStorage.getItem).toHaveBeenCalledWith('station_status');
    const store = JSON.parse(localStorage.__STORE__['station_status']);
    expect(store.data).toEqual(stationStatus.data.stations);

    // Check that the TTL was used to determine if the data was stale or not
    await oslobysykkel.getStationStatuses();
    await oslobysykkel.getStationStatuses();
    expect(mock.history.get.length).toEqual(1);

    // Clear the localStorage and check that the data was fetched again
    localStorage.clear();
    await oslobysykkel.getStationStatuses();
    expect(mock.history.get.length).toEqual(2);

    expect(result).toEqual(stationStatus.data.stations);
  });

  it('should use localStorage for stationInformation instead of new request when TTL is within timeframe', async () => {
    mock.onGet(`station_information.json`).reply(200, stationInformation);
    const result = await oslobysykkel.getStationInformation();

    // Check that localStorage was used to store the data
    expect(localStorage.getItem).toHaveBeenCalledWith('station_information');
    const store = JSON.parse(localStorage.__STORE__['station_information']);
    expect(store.data).toEqual(stationInformation.data.stations);

    // Check that the TTL was used to determine if the data was stale or not
    await oslobysykkel.getStationInformation();
    await oslobysykkel.getStationInformation();
    expect(mock.history.get.length).toEqual(1);

    // Clear the localStorage and check that the data was fetched again
    localStorage.clear();
    await oslobysykkel.getStationInformation();
    expect(mock.history.get.length).toEqual(2);

    expect(result).toEqual(stationInformation.data.stations);
  });
});

describe('getStationData', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    mock.reset();
  });

  it('should return a list of stations where status and information is merged', async () => {
    mock.onGet(`station_status.json`).reply(200, stationStatus);
    mock.onGet(`station_information.json`).reply(200, stationInformation);
    const spy1 = jest.spyOn(oslobysykkel, 'getStationStatuses');
    const spy2 = jest.spyOn(oslobysykkel, 'getStationInformation');

    const result = await oslobysykkel.getStationData();
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);

    expect(result[0]).toContainAllKeys(
        [
          'station_id',
          'name',
          'address',
          'rental_uris',
          'lat',
          'lon',
          'capacity',
          'status',
        ],
    );

    expect(result[0].status).toContainAllKeys(
        [
          'station_id',
          'is_installed',
          'is_renting',
          'num_bikes_available',
          'num_docks_available',
          'last_reported',
          'is_returning',
        ],
    );
  });
});
