<script>
  import { onMount } from "svelte";

  export let latitude;
  export let longitude;
  export let stations;

  let map;

  // Public token, ok to leave it in source control.
  const mapboxToken = 'pk.eyJ1IjoiaHJhbnVtIiwiYSI6ImNrdnpjODR1azA0YngycXBxZHdsb2VoNWkifQ.HDk5Dp_1C7jidRvKIYkz0w';

  /**
   * Create one MapBox instance that will be mounted in the #map element. It is initialzed with current coordinates of the user.
   */
  const createMapbox = (longitude, latitude) => {
    mapboxgl.accessToken = mapboxToken;
    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v10",
      center: [longitude, latitude],
      zoom: 14,
    });
    updatePositionMarker(longitude, latitude);
  };

  /**
   * Keep track of Markers that are created inside MapBox, so we don't have to recreate them everytime stations
   * or device location is updated.
   */
  const markers = new Map();
  let userMarker;

  /**
   * Update the MapBox marker for device location.
   *
   * @param {number} longitude
   * @param {number} latitude
   */
  const updatePositionMarker = (longitude, latitude) => {
    if (!userMarker) {
      const dot = document.createElement("div");
      dot.className = 'dot';

      const markerEl = document.createElement("div");
      markerEl.className = 'device-location';
      markerEl.appendChild(dot);

      userMarker = new mapboxgl.Marker(markerEl).setLngLat([longitude, latitude]).addTo(map);
    } else {
      userMarker.setLngLat([longitude, latitude]);
    }
  };

  /**
   * Creates or updates a MapBox marker with bikes and docks available for a given station at coordinates.
   *
   * @param name Station name
   * @param {number} bikes bikes available
   * @param {number} docks docks available
   * @param {Array<{number, number}>} coordinates given as [longitude, latitude]
   */
  const updateMapMarker = (name, bikes, docks, coordinates) => {
    let marker = markers.get(name);
    if (!marker) {
      const bikesEl = document.createElement("span");
      bikesEl.className = 'bikes';
      bikesEl.textContent = bikes;

      const docksEl = document.createElement("span");
      docksEl.className = 'docks';
      docksEl.textContent = docks;

      const markerEl = document.createElement("div");
      markerEl.className = 'marker';
      markerEl.title = name;
      markerEl.appendChild(bikesEl);
      markerEl.appendChild(docksEl);

      const mapMarker = new mapboxgl.Marker(markerEl).setLngLat(coordinates).addTo(map);
      marker = {markerEl, bikesEl, docksEl, mapMarker};
      markers.set(name, marker);
    }

    marker.bikesEl.textContent = bikes;
    marker.docksEl.textContent = docks;
  };

  // Unoptimized binding of stations to update map markers. Should be optimized.
  $: mappedStations = stations.length > 0 ? stations.map((station) => {
    if (map) {
      updateMapMarker(station.name, station.status.num_bikes_available, station.status.num_docks_available, [station.lon, station.lat]);
    }
  }) : [];

  // Whenever device coordinates are updated, update the MapBox marker
  $: {
    if (map && map.loaded()) {
      updatePositionMarker(longitude, latitude);
    }
  }

  onMount(async () => {
    createMapbox(longitude, latitude);
  });

</script>

<div id="map">
  Laster kartet ...
</div>

<style lang="scss">
  #map {
    height: 300px;
    width: 100%;

    :global.device-location {
      z-index: 999;

      .dot {
        background: rgba(52, 172, 224, 0.5);
        box-shadow: 0 0 0 0 rgba(52, 172, 224, 1);
        border-radius: 50%;
        height: 30px;
        width: 30px;
        animation: pulse-blue 2s infinite;

        @keyframes pulse-blue {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(52, 172, 224, 0.7);
          }

          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(52, 172, 224, 0);
          }

          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(52, 172, 224, 0);
          }
        }
      }
    }

    :global.marker {
      display: block;
      cursor: pointer;
      font-size: 1.2em;
      text-shadow: 1px 1px 2px #FFFFFF;
      color: #000;

      .bikes {
        background: #a4cfa0;
        padding: 0.3em 0.5em;
        border-end-start-radius: 20%;
        border-start-start-radius: 20%;
      }

      .docks {
        background: #e7e7e7;
        padding: 0.3em 0.5em;
        border-start-end-radius: 20%;
        border-end-end-radius: 20%;
      }
    }
  }
</style>
