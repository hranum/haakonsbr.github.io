<img src="src/assets/bike-loader.gif" align="left" height="192px" />
<img align="left" width="0" height="192px" hspace="10"/>

> Simple GBFS (General Bikeshare Feed Specification) consumer application for Oslo Bysykkel station data.

> The application is written in JavaScript using Svelte for providing a reactive interface for displaying available bikes and docks. 
<br><br>
> You can view the application directly here: [https://haakonsbr.github.io/](https://haakonsbr.github.io/)
<br>

## Installing

```sh
# Assumming you have npm and node available on your device

$ npm install

# If you'd rather view this application right away you can open this url

https://haakonsbr.github.io/
```

## Usage

```sh
$ npm run dev # -- --host (if unable to connect)
```

You should see something like this:

```sh

  vite v2.6.11 dev server running at:

  > Local:    http://localhost:3000/
  > Network:  http://172.17.157.173:3000/

  ready in 872ms.

```

Open the ``Local`` link in your browser or ``Network`` if you did ``npm run dev -- --host``

## Simulation tool

Simulate the location of the device by pushing any of first three buttons.

Simulate API unresponsiveness / errors by toggling the last button.

