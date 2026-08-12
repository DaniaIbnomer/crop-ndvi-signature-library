# Crop NDVI Signature Library

## Temporal Earth Observation for Agricultural Crop Characterisation and Irrigation Management

**Author:** Dania Ibnomer Mohamed Ahmed  
**Domain:** Remote Sensing | GIS | Earth Observation | Agricultural Monitoring | Time-Series Analysis  
**Platform:** Google Earth Engine  
**Primary satellite data:** Sentinel-2 Surface Reflectance Harmonized

---

## Overview

This repository presents an ongoing Earth Observation research project for developing a **crop NDVI signature library** from satellite time-series data.

The project investigates how temporal vegetation dynamics derived from Sentinel-2 imagery can be used to characterize agricultural crops, distinguish crop types, and support agricultural and irrigation-management applications.

The current implementation is a continuation and technical extension of regional research originally developed through the **Eastern Nile Technical Regional Office (ENTRO) of the Nile Basin Initiative (NBI)**.

The central research idea is:

> **Satellite observations → temporal vegetation dynamics → crop signatures → crop information → improved agricultural and irrigation-management decisions**

Rather than relying on a single satellite image, this project uses observations acquired repeatedly through time to characterize the temporal behaviour of vegetation.

---

# 1. Research Background

Agricultural water management requires reliable information about the location, extent, and type of cultivated crops.

In the Gezira Scheme and the wider Eastern Nile region, irrigation-management decisions can be affected by uncertainty in reported cultivated areas and crop types.

Remote Sensing provides an independent and spatially distributed source of agricultural information.

The original regional project therefore investigated the application of GIS and Remote Sensing to irrigation management in the Eastern Nile.

The work was conducted as part of a regional Young Professionals internship involving participants from:

- Sudan
- Ethiopia
- South Sudan

The resulting research addressed practical irrigation-management challenges using Earth Observation and GIS techniques.

---

# 2. Origin of the Project

The foundation of this repository is a regional research project developed through the **Eastern Nile Technical Regional Office (ENTRO) of the Nile Basin Initiative**.

The original project was documented as:

> **Remote Sensing Application for Irrigation Management in Eastern Nile**

The associated user manual documented three major Remote Sensing applications:

1. Change detection
2. Evapotranspiration estimation
3. Crop type identification

The manual was prepared by:

- Dania Ibnomer
- Denis Abi
- Ethiopia Bisrat

and dated **25 July 2018**.

The documentation includes workflows implemented using Google Earth Engine for agricultural and irrigation-management applications.

---

# 3. Original Crop Identification Work

The crop-type identification component investigated the use of satellite imagery and temporal vegetation information to distinguish agricultural crops.

The original workflow included:

- filtering satellite image collections;
- selecting suitable images;
- calculating NDVI;
- reducing cloud contamination;
- generating NDVI time series;
- analysing NDVI over agricultural regions;
- comparing crop-specific temporal behaviour; and
- investigating additional vegetation indicators.

The historical documentation specifically includes workflows for:

- Kenana Area-1;
- NDVI time series;
- precipitation;
- crop-region analysis;
- Sentinel-2 temporal analysis;
- Gezira crop mapping;
- crop-specific NDVI charts; and
- crop signature comparison.

The documentation also records the use of Sentinel-2 imagery for NDVI time-series analysis because of its higher temporal resolution compared with Landsat imagery. 

---

# 4. Scientific Motivation

A single satellite image provides a snapshot of vegetation conditions.

However, agricultural crops develop through time.

Different crops may therefore exhibit different temporal patterns associated with:

- crop emergence;
- vegetative growth;
- peak vegetation activity;
- maturation;
- senescence; and
- seasonal decline.

This motivates the construction of a **temporal crop signature library**.

The objective is not simply to calculate NDVI, but to transform repeated satellite observations into interpretable temporal information about agricultural systems.

---

# 5. Current Research Objective

The current implementation develops a reproducible workflow for extracting and comparing crop-specific NDVI time series.

The primary objectives are:

