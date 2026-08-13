/*
DATA AVAILABILITY NOTE

Some study-area boundaries, crop-reference points, and
Google Earth Engine assets used in the original research
are private or account-specific assets and are therefore
not included in this repository.

The code documents the analytical workflow and can be
adapted to equivalent user-provided Earth Observation
and reference datasets.
*/
var Sugarcane = table3;
/**************************************************************
Crop Signature Library using Google Earth Engine

Author:
Dania Ibnomer Mohamed Ahmed

Study Areas:

1. Kenana Sugar Scheme


2. Gezira Scheme (ELGEBAL)



Satellite:
Sentinel-2 SR Harmonized

Purpose:
Crop Spectral Signature Library
NDVI Time Series Analysis
**************************************************************/

//==============================================================
// SECTION 1
// Import Study Areas
//==============================================================
// Import Kenana study area
var kenanaAOI = ee.FeatureCollection(
'users/daniaibnomer/dndn/area1'
);

// Center map
Map.centerObject(kenanaAOI,11);

// Display study area
Map.addLayer(
kenanaAOI,
{
color:'red'
},
'Kenana Study Area'
);

//==============================================================
// SECTION 2
// Sentinel-2 Image Collection
// Kenana Sugar Scheme
//==============================================================

// Import Sentinel-2 Surface Reflectance
var kenanaS2 = ee.ImageCollection(
'COPERNICUS/S2_SR_HARMONIZED'
)

// Study area
.filterBounds(kenanaAOI)

// Time period
.filterDate('2017-01-01', '2018-07-31')

// Cloud filtering
.filter(
ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20)
);

//==============================================================
// SECTION 3
// Median Composite
// Kenana Sugar Scheme
//==============================================================

// Create Median Composite
var kenanaMedian = kenanaS2.median();

//==============================================================
// SECTION 4
// RGB Visualization
// Kenana Sugar Scheme
//==============================================================
// Clip to Kenana study area
var kenanaMedianClip = kenanaMedian.clip(kenanaAOI);

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
// NDVI Calculation
// Kenana Sugar Scheme
//==============================================================

// Calculate NDVI
var kenanaNDVI = kenanaMedianClip
.normalizedDifference(['B8', 'B4'])
.rename('NDVI');

// Display NDVI
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
// SECTION 5.5
// NDVI Time Series
// Kenana Sugar Scheme
//==============================================================

function addKenanaNDVI(image) {

var ndvi = image
.normalizedDifference(['B8', 'B4'])
.rename('NDVI');

return image
.addBands(ndvi)
.copyProperties(
image,
['system:time_start']
);
}

var kenanaNDVICollection = kenanaS2.map(
addKenanaNDVI
);

print(
'Kenana NDVI Images:',
kenanaNDVICollection.size()
);

//==============================================================
// SECTION 6
// Gezira Crop Map
//==============================================================

// Import Gezira Crop Map
var geziraCropMap =
ee.Image('users/daniaibnomer/gezira_crops1');

// Remove white background
var geziraMask = geziraCropMap
.select('b1').lt(245)
.or(geziraCropMap.select('b2').lt(245))
.or(geziraCropMap.select('b3').lt(245));

geziraCropMap =
geziraCropMap.updateMask(geziraMask);

// Display Gezira Crop Map
Map.addLayer(
geziraCropMap,
{
bands:['b1','b2','b3'],
min:0,
max:255
},
'Gezira Crop Map'
);

//==============================================================
// SECTION 7
// ELGEBAL GPS Samples
//==============================================================

// Import ELGEBAL GPS points
var elGebelGPS = ee.FeatureCollection(
'users/daniaibnomer/GPS_CROPS_122218_ELGEBAL'
);

//==============================================================
// Style GPS points by crop type
//==============================================================

var styledGPS = elGebelGPS.map(function(feature){

var crop = ee.String(feature.get('NAME'));

var color = ee.Algorithms.If(
crop.equals('WHEAT'),'008000',
ee.Algorithms.If(
crop.equals('CHICKPEA'),'0000FF',
ee.Algorithms.If(
crop.equals('COTTON'),'FFD700',
ee.Algorithms.If(
crop.equals('ONION'),'FF0000',
ee.Algorithms.If(
crop.equals('ABU70'),'7CFC00',
'C2B280'
)
)
)
)
);

return feature.set({
style:{
color:color,
pointSize:6,
width:1
}
});

});

// Display GPS points

Map.addLayer(
styledGPS.style({styleProperty:'style'}),
{},
'ELGEBAL GPS'
);

Map.centerObject(elGebelGPS,11);

//==============================================================
// SECTION 8
// Sentinel-2 Collection (Gezira Scheme)
//==============================================================

// Import Sentinel-2 Images
var geziraS2 = ee.ImageCollection(
'COPERNICUS/S2_SR_HARMONIZED'
)

// GPS samples extent
.filterBounds(elGebelGPS)

// Growing season (Winter 2017-2018)
.filterDate('2017-01-01', '2018-07-31')

// Remove cloudy scenes
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20));

//==============================================================
// SECTION 9
// Add NDVI Band
//==============================================================

