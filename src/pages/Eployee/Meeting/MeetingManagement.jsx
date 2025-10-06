// import React, { useContext, useState } from 'react';
// import Link_Button from '../../shared/Link_Button';
// import { useQuery } from '@tanstack/react-query';
// import { base_url } from '../../../layout/Title';
// import DeleteModal from '../../../Hook/DeleteModal';
// import Swal from 'sweetalert2';
// import { AuthContext } from '../../../context/UseContext/UseContext';


// const MeetingManagement = () => {

//       const { user } = useContext(AuthContext);
//       console.log(user);

//       // console.log(`${base_url}/meeting/get-meetings?email=${user?.email}`,);

//       const { data: meting_data = [], refetch, isLoading } = useQuery({
//             queryKey: ['meting_data', user?.email], // Add email to the queryKey for proper caching
//             queryFn: async () => {
//                   const res = await fetch(
//                         `${base_url}/meeting/get-meetings?email=${user?.email}`,
//                         {
//                               headers: {
//                                     'content-type': 'application/json',
//                                     'author': 'bright_future_soft',
//                               },
//                               method: 'GET',
//                         }
//                   );
//                   const data = await res.json();
//                   return data.data;
//             },
//             enabled: !!user?.email, // Ensures it's not null/undefined/empty string
//       });


//       const handleStatusUpdate = (status, id) => {

//             fetch(`${base_url}/meeting/edit-meeting?meeting_id=${id}`, {
//                   method: 'PUT',
//                   headers: {
//                         'content-type': 'application/json',
//                         'author': 'bright_future_soft'
//                   },
//                   body: JSON.stringify({ status: status, })
//             })
//                   .then(res => res.json())
//                   .then(data => {
//                         if (data.success) {
//                               Swal.fire(data.message, ' ', 'success')
//                               refetch()


//                         }
//                         else {
//                               Swal.fire(data.message, '', 'info')
//                         }
//                   })
//       }




//       const [deleteId, setDeletId] = useState("");
//       const [deletePopUp, setDeletePopUp] = useState(false);
//       const [isDelete, setIsDelete] = useState(false);

//       const delete_meeting = (id) => {
//             setDeletePopUp(true);
//             setDeletId(id);
//       };

//       if (isDelete) {
//             fetch(`${base_url}/meeting/delete-meeting?meeting_id=${deleteId}`, {
//                   headers: {
//                         'content-type': 'application/json',
//                         'author': 'bright_future_soft'
//                   },
//                   method: 'DELETE'
//             }).then(res => res.json())
//                   .then(data => {
//                         if (data.success) {
//                               Swal.fire(data.message, ' ', 'success')
//                               refetch()
//                               setIsDelete(false);
//                               setDeletId("");
//                         }
//                         else {
//                               Swal.fire(data.message, '', 'info')
//                         }
//                   })

//       }

//       const [dropdownOpen, setDropdownOpen] = useState(false)


//       return (
//             <div>
//                   <div class="py-12  sm:py-16 lg:py-20">
//                         <div class="px-4  sm:px-6 lg:px-8">

//                               <Link_Button name={'Add New Meeting'} url={'/dashboard/meeting_management/new'} />
//                               <div class=" ">
//                                     <div class="overflow-hidden rounded-xl">
//                                           <div class="py-6">
//                                                 <div class="sm:flex sm:items-start sm:justify-between">
//                                                       <div>
//                                                             <p class="text-lg font-bold text-gray-100">Meeting Management</p>
//                                                             <p class="mt-1 text-sm font-medium text-gray-500">Here is all meeting information</p>
//                                                       </div>


//                                                 </div>
//                                           </div>

//                                           <div className="h-0 w-0">
//                                                 {" "}
//                                                 <DeleteModal
//                                                       setOpenModal={setDeletePopUp}
//                                                       OpenModal={deletePopUp}
//                                                       setIsDelete={setIsDelete}
//                                                 />
//                                           </div>

//                                           <div className=" p-6 px-0">

//                                                 <div className="space-y-4">
//                                                       {
//                                                             meting_data?.map((meeting) => {
//                                                                   const dateTime = new Date(meeting?.date);
//                                                                   const formattedDate = dateTime.toLocaleDateString('en-US', {
//                                                                         weekday: 'long',
//                                                                         year: 'numeric',
//                                                                         month: 'long',
//                                                                         day: 'numeric'
//                                                                   });
//                                                                   const formattedTime = dateTime.toLocaleTimeString('en-US', {
//                                                                         hour: '2-digit',
//                                                                         minute: '2-digit',
//                                                                         hour12: true
//                                                                   });




