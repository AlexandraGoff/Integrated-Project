let lat, long;
console.log("aaaaaaaaaaaaaa");
if ('geolocation' in navigator) {
    console.log("geolocation available");
    navigator.geolocation.getCurrentPosition(async position => {
        lat = (position.coords.latitude);
        long = (position.coords.longitude);

        document.getElementById("Lattitude").textContent = lat.toFixed(2);
        document.getElementById("Longitude").textContent = long.toFixed(2);

        const response = await fetch(`weather/${lat}/${long}`);
        const data = await response.json();
        console.log(data);

        document.getElementById("button").onclick = function () { sendDataToServer(lat, long) };

    });
}
else {
    console.log("geolocation unavailable");
}