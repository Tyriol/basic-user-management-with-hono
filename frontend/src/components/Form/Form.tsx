import { useState, useEffect } from 'react'
import type { User } from '../../../../backend/types/types.ts'

interface formProps {
  addUser: (user: User) => void
  updateUser: (user: User) => void
  editingUser: User | null
  setEditingUser: (user: User | null) => void
}

function Form({ addUser, updateUser, editingUser, setEditingUser }: formProps) {
  const [formData, setFormData] = useState<User>({
    name: '',
    id: '',
    email: '',
    role: '',
  })

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser)
    }
  }, [editingUser])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (editingUser) {
      updateUser(formData)
    } else {
      addUser(formData)
    }
    setFormData({ name: '', id: '', email: '', role: '' })
    setEditingUser(null)
  }

  return (
    <form onSubmit={handleSubmit}>
      {editingUser ? (
        <h2>Update User</h2>
      ) : (
        <h2>Add a new User</h2>
      )}
      <div className="label-input">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="label-input">
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />
      </div>
      <div className="label-input">
        <label htmlFor="email">Email Address:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="label-input">
        <label htmlFor="role">Role:</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />
      </div>
      <button type="submit">{editingUser ? "Update" : "Add User"}</button>
    </form>
  )
}

export default Form