//                                                                   const getStatusColor = (status) => {
//                                                                         switch (status) {
//                                                                               case "pending":
//                                                                                     return "bg-amber-100 text-amber-800 border-amber-200"
//                                                                               case "process":
//                                                                                     return "bg-emerald-100 text-emerald-800 border-emerald-200"
//                                                                               case "end":
//                                                                                     return "bg-red-100 text-red-800 border-red-200"
//                                                                               default:
//                                                                                     return "bg-gray-100 text-gray-800 border-gray-200"
//                                                                         }
//                                                                   }

//                                                                   const getStatusDotColor = (status) => {
//                                                                         switch (status) {
//                                                                               case "pending":
//                                                                                     return "text-amber-500"
//                                                                               case "process":
//                                                                                     return "text-emerald-500"
//                                                                               case "end":
//                                                                                     return "text-red-500"
//                                                                               default:
//                                                                                     return "text-gray-500"
//                                                                         }
//                                                                   }

//                                                                   const isManager = user?.designation === "Chief Executive Officer" || user?.designation === "manager"
//                                                                   const isParticipant = meeting?.selectedUsers?.some((participant) => participant?.email === user?.email)



//                                                                   return (
//                                                                         <div className="border border-gray-400 rounded-xl text-white p-6 mb-6">
//                                                                               <div className="flex items-start justify-between">
//                                                                                     {/* Meeting Info */}
//                                                                                     <div className="flex-1 min-w-0">
//                                                                                           <div className="flex items-start justify-between mb-4">
//                                                                                                 <div className="flex-1">
//                                                                                                       <h3 className="text-lg font-semibold  mb-1">{meeting?.title}</h3>
//                                                                                                       <p className="text-sm text-gray-300 mb-3" dangerouslySetInnerHTML={{ __html: meeting?.agenda }}></p>

//                                                                                                       {/* Status Badge */}
//                                                                                                       <div className="inline-flex items-center">
//                                                                                                             <span
//                                                                                                                   className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(meeting?.status)}`}
//                                                                                                             >
//                                                                                                                   <svg
//                                                                                                                         className={`w-2 h-2 mr-1.5 ${getStatusDotColor(meeting?.status)}`}
//                                                                                                                         fill="currentColor"
//                                                                                                                         viewBox="0 0 8 8"
//                                                                                                                   >
//                                                                                                                         <circle cx="4" cy="4" r="3" />
//                                                                                                                   </svg>
//                                                                                                                   {meeting?.status}
//                                                                                                             </span>
//                                                                                                       </div>
//                                                                                                 </div>

//                                                                                                 {/* Actions Dropdown */}
//                                                                                                 <div className="relative ml-4 ">
//                                                                                                       <button
//                                                                                                             onClick={() => setDropdownOpen(meeting?._id)}
//                                                                                                             className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//                                                                                                       >
//                                                                                                             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                                                                                                                   <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
//                                                                                                             </svg>
//                                                                                                       </button>

//                                                                                                       {dropdownOpen === meeting?._id && (
//                                                                                                             <>
//                                                                                                                   {/* Backdrop */}
//                                                                                                                   <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />

//                                                                                                                   {/* Dropdown Menu */}
//                                                                                                                   <div className="absolute z-50 right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 ">
//                                                                                                                         {/* Go Meeting - Always visible for participants */}
//                                                                                                                         {(isManager || isParticipant) && (
//                                                                                                                               <a
//                                                                                                                                     href={meeting?.link}
//                                                                                                                                     target="_blank"
//                                                                                                                                     rel="noopener noreferrer"
//                                                                                                                                     className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
//                                                                                                                               >
//                                                                                                                                     <svg
//                                                                                                                                           className="w-4 h-4 mr-3 text-blue-500"
//                                                                                                                                           fill="none"
//                                                                                                                                           stroke="currentColor"
//                                                                                                                                           viewBox="0 0 24 24"
//                                                                                                                                     >
//                                                                                                                                           <path
//                                                                                                                                                 strokeLinecap="round"
//                                                                                                                                                 strokeLinejoin="round"
//                                                                                                                                                 strokeWidth={2}
//                                                                                                                                                 d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
//                                                                                                                                           />
//                                                                                                                                     </svg>
//                                                                                                                                     Join Meeting
//                                                                                                                               </a>
//                                                                                                                         )}

