import React, { useState } from 'react'
import { useParams } from "react-router-dom"
import Constant from '../../const/defination';
import { useDocument } from '../../hooks/useDocument';
import { useGeolocated } from "react-geolocated";
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from "react-google-maps"
import { Button } from 'antd';
import { updateLocation } from '../../function';

export default function LiveLocation() {
    const {id} = useParams()
    const [addButtonText, setAddButtonText] = useState("CAPTURE CURRENT LOCATION");
    const _doc = useDocument(Constant.COLLECTION.LOCATION, id);
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
            watchPosition: true
        });

    console.log(_doc, "_doc")

    const getCurrentLocation = ()=>{
        return {
            latitude: coords.latitude,
            longitude: coords.longitude,
            timestamp: (new Date()).getTime()
        }
    }

    const addToLocation = async()=>{
        setAddButtonText("processing")
        const coordinate = getCurrentLocation();
        console.log(_doc, "_doc")
        const {document: {locationCoordinates, id}} = _doc;

        let temp = locationCoordinates;
        temp.push(coordinate)

        // update firebase for entry
        const payload = {
            locationCoordinates: temp
        }

        await updateLocation(payload, id)

        setAddButtonText("CAPTURE CURRENT LOCATION")
    }

    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={ ((props.markersList || []).length > 0) ? {lat: (props.markersList)[0].latitude, lng: (props.markersList)[0].longitude} : { lat: -34.397, lng: 150.644 }}
        >
            {props.isMarkerShown && (
                props.markersList.map(_item => {
                    return (<Marker position={{ lat: _item.latitude, lng: _item.longitude }} />)
                })
                
            )}
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

                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <p>{_doc.document?.locationDesc}</p>
                        <Button onClick={()=> addToLocation()} type='primary' disabled={ (_doc.document?.locationStatus !== "pending") } >{addButtonText}</Button>
                    </div>

                    {/* map component */}
                    <div style={{ backgroundColor: 'red' }}>
                    <MyMapComponent
                        isMarkerShown
                        markersList={_doc.document?.locationCoordinates || []}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpGZZEKIrg51H_McZNKQJ5h35jbDOppZc&v=3.exp&libraries=geometry,drawing,places"
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
