class AvalancheDangerColor {
    static get low() { return '#00c346' }
    static get moderate() { return '#fcfc00' }
    static get considerate() { return '#ff9100' }
    static get high() { return '#cc332c' }
    static get extreme() { return '#222222' }

    static get map() {
        return {
           'None':  null,
           'Low':  AvalancheDangerColor.low,
           'Moderate':  AvalancheDangerColor.moderate,
           'Considerate':  AvalancheDangerColor.considerate,
           'High':  AvalancheDangerColor.high,
           'Extreme':  AvalancheDangerColor.extreme,
        }
    }
}

class MapData {
    static get uacClasses() {
        return 'LCC_uac_30m_4326.tif'
    }

    static get zoomLevel() { return 12; }
    static get centerCoords() { return [40.60, -111.67]; }

    static get attribution() {
        return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenTopoMap</a> (CC-BY-SA)';
    }
}

class Map {
    get currentMarker() { return this._currentMarker; }
    set currentMarker(marker) { this._currentMarker = marker; }

    removeMarker() {
        if (this._currentMarker) this.currentMarker.remove();
    }

    moveMarker(e) {
        this.removeMarker();
        this.currentMarker = L.marker(e.latlng);
        this.currentMarker.addTo(this.baseLayer);
        const popup = this.currentMarker.bindPopup(
            this.infoAtLatLng(e.latlng.lat, e.latlng.lng)
        ).openPopup();
    }

    get uacClassInfo() {
       return this.raster.values[0];
    }
    get slopeInfo() {
        return this.raster.values[1];
    }

    constructor() {
        this.baseLayer = L.map("map-area").setView(
            MapData.centerCoords, MapData.zoomLevel
        );
        L.tileLayer('https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
            {
                attribution: MapData.attribution,
                maxZoom: 17,
            }
        ).addTo(this.baseLayer);

        const that = this;
        this.baseLayer.on('click', function() {
            that.removeMarker();
        })
    }

    classToColor(value) {
        if( value[0] <= 8 ) {
            return AvalancheDangerColor.map.Low;
        } else if ( value[0] <= 16 ) {
            return AvalancheDangerColor.map.Moderate;
        } else {
            return AvalancheDangerColor.map.Considerate;
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
        this.raster = this.dangerlayer.georasters[0];

        this.dangerlayer.addTo(this.baseLayer);

        const that = this;
        this.uacInfo = L.imageOverlay(
            MapData.uacClasses,
            [
                [this.dangerlayer.ymin, this.dangerlayer.xmin],
                [this.dangerlayer.ymax, this.dangerlayer.xmax]
            ],
            {
                interactive: true,
                opacity: 0,
            }
        ).on('click', function (e) {
            that.moveMarker(e);
            L.DomEvent.stopPropagation(e);
        });

        this.uacInfo.addTo(this.baseLayer);
    }

    redraw() {
        this.dangerlayer.redraw();
    }

    lngToRasterX(lng) {
        return Math.floor(
            this.raster.width *
            Math.abs(lng - this.raster.xmin) /
            (this.raster.xmax - this.raster.xmin)
        );
    }

    latToRasterY(lat) {
        return this.raster.height - Math.ceil(
            this.raster.height *
            Math.abs(lat - this.raster.ymin) /
            (this.raster.ymax - this.raster.ymin)
        )
    }

     infoAtLatLng (lat, lng) {
        try {
            const x = this.lngToRasterX(lng);
            const y = this.latToRasterY(lat);
            const uacID = this.uacClassInfo[y][x];
            return `UAC class: ${UACMapper.id[uacID].Elevation}</br>` +
                `Aspect: ${UACMapper.id[uacID].Aspect}</br>` +
                `Slope Angle: ${this.slopeInfo[y][x]}`;
        }
        catch(err) {
            return 'No value';
        }
    }

    load() {
        let that = this;
        fetch(MapData.uacClasses)
            .then(response => response.arrayBuffer())
            .then(window.parseGeoraster)
            .then(goeRaster => that.addLayer(goeRaster));
    }
}
