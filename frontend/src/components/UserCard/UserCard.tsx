import type { User } from '../../../../backend/types/types'

interface UserCardProps {
  user: User
  deleteUser: (user: User) => void
  setEditingUser: (user: User) => void
}

function UserCard({ user, deleteUser, setEditingUser }: UserCardProps) {
  return (
    <li className="user">
      <div className="user-name">Name: {user.name}</div>
      <div className="user-id">ID: {user.id}</div>
      <div className="email-address">Email Address: {user.email}</div>
      <div className="role">Role: {user.role}</div>
      <div className="actions">
        <button className="update" onClick={() => setEditingUser(user)}>Update</button>
        <button className="delete" onClick={() => deleteUser(user)}>Delete</button>
      </div>
    </li>
  )
}

export default UserCard