//                                                                                                                         {/* Manager-only actions */}
//                                                                                                                         {isManager && (
//                                                                                                                               <>

//                                                                                                                                     <button
//                                                                                                                                           onClick={() => {
//                                                                                                                                                 handleStatusUpdate("end", meeting._id)
//                                                                                                                                                 setDropdownOpen(false)
//                                                                                                                                           }}
//                                                                                                                                           className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
//                                                                                                                                     >
//                                                                                                                                           <svg
//                                                                                                                                                 className="w-4 h-4 mr-3 text-gray-500"
//                                                                                                                                                 fill="none"
//                                                                                                                                                 stroke="currentColor"
//                                                                                                                                                 viewBox="0 0 24 24"
//                                                                                                                                           >
//                                                                                                                                                 <path
//                                                                                                                                                       strokeLinecap="round"
//                                                                                                                                                       strokeLinejoin="round"
//                                                                                                                                                       strokeWidth={2}
//                                                                                                                                                       d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                                                                                                                                                 />
//                                                                                                                                                 <path
//                                                                                                                                                       strokeLinecap="round"
//                                                                                                                                                       strokeLinejoin="round"
//                                                                                                                                                       strokeWidth={2}
//                                                                                                                                                       d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
//                                                                                                                                                 />
//                                                                                                                                           </svg>
//                                                                                                                                           End Meeting
//                                                                                                                                     </button>

//                                                                                                                                     <hr className="my-1 border-gray-200" />

//                                                                                                                                     <button
//                                                                                                                                           onClick={() => {
//                                                                                                                                                 delete_meeting(meeting._id)
//                                                                                                                                                 setDropdownOpen(false)
//                                                                                                                                           }}
//                                                                                                                                           className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
//                                                                                                                                     >
//                                                                                                                                           <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                                                                                                                 <path
//                                                                                                                                                       strokeLinecap="round"
//                                                                                                                                                       strokeLinejoin="round"
//                                                                                                                                                       strokeWidth={2}
//                                                                                                                                                       d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                                                                                                                                                 />
//                                                                                                                                           </svg>
//                                                                                                                                           Delete Meeting
//                                                                                                                                     </button>
//                                                                                                                               </>
//                                                                                                                         )}
//                                                                                                                   </div>
//                                                                                                             </>
//                                                                                                       )}
//                                                                                                 </div>
//                                                                                           </div>

//                                                                                           {/* Meeting Details */}
//                                                                                           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                                                                                 {/* Duration */}
//                                                                                                 <div className="flex items-center text-sm text-gray-300">
//                                                                                                       <svg className="w-4 h-4 mr-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                                                                             <path
//                                                                                                                   strokeLinecap="round"
//                                                                                                                   strokeLinejoin="round"
//                                                                                                                   strokeWidth={2}
//                                                                                                                   d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                                                                                                             />
//                                                                                                       </svg>
//                                                                                                       <span className="font-medium">{meeting?.duration} Minutes </span>
//                                                                                                 </div>

//                                                                                                 {/* Date & Time */}
//                                                                                                 <div className="flex items-center text-sm text-gray-600">
//                                                                                                       <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                                                                             <path
//                                                                                                                   strokeLinecap="round"
//                                                                                                                   strokeLinejoin="round"
//                                                                                                                   strokeWidth={2}
//                                                                                                                   d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                                                                                                             />
//                                                                                                       </svg>
//                                                                                                       <span>
//                                                                                                             {formattedDate} at {formattedTime}
//                                                                                                       </span>
//                                                                                                 </div>

//                                                                                                 {/* Participants */}
//                                                                                                 <div className="flex items-center">
//                                                                                                       <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                                                                             <path
//                                                                                                                   strokeLinecap="round"
//                                                                                                                   strokeLinejoin="round"
//                                                                                                                   strokeWidth={2}
//                                                                                                                   d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
//                                                                                                             />
//                                                                                                       </svg>
//                                                                                                       <div className="flex -space-x-2">
//                                                                                                             {meeting?.selectedUsers?.slice(0, 4).map((participant, index) => (
//                                                                                                                   <img
//                                                                                                                         key={index}
//                                                                                                                         title={participant?.name}
//                                                                                                                         className="w-8 h-8 rounded-full border-2 border-white object-cover"
//                                                                                                                         src={participant.image || "/placeholder.svg"}
//                                                                                                                         alt={participant?.name}
//                                                                                                                   />
//                                                                                                             ))}
//                                                                                                             {meeting?.selectedUsers?.length > 4 && (
//                                                                                                                   <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
//                                                                                                                         +{meeting.selectedUsers.length - 4}
//                                                                                                                   </div>
//                                                                                                             )}
//                                                                                                       </div>
//                                                                                                 </div>
//                                                                                           </div>
//                                                                                     </div>
//                                                                               </div>
//                                                                         </div>
//                                                                   )
//                                                             })
//                                                       }


