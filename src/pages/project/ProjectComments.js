import { useState } from "react"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Card, Avatar } from "antd"

export default function ProjectComments({ project }) {
  const { user } = useAuthContext()
  const { updateDocument, response } = useFirestore('projects')
  const [newComment, setNewComment] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    }
    
    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    })
    if (!response.error) {
      setNewComment('')
    }
  }

  return (
    <div>
     <div style={{padding: "15px"}}>
      <Card type="inner" title="Project Comments">
<ul>
  {project.comments.length > 0 && project.comments.map(comment => (
    <li key={comment.id}>
      <div className="comment-author">
        <Avatar src={comment.photoURL} />
        <p>{comment.displayName}</p>
      </div>
      <div className="comment-date">
        <p>{formatDistanceToNow(comment.createdAt.toDate(), {addSuffix: true})}</p>
      </div>
      <div className="comment-content">
        <p>{comment.content}</p>
      </div>
    </li>
  ))}
</ul>

<form className="add-comment" onSubmit={handleSubmit}>
  <label>
    <span>Add new Comment</span>
    <textarea
      required 
      onChange={(e) => setNewComment(e.target.value)}
      value={newComment}
    ></textarea>
  </label>
  <button className="btn">Add Comment</button>
</form>
      </Card>
     </div>
    </div>
  )
}