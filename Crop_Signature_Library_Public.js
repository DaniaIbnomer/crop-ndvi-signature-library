/*
==============================================================
PUBLIC CROP NDVI SIGNATURE LIBRARY
==============================================================

Author:
Dania Ibnomer Mohamed Ahmed

Project:
Farm Hub – Earth Observation / Agricultural Decision Support

Study Areas:
- Kenana Sugar Scheme
- Gezira Scheme (ELGEBAL), Sudan

Satellite:
Sentinel-2 Surface Reflectance Harmonized

Purpose:
- Temporal crop NDVI signatures
- Crop phenology investigation
- Reference crop-signature library

Crop / Reference Classes:
- Wheat
- Cotton
- Chickpea
- Abu70
- Fallow
- Sugarcane

PUBLIC RESEARCH WORKFLOW

This script documents the analytical workflow used to generate
temporal crop NDVI reference signatures.

The original Earth Engine study-area boundaries, GPS reference
samples, and supporting datasets are maintained separately and
are not included in this public repository.

This public version is intended for methodological documentation
and reproducibility of the analytical approach.

Direct execution requires compatible Earth Engine assets.
==============================================================
*/


//==============================================================
// SECTION 0
// USER-PROVIDED INPUT DATA
//==============================================================
//
// The original research used private Earth Engine assets.
// They are intentionally not included in this public version.
//
// Replace the placeholders below with compatible assets if you
// want to reproduce the workflow.
//
// The asset names indicate the type of input required; they do
// not represent functional asset IDs.
//==============================================================


// Kenana Sugar Scheme — study-area boundary
var kenanaAOI = ee.FeatureCollection(
  'YOUR_KENANA_AOI_ASSET'
);


// Gezira Scheme — crop/reference sample dataset
var elGebelGPS = ee.FeatureCollection(
  'YOUR_GEZIRA_REFERENCE_POINTS_ASSET'
);


// Gezira Scheme — crop map
var geziraCropMap = ee.Image(
  'YOUR_GEZIRA_CROP_MAP_ASSET'
);


// Kenana Sugar Scheme — sugarcane reference samples
var Sugarcane = ee.FeatureCollection(
  'YOUR_SUGARCANE_REFERENCE_ASSET'
);


//==============================================================
// SECTION 1
// KENANA STUDY AREA
//==============================================================

Map.centerObject(kenanaAOI, 11);

Map.addLayer(
  kenanaAOI,
  {color: 'red'},
  'Kenana Study Area'
);


//==============================================================
// SECTION 2
// SENTINEL-2 COLLECTION — KENANA
//==============================================================

var kenanaS2 = ee.ImageCollection(
  'COPERNICUS/S2_SR_HARMONIZED'
)
.filterBounds(kenanaAOI)
.filterDate('2017-01-01', '2018-07-31')
.filter(
  ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)
);


//==============================================================
// SECTION 3
// KENANA MEDIAN COMPOSITE
//==============================================================

var kenanaMedian =
  kenanaS2.median();

var kenanaMedianClip =
  kenanaMedian.clip(kenanaAOI);


//==============================================================
// SECTION 4
// KENANA RGB
//==============================================================

Map.addLayer(
  kenanaMedianClip,
  {
    bands: ['B4', 'B3', 'B2'],
    min: 0,
    max: 3000
  },
  'Kenana RGB'
);


//==============================================================
// SECTION 5
// KENANA NDVI
//==============================================================

var kenanaNDVI =
  kenanaMedianClip
    .normalizedDifference(['B8', 'B4'])
    .rename('NDVI');

Map.addLayer(
  kenanaNDVI,
  {
    min: 0.2,
    max: 0.8,
    palette: [
      'blue',
      'red',
      'yellow',
      'green',
      'darkgreen'
    ]
  },
  'Kenana NDVI'
);


//==============================================================
// SECTION 6
// KENANA NDVI TIME SERIES
//==============================================================

function addKenanaNDVI(image) {

  var ndvi =
    image
      .normalizedDifference(['B8', 'B4'])
      .rename('NDVI');

  return image
    .addBands(ndvi)
    .copyProperties(
      image,
      ['system:time_start']
    );
}

var kenanaNDVICollection =
  kenanaS2.map(addKenanaNDVI);

print(
  'Kenana NDVI Images:',
  kenanaNDVICollection.size()
);


//==============================================================
// SECTION 7
// GEZIRA CROP MAP
//==============================================================