//                                                 </div>
//                                           </div>
//                                     </div>
//                               </div>
//                         </div>
//                   </div>
//             </div>
//       );
// };

// export default MeetingManagement;



"use client"

import React, { useContext, useState, useEffect, useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import { AuthContext } from "../../../context/UseContext/UseContext"
import { base_url } from "../../../layout/Title"
import { Link } from "react-router-dom"


// Custom Toast Notification System (simplified)
function useSimpleToast() {
      const [toastMessage, setToastMessage] = useState(null)

      useEffect(() => {
            if (toastMessage) {
                  const timer = setTimeout(() => {
                        setToastMessage(null)
                  }, 3000) // Hide after 3 seconds
                  return () => clearTimeout(timer)
            }
      }, [toastMessage])

      const showToast = (message, type = "info") => {
            setToastMessage(message)
      }

      return { toastMessage, showToast }
}

// Custom Delete Confirmation Modal
function CustomDeleteModal({
      open,
      onClose,
      onConfirm,
      title,
      description,
}) {
      if (!open) return null

      return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full border border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-100 mb-2">{title}</h3>
                        <p className="text-sm text-gray-400 mb-6">{description}</p>
                        <div className="flex justify-end space-x-3">
                              <button
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200"
                              >
                                    Cancel
                              </button>
                              <button
                                    onClick={onConfirm}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200"
                              >
                                    Continue
                              </button>
                        </div>
                  </div>
            </div>
      )
}

