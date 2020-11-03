class AvalancheDangerColor {
    static get low() { return '#00c346' }
    static get moderate() { return '#fcfc00' }
    static get considerate() { return '#ff9100' }
    static get high() { return '#cc332c' }
    static get extreme() { return '#222222' }

    static get map() {
        return [
            null,
            AvalancheDangerColor.low,
            AvalancheDangerColor.moderate,
            AvalancheDangerColor.considerate,
            AvalancheDangerColor.high,
            AvalancheDangerColor.extreme,
        ]
    }
}

class MapData {
    static get uacClasses() {
        return 'LCC_uac_30m_classified.tif'
    }

    static get zoomLevel() { return 12; }
    static get centerCoords() { return [40.60, -111.67]; }

    static get attribution() {
        return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenTopoMap</a> (CC-BY-SA)';
    }
}

class Map {
    constructor() {
        this.baseLayer = L.map("map-area").setView(
            MapData.centerCoords, MapData.zoomLevel
        );
        // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        L.tileLayer('https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
            {
                attribution: MapData.attribution,
                maxZoom: 17,
            }
        ).addTo(this.baseLayer);
    }

    classToColor(value) {
        if( value[0] <= 8 ) {
            return AvalancheDangerColor.map[1];
        } else if ( value[0] <= 16 ) {
            return AvalancheDangerColor.map[2];
        } else {
            return AvalancheDangerColor.map[3];
        }
    }

    addLayer(layerData) {
        /**
         * https://github.com/GeoTIFF/georaster-layer-for-leaflet
         */
        this.dangerlayer = new window.GeoRasterLayer({
            georaster: layerData,
            opacity: 0.4,
            pixelValuesToColorFn: values => {
                return this.classToColor(values)
            },
            debugLevel: 0,
        });

        this.dangerlayer.addTo(this.baseLayer);
        // this.baseLayer.fitBounds(this.Dangerlayer.getBounds());
    }

    load() {
        let that = this;
        fetch(MapData.uacClasses)
            .then(response => response.arrayBuffer())
            .then(window.parseGeoraster)
            .then(goeRaster => that.addLayer(goeRaster));
    }
}
