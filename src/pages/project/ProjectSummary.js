import { Avatar, Typography, Button, Card } from "antd"
import { useFirestore } from "../../hooks/useFirestore"
import { useHistory } from 'react-router-dom'
import { useAuthContext } from "../../hooks/useAuthContext"

export default function ProjectSummary({ project }) {
  const { deleteDocument } = useFirestore('projects')
  const { user } = useAuthContext()
  const history = useHistory()

  const handleClick = () => {
    deleteDocument(project.id)
    history.push('/')
  }

  const { Title } = Typography;

  return (
    <div>
      <div style={{padding: "15px"}}>
      <Card 
        type="inner"
        title={project.name}
        bordered={false}>
        <Title level={5}>
          Project due by {project.dueDate.toDate().toDateString()}
        </Title>
        <Title level={2}>
          {project.details}
        </Title>
        <Title level={5}>Project assigned to</Title>
        <div className="assigned-users">
          {project.assignedUsersList.map(user => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
    <div style={{marginTop: "1em"}}>
    {user.uid === project.createdBy.id && (
        <button type="primary" className="btn" onClick={handleClick}>Mark as Complete</button>
      )}
    </div>
      </Card>
      </div>
    </div>
  )
}