1. Identify representative crop reference locations.
2. Retrieve Sentinel-2 imagery covering the study areas.
3. Calculate NDVI for each available image.
4. Extract temporal NDVI observations from reference locations.
5. Organize observations by crop class.
6. Construct crop-specific temporal signatures.
7. Compare crop trajectories through time.
8. Establish a foundation for future automated crop classification and phenological analysis.

---

# 6. Study Areas

The current implementation works with two agricultural contexts.

## 6.1 Gezira Scheme

The Gezira study area is used for several agricultural crop reference classes.

The current crop reference dataset includes:

- Wheat
- Cotton
- Chickpea
- Abu70
- Fallow

The reference locations are used to extract temporal NDVI observations from Sentinel-2 imagery.

---

## 6.2 Kenana Sugar Scheme

Kenana is used for the Sugarcane reference signature.

A representative Sugarcane reference point is selected from the imported Sugarcane reference dataset.

The current implementation uses the Kenana Sentinel-2 collection for Sugarcane rather than mixing it with the Gezira image collection.

This separation preserves the distinction between the two study areas during temporal signature extraction.

---

# 7. Data and Earth Observation

The current workflow uses the:

**Sentinel-2 Surface Reflectance Harmonized**

image collection available through Google Earth Engine.

The main spectral bands used for NDVI calculation are:

- B8 — Near Infrared
- B4 — Red

NDVI is calculated as:

