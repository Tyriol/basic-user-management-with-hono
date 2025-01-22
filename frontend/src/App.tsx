import { useState, useEffect } from 'react'
import './App.css'
import type { User, Users } from '.,/../../../backend/types/types.ts'
import Form from './components/Form/Form.tsx'

function App() {
    const [users, setUsers] = useState<Users>([]);
    const [error, setError] = useState<string | null>(null);
    const [editingUser, setEditingUser] = useState<User | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/users')
                let userData = await response.json()
                setUsers(userData.users)
            } catch (err: any) {
                setError(err.message)
                console.error(error)
                setUsers([])
            }
        }
        fetchUsers()
    }, [])

    const addUser = async (newUser: User) => {
      setUsers([...users, newUser]);
      await fetch(
        "http://localhost:3000/api/users",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
    }

    return (
        <>
            <header>
                <h1>User Management</h1>
            </header>
            <main>
                <Form addUser={addUser} updateUser="" editingUser={editingUser} setEditingUser={setEditingUser} />
                <ul>
                    {users.map((user: User) => {
                        return (
                            <li className="user" key={user.id}>
                                <div className="user-name">
                                    Name: {user.name}
                                </div>
                                <div className="user-id">ID: {user.id}</div>
                                <div className="email-address">
                                    Email Address: {user.email}
                                </div>
                                <div className="role">Role: {user.role}</div>
                                <div className="actions">
                                    <button onClick={() => setEditingUser(user)}>Update</button>
                                    <button>Delete</button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </main>
        </>
    )
}

export default App
