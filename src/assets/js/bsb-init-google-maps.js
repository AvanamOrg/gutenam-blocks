/**
 * File bsb-init-google-maps.js.
 */

function bbInitMaps () {
	// bsb_google_map_' . $unique_id

	let mapItems = document.querySelectorAll('.bsb-google-maps-container')
	if (!mapItems.length) {
		return
	}

	for (let n = 0; n < mapItems.length; n++) {
		let self = mapItems[n], el = self.querySelector('.bsb-count-up-process')
		let mapId = self.dataset.mapid.replace(/-/g, '_');

		let mapContainer = document.getElementById("bsb-google-map" + self.dataset.mapid);

		if (mapContainer && mapId.length > 0) {
			window["bsb_google_map" + mapId]();
		}
	}
}