// Remove white background

var geziraMask =
  geziraCropMap.select('b1').lt(245)
  .or(
    geziraCropMap.select('b2').lt(245)
  )
  .or(
    geziraCropMap.select('b3').lt(245)
  );

geziraCropMap =
  geziraCropMap.updateMask(geziraMask);

Map.addLayer(
  geziraCropMap,
  {
    bands: ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
  },
  'Gezira Crop Map'
);


//==============================================================
// SECTION 8
// SENTINEL-2 COLLECTION — GEZIRA
//==============================================================

var geziraS2 =
  ee.ImageCollection(
    'COPERNICUS/S2_SR_HARMONIZED'
  )
  .filterBounds(elGebelGPS)
  .filterDate('2017-01-01', '2018-07-31')
  .filter(
    ee.Filter.lt(
      'CLOUDY_PIXEL_PERCENTAGE',
      20
    )
  );


//==============================================================
// SECTION 9
// ADD NDVI BAND
//==============================================================

function addNDVI(image) {

  var ndvi =
    image
      .normalizedDifference(['B8', 'B4'])
      .rename('NDVI');

  return image
    .addBands(ndvi)
    .copyProperties(
      image,
      ['system:time_start']
    );
}

var geziraNDVI =
  geziraS2.map(addNDVI);


//==============================================================
// SECTION 10
// CHECK IMAGE COLLECTIONS
//==============================================================

print(
  'Gezira Images:',
  geziraS2.size()
);

print(
  'Gezira NDVI Images:',
  geziraNDVI.size()
);

print(
  'Kenana Images:',
  kenanaS2.size()
);

print(
  'Kenana NDVI Images:',
  kenanaNDVICollection.size()
);


//==============================================================
// SECTION 11
// CROP REFERENCE CLASSES — GEZIRA
//==============================================================

var wheat =
  elGebelGPS.filter(
    ee.Filter.eq('NAME', 'WHEAT')
  );

var chickpea =
  elGebelGPS.filter(
    ee.Filter.eq('NAME', 'CHICKPEA')
  );

var cotton =
  elGebelGPS.filter(
    ee.Filter.eq('NAME', 'COTTON')
  );

var abu70 =
  elGebelGPS.filter(
    ee.Filter.eq('NAME', 'ABU70')
  );

var fallow =
  elGebelGPS.filter(
    ee.Filter.eq('NAME', 'FALLOW')
  );


//==============================================================
// SECTION 12
// SELECT REFERENCE POINTS
//==============================================================

// Wheat — Point 2
var wheatReference =
  wheat.filter(
    ee.Filter.eq('id', 2)
  );


// Cotton — Point 4
var cottonReference =
  cotton.filter(
    ee.Filter.eq('id', 4)
  );


// Original reference points
var chickpeaReference =
  chickpea;

var abu70Reference =
  abu70;

var fallowReference =
  fallow;


//==============================================================
// SECTION 13
// SUGARCANE REFERENCE — KENANA
//==============================================================
//
// Select the third sugarcane reference point.
//
// Earth Engine list indexing is zero-based:
// 0 = Point 1
// 1 = Point 2
// 2 = Point 3
//==============================================================

var sugarcaneList =
  Sugarcane.toList(
    Sugarcane.size()
  );

var sugarcaneFinalReference =
  ee.FeatureCollection([
    ee.Feature(
      sugarcaneList.get(2)
    )
  ]);


//==============================================================
// SECTION 14
// DISPLAY REFERENCE POINTS
//==============================================================

Map.addLayer(
  wheatReference,
  {color: 'green'},
  'Wheat Reference'
);

Map.addLayer(
  cottonReference,
  {color: 'yellow'},
  'Cotton Reference'
);

Map.addLayer(
  chickpeaReference,
  {color: 'blue'},
  'Chickpea Reference'
);

Map.addLayer(
  abu70Reference,
  {color: 'lime'},
  'Abu70 Reference'
);

Map.addLayer(
  fallowReference,
  {color: 'white'},
  'Fallow Reference'
);

Map.addLayer(
  sugarcaneFinalReference,
  {color: 'red'},
  'Sugarcane Reference'
);


//==============================================================
// SECTION 15
// EXTRACT NDVI REFERENCE DATA
//==============================================================

