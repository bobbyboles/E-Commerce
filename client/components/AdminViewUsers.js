import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { deleteUserAsync, selectUsers } from '../slices/allUsersSlice';

const AdminViewUsers = () => {
   const dispatch = useDispatch();
   const users = useSelector(selectUsers);

   return (
      <div >
         <h3>View User Information:</h3>
         <table>
            <tr>
               <th>User Name:</th>
               <th>First Name:</th>
               <th>Last Name:</th>
               <th>Email:</th>
               <th>Home Address:</th>
               <th>Phone Number:</th>
               <th>Delete User:</th>
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
                     <td><button onClick={() => {dispatch(deleteUserAsync(user.id))}}>Delete</button></td>
                  </tr>
               )
            }): null}
         </table>
      </div>
   )
}

export default AdminViewUsers
