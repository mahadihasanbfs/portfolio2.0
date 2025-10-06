

import { useState, useEffect } from "react"
import { base_url } from "../../../layout/Title"
import { useQuery } from "@tanstack/react-query"

const Contact_management = () => {
      const [error, setError] = useState(null)
      const [selectContact, setSelectContact] = useState(null)

      // Close modal when escape key is pressed
      useEffect(() => {
            const handleEsc = (event) => {
                  if (event.key === 'Escape') {
                        setSelectContact(null)
                  }
            }
            window.addEventListener('keydown', handleEsc)

            return () => {
                  window.removeEventListener('keydown', handleEsc)
            }
      }, [])

      const {
            data: contacts = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["contacts"],
            queryFn: async () => {
                  const res = await fetch(`${base_url}/contact/get-contacts`, {
                        headers: {
                              "content-type": "application/json",
                              author: "bright_future_soft",
                        },
                        method: "GET",
                  })
                  const data = await res.json()
                  return data.data
            },
      })

      // Handle delete contact
      const handleDelete = async (id) => {
            if (window.confirm("Are you sure you want to delete this contact?")) {
                  try {
                        await fetch(`${base_url}/contact/delete-contact?contact_id=${id}`, {
                              method: 'DELETE',
                              headers: {
                                    "content-type": "application/json",
                                    author: "bright_future_soft",
                              },
                        })
                        refetch();
                  } catch (err) {
                        setError("Error deleting contact: " + err.message)
                  }
            }
      }

      // Handle status update
      const handleStatusUpdate = (id, newStatus) => {
            fetch(`${base_url}/contact/update-contact?contact_id=${id}`, {
                  method: 'PUT',
                  headers: {
                        "content-type": "application/json",
                        author: "bright_future_soft",
                  },
                  body: JSON.stringify({ status: newStatus }),
            })
                  .then(res => res.json())
                  .then(data => {
                        if (data.success) {
                              refetch();
                        }
                  })
            // In a real app, you would call an API to update the status
      }

      // Format date
      const formatDate = (dateString) => {
            const date = new Date(dateString)
            return date.toLocaleString()
      }

      if (isLoading)
            return (
                  <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
            )

      if (error)
            return (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {error}</span>
                  </div>
            )

      return (
            <div className="container mx-auto p-4 relative">
                  <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>

                  <div className="overflow-x-auto shadow-md border border-white border-opacity-20 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 divide-opacity-20">
                              <thead className="">
                                    <tr>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email/Phone
                                          </th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Message
                                          </th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                          </th>
                                    </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                    {contacts.length === 0 ? (
                                          <tr>
                                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                                      No contacts found
                                                </td>
                                          </tr>
                                    ) : (
                                          contacts.map((contact) => (
                                                <tr key={contact._id} className="">
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm font-medium text-gray-200">{contact.full_name}</div>
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-200">
                                                                  {contact.email_or_phone.includes("@") ? (
                                                                        <a
                                                                              href={`mailto:${contact.email_or_phone}`}
                                                                              className="text-blue-400 hover:text-blue-600 hover:underline"
                                                                        >
                                                                              {contact.email_or_phone}
                                                                        </a>
                                                                  ) : (
                                                                        <a
                                                                              href={`tel:${contact.email_or_phone}`}
                                                                              className="text-blue-400 hover:text-blue-600 hover:underline"
                                                                        >
                                                                              {contact.email_or_phone}
                                                                        </a>
                                                                  )}
                                                            </div>
                                                      </td>
                                                      <td
                                                            onClick={() => setSelectContact(contact)}
                                                            className="px-6 py-4 cursor-pointer  transition-colors"
                                                      >
                                                            <div className="text-sm text-gray-200 truncate max-w-xs">
                                                                  {contact.message.split(" ").slice(0, 10).join(" ")}
                                                                  {contact.message.split(" ").length > 10 ? "..." : ""}
                                                            </div>
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-200">{formatDate(contact.time_stamp)}</div>
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                            <select
                                                                  value={contact.status || "pending"}
                                                                  onChange={(e) => handleStatusUpdate(contact._id, e.target.value)}
                                                                  className="text-sm rounded-md bg-transparent border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-opacity-50"
                                                            >
                                                                  <option value="pending">Pending</option>
                                                                  <option value="contacted">Contacted</option>
                                                            </select>
                                                      </td>
                                                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button
                                                                  onClick={() => handleDelete(contact._id)}
                                                                  className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md transition-colors"
                                                            >
                                                                  Delete
                                                            </button>
                                                      </td>
                                                </tr>
                                          ))
                                    )}
                              </tbody>
                        </table>
                  </div>

                  {/* Glassy Modal */}
                  {selectContact && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
                              <div
                                    className="relative max-w-md w-full  bg-opacity-80 backdrop-filter backdrop-blur-md border border-white border-opacity-20 rounded-xl shadow-2xl p-6 transform transition-all duration-300 ease-in-out"
                                    onClick={(e) => e.stopPropagation()}
                              >
                                    {/* Close button */}


                                    <div className="space-y-5">
                                          <div className="border-b border-gray-200 border-opacity-50 pb-3">
                                                <h3 className="font-bold text-xl text-gray-100">Contact Details</h3>
                                          </div>

                                          <div className="space-y-4">
                                                <div className="bg-white bg-opacity-50 p-3 rounded-lg">
                                                      <p className="text-sm font-semibold text-gray-500">Name</p>
                                                      <p className="text-lg font-medium text-gray-800">{selectContact.full_name}</p>
                                                </div>

                                                <div className="bg-white bg-opacity-50 p-3 rounded-lg">
                                                      <p className="text-sm font-semibold text-gray-500">Contact</p>
                                                      <p className="text-lg">
                                                            {selectContact.email_or_phone.includes("@") ? (
                                                                  <a href={`mailto:${selectContact.email_or_phone}`} className="text-blue-600 hover:underline">
                                                                        {selectContact.email_or_phone}
                                                                  </a>
                                                            ) : (
                                                                  <a href={`tel:${selectContact.email_or_phone}`} className="text-blue-600 hover:underline">
                                                                        {selectContact.email_or_phone}
                                                                  </a>
                                                            )}
                                                      </p>
                                                </div>

                                                <div className="bg-white bg-opacity-50 p-3 rounded-lg">
                                                      <p className="text-sm font-semibold text-gray-500">Date</p>
                                                      <p className="text-lg text-gray-800">{formatDate(selectContact.time_stamp)}</p>
                                                </div>

                                                <div className="bg-white bg-opacity-50 p-3 rounded-lg">
                                                      <p className="text-sm font-semibold text-gray-500">Message</p>
                                                      <p className="text-lg text-gray-800 whitespace-pre-wrap">{selectContact.message}</p>
                                                </div>
                                          </div>

                                          <div className="flex justify-end pt-3">
                                                <button
                                                      onClick={() => setSelectContact(null)}
                                                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
                                                >
                                                      Close
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  )}
            </div>
      )
}

export default Contact_management