```text
NDVI = (NIR - Red) / (NIR + Red)
For Sentinel-2:
NDVI = (B8 - B4) / (B8 + B4)
8. Processing Workflow
The current processing workflow can be summarized as:
Study Area
    ↓
Sentinel-2 Image Collection
    ↓
Spatial Filtering
    ↓
Temporal Filtering
    ↓
Cloud Filtering
    ↓
NDVI Calculation
    ↓
Reference Crop Locations
    ↓
Temporal NDVI Extraction
    ↓
Crop-Specific NDVI Records
    ↓
Combined Crop Signature Dataset
    ↓
Temporal Signature Visualization
9. Reference Crop Selection
Representative reference locations are used to characterize crop-specific NDVI behaviour.
The current reference configuration is:
Crop
Reference
Wheat
Point 2
Cotton
Point 4
Chickpea
Original reference point
Abu70
Original reference point
Fallow
Original reference point
Sugarcane
Sugarcane Point 3
Onion was removed from the current final reference signature analysis.
Reference points are treated as representative observations rather than as a complete field inventory.
10. Temporal NDVI Extraction
For each satellite image, the workflow calculates the mean NDVI over the selected reference geometry.
Each observation is stored as a Feature containing:
Date
NDVI
Crop
Conceptually:
ImageCollection
      ↓
For each image
      ↓
Extract NDVI at reference location
      ↓
Create Feature
      ↓
Date + NDVI + Crop
The observations from the different crop classes are subsequently merged into a single temporal dataset.
11. Crop Signature Library
The current prototype produces temporal NDVI signatures for six classes:
Wheat
Cotton
Chickpea
Abu70
Fallow
Sugarcane
The signatures can be compared to investigate differences in temporal vegetation behaviour.
The resulting curves provide a basis for understanding crop phenology and for developing future classification approaches.
12. Why Time Series?
Temporal analysis provides information that cannot be obtained from a single image.
For example, two agricultural classes may have similar NDVI values on one acquisition date but different trajectories over an entire growing season.
A time-series approach can therefore provide additional information about:
timing of vegetation development;
duration of high vegetation activity;
seasonal decline;
crop growth patterns; and
differences between crop classes.
This is the main scientific motivation behind the crop signature library.
13. Historical Development
The project has evolved through several stages.
Stage 1 — Regional ENTRO Research
The initial research investigated Remote Sensing applications for irrigation management in the Eastern Nile.
The documented project included:
change detection;
evapotranspiration estimation; and
crop type identification.
Stage 2 — Crop NDVI Time-Series Analysis
The crop identification component developed toward temporal NDVI analysis.
The historical user manual documents:
NDVI time series in Kenana Area-1;
Sentinel-2 temporal analysis;
cloud-threshold processing;
Gezira crop-map integration;
regional crop comparison; and
crop-specific NDVI charts.
The manual specifically records NDVI time-series analysis for crops including cotton, wheat, Abu70, onion, chickpea and fallow, followed by further analysis involving sugarcane.
Stage 3 — Reproducible Crop Signature Library
The current repository reorganizes and extends this research into a reproducible computational workflow.
The objective is to move from individual exploratory scripts toward a documented research pipeline that can be reused and extended.
14. Current Implementation
The current Google Earth Engine implementation performs the following major tasks:
Kenana
Import Kenana study area.
Retrieve Sentinel-2 imagery.
Apply spatial and temporal filtering.
Apply cloud filtering.
Calculate NDVI.
Generate an NDVI image collection.
Extract the Sugarcane reference signature.
Gezira
Import the Gezira crop map.
Import agricultural reference points.
Separate crop reference classes.
Retrieve Sentinel-2 imagery.
Calculate NDVI.
Extract crop-specific temporal signatures.
Final Analysis
The extracted observations are combined into a single FeatureCollection.
The final dataset contains:
date
NDVI
Crop
The data are then visualized as a combined temporal NDVI signature chart.
15. Example Output
The principal output of the current workflow is a combined temporal NDVI signature chart.
The chart allows the temporal behaviour of the six crop/reference classes to be compared within a single visualization.
Example structure:
NDVI
1.0 | 
    |
0.8 |       Crop temporal trajectories
    |
0.6 |     /\       /\
    |    /  \     /  \
0.4 |___/____\___/____\____
    |
0.2 |
    +----------------------------> Time
The actual project output is generated dynamically in Google Earth Engine.
16. Historical Project Documentation
The original ENTRO project included a detailed user manual documenting the Remote Sensing workflows.
The manual includes step-by-step instructions and screenshots covering:
Earth Engine registration;
image filtering;
image selection;
NDVI calculation;
cloud reduction;
NDVI time-series analysis;
Kenana Area-1 analysis;
Gezira crop-map integration;
crop-specific charts; and
Sugarcane, Wheat and Cotton NDVI analysis.
The historical documentation is preserved in this repository as project documentation where appropriate.
17. Research Relevance
This project sits at the intersection of:
Earth Observation;
Remote Sensing;
GIS;
agricultural monitoring;
temporal data analysis;
environmental monitoring;
water management; and
geospatial data science.
The project demonstrates a progression from raw satellite imagery toward structured temporal environmental information.
18. Relevance to Earth-System and Environmental Monitoring
The methodology is applicable beyond crop identification.
The same general framework can be adapted to monitor temporal environmental processes by integrating:
Satellite observations
+
Ground observations
+
Temporal models
+
Environmental indicators
Potential applications include:
drought monitoring;
agricultural water management;
vegetation dynamics;
environmental change detection;
crop phenology;
land-cover monitoring; and
multi-scale ecosystem observation.
19. Future Development
The current repository represents a research prototype rather than a finished operational classification system.
Future development may include:
19.1 Phenological Parameter Extraction
Automatically derive temporal parameters such as:
seasonal minimum;
seasonal maximum;
timing of maximum NDVI;
amplitude;
growing-season duration;
rate of vegetation increase; and
rate of vegetation decline.
19.2 Automated Crop Classification
Develop supervised or machine-learning approaches using temporal features derived from Sentinel-2.
Potential approaches include:
Random Forest;
gradient-boosting methods;
temporal feature engineering; and
deep-learning approaches where appropriate.
19.3 Multi-Index Analysis
Extend beyond NDVI by incorporating additional Earth Observation indicators such as:
EVI;
SAVI;
LAI;
red-edge indices;
spectral reflectance features.
The historical project documentation already explored the use of LAI, EVI and NDVI to investigate subtle crop differences.
19.4 Climate and Hydrological Integration
Integrate additional environmental observations such as:
precipitation;
temperature;
evapotranspiration;
soil moisture; and
other climate variables.
The historical ENTRO workflow also included precipitation analysis and evapotranspiration estimation.
19.5 Spatial Crop-Area Estimation
Extend point-based signature extraction toward:
Crop signature
      ↓
Pixel/field classification
      ↓
Crop-type map
      ↓
Cultivated-area estimation
This would allow the temporal signatures to contribute directly to agricultural area monitoring.
20. Reproducibility
The repository is intended to make the computational development of the project more transparent and reproducible.
The code documents:
study-area preparation;
Earth Observation data access;
image filtering;
NDVI calculation;
reference-point selection;
temporal extraction;
FeatureCollection construction; and
final visualization.
The project uses Google Earth Engine because it provides direct access to large Earth Observation image collections and allows temporal processing without requiring local storage of the full satellite archive.
21. Repository Structure
The repository is organized approximately as follows:
crop-ndvi-signature-library/
│
├── README.md
│
├── gee/
│   ├── crop_signature_library.js
│   ├── ndvi_time_series.js
│   └── reference_points.js
│
├── figures/
│   ├── final_crop_ndvi_reference_signatures.png
│   └── sugarcane_reference_signature.png
│
├── documentation/
│   └── user_manual.pdf
│
├── data/
│   └── README.md
│
└── LICENSE
The exact repository structure may evolve as the project develops.
22. Data Availability and Responsible Use
The project uses Earth Observation datasets available through Google Earth Engine.
Reference datasets and historical project materials may contain information originating from previous research collaborations.
Therefore:
publicly available satellite datasets may be referenced;
proprietary or restricted datasets should not be redistributed;
sensitive field information should not be published;
original project data should only be shared where permission exists.
The repository focuses primarily on the computational methodology and reproducible analysis.

## 23. Historical Scientific Context

This repository should be understood as a continuation of a longer
research trajectory rather than as an isolated coding exercise.

The research originated from a practical regional irrigation-management
problem in the Eastern Nile and developed progressively through the
application of GIS, Remote Sensing, and Earth Observation methods.

The research progression can be summarized as:

Regional irrigation-management challenge
                ↓
GIS and Remote Sensing research
                ↓
Crop identification
                ↓
NDVI time-series analysis
                ↓
Phenological characterization
                ↓
Crop-specific temporal signatures
                ↓
Crop signature library
                ↓
Potential automated crop classification
                ↓
Agricultural and water-management applications

The original research investigated the potential of satellite
observations to provide information on cultivated areas and crop types
for improving irrigation-management decisions.

The present repository continues this research direction by organizing
the temporal NDVI observations into a reproducible crop-signature
workflow.

This progression is important because the computational work is driven
by a practical environmental and water-management problem rather than
by technology alone.


## 24. Original Research Project and Regional Collaboration

The original research was developed in the context of a regional
Young Professionals internship associated with the Eastern Nile
Technical Regional Office (ENTRO) of the Nile Basin Initiative (NBI).

The research involved a cross-border team representing:

- Sudan
- Ethiopia
- South Sudan

The project focused on applying GIS and Remote Sensing to practical
irrigation-management challenges in the Eastern Nile.

My contribution focused particularly on the use of satellite
Earth Observation and temporal vegetation information to characterize
cultivated crops and investigate their potential application to
irrigation management.

The original project investigated Sentinel-2 observations, NDVI
calculation, phenological parameters, crop-signature discrimination,
and supervised classification for estimating cultivated areas at
different crop-growth stages.

The present repository develops the crop-signature component of this
research into a more explicit and reproducible computational workflow.


## 25. Conference and Scientific Dissemination

The underlying research was subsequently developed into a scientific
conference contribution presented through the Nile Basin research
community.

**Associated publication:**

> **Ahmed, D. I. M. (2023, September 21).**
> *Using Sentinel-2 on Google Earth Engine in Crop Type Identification
> for Irrigation Management in Eastern Nile, Sudan.*
> 7th Nile Basin Development Forum (NBDF), Kampala, Uganda,
> Nile Basin Initiative.

The research was presented at the **7th Nile Basin Development Forum
(NBDF)** in Kampala, Uganda, in 2023.

The work represents an important transition from a regional
young-professionals research project into an internationally
disseminated scientific contribution.

The research addressed themes including:

- Climate change and environmental monitoring
- Agricultural monitoring
- Irrigation management
- Water-resource management
- Earth Observation
- Remote Sensing
- Sustainable development in the Nile Basin


### Conference Paper

The full conference paper is available through the Nile Basin
Initiative:

[**Using Sentinel-2 on Google Earth Engine in Crop Type Identification
for Irrigation Management in Eastern Nile, Sudan — CS64**](https://nilebasin.org/sites/default/files/2024-05/CS64.pdf)


### Citation

If you use this repository, its methodology, or derivative work based
on the original research, please cite:

```text
Ahmed, D. I. M. (2023, September 21).
Using Sentinel-2 on Google Earth Engine in Crop Type Identification
for Irrigation Management in Eastern Nile, Sudan.
7th Nile Basin Development Forum (NBDF), Kampala, Uganda,
Nile Basin Initiative.
In-text citation:
(Ahmed, 2023)
The author identity is presented in full in the repository author section, while the citation format follows the author form under which the publication is indexed in the author's Google Scholar profile.
26. Relation to My Research Profile
This project represents an important component of my broader research trajectory in GIS, Remote Sensing, and Earth Observation.
My research interests include:
Earth Observation
Remote Sensing
GIS and spatial analysis
Agricultural monitoring
Crop phenology
Temporal satellite analysis
Environmental monitoring
Water resources
Irrigation management
Geospatial decision support
Google Earth Engine
Satellite-based environmental applications
The project demonstrates my experience in translating a practical environmental problem into a computational Earth Observation workflow.
It also demonstrates the integration of:
A real-world environmental problem;
Satellite observations;
Temporal vegetation analysis;
Geospatial data processing;
Phenological interpretation; and
Decision-oriented agricultural applications.
This combination forms an important part of my research development towards quantitative Earth Observation and environmental data analysis.
27. Relation to Doctoral Research Interests
This project provides a foundation for further research in the temporal and spatial integration of Earth Observation data.
In particular, the work demonstrates experience with:
Satellite Earth Observation
Sentinel-2 imagery
NDVI time-series analysis
Temporal environmental observations
Crop phenology
Spatially distributed observations
Agricultural systems
Google Earth Engine
Geospatial data processing
Remote Sensing-based classification
Environmental and water-resource applications
The methodological direction is particularly relevant to research in which temporal satellite observations are combined with other observational or modelling sources.
A natural extension of this work would be the integration of:
Satellite observations;
Ground observations;
Environmental monitoring networks;
Earth system or process-based models; and
Data-driven or GeoAI methods.
Such integration could support more explainable and scalable environmental monitoring across different spatial and temporal scales.
This research trajectory is directly relevant to my interest in doctoral research involving temporal integration of Earth Observation data and environmental processes.
28. Author
Dania Ibnomer Mohamed Ahmed
GIS & Remote Sensing Geologist | Earth Observation Researcher
Research Interests
Earth Observation
Remote Sensing
GIS
Agricultural monitoring
Crop phenology
Environmental time series
Water resources
Irrigation management
Geospatial analysis
Google Earth Engine
Satellite-based environmental monitoring
Academic Profiles
Google Scholar:
https://scholar.google.com/citations?user=C6NCujgAAAAJ⁠�
ORCID:
https://orcid.org/0009-0003-1794-3726⁠�
29. Acknowledgements
The original research was developed through the:
Eastern Nile Technical Regional Office (ENTRO)
Nile Basin Initiative (NBI)
with participation from a regional Young Professionals team representing:
Sudan
Ethiopia
South Sudan
I acknowledge the contribution of the regional research team and the institutional context that enabled the original research.
The present repository is an individual research-development and reproducibility effort based on the crop-signature component of that research trajectory.
30. Project Status
Status: Research prototype / ongoing development
The current version demonstrates a reproducible workflow for extracting and visualizing temporal NDVI signatures from Sentinel-2 observations.
The workflow currently includes:
Sentinel-2 Earth Observation data
Google Earth Engine processing
NDVI calculation
Crop reference points
Reference-point selection
Temporal NDVI extraction
Crop-specific NDVI time series
Crop signature comparison
Combined crop-signature visualization
Sugarcane-specific analysis
A preliminary crop NDVI signature library
The current prototype includes six crop/reference classes:
Wheat
Cotton
Chickpea
Abu70
Fallow
Sugarcane
The resulting temporal signatures provide a basis for further investigation of crop phenology and automated crop-type identification.
Future development may include:
Increasing the number of reference samples;
Expanding the crop-signature library;
Extracting additional phenological metrics;
Integrating additional Sentinel-2 spectral indices;
Developing automated crop classification;
Quantifying classification uncertainty;
Validation against independent field observations;
Integration with agricultural and irrigation-management datasets; and
Extension toward scalable GeoAI-supported Earth Observation workflows.
31. References
The following references formed part of the scientific background document associated with the original research.
Kolm, K. E., & Case III, H. L. (1984). The identification of irrigated crop types and estimation of acreages from Landsat imagery. Photogrammetric Engineering and Remote Sensing.
Thenkabail, P. S., Smith, R. B., & De Pauw, E. (2002). Evaluation of narrowband and broadband vegetation indices for determining optimal hyperspectral wavebands for agricultural crop characterization. Photogrammetric Engineering and Remote Sensing, 68(6), 607–622.
Zhong, L. (2012). Efficient crop type mapping based on remote sensing in the Central Valley, California. University of California, Berkeley.
Foerster, S., Kaden, K., Foerster, M., & Itzerott, S. (2012). Crop type mapping using spectral–temporal profiles and phenological information. Computers and Electronics in Agriculture, 89, 30–40.
Raymond, L. H., Nalley, G. M., & Rettman, P. (1992). Evaluation of the use of remote-sensing data to identify crop types and estimate irrigated acreage, Uvalde and Medina counties, Texas, 1989. U.S. Geological Survey.
Ustuner, M., Sanli, F. B., Abdikan, S., Esetlili, M. T., & Kurucu, Y. (2014). Crop type classification using vegetation indices of RapidEye imagery. The International Archives of the Photogrammetry, Remote Sensing and Spatial Information Sciences, 40(7), 195.
Schmedtmann, J., & Campagnolo, M. L. (2015). Reliable crop identification with satellite imagery in the context of common agriculture policy subsidy control. Remote Sensing, 7(7), 9325–9346.
Fatima, S. M. (2013). Monitoring Sugarcane Growth Using MODIS Satellite Imagery Data. Biosciences, Sudan Academy of Sciences (SAS), Sudan.
Chapter 2: Literature Review / Remote Sensing and Crop Identification. Available at: http://shodhganga.inflibnet.ac.in/bitstream/10603/26920/7/07_chapter2.pdf⁠�
Remote Sensing / Agricultural Monitoring Presentation. Available at: https://iri.columbia.edu/~pceccato/IGARSS2013/Pietro_presentation.pdf⁠�
32. Associated Scientific Work
Primary associated publication
Ahmed, D. I. M. (2023, September 21). Using Sentinel-2 on Google Earth Engine in Crop Type Identification for Irrigation Management in Eastern Nile, Sudan. 7th Nile Basin Development Forum (NBDF), Kampala, Uganda, Nile Basin Initiative.
Conference Paper — CS64
33. Disclaimer
This repository represents an ongoing research prototype and should not be interpreted as an operational irrigation-management system.
The crop signatures presented here are reference observations derived from selected sample points and temporal satellite data. Their applicability to other locations, seasons, crop varieties, management conditions, or environmental contexts requires independent validation.
The repository is intended primarily to document the research workflow, support reproducibility, and provide a foundation for further development of crop-signature and Earth Observation methods.

