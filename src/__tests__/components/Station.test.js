/**
 * @jest-environment jsdom
 */

import {render} from '@testing-library/svelte';
import Station from '../../lib/Station.svelte';
import '@testing-library/jest-dom';

describe('station component', () => {
  const defaultProps = {
    name: 'Rostockgata',
    docks_available: 1,
    bike_available: 2,
    is_renting: true,
    is_returning: true,
    latitude: '59.913',
    longitude: '10.739',
    last_status: 1588292800,
    distance: 100,
    direction: 'N',
    filterBy: null,
  };

  it('should display the station information based on passed props', () => {
    const {getByText, getByTestId} = render(Station, defaultProps);
    expect(getByText(/rostockgata/i)).toBeInTheDocument();
    expect(getByTestId('bikes-available')).toHaveTextContent(2);
    expect(getByTestId('docks-available')).toHaveTextContent(1);
    expect(getByTestId('distance')).toHaveTextContent(100);
  });

  it('should display text when renting is disabled', () => {
    const {getByTestId} = render(Station, {...defaultProps,
      is_renting: false,
    });
    expect(getByTestId('bikes-available')).toHaveClass('is_not_renting');
    expect(getByTestId('renting-or-returning-status')).toBeInTheDocument();
    expect(getByTestId('is-not-renting')).toBeInTheDocument();
  });

  it('should display text when delivery is disabled', () => {
    const {getByTestId} = render(Station, {...defaultProps,
      is_returning: false,
    });
    expect(getByTestId('docks-available')).toHaveClass('is_not_returning');
    expect(getByTestId('renting-or-returning-status')).toBeInTheDocument();
    expect(getByTestId('is-not-returning-2')).toBeInTheDocument();
  });

  it('should display text when renting and delivery is disabled', () => {
    const {getByTestId} = render(Station, {...defaultProps,
      is_renting: false,
      is_returning: false,
    });
    expect(getByTestId('renting-or-returning-status')).toBeInTheDocument();
    expect(getByTestId('is-not-renting')).toBeInTheDocument();
    expect(getByTestId('is-not-returning-1')).toBeInTheDocument();
  });

  it('should convert distance over 1000m to km', () => {
    const {getByTestId} = render(Station, {...defaultProps,
      distance: 1400,
    });
    expect(getByTestId('distance')).toHaveTextContent('1.4 km');
  });
});
