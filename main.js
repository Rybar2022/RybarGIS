window.onload=init;

function init() {
    const map = new ol.Map({
        view: new ol.View({
            center: [3500000.0, 6210000.0], 
            zoom: 6.7 /*,
            rotation: 45 * Math.PI / 180.0 */
        }),
        /*layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
                visible: true,
                title: 'Street map'
            })
        ], */
        target: 'rybar-map'
    })

    const streetsLayer = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: false,
        title: 'Street map'
    })

    const humanitarianLayer = new ol.layer.Tile({
        source: new ol.source.OSM({
            url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }),
        visible: false,
        title: 'Humanitarian map'
    })

    const terrainLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            //url: 'http://stamen.com/terrain.{x}/{y}/{z}.jpg'
            url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg'
        }),
        visible: false,
        title: 'Terrain map',
      //  attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    })

    const transportLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png' +
                '?apikey=9d95e443f3c44446a0166b7a18e01968'
                //Your API key from http://www.thunderforest.com/docs/apikeys/
        }),
        visible: true,
        title: 'Transport map',
    })

    /*const yandexLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: 'http://vec01.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}'
         // projection: 'EPSG:3395',
         // tileGrid: ol.tilegrid.createXYZ({
         //   extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244]
        //  })
        }),
        visible: true,
        title: 'Yandex map'
      })*/


    const yandexLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            //url: 'http://vec0{1-4}.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}',
           // url: 'https://sat01.maps.yandex.net/tiles?l=sat&v=3.379.0&x={x}&y={y}&z={z})',
           url: 'https://sat0{1-4}.maps.yandex.net/tiles?l=sat&x={x}&y={y}&z={z}' // Works!
           //url: 'http://vec01.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}'
            //projection: 'EPSG:3395',
           // tileGrid: ol.tilegrid.createXYZ({
           //     extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244]
          //  })
        }),
        visible: false,
        title: 'Yandex map'
    })

    // Doesn't work without api key from Google. 90 days trial period, then have to pay 300$.
    /*const googleLayer = new ol.layer.Tile({
        source: new XYZ({
          url: 'http://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
          visible: false,
          title: 'Google map'
        })
    })*/

    const baseLayers = new ol.layer.Group({
        layers: [streetsLayer, humanitarianLayer, terrainLayer, transportLayer, yandexLayer]
    })

    map.addLayer(baseLayers)

    function rbLayersChanged(value) {
        let layers = (baseLayers.getLayers());
        console.log('rbLayersChanged')
        layers.forEach(layer => {
            layer.setVisible((layer.get('title') == value) ? true : false)
            console.log(layer.get('title') + "   " + value + " " + layer.get('visible'))
        })
    }

    const rbLayers = document.querySelectorAll('.sideBar > input[type=radio]' );
    for (let rb of rbLayers) {
        rb.addEventListener('change', function() {
            let rbSelected = this.value;
            let layers = (baseLayers.getLayers());
            layers.forEach(layer => {
                layer.setVisible((layer.get('title') == rbSelected) ? true : false)
            })
        }) 
    }






   /* map.on('click', function(e)  {
        console.log(e.coordinate);
    }) */
}
