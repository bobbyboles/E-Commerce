import React from 'react'
import { useSelector } from "react-redux";
import { selectUsers } from '../slices/allUsersSlice';

const AdminViewUsers = () => {
  const users = useSelector(selectUsers);

   return (
      <div className='User-table'>
         <h3>View User Information:</h3>
         <table>
            <tr>
               <th>User Name:</th>
               <th>First Name:</th>
               <th>Last Name:</th>
               <th>Email:</th>
               <th>Home Address:</th>
               <th>Phone Number:</th>
            </tr>
            {users && users.length ? users.map((user) => {
               return(
                  <tr key={user.id}>
                     <td>{user.username}</td>
                     <td>{user.firstName}</td>
                     <td>{user.lastName}</td>
                     <td>{user.email}</td>
                     <td>{user.address}</td>
                     <td>{user.phone}</td>
                  </tr>
               )
            }): null}
         </table>
      </div>
   )
}

export default AdminViewUsers