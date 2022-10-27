import React from 'react'
import { useParams } from "react-router-dom"
import Constant from '../../const/defination';
import { useDocument } from '../../hooks/useDocument';
import { useGeolocated } from "react-geolocated";
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"

export default function LiveLocation() {
    const {id} = useParams()
    const _doc = useDocument(Constant.COLLECTION.LOCATION, id);
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    console.log(coords, "coords")

    const getCurrentLocation = ()=>{
        return {
            latitude: coords.latitude,
            longitude: coords.longitude,
        }
    }

    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
            {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
        </GoogleMap>
    ))

    return (
        <div>
            {
                (_doc.document === undefined) ? "loading" :

                <div>
                    <p style={{ textAlign: 'right', fontStyle: 'italic' }}>{_doc.document?.locationStatus}</p>
                    <h2>{_doc.document?.locationName}</h2>
                    <br />

                    <p>{_doc.document?.locationDesc}</p>

                    {/* map component */}
                    <div style={{ backgroundColor: 'red' }}>
                    <MyMapComponent
                        isMarkerShown
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />

                    </div>
                </div>
            }
        </div>
    )
}
