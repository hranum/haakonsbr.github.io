<script>
  import arrow from '../assets/arrow.svg';
  import mapBg from '../assets/map.png';
  import { DateTime } from 'luxon';

	export let name;
  export let docks_available;
  export let bike_available;
  export let is_renting;
  export let is_returning;
  export let latitude;
  export let longitude;
  export let last_status;
  export let distance;
  export let direction;
  export let filterBy;

  // Provide the distance to a station in kilometers when more than 1000 meters away.
  $: humanDistance = distance > 1000 ? Math.ceil(distance / 1000) + ' km' : distance + ' meter';

</script>

{#if !filterBy || (filterBy === 'docks' && docks_available > 0) || (filterBy === 'bikes' && bike_available > 0)}
<div class="station border-radius-5">
  <div class="info">
    <div class="top">
      <div class="availability">
        <div 
          class:is_not_renting={!is_renting}
          class="bikes border-radius-5">
          {is_renting ? bike_available : 0}
        </div>

        <div 
          class:is_not_returning={!is_returning}
          class="docks border-radius-5">
          {is_returning ? docks_available : 0}
        </div>

      </div>
      <div class="station-name">{name}</div>
    </div>

    <div class="bottom">
      {#if !is_renting || !is_returning}
        This station is currently not
        {#if !is_renting}
          renting out bikes 
          {#if !is_returning}
            or
          {/if} 
        {/if}
        {#if !is_returning}
          accepting returns
        {/if}
      {/if}
      
      {#if last_status}
        Sist oppdatert {DateTime.fromSeconds(last_status).setLocale('no').toRelative('minutes')}
      {/if}
    </div>
  </div>

  <div class="navigator">
    <img class="arrow" src="{arrow}" style="transform: rotate({direction}deg);" alt="Direction"/>
    <div class="distance">
      {humanDistance}
    </div>
  </div>

  <div 
    title="Åpne stasjonen i Google Maps"
    on:click="{() => window.open(`http://www.google.com/maps/place/${latitude},${longitude}`)}"
    class="map" style="background-image: url({mapBg})">
    <i class="fa fa-map-marker fa-2x" aria-hidden="true"></i>
  </div>
</div>
{/if}
<style lang="scss">
  .border-radius-5 {
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

	.station {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 100%;
    margin: 1em 0;
    -webkit-box-shadow: 5px 5px 15px 5px #E8E8E8; 
    box-shadow: 5px 5px 15px 5px #efefef;
    border: 1px solid #efefef;
	}

  .info {
    text-align: left;
    flex: 1;
    justify-content: flex-start;

    .top {
      height: 3.2em;
      display: flex;
      padding: 0.8em;
      align-items: center;

      .availability {
        display: flex;
        flex-basis: 5em;
        flex-direction: row;
        flex-wrap: nowrap;
        flex-shrink: 0;
        font-size: 1.7em;

        div {
          text-align: center;
          padding: 0.3em;
          flex-basis: 1.5em;
        }

        .bikes {
          background-color: #a4cfa0;
          border-end-end-radius: 0;
          border-start-end-radius: 0;
        }

        .docks {
          background-color: #e7e7e7;
          border-start-start-radius: 0;
          border-end-start-radius: 0;
        }

        .is_not_renting, .is_not_returning {
          background-color: #cfa0a0!important;
        }

        @media screen and (max-width: 680px) {
          font-size: 1.2em;
          flex-basis: 4em;
          padding-right: 0.5em;
        }
      }
      
      .station-name {
        font-size: 1.5em;
      }

      @media screen and (max-width: 680px) {
        .station-name {
          word-break: break-all;
          font-size: 1em;
        }
      }
    }

    .bottom {
      flex: 1;
      border-top: 1px solid #E8E8E8;
      padding: 1em;
      font-size: 0.8em;
      line-height: 1.0em;
      -webkit-box-shadow: inset 0px 12px 15px -23px #000000; 
      box-shadow: inset 0px 11px 14px -23px #000000;
    }
  }

  .map {
    display: flex;
    flex-basis: 3em;
    flex-shrink: 0;
    padding: 0.8em;
    align-items: center;
    border-left: 1px solid #E8E8E8;
    -webkit-box-shadow: inset 7px 0px 22px -14px #969696; 
    box-shadow: inset 7px 0px 22px -14px #969696;
    opacity: 0.8;
    cursor: pointer;

    i {
      margin: 0 auto;
      color: #a0becf;
      opacity: 1;
    }

    &:hover i {
      color: #0037ff;
      padding-top: 3px;
    }

    @media screen and (max-width: 680px) {
      flex-basis: 1em;
      padding: 0.3em;
    }
  }

  .navigator {
    text-align: center;
    flex-basis: 4em;
    flex-shrink: 0;
    padding: 0.8em 0em 0.6em 0;
    border-left: 1px solid #E8E8E8;

    .arrow {
      width: 4em;
    }

    .distance {
      margin: 0 auto;
      padding-top: 0.2em;
      width: 90px;
      font-size: 0.95em;
      color: #333;
    }
  }
</style>