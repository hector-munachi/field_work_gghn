import { useParams } from "react-router-dom"
import { useDocument } from '../../hooks/useDocument'
import { Spin, Alert, Row, Col, Divider } from 'antd'

// components
import ProjectComments from "./ProjectComments"
import ProjectSummary from "./ProjectSummary"


export default function Project() {
  const { id } = useParams()
  const { document, error } = useDocument('projects', id)

  if (error) {
    return <Alert
    // message="Error Text"
    // description="Error Description Error Description Error Description Error Description"
    type="error"
  >{error}</Alert>
  }
  if (!document) {
    return <div style={{marginTop: "2em", display: "flex", justifyContent: "center"}}><Spin tip="Loading..."/></div>
  }

  return (
    <div>
      <div style={{marginTop: "1em"}}>
        <Divider/>
      <Row>
      <Col lg={12} md={24} s={24} xs={24}>
            <ProjectSummary project={document} />
          </Col>
          <Col lg={12} md={24} s={24} xs={24}>
            <ProjectComments project={document} />
          </Col>
      </Row>
      </div>
    </div>
  )
}
