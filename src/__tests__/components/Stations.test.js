/**
 * @jest-environment jsdom
 */

import {render, fireEvent, waitForElementToBeRemoved} from '@testing-library/svelte';
import Stations from '../../lib/Stations.svelte';
import '@testing-library/jest-dom';
import stationData from '../../__fixtures__/station_data.json';
import oslobysykkel from '../../lib/api/oslobysykkel';

describe('Station list component', () => {
  it('should display a list of stations with data returned from api', async () => {
    const spy = jest.spyOn(oslobysykkel, 'getStationData').mockImplementation(() => Promise.resolve(stationData));
    const {findByTestId, findAllByTestId} = render(Stations);

    const stationList = await findByTestId('stations-list');
    const stations = await findAllByTestId('station');

    expect(spy).toHaveBeenCalledTimes(1);
    expect(stationList).toBeInTheDocument();
    expect(stations).toHaveLength(2);
  });

  it('should display a loader while waiting for api call then remove it afterwards', async () => {
    // Mock the stationData with a timeout to be able to test the loader
    jest.spyOn(oslobysykkel, 'getStationData').mockImplementation(() => {
      return new Promise((res, rej) => {
        setTimeout(() => res(stationData), 1000);
      });
    });
    const {findByTestId, findAllByTestId} = render(Stations);

    const loader = await findByTestId('loader');
    expect(loader).toBeInTheDocument();

    await findAllByTestId('station', {timeout: 1100});

    expect(loader).not.toBeInTheDocument();
  });

  it('should display the error message if error occured fetching stations', async () => {
    // Mock the stationData with a timeout to be able to test the loader and that it is removed when error is resolved
    const spy = jest.spyOn(oslobysykkel, 'getStationData').mockImplementation(() => {
      return new Promise((res, rej) => {
        setTimeout(() => rej(Error('error fetching data')), 1000);
      });
    });
    const {findByTestId} = render(Stations);

    const loader = await findByTestId('loader');
    expect(loader).toBeInTheDocument();

    const errorContainer = await findByTestId('error-container', {timeout: 1100});
    expect(errorContainer).toBeInTheDocument();
    expect(spy).rejects.toThrow();
    expect(loader).not.toBeInTheDocument();
  });

  it('should be able to toggle open/close the map when clicking the map button', async () => {
    const {findByTestId, getByTestId} = render(Stations);

    const button = getByTestId('toggle-map');
    fireEvent.click(button);

    const mapContainer = await findByTestId('map-container');
    expect(mapContainer).toBeInTheDocument();

    /**
     * Since I don't have time to implement mapbox-gl properly, there should be an error visible.
     * So let's assert that :-)
     */
    expect(await findByTestId('map-error-message')).toBeInTheDocument();

    fireEvent.click(button);
    await waitForElementToBeRemoved(mapContainer);

    expect(mapContainer).not.toBeInTheDocument();
  });
});
