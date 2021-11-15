<script>
  import {onMount} from 'svelte';
  import {getRhumbLineBearing, getDistance} from 'geolib';
  import oslobysykkel from './api/oslobysykkel';
  import {slide} from 'svelte/transition';
  import {quintOut} from 'svelte/easing';

  /* Image assets */
  import oops from '../assets/oops.png';
  import loader from '../assets/bike-loader.gif';

  /* Components */
  import Station from './Station.svelte';
  import Map from './Map.svelte'

  let errorMessages = [
    {
      type: 'generic',
      message: 'Ojsann her skjedde det en feil. Last inn siden på nytt. Hvis det ikke hjelper ...',
    },
    {
      message: 'Ojsann, det skjedde en feil ved innhenting av sykler og stativer. Vi prøver igjen straks!',
    }
  ]
  
  let overrideDevicePosition = false; // When simulating position this will be set to true
  let toggleError = false; // When simulating API unavailability this will be set to true

  let updatePositionInterval;
  let updateStationsInterval;

  /* Too keep track of device location. Initialized with default points to provide a 
   * position when location is unavailable. */
  let _latitude = 59.922883; 
  let _longitude = 10.758241;
  
  let error;
  let positionError;
  
  let filterBy; // Will be either 'docks' or 'bikes' and passed on to the Station component

  let stations = []; // raw array from api response
  
  // fork the stations array with direction and distance information
  $: mappedStations = stations.length > 0 ? stations.map((station) => {
      const coordinates = [
        {latitude: _latitude, longitude: _longitude},
        {latitude: station.lat, longitude: station.lon},
      ];
      try {
        station.distance = getDistance(...coordinates);
        station.direction = getRhumbLineBearing(...coordinates);
      } catch (e) {
        // @todo implement log metrics
        // silent error, keep the station without calculating distance and direction from user
      } finally {
        return station;
      }
    }) : [];

    let showMap = false;

  /**
   * If user has accepted location sharing the position will be set from the coordinates
   * of the current location.
   * @return {void}
   */
  const updatePosition = () => {
    if (!overrideDevicePosition) {
      try {
        navigator.geolocation.getCurrentPosition((position) => {
          positionError = null;
          _latitude = position.coords.latitude;
          _longitude = position.coords.longitude;
        }, (e) => {
          if (e.message === 'User denied Geolocation') {
            positionError = `Vi får desverre ikke vist deg de nærmeste stasjonene fordi du ikke har 
              godkjent at vi kan se din posisjon! Her får du likevel se alle stasjoner med utgangspunkt fra Olaf Ryes Plass!`
          } else {
            // @todo implement log metrics to identify possibly new error messages to handle
          }
        });
      } catch (e) {
        // @todo implement log metrics
        //error = errorMessages[0].message;
      }
    }
  };

  /**
   * Incrementally changes the percieved latitude and longitude of the device towards the parameters
   * given over a period N seconds.
   * 
   * @param {number} latitude
   * @param {number} longitude
   * @return {void}
   */
  const goToPosition = (latitude, longitude) => {
    overrideDevicePosition = true;
    clearInterval(updatePositionInterval);
    const latModifier = (_latitude - latitude) / 20;
    const lonModifier = (_longitude - longitude) / 20;
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        _latitude = _latitude - latModifier;
        _longitude = _longitude - lonModifier;
      }, 50 * i);
    }
  };

  /**
   * Updates the stations array with new data
   * 
   * @return {void}
   */
  const updateStations = async () => {
    try {
      if (toggleError) {
        throw Error();
      }
      stations = await oslobysykkel.getStationData();
    } catch (e) {
      clearInterval(updateStationsInterval);
      error = errorMessages[1].message;
      setTimeout(() => {
        error = null;
        stations = [];
        updateStationsInterval = setInterval(updateStations, 3 * 1000);
      }, 5000);
    }
  };

  /**
   * When the component is mounted we: 
   * 1. Populate the page with fresh station data and add an interval to request new station
   *    data every N seconds.
   * 2. Get the user location (User has to accept the pop-up and allow location sharing) while
   *    as above start an interval that will retrieve the users location every N seconds.
   *
   */
  onMount(async () => {
    updateStations();
    updatePosition();
    updateStationsInterval = setInterval(updateStations, 10 * 1000);
    updatePositionInterval = setInterval(updatePosition, 10 * 1000);

    // setInterval(() => {
    //   stations = stations.map((station) => {
    //     station.num_bikes_available = Math.round(Math.random(1,40));
    //     return station;
    //   });
    // }, 4000);

  });

