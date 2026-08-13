# Crop NDVI Signature Library

### Temporal Earth Observation for Agricultural Crop Characterisation and Irrigation Management

**Author:** Dania Ibnomer Mohamed Ahmed  
**Study Areas:** Kenana Sugar Scheme & Gezira Scheme, Sudan  
**Satellite:** Sentinel-2  
**Platform:** Google Earth Engine

---

## About

This repository documents a research workflow for developing a temporal crop-signature library using Sentinel-2 NDVI time series.

The work originated in **2018** during my participation in the **Internship for Young Professionals** at the **Eastern Nile Technical Regional Office (ENTRO)** of the **Nile Basin Initiative (NBI)** in Addis Ababa, Ethiopia.

The original research investigated the use of satellite-derived vegetation signatures for crop characterisation and irrigation-management applications in the Eastern Nile.

The work was later developed further and incorporated into **Farm Hub**, an agricultural technology project that I led in **2020–2021** as part of an African Development Bank technology incubation programme focused on **women's empowerment through modern agricultural technologies**.

Farm Hub was selected as **one of seven projects from approximately 2,000 submissions** and underwent a six-month incubation programme. The project was approved for a **US$100,000 grant**, but the funding was ultimately not disbursed following the **2021 military coup in Sudan**, which disrupted the programme and associated financial support.

Within Farm Hub, Earth Observation was used as a decision-support layer to reduce uncertainty in agricultural systems by combining satellite-derived crop-condition information with farmer, market, and logistics data.

The scientific work was subsequently developed into a conference paper:

> **Ahmed, D. I. M. (2023). Using Sentinel-2 on Google Earth Engine in Crop Type Identification for Irrigation Management in Eastern Nile, Sudan. 7th Nile Basin Development Forum (NBDF7), Kampala, Uganda, Nile Basin Initiative.**

---

## Crop Reference Classes

The current prototype contains temporal NDVI reference signatures for:

- Wheat
- Cotton
- Chickpea
- Abu70
- Fallow
- Sugarcane

The signatures provide a basis for investigating crop phenology and supporting future automated crop-type identification.

---

## Method

The workflow uses:

- Sentinel-2 Surface Reflectance data
- Google Earth Engine
- NDVI time-series analysis
- GPS-based crop reference samples
- Temporal vegetation profiles
- Reference-point extraction and comparison

The Kenana and Gezira datasets are processed separately because they represent different study areas and crop contexts.

---

## Future Development

Future development may include:

- Expanding reference samples and crop classes
- Extracting phenological metrics
- Adding additional Sentinel-2 indices
- Automated crop classification
- Classification uncertainty assessment
- Independent field validation
- Integration with irrigation and agricultural datasets
- GeoAI-supported Earth Observation workflows

---

## Repository Purpose

This repository is a **research prototype** intended to document the workflow, preserve reproducibility, and provide a foundation for further development of crop-signature and Earth Observation methods.

The reference signatures are derived from selected samples and should not be considered universally applicable without independent validation across seasons, locations, crop varieties, and management conditions.
