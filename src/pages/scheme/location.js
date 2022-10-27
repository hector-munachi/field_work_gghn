// just a sample of data to create

const LocationScheme = {
    uid: "",
    locationName: "",
    locationDesc: "",
    locationCoordinates: [],
    locationStatus: "pending", // could be ["pending", "done"]
    localTimeStamp: (new Date()).getTime()
    // time
}

export default LocationScheme;