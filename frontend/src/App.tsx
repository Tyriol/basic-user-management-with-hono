import { useState, useEffect } from 'react'
import './App.css'
import type { User, Users } from '.,/../../../backend/types/types.ts'
import Form from './components/Form/Form.tsx'
import UserCard from './components/UserCard/UserCard.tsx'

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

    const updateUser = async (updatedUser: User) => {
      const updatedUsers = users.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      );
      setUsers(updatedUsers);
      await fetch(
        `http://localhost:3000/api/users/${updatedUser.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
    }

    const deleteUser = async (userToDelete: User) => {
      const response = await fetch(
        `http://localhost:3000/api/users/${userToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userToDelete),
        }
      );
      const usersAfterDelete = await response.json();      
      setUsers(usersAfterDelete.usersAfterDelete);
    }

    return (
        <>
            <header>
                <h1>User Management</h1>
            </header>
            <main>
                <Form addUser={addUser} updateUser={updateUser} editingUser={editingUser} setEditingUser={setEditingUser} />
                <ul>
                    {users.map((user: User) => {
                        return (
                            <UserCard user={user} deleteUser={deleteUser} setEditingUser={setEditingUser}/>
                        )
                    })}
                </ul>
            </main>
        </>
    )
}

export default App
