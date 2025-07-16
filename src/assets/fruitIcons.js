const fruitIcons = {
  Lime: L.icon({
    iconUrl: "images/lime-logo.png",

    iconSize: [38, 38], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  }),

  Lemon: L.icon({
    iconUrl: "images/lemon-icon.svg",

    iconSize: [32, 32], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  }),

  Grapefruit: L.icon({
    iconUrl: "images/grapefruit.webp",

    iconSize: [28, 28], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  }),

  Mandarins: L.icon({
    iconUrl: "images/mandarin-logo.svg",

    iconSize: [32, 32], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  }),

  notReviewed: L.icon({
    iconUrl: "images/question-mark.svg",

    iconSize: [38, 38], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  }),
};

export default fruitIcons;
