// import React from 'react'
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import TextField from '@mui/material/TextField';
// import EditIcon from '@mui/icons-material/Edit';

// const UpdateMyComment = ({ commentid, message }) => {

//         const updateThisComment = async e => {
//         e.preventDefault();
//         try {
//             const backendUrl = "https://foodcare.vercel.app"
//             const options = {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
//                     'Content-Type': 'application/json'
//                 },
//                 method: 'PUT',
//                 body: JSON.stringify({message}),
//             }
//              const response =  await fetch(`${backendUrl}/comments/updatemycomment/${commentid}`, options)
//             const { success } = await response.json()
//           console.log("success update", success)
//           window.location.reload();
//         }
//         catch (error) {
//             console.log('error', error)
//         }
//     }
//   return (
//     <div><Button onClick={updateThisComment}><EditIcon fontSize="small" color='secondary'/></Button></div>
//   )
// }

// export default UpdateMyComment