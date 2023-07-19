# SmartWorld Frontend by FIWARE [<img src="https://img.shields.io/badge/NGSI-LD-d6604d.svg" width="90"  align="left" />](https://www.etsi.org/deliver/etsi_gs/CIM/001_099/009/01.04.01_60/gs_cim009v010401p.pdf)[<img src="https://fiware.github.io/tutorials.IoT-Agent/img/fiware.png" align="left" width="162">](https://www.fiware.org/)<br/>

[![FIWARE IoT Agents](https://nexus.lab.fiware.org/repository/raw/public/badges/chapters/iot-agents.svg)](https://github.com/FIWARE/catalogue/blob/master/iot-agents/README.md)
[![License: MIT](https://img.shields.io/github/license/fiware/tutorials.Iot-Agent.svg)](https://opensource.org/licenses/MIT)
[![Support badge](https://img.shields.io/badge/tag-fiware-orange.svg?logo=stackoverflow)](https://stackoverflow.com/questions/tagged/fiware)
[![JSON LD](https://img.shields.io/badge/JSON--LD-1.1-f06f38.svg)](https://w3c.github.io/json-ld-syntax/)

# Overview
This repository contains the source files for the frontend of `Fiware's SmartWorld`. <br>
The frontend is written in `Typescript` using `Vite.js`, and is compatible with the simulation mode of the `SmartWorld` project.

# Pages:
## Digital Twin:
On the left there is a map of the city with widgets on top that display the latest state observed of different sensors and devices. <br>
Each widget is a component that sends GET requests to the `context broker` every x seconds. <br>
On the right there is a Dashboard that displays an overview of the SmartWorld's state.
## Smart Data Models:
In this page there are buttons that send requests to the `context broker` and display the result in a box bellow. <br>
This can be used to illustrate the format of the data defined by `NGSI-LD`.
## Train Control:
In this page you can control the speed of the `SmartTrain` and get the latest state observed by the `context broker`. <br>
This page can be used to illustrate how to control devices using the `orion context broker` and `iot-agent`

# Running
Installation:
```shell
 npm install
```
Development mode (context broker is in localhost)
```shell
 npm run dev -- --host --port 8000
```

Production mode (context broker in other ip)
```shell
 npm run dev -- --host --port 8000
```