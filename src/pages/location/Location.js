import React, {useState, useEffect} from 'react'  
import { Card, Divider, Button } from "antd"
import AddLocationPopUp from './AddLocationPopUp'
import Constant from '../../const/defination'
import { projectFirestore } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollectionPlain } from '../../hooks/useCollectionPlain'
import { Link } from 'react-router-dom'

const Location = () => {
  const [showAddPopUp, setShowAddPopUp] = useState(false)
  const {user: {uid, email}, dispatch} = useAuthContext();
  const myLocations = useCollectionPlain(Constant.COLLECTION.LOCATION, ["uid", "==", uid], ["localTimeStamp"]);
  
  return (
    <div>
      <Divider/>
      <Card>
        <Button onClick={()=> setShowAddPopUp(true)} type='primary'>New Location</Button>

        {/* list all location */}
        {
          (myLocations.documents || []).map((_item, index) =>{
            return (
              <Link to={`/live-location/${_item.id}`} key={index}>
                <div style={{ borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.65)', cursor: 'pointer', margin: 10, marginTop: 20 }}>
                  <h2>{_item.locationName}</h2>
                  <div>{_item.locationDesc}</div>
                  <Divider/>
                </div>
              </Link>
            )
          })
        }
      </Card>

      {showAddPopUp && <AddLocationPopUp setShowAddPopUp={setShowAddPopUp} />}
    </div>
  )
}

export default Location