function extractReferenceNDVI(
  imageCollection,
  referencePoint,
  cropName
) {

  return imageCollection.map(
    function(image) {

      var ndviValue =
        image.reduceRegion({

          reducer:
            ee.Reducer.mean(),

          geometry:
            referencePoint.geometry(),

          scale: 10,

          maxPixels: 1e9

        }).get('NDVI');

      return ee.Feature(
        null,
        {
          date:
            image.get(
              'system:time_start'
            ),

          NDVI:
            ndviValue,

          Crop:
            cropName
        }
      );
    }
  );
}


//==============================================================
// SECTION 16
// GEZIRA CROP SIGNATURES
//==============================================================

var wheatData =
  extractReferenceNDVI(
    geziraNDVI,
    wheatReference,
    'Wheat'
  );

var cottonData =
  extractReferenceNDVI(
    geziraNDVI,
    cottonReference,
    'Cotton'
  );

var chickpeaData =
  extractReferenceNDVI(
    geziraNDVI,
    chickpeaReference,
    'Chickpea'
  );

var abu70Data =
  extractReferenceNDVI(
    geziraNDVI,
    abu70Reference,
    'Abu70'
  );

var fallowData =
  extractReferenceNDVI(
    geziraNDVI,
    fallowReference,
    'Fallow'
  );


//==============================================================
// SECTION 17
// SUGARCANE SIGNATURE
//==============================================================
//
// Sugarcane uses the Kenana image collection because
// its reference point belongs to the Kenana study area.
//==============================================================

var sugarcaneData =
  extractReferenceNDVI(
    kenanaNDVICollection,
    sugarcaneFinalReference,
    'Sugarcane'
  );


//==============================================================
// SECTION 18
// REMOVE NULL VALUES
//==============================================================

function removeNulls(collection) {

  return collection.filter(
    ee.Filter.notNull([
      'date',
      'NDVI'
    ])
  );
}

wheatData =
  removeNulls(wheatData);

cottonData =
  removeNulls(cottonData);

chickpeaData =
  removeNulls(chickpeaData);

abu70Data =
  removeNulls(abu70Data);

fallowData =
  removeNulls(fallowData);

sugarcaneData =
  removeNulls(sugarcaneData);


//==============================================================
// SECTION 19
// COMBINE ALL CROP SIGNATURES
//==============================================================

var finalReferenceData =
  wheatData
    .merge(cottonData)
    .merge(chickpeaData)
    .merge(abu70Data)
    .merge(fallowData)
    .merge(sugarcaneData)
    .sort('date');

print(
  'Final Crop NDVI Reference Data:',
  finalReferenceData
);

print(
  'Final Reference Record Count:',
  finalReferenceData.size()
);


//==============================================================
// SECTION 20
// FINAL NDVI SIGNATURE CHART
//==============================================================

var finalReferenceChart =
  ui.Chart.feature.groups({

    features:
      finalReferenceData,

    xProperty:
      'date',

    yProperty:
      'NDVI',

    seriesProperty:
      'Crop'

  })
  .setChartType('LineChart')
  .setOptions({

    title:
      'Crop NDVI Reference Signatures',

    hAxis: {
      title: 'Date',
      format: 'MMM yyyy'
    },

    vAxis: {
      title: 'NDVI',
      viewWindow: {
        min: 0,
        max: 1
      }
    },

    lineWidth: 3,

    pointSize: 3,

    interpolateNulls: true,

    legend: {
      position: 'right'
    },

    chartArea: {
      left: 70,
      right: 180,
      top: 60,
      bottom: 70
    }

  });

print(
  'FINAL CROP NDVI REFERENCE SIGNATURES:',
  finalReferenceChart
);


//==============================================================
// SECTION 21
// SUGARCANE QUALITY-CHECK CHART
//==============================================================

var sugarcaneCheckChart =
  ui.Chart.feature.byFeature({

    features:
      sugarcaneData,

    xProperty:
      'date',

    yProperties:
      ['NDVI']

  })
  .setChartType('LineChart')
  .setOptions({

    title:
      'Sugarcane NDVI Reference — Quality Check',

    hAxis: {
      title: 'Date',
      format: 'MMM yyyy'
    },

    vAxis: {
      title: 'NDVI',
      viewWindow: {
        min: 0,
        max: 1
      }
    },

    lineWidth: 3,

    pointSize: 4,

    interpolateNulls: true,

    legend: {
      position: 'none'
    }

  });

print(
  'SUGARCANE NDVI CHECK:',
  sugarcaneCheckChart
);


//==============================================================
// END OF PUBLIC WORKFLOW
//==============================================================
