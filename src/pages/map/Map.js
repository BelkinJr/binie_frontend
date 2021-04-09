import GoogleMapReact from "google-map-react";
import React, {useEffect, useRef, useState} from "react";
import { StyledMap } from "./Map.styled";
import { MapStyles } from "./mapStyle";
import wkoOrganicCoords from "../../data/WKO-organic.json";
import wkoCoords from "../../data/WKO.json";
import aukCoords from "../../data/AUK.json";
import {ToggleContext} from "../../lib/toggleContext";
import useSupercluster from "use-supercluster";
import GeneralBin from "../../components/bins/generalBin";
import OrganicBin from "../../components/bins/organicBin";
import Me from "../../components/Me/me";

const Marker = ({ children }) => children;

const mapOptions = {
    styles: MapStyles,
}
const nonOrganicPoints = wkoCoords.features.map((u) =>
    ( {
        type: "Feature",
        properties: {
            cluster: false, binId:u.properties.binId, category: u.properties.category
        },
        geometry: { type: "Point", coordinates: [u.geometry.coordinates[0], u.geometry.coordinates[1]] }
    } )
);

const organicPoints = wkoOrganicCoords.features.map((u) =>
    ( {
        type: "Feature",
        properties: {
            cluster: false, binId:u.properties.binId, category: u.properties.category
        },
        geometry: { type: "Point", coordinates: [u.geometry.coordinates[0], u.geometry.coordinates[1]] }
    } )
);

const auckPoints = aukCoords.features.map((u) =>
    ( {
        type: "Feature",
        properties: {
            cluster: false, binId:u.properties.binId, category: u.properties.category
        },
        geometry: { type: "Point", coordinates: [u.geometry.coordinates[0], u.geometry.coordinates[1]] }
    } )
);


const generalBins = nonOrganicPoints.concat(auckPoints)
const allBins = nonOrganicPoints.concat(organicPoints, auckPoints);

let mapCenter = { lat: -36.846785, lng: 174.766059 };

const Map = ({myPos, setMyPos}) => {

    const mapRef = useRef();

    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(17);

    const [animateMap, setAnimateMap] = useState(true);

    useEffect(() => {
        if (window.sessionStorage.getItem("firstTimeLoadMap") === null) {
            setAnimateMap(true);
            window.sessionStorage.setItem("firstTimeLoadMap", 1);
        } else {
            setAnimateMap(false);
        }
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            const watchID = navigator.geolocation.watchPosition(
                position => setMyPos({lat: position.coords.latitude, lng: position.coords.longitude, state: 1}),
                positionError => {
                    if (positionError.code !== 1) {
                        alert(`Error (${positionError.code}): ${positionError.message}`)
                    }
                },
                {})
        }
    }, [])

    const {organicToggle, generalBinsToggle} = React.useContext(ToggleContext);
    const [stateOrganicToggle] = organicToggle;
    const [stateGeneralBinsToggle] = generalBinsToggle;

    let points = allBins;

    if (stateOrganicToggle && stateGeneralBinsToggle) {
        points = [];
    } else if (stateOrganicToggle) {
        points = generalBins;
    } else if (stateGeneralBinsToggle) {
        points = organicPoints;
    }

    const {clusters, supercluster} = useSupercluster({
        points,
        bounds,
        zoom,
        options: {radius: 75, maxZoom: 20}
    });

    function success(map, position) {
        map.panTo({lat: position.coords.latitude, lng: position.coords.longitude});
    }

    return (
        <StyledMap animateMap={animateMap}>
            <GoogleMapReact
                options={mapOptions}
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={mapCenter}
                defaultZoom={17}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({map}) => {
                    mapRef.current = map;
                    map.setOptions({draggableCursor: 'default', disableDefaultUI: true});
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            position =>  success(map, position),

                            positionError => {
                                if (positionError.code !== 1) {
                                    alert(`Error (${positionError.code}): ${positionError.message}`)
                                }
                            },
                        );
                    }
                }}
                onChange={({zoom, bounds}) => {
                    setZoom(zoom);
                    setBounds([
                        bounds.nw.lng,
                        bounds.se.lat,
                        bounds.se.lng,
                        bounds.nw.lat
                    ]);
                }}
            >
                {clusters.map(cluster => {
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const {
                        cluster: isCluster,
                        point_count: pointCount
                    } = cluster.properties;
                    const organic = (element) => element.properties.category === "organic"
                    const non_organic = (element) => element.properties.category === "non-organic"

                    if (isCluster) {
                        let binArray = supercluster.getLeaves(cluster.id, Infinity, 0)
                        if ((binArray.some(organic)) && (binArray.some(non_organic))) {
                            return (
                                <Marker
                                    key={`cluster-${cluster.id}`}
                                    lat={latitude}
                                    lng={longitude}
                                >
                                    <div
                                        className="cluster-marker-mixed"
                                        style={{
                                            width: `${19 + (pointCount / points.length) * 50}px`,
                                            height: `${19 + (pointCount / points.length) * 50}px`
                                        }}
                                        onClick={() => {
                                            const expansionZoom = Math.min(
                                                supercluster.getClusterExpansionZoom(cluster.id),
                                                20
                                            );
                                            mapRef.current.setZoom(expansionZoom);
                                            mapRef.current.panTo({lat: latitude, lng: longitude});
                                        }}
                                    >
                                        {pointCount}
                                    </div>
                                </Marker>
                            );
                        } else if (binArray.some(organic)) {
                            return (
                                <Marker
                                    key={`cluster-${cluster.id}`}
                                    lat={latitude}
                                    lng={longitude}
                                >
                                    <div
                                        className="cluster-marker-org"
                                        style={{
                                            width: `${19 + (pointCount / points.length) * 50}px`,
                                            height: `${19 + (pointCount / points.length) * 50}px`
                                        }}
                                        onClick={() => {
                                            const expansionZoom = Math.min(
                                                supercluster.getClusterExpansionZoom(cluster.id),
                                                20
                                            );
                                            mapRef.current.setZoom(expansionZoom);
                                            mapRef.current.panTo({lat: latitude, lng: longitude});
                                        }}
                                    >
                                        {pointCount}
                                    </div>
                                </Marker>
                            )
                        } else {
                            return (
                                <Marker
                                    key={`cluster-${cluster.id}`}
                                    lat={latitude}
                                    lng={longitude}
                                >
                                    <div
                                        className="cluster-marker-norg"
                                        style={{
                                            width: `${19 + (pointCount / points.length) * 50}px`,
                                            height: `${19 + (pointCount / points.length) * 50}px`
                                        }}
                                        onClick={() => {
                                            const expansionZoom = Math.min(
                                                supercluster.getClusterExpansionZoom(cluster.id),
                                                20
                                            );
                                            mapRef.current.setZoom(expansionZoom);
                                            mapRef.current.panTo({lat: latitude, lng: longitude});
                                        }}
                                    >
                                        {pointCount}
                                    </div>
                                </Marker>
                            )
                        }
                    } else if (cluster.properties.category === "non-organic") {
                        return (
                            <Marker
                                key={cluster.properties.binId}
                                lat={latitude}
                                lng={longitude}
                            >
                                <GeneralBin/>
                            </Marker>
                        );
                    }
                    return (
                        <Marker
                            key={cluster.properties.binId}
                            lat={latitude}
                            lng={longitude}
                        >
                            <OrganicBin/>
                        </Marker>
                    );
                })}
                <Marker key={1111111111111111} lat={myPos.lat} lng={myPos.lng}>
                    <Me/>
                </Marker>
            </GoogleMapReact>
        </StyledMap>
    );
}

export default Map;