function addNDVI(image){

var ndvi = image.normalizedDifference(['B8','B4'])
.rename('NDVI');

return image.addBands(ndvi)
.copyProperties(image,['system:time_start']);

}

var geziraNDVI = geziraS2.map(addNDVI);

//==============================================================
// SECTION 10
// CHECK IMAGE COLLECTIONS
//==============================================================

print('Gezira Images:', geziraS2.size());
print('Gezira NDVI Images:', geziraNDVI.size());
print('Kenana Images:', kenanaS2.size());
print('Kenana NDVI Images:', kenanaNDVICollection.size());

//==============================================================
// SECTION 11
// CROP SAMPLES - ELGEBAL
//==============================================================

//------------------------------
// Wheat
//------------------------------

var wheat = elGebelGPS.filter(
ee.Filter.eq('NAME', 'WHEAT')
);

//------------------------------
// Chickpea
//------------------------------

var chickpea = elGebelGPS.filter(
ee.Filter.eq('NAME', 'CHICKPEA')
);

//------------------------------
// Cotton
//------------------------------

var cotton = elGebelGPS.filter(
ee.Filter.eq('NAME', 'COTTON')
);

//------------------------------
// Abu70
//------------------------------

var abu70 = elGebelGPS.filter(
ee.Filter.eq('NAME', 'ABU70')
);

//------------------------------
// Fallow
//------------------------------

var fallow = elGebelGPS.filter(
ee.Filter.eq('NAME', 'FALLOW')
);

//==============================================================
// DISPLAY CROP SAMPLES
//==============================================================

Map.addLayer(
wheat,
{color: 'green'},
'Wheat Samples'
);

Map.addLayer(
chickpea,
{color: 'blue'},
'Chickpea Samples'
);

Map.addLayer(
cotton,
{color: 'yellow'},
'Cotton Samples'
);

Map.addLayer(
abu70,
{color: 'lime'},
'Abu70 Samples'
);

Map.addLayer(
fallow,
{color: 'white'},
'Fallow Samples'
);

print(
'Crop Types:',
elGebelGPS
.aggregate_array('NAME')
.distinct()
);

//==============================================================
// SECTION 12
// FINAL REFERENCE POINTS
//==============================================================
//
// Wheat     -> Point 2
// Cotton    -> Point 4
// Chickpea  -> Original point
// Abu70     -> Original point
// Fallow    -> Original point
// Sugarcane -> Sugarcane_3
//
// Onion     -> Removed
//==============================================================

//--------------------------------------------------------------
// Wheat - Point 2
//--------------------------------------------------------------

var wheatReference =
wheat.filter(
ee.Filter.eq('id', 2)
);

//--------------------------------------------------------------
// Cotton - Point 4
//--------------------------------------------------------------

var cottonReference =
cotton.filter(
ee.Filter.eq('id', 4)
);

//--------------------------------------------------------------
// Chickpea - Original Point
//--------------------------------------------------------------

var chickpeaReference =
chickpea;

//--------------------------------------------------------------
// Abu70 - Original Point
//--------------------------------------------------------------

var abu70Reference =
abu70;

//--------------------------------------------------------------
// Fallow - Original Point
//--------------------------------------------------------------

var fallowReference =
fallow;

//==============================================================
// SECTION 13
// SUGARCANE REFERENCE POINT
//==============================================================

// Sugarcane points were imported as:
// Sugarcane
//
// Select the third point as Sugarcane_3.
//==============================================================

//--------------------------------------------------------------
// 1. Convert Sugarcane points to a list
//--------------------------------------------------------------

var sugarcaneList =
Sugarcane.toList(
Sugarcane.size()
);

//--------------------------------------------------------------
// 2. Number Sugarcane points
//--------------------------------------------------------------

var sugarcaneNumbered =
ee.FeatureCollection(

ee.List.sequence(  
  1,  
  Sugarcane.size()  
).map(function(n) {  

  var feature =  
    ee.Feature(  
      sugarcaneList.get(  
        ee.Number(n).subtract(1)  
      )  
    );  

  return feature.set(  
    'PointID',  
    ee.String('Sugarcane_')  
      .cat(  
        ee.Number(n).format()  
      )  
  );  

})

);

//--------------------------------------------------------------
// 3. Select Sugarcane_3
//--------------------------------------------------------------
//
// Earth Engine uses zero-based indexing:
// 0 = Point 1
// 1 = Point 2
// 2 = Point 3
//--------------------------------------------------------------

var sugarcaneFinalReference =
ee.FeatureCollection([
ee.Feature(
sugarcaneList.get(2)
)
]);

//--------------------------------------------------------------
// 4. Check Sugarcane reference
//--------------------------------------------------------------

print(
'ALL SUGARCANE POINTS:',
Sugarcane
);

print(
'NUMBER OF SUGARCANE POINTS:',
Sugarcane.size()
);

print(
'SELECTED SUGARCANE POINT 3:',
sugarcaneFinalReference
);

print(
'SUGARCANE REFERENCE COUNT:',
sugarcaneFinalReference.size()
);