</script>

<div id="debug-panel">
  <h1>
    Simulerings verktøy
  </h1>
  <div class="buttons">
    <button type="button" on:click={() => goToPosition(59.928992, 10.714949)}>Gå til Majorstua</button>
    <button type="button" on:click={() => goToPosition(59.913017, 10.745386)}>Gå til Glassmagasinet</button>
    <button type="button" on:click={() => goToPosition(59.909158, 10.814618)}>Gå til Brynseng</button>
    <button type="button" on:click={() => toggleError = !toggleError}>Feil ved henting av data ({toggleError ? 'Påslått' : 'Avslått'})</button>
  </div>
</div>

{#if showMap}
	<div id="map-container" data-testid="map-container" transition:slide="{{delay: 250, duration: 300, easing: quintOut }}">
    <Map 
      stations={stations}
      latitude={_latitude}
      longitude={_longitude}
    />
	</div>
{/if}

<div id="navigation">
  <div class="button bike" on:click={() => filterBy = 'bikes'}>Vis meg ledige sykler</div>
  <div class="button dock" on:click={() => filterBy = 'docks'}>Vis meg ledige stativ</div>
  <div class="button toggle-map" data-testid="toggle-map" on:click={() => showMap = !showMap}>
    {#if !showMap}
      Åpne kartet
    {:else}
      Lukk kartet
    {/if}
  </div>
</div>

{#if positionError}
  <div id="error-container">
    <p>{positionError}</p>
  </div>
{/if}

{#if error}
  <div id="error-container" data-testid="error-container">
    <img src={oops} alt="Error illustration"/>
    <p>{error}</p>
  </div>
{:else}
  <div id="stations" data-testid="stations-list">
    {#if stations.length > 0}
    {#each mappedStations.sort((a, b) => a.distance - b.distance) as station (station.station_id)}
      <Station 
        name={station.name} 
        direction={station.direction} 
        distance={station.distance}
        is_renting={station.status.is_renting === 1}
        is_returning={station.status.is_returning === 1}
        bike_available={station.status.num_bikes_available}
        docks_available={station.status.num_docks_available}
        latitude={station.lat}
        longitude={station.lon}
        last_status={station.status.last_reported}
        filterBy={filterBy}
      />
    {/each}
    {:else}
      <div class="loader" data-testid="loader">
        <img src={loader} alt="Loading gif" />
        <p>Laster inn sykler og stativer :-)</p>
      </div>
    {/if}
  </div>
{/if}

<style lang="scss">
  .loader {
    padding-top: 4em;
    text-align: center;
    margin: 0 auto;
    img {
      width: 100%;
      max-width: 500px;
    }
  }

  #error-container {
    text-align: center;
    padding: 2em;
    flex-wrap: nowrap;
    justify-content: center;

    p {
      display: block;
    }
  }

  #debug-panel {
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    background-color: #c9a8a8;

    h1 {
      font-size: 1.5em;
      margin: 0;
      padding: 0.3em 0 0.3em 0.8em;
    }

    .buttons {
      border-top: 1px solid #fff;
      display: flex;
      flex-direction: row;
      padding: 1em;
      gap: 1em;
      flex-wrap: wrap;
      margin-bottom: 1em;

      button {
        flex: 1;
        padding: 1em;
        cursor: pointer;
      }
    }
  }

  #navigation {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    align-items: center;

    .button {
      height: 3em;
      display: flex;
      flex: 1;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    div.dock {
      background-color: #e7e7e7;
    }

    div.bike {
      background-color: #a4cfa0;
      margin: 0 auto;
    }

    div.toggle-map {
      background-color: rgba(52, 172, 224, 0.5);
    }
  }
</style>