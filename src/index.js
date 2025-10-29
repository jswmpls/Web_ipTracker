import "babel-polyfill";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { validateIp, addTileLayer, getAddress, addOffset } from "./helper";
import icon from "../images/icon-location.svg";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKey);

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
});

const mapArea = document.querySelector(".map");
const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
  zoomControl: false,
});

addTileLayer(map);

function getData() {
  if (validateIp(ipInput.value)) {
    getAddress(ipInput.value).then(setInfo);
  }
}

function handleKey(e) {
  if (e.key == "Enter") {
    getData();
  }
}

function setInfo(mapData) {
  ipInfo.innerText = mapData.ip_address;
  locationInfo.innerText = mapData.country + " " + mapData.region;
  timezoneInfo.innerText = mapData.timezone.gmt_offset;
  mapData.connection.isp_name
    ? (ispInfo.innerText = mapData.connection.isp_name)
    : (ispInfo.innerText = "No");

  map.setView([mapData.latitude, mapData.longitude]);
  L.marker([mapData.latitude, mapData.longitude], { icon: markerIcon }).addTo(
    map
  );

  if (matchMedia("(max-width: 1024px)").matches) {
    addOffset(map);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getAddress("102.22.22.1").then(setInfo);
});