//--------------------------------------------------------------
// 5. Display all Sugarcane points
//--------------------------------------------------------------

Map.addLayer(
sugarcaneNumbered,
{
color: 'cyan'
},
'All Sugarcane Points'
);

//--------------------------------------------------------------
// 6. Display selected Sugarcane point
//--------------------------------------------------------------

Map.addLayer(
sugarcaneFinalReference,
{
color: 'red'
},
'FINAL Sugarcane - Point 3'
);

//==============================================================
// SECTION 14
// CHECK FINAL REFERENCE POINTS
//==============================================================

print(
'WHEAT REFERENCE - POINT 2:',
wheatReference
);

print(
'COTTON REFERENCE - POINT 4:',
cottonReference
);

print(
'CHICKPEA REFERENCE - ORIGINAL POINT:',
chickpeaReference
);

print(
'ABU70 REFERENCE - ORIGINAL POINT:',
abu70Reference
);

print(
'FALLOW REFERENCE - ORIGINAL POINT:',
fallowReference
);

print(
'SUGARCANE REFERENCE - POINT 3:',
sugarcaneFinalReference
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

return imageCollection.map(function(image) {

var ndviValue =  
  image.reduceRegion({  
    reducer: ee.Reducer.mean(),  
    geometry: referencePoint.geometry(),  
    scale: 10,  
    maxPixels: 1e9  
  }).get('NDVI');  

return ee.Feature(null, {  

  'date':  
    image.get('system:time_start'),  

  'NDVI':  
    ndviValue,  

  'Crop':  
    cropName  

});

});

}

//==============================================================
// SECTION 16
// GEZIRA REFERENCE SIGNATURES
//==============================================================
//
// Gezira crops:
//
// Wheat
// Cotton
// Chickpea
// Abu70
// Fallow
//
// All use geziraNDVI.
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
// SUGARCANE REFERENCE SIGNATURE
//==============================================================
//
// Sugarcane is located in Kenana.
//
// Therefore Sugarcane MUST use:
//
// kenanaNDVICollection
//
// NOT geziraNDVI.
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

wheatData =
wheatData.filter(
ee.Filter.notNull(['date', 'NDVI'])
);

cottonData =
cottonData.filter(
ee.Filter.notNull(['date', 'NDVI'])
);

chickpeaData =
chickpeaData.filter(
ee.Filter.notNull(['date', 'NDVI'])
);

abu70Data =
abu70Data.filter(
ee.Filter.notNull(['date', 'NDVI'])
);

fallowData =
fallowData.filter(
ee.Filter.notNull(['date', 'NDVI'])
);

sugarcaneData =
sugarcaneData.filter(
ee.Filter.notNull(['date', 'NDVI'])
);

//==============================================================
// SECTION 19
// FINAL COMBINED CROP REFERENCE DATA
//==============================================================

var finalReferenceData =
wheatData
.merge(cottonData)
.merge(chickpeaData)
.merge(abu70Data)
.merge(fallowData)
.merge(sugarcaneData);

// Sort chronologically

finalReferenceData =
finalReferenceData.sort('date');

//==============================================================
// CHECK FINAL DATA
//==============================================================

print(
'FINAL CROP NDVI REFERENCE DATA:',
finalReferenceData
);

print(
'FINAL REFERENCE RECORD COUNT:',
finalReferenceData.size()
);

print(
'WHEAT RECORDS:',
wheatData.size()
);

print(
'COTTON RECORDS:',
cottonData.size()
);

print(
'CHICKPEA RECORDS:',
chickpeaData.size()
);

print(
'ABU70 RECORDS:',
abu70Data.size()
);

print(
'FALLOW RECORDS:',
fallowData.size()
);

print(
'SUGARCANE RECORDS:',
sugarcaneData.size()
);

//==============================================================
// SECTION 20
// FINAL COMBINED NDVI SIGNATURE CHART
//==============================================================

//--------------------------------------------------------------
// Create final chart
//--------------------------------------------------------------

var finalReferenceChart =
ui.Chart.feature.groups({

features: finalReferenceData,  

xProperty: 'date',  

yProperty: 'NDVI',  

seriesProperty: 'Crop'

})

.setChartType('LineChart')

.setOptions({

title:  
  'FINAL CROP NDVI REFERENCE SIGNATURES',  

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

// Make all crop curves clearly visible  
lineWidth: 3,  

pointSize: 3,  

interpolateNulls: true,  

legend: {  

  position: 'right',  

  textStyle: {  

    fontSize: 12  

  }  

},  

chartArea: {  

  left: 70,  

  right: 180,  

  top: 60,  

  bottom: 70  

}

});

//--------------------------------------------------------------
// Display final chart
//--------------------------------------------------------------

print(
'FINAL CROP NDVI REFERENCE SIGNATURES:',
finalReferenceChart
);

//==============================================================
// SUGARCANE CHECK CHART
//==============================================================
//
// This is only to verify that Sugarcane itself
// has a valid NDVI time series.
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
  'SUGARCANE NDVI REFERENCE - CHECK',  

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
// END OF SCRIPT
//==============================================================