// MeetingCard component (re-implemented with Tailwind only)
function MeetingCard({ meeting, user, onStatusUpdate, onDelete, onEdit, showToast }) {
      const [dropdownOpen, setDropdownOpen] = useState(false)
      const dropdownRef = useRef(null)

      useEffect(() => {
            const handleClickOutside = (event) => {
                  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                        setDropdownOpen(false)
                  }
            }
            document.addEventListener("mousedown", handleClickOutside)
            return () => {
                  document.removeEventListener("mousedown", handleClickOutside)
            }
      }, [])

      const dateTime = new Date(meeting?.date)
      const formattedDate = dateTime.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
      })
      const formattedTime = dateTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
      })

      const getStatusColor = (status) => {
            switch (status) {
                  case "pending":
                        return "bg-amber-100 text-amber-800 border-amber-200"
                  case "process":
                        return "bg-emerald-100 text-emerald-800 border-emerald-200"
                  case "end":
                        return "bg-red-100 text-red-800 border-red-200"
                  default:
                        return "bg-gray-100 text-gray-800 border-gray-200"
            }
      }

      const isManager = user?.designation === "Chief Executive Officer" || user?.designation === "manager"
      const isParticipant = meeting?.selectedUsers?.some((participant) => participant?.email === user?.email)

      return (
            <div className="border border-gray-700 rounded-xl bg-gray-800 text-white p-6 mb-6">
                  <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold mb-1">{meeting?.title}</h3>
                              <p className="text-sm text-gray-300 mb-3" dangerouslySetInnerHTML={{ __html: meeting?.agenda }}></p>
                              <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(meeting?.status)}`}
                              >
                                    {/* CheckCircle Icon */}
                                    <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          className="w-3 h-3 mr-1.5"
                                    >
                                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                          <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                    {meeting?.status}
                              </span>
                        </div>
                        <div className="relative ml-4" ref={dropdownRef}>
                              <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="p-2 text-gray-400 hover:text-gray-200 rounded-lg transition-colors duration-200"
                                    aria-label="Meeting actions"
                              >
                                    {/* MoreVertical Icon */}
                                    <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="20"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                    >
                                          <circle cx="12" cy="12" r="1" />
                                          <circle cx="12" cy="5" r="1" />
                                          <circle cx="12" cy="19" r="1" />
                                    </svg>
                              </button>
                              {dropdownOpen && (
                                    <div className="absolute z-50 right-0 top-full mt-2 w-48 bg-gray-900 rounded-lg shadow-lg border border-gray-700 py-1">
                                          {(isManager || isParticipant) && (
                                                <a
                                                      href={meeting?.link}
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-150"
                                                >
                                                      {/* Video Icon */}
                                                      <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="w-4 h-4 mr-3 text-blue-500"
                                                      >
                                                            <path d="m22 8-6 4 6 4V8Z" />
                                                            <rect x="2" y="8" width="14" height="8" rx="2" ry="2" />
                                                      </svg>
                                                      Join Meeting
                                                </a>
                                          )}
                                          {isManager && (
                                                <>
                                                      <button
                                                            onClick={() => {
                                                                  onEdit(meeting._id)
                                                                  setDropdownOpen(false)
                                                            }}
                                                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-150"
                                                      >
                                                            {/* Edit Icon */}
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width="16"
                                                                  height="16"
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth="2"
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  className="w-4 h-4 mr-3 text-gray-400"
                                                            >
                                                                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                                            </svg>
                                                            Edit Meeting
                                                      </button>
                                                      <button
                                                            onClick={() => {
                                                                  onStatusUpdate("end", meeting._id)
                                                                  setDropdownOpen(false)
                                                            }}
                                                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-150"
                                                      >
                                                            {/* CheckCircle Icon */}
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width="16"
                                                                  height="16"
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth="2"
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  className="w-4 h-4 mr-3 text-gray-400"
                                                            >
                                                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                                  <polyline points="22 4 12 14.01 9 11.01" />
                                                            </svg>
                                                            End Meeting
                                                      </button>
                                                      <hr className="my-1 border-gray-700" />
                                                      <button
                                                            onClick={() => {
                                                                  onDelete(meeting._id)
                                                                  setDropdownOpen(false)
                                                            }}
                                                            className="flex items-center w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-900 transition-colors duration-150"
                                                      >
                                                            {/* Trash2 Icon */}
                                                            <svg
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  width="16"
                                                                  height="16"
                                                                  viewBox="0 0 24 24"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  strokeWidth="2"
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  className="w-4 h-4 mr-3"
                                                            >
                                                                  <path d="M3 6h18" />
                                                                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                                  <line x1="10" x2="10" y1="11" y2="17" />
                                                                  <line x1="14" x2="14" y1="11" y2="17" />
                                                            </svg>
                                                            Delete Meeting
                                                      </button>
                                                </>
                                          )}
                                    </div>
                              )}
                        </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center text-sm text-gray-300">
                              {/* Clock Icon */}
                              <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-4 h-4 mr-2 text-gray-400"
                              >
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <span className="font-medium">{meeting?.duration} Minutes </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                              {/* Calendar Icon */}
                              <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-4 h-4 mr-2 text-gray-400"
                              >
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" x2="16" y1="2" y2="6" />
                                    <line x1="8" x2="8" y1="2" y2="6" />
                                    <line x1="3" x2="21" y1="10" y2="10" />
                              </svg>
                              <span>
                                    {formattedDate} at {formattedTime}
                              </span>
                        </div>
                        <div className="flex items-center">
                              {/* Users Icon */}
                              <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-4 h-4 mr-2 text-gray-400"
                              >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                              </svg>
                              <div className="flex -space-x-2">
                                    {meeting?.selectedUsers?.slice(0, 4).map((participant, index) => (
                                          <img
                                                key={index}
                                                title={participant?.name}
                                                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                                src={participant.image || "/placeholder.svg"}
                                                alt={participant?.name}
                                          />
                                    ))}
                                    {meeting?.selectedUsers?.length > 4 && (
                                          <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                                                +{meeting.selectedUsers.length - 4}
                                          </div>
                                    )}
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default function MeetingManagement() {
      const { user } = useContext(AuthContext)
      const { toastMessage, showToast } = useSimpleToast()

      const [deleteId, setDeleteId] = useState(null)
      const [deletePopUp, setDeletePopUp] = useState(false)

      const {
            data: meeting_data = [],
            refetch,
            isLoading,
            isError,
      } = useQuery({
            queryKey: ["meeting_data", user?.email],
            queryFn: async () => {
                  const res = await fetch(`${base_url}/meeting/get-meetings?email=${user?.email}`, {
                        headers: {
                              "content-type": "application/json",
                              author: "bright_future_soft",
                        },
                        method: "GET",
                  })
                  if (!res.ok) {
                        throw new Error("Failed to fetch meetings")
                  }
                  const data = await res.json()
                  return data.data
            },
            enabled: !!user?.email,
      })

      const handleStatusUpdate = async (status, id) => {
            try {
                  const res = await fetch(`${base_url}/meeting/edit-meeting?meeting_id=${id}`, {
                        method: "PUT",
                        headers: {
                              "content-type": "application/json",
                              author: "bright_future_soft",
                        },
                        body: JSON.stringify({ status: status }),
                  })
                  const data = await res.json()
                  if (data.success) {
                        showToast(data.message, "success")
                        refetch()
                  } else {
                        showToast(data.message, "error")
                  }
            } catch (error) {
                  showToast(error.message || "Failed to update meeting status.", "error")
            }
      }

      const handleDeleteMeeting = (id) => {
            setDeleteId(id)
            setDeletePopUp(true)
      }

      const confirmDelete = async () => {
            if (!deleteId) return
            try {
                  const res = await fetch(`${base_url}/meeting/delete-meeting?meeting_id=${deleteId}`, {
                        headers: {
                              "content-type": "application/json",
                              author: "bright_future_soft",
                        },
                        method: "DELETE",
                  })
                  const data = await res.json()
                  if (data.success) {
                        showToast(data.message, "success")
                        refetch()
                  } else {
                        showToast(data.message, "error")
                  }
            } catch (error) {
                  showToast(error.message || "Failed to delete meeting.", "error")
            } finally {
                  setDeletePopUp(false)
                  setDeleteId(null)
            }
      }

      const handleEditMeeting = (id) => {
            // Navigate to the edit page. You'll need to implement this page.
            // For example, using Next.js router: router.push(`/dashboard/meeting_management/edit/${id}`);
            showToast(`Navigating to edit meeting with ID: ${id}`, "info")
            // In a real app, you'd use useRouter from 'next/navigation'
            // import { useRouter } from 'next/navigation';
            // const router = useRouter();
            // router.push(`/dashboard/meeting_management/edit/${id}`);
      }

      return (
            <div className="py-12 sm:py-16 lg:py-20 bg-gray-900 min-h-screen text-white">
                  <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                        <Link
                              href={"/dashboard/meeting_management/new"}
                              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-6"
                        >
                              Add New Meeting
                        </Link>
                        <div className="mb-8">
                              <h1 className="text-3xl font-bold text-gray-100">Meeting Management</h1>
                              <p className="mt-2 text-sm font-medium text-gray-400">Here is all your meeting information.</p>
                        </div>

                        <CustomDeleteModal
                              open={deletePopUp}
                              onClose={() => setDeletePopUp(false)}
                              onConfirm={confirmDelete}
                              title="Are you absolutely sure?"
                              description="This action cannot be undone. This will permanently delete your meeting and remove its data from our servers."
                        />

                        {toastMessage && (
                              <div
                                    className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg text-white z-50 ${toastMessage.type === "success"
                                          ? "bg-green-500"
                                          : toastMessage.type === "error"
                                                ? "bg-red-500"
                                                : "bg-blue-500"
                                          }`}
                              >
                                    {toastMessage.message}
                              </div>
                        )}

                        <div className="space-y-6">
                              {isLoading ? (
                                    Array.from({ length: 3 }).map((_, i) => (
                                          <div key={i} className="border border-gray-700 rounded-xl bg-gray-800 p-6">
                                                <div className="flex items-start justify-between mb-4">
                                                      <div className="flex-1 min-w-0">
                                                            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                                                            <div className="h-4 bg-gray-700 rounded w-full mb-3"></div>
                                                            <div className="h-6 bg-gray-700 rounded-full w-24"></div>
                                                      </div>
                                                      <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                      <div className="h-4 bg-gray-700 rounded w-32"></div>
                                                      <div className="h-4 bg-gray-700 rounded w-48"></div>
                                                      <div className="flex -space-x-2">
                                                            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                                                            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                                                            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                                                      </div>
                                                </div>
                                          </div>
                                    ))
                              ) : isError ? (
                                    <div className="text-center text-red-400 py-10">
                                          <p>Error loading meetings. Please try again later.</p>
                                    </div>
                              ) : meeting_data.length === 0 ? (
                                    <div className="text-center text-gray-400 py-10">
                                          <p>No meetings found. Start by adding a new meeting!</p>
                                    </div>
                              ) : (
                                    meeting_data.map((meeting) => (
                                          <MeetingCard
                                                key={meeting._id}
                                                meeting={meeting}
                                                user={user}
                                                onStatusUpdate={handleStatusUpdate}
                                                onDelete={handleDeleteMeeting}
                                                onEdit={handleEditMeeting}
                                                showToast={showToast} // Pass showToast to MeetingCard
                                          />
                                    ))
                              )}
                        </div>
                  </div>
            </div>
      )
}
