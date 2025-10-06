

import React, { useState } from "react"
import Link_Button from "../../shared/Link_Button"
import DeleteModal from "../../../Hook/DeleteModal"
import Swal from "sweetalert2"
import { useQuery } from "@tanstack/react-query"
import { base_url } from "../../../layout/Title"
import { useLocation } from "react-router-dom"

const Apply_List = () => {
      const location = useLocation()
      const [show, set_show] = useState(null)
      const [resume, setResume] = useState(null)
      const [selectedApplications, setSelectedApplications] = useState([])
      const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" })
      const [filterStatus, setFilterStatus] = useState("all")
      const [copied, setCopied] = useState(false);
      const [searchQuery, setSearchQuery] = useState("");

      const {
            data: job_data = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["job_apply"],
            queryFn: async () => {
                  const res = await fetch(`${base_url}/job-post/get-job-apply${location.search}`, {
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

      const [deleteId, setDeletId] = useState("")
      const [deletePopUp, setDeletePopUp] = useState(false)
      const [isDelete, setIsDelete] = useState(false)

      const delete_meeting = (id) => {
            setDeletePopUp(true)
            setDeletId(id)
      }

      if (isDelete) {
            fetch(`${base_url}/job-post/delete-job-apply?job_apply_id=${deleteId}`, {
                  headers: {
                        "content-type": "application/json",
                        author: "bright_future_soft",
                  },
                  method: "DELETE",
            })
                  .then((res) => res.json())
                  .then((data) => {
                        if (data.success) {
                              Swal.fire(data.message, " ", "success")
                              refetch()
                              setIsDelete(false)
                              setDeletId("")
                        } else {
                              Swal.fire(data.message, "", "info")
                        }
                  })
      }

      const shortlist_status = (id, status) => {
            fetch(`${base_url}/job-post/update-job-apply?job_apply_id=${id}`, {
                  headers: {
                        "content-type": "application/json",
                        author: "bright_future_soft",
                  },
                  method: "PUT",
                  body: JSON.stringify({ shortlist: status }),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        if (data.success) {
                              Swal.fire(data.message, " ", "success")
                              refetch()
                        } else {
                              Swal.fire(data.message, "", "info")
                        }
                  })
      }

      const handleSort = (key) => {
            let direction = "asc"
            if (sortConfig.key === key && sortConfig.direction === "asc") {
                  direction = "desc"
            }
            setSortConfig({ key, direction })
      }

      const handleSelectAll = (e) => {
            if (e.target.checked) {
                  setSelectedApplications(job_data.map((job) => job._id))
            } else {
                  setSelectedApplications([])
            }
      }

      const handleSelectApplication = (id) => {
            setSelectedApplications((prev) => (prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]))
      }

      const sortedData = React.useMemo(() => {
            const sortableData = [...job_data]
            if (sortConfig.key) {
                  sortableData.sort((a, b) => {
                        if (a[sortConfig.key] < b[sortConfig.key]) {
                              return sortConfig.direction === "asc" ? -1 : 1
                        }
                        if (a[sortConfig.key] > b[sortConfig.key]) {
                              return sortConfig.direction === "asc" ? 1 : -1
                        }
                        return 0
                  })
            }
            return sortableData
      }, [job_data, sortConfig])

      const filteredData = sortedData.filter((job) => {
            if (filterStatus === "all") return true
            if (filterStatus === "shortlisted") return job.shortlist
            if (filterStatus === "pending") return !job.shortlist
            return true
      })

      const handleSearch = (e) => {
            setSearchQuery(e.target.value)
      }

      const searchFilter = filteredData.filter((job) => {
            // Convert job object values to strings and check if any includes the searchQuery
            return Object.values(job).some(value =>
                  String(value).toLowerCase().includes(searchQuery.toLowerCase())
            );
      });

      if (isLoading) {
            return (
                  <div className="flex items-center justify-center min-h-screen">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                  </div>
            )
      }



      const handleCopy = () => {
            navigator.clipboard.writeText(resume).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000); // reset after 2s
            });
      };

      return (
            <div className="min-h-screen bg-gray-900 py-8">
                  <div className="px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="mb-8">
                              <Link_Button name={"Back Job Post"} url={"/dashboard/job-management"} />
                              <div className="mt-6">
                                    <h1 className="text-3xl font-bold text-gray-100">Job Application Management</h1>
                                    <p className="mt-2 text-gray-600">Manage and review all job applications</p>
                              </div>
                        </div>

                        {/* Filters and Actions */}
                        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 mb-6">
                              <div className="px-6 py-4  border-gray-200">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                          <div className="flex items-center justify-between gap-4">
                                                <select
                                                      value={filterStatus}
                                                      onChange={(e) => setFilterStatus(e.target.value)}
                                                      className="px-3 py-2 border bg-gray-900 border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                >
                                                      <option value="all">All Applications</option>
                                                      <option value="shortlisted">Shortlisted</option>
                                                      <option value="pending">Pending Review</option>
                                                </select>
                                                <span className="text-sm text-gray-500">
                                                      {searchFilter.length} of {job_data.length} applications
                                                </span>

                                          </div>
                                          <div className="flex items-center gap-2">
                                                <input type="text" className="px-3 py-2 border bg-gray-900 border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Search..." onChange={handleSearch} />
                                          </div>
                                    </div>
                              </div>
                        </div>

                        {/* Table */}
                        <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700 overflow-hidden">
                              <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-700">
                                          <thead className="bg-gray-900">
                                                <tr>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                                                            C. NO.
                                                      </th>
                                                      <th
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider cursor-pointer "
                                                            onClick={() => handleSort("full_name")}
                                                      >
                                                            <div className="flex items-center gap-1">
                                                                  Applicant
                                                                  {sortConfig.key === "full_name" && (
                                                                        <span className="text-indigo-600">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                                                                  )}
                                                            </div>
                                                      </th>
                                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                                                            Contact
                                                      </th>
                                                      <th
                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider cursor-pointer "
                                                            onClick={() => handleSort("experience_in_years")}
                                                      >
                                                            <div className="flex items-center gap-1">
                                                                  Experience
                                                                  {sortConfig.key === "experience_in_years" && (
                                                                        <span className="text-indigo-600">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                                                                  )}
                                                            </div>
                                                      </th>


                                                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-100 uppercase tracking-wider">
                                                            Actions
                                                      </th>
                                                </tr>
                                          </thead>
                                          <tbody className="bg-gray-900 divide-y divide-gray-700">
                                                {searchFilter.map((job, index) => (
                                                      <tr key={job._id} className=" transition-colors py-5">
                                                            <td>
                                                                  <div className="text-center whitespace-nowrap">
                                                                        {index + 1}
                                                                  </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                  <div class="flex items-center flex-1 min-w-0">
                                                                        <p class="text-sm font-bold text-gray-100 truncate ">{job?.full_name}</p>
                                                                  </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                  <div class="flex-1 min-w-0 ml-4 ">
                                                                        <p className="text-sm font-bold text-gray-100 truncate">{job?.email_address}</p>
                                                                        <p class="mt-1 text-sm font-medium text-gray-500 truncate">{job?.phone_number}</p>
                                                                  </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                  <div class="flex-1 min-w-0 ml-4 ">
                                                                        <p class="text-sm font-bold text-gray-100 truncate ">{job?.salary_expectation.split(" ")[0]} BDT</p>
                                                                        <p className="mt-1 text-sm font-medium text-gray-500 truncate">Experience: {job.experience_in_years.slice(0, 3)} Years</p>
                                                                  </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                  <div class="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                                                                        <button
                                                                              onClick={() => setResume(job?.resume)}
                                                                              title="Resume"
                                                                              className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-500"
                                                                              target="_blank"
                                                                              rel="noopener noreferrer"
                                                                        >
                                                                              Resume
                                                                        </button>
                                                                        <button
                                                                              onClick={() => set_show(job)}
                                                                              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                                                        >
                                                                              View Application
                                                                        </button>
                                                                        <div className=''>
                                                                              <div className="flex gap-3 items-center  ">

                                                                                    <button
                                                                                          type="button"
                                                                                          className={
                                                                                                "inline-flex whitespace-nowrap items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500 " +
                                                                                                (job.shortlist ? "bg-green-500" : "bg-indigo-600")
                                                                                          }
                                                                                          onClick={() => shortlist_status(job._id, job.shortlist ? false : true)}
                                                                                    >
                                                                                          {job.shortlist ? "Unsort List" : "Sort List"}
                                                                                    </button>

                                                                                    <button
                                                                                          onClick={() => delete_meeting(job._id)}
                                                                                          type="button"
                                                                                          className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-red-500 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:bg-red-700"
                                                                                    >
                                                                                          Delete
                                                                                    </button>


                                                                              </div>

                                                                        </div>
                                                                  </div>
                                                            </td>

                                                      </tr>
                                                ))}
                                          </tbody>
                                    </table>
                              </div>

                              {searchFilter.length === 0 && (
                                    <div className="text-center py-12">
                                          <div className="text-gray-500">
                                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                      />
                                                </svg>
                                                <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
                                                <p className="mt-1 text-sm text-gray-500">No applications match your current filter.</p>
                                          </div>
                                    </div>
                              )}
                        </div>

                        {/* Delete Modal */}
                        <div className="h-0 w-0">
                              <DeleteModal setOpenModal={setDeletePopUp} OpenModal={deletePopUp} setIsDelete={setIsDelete} />
                        </div>

                        {/* Application Details Modal */}
                        {show && (
                              <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm">
                                    <div className="flex items-center justify-center min-h-screen p-4">
                                          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                                                {/* Header */}
                                                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl p-6">
                                                      <div className="flex justify-between items-center">
                                                            <h2 className="text-2xl font-bold text-white">Application Details</h2>
                                                            <button
                                                                  onClick={() => set_show(null)}
                                                                  className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
                                                            >
                                                                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                  </svg>
                                                            </button>
                                                      </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-8">
                                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                            {/* Personal Information */}
                                                            <div className="space-y-6">
                                                                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>

                                                                  <div className="space-y-4">
                                                                        <div className="flex items-start space-x-3">
                                                                              <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                                                                    <svg className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                                                                          <path
                                                                                                fillRule="evenodd"
                                                                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                                                                clipRule="evenodd"
                                                                                          />
                                                                                    </svg>
                                                                              </div>
                                                                              <div className="flex-1">
                                                                                    <p className="text-sm font-medium text-gray-500">Full Name</p>
                                                                                    <p className="text-base text-gray-900">{show.full_name}</p>
                                                                              </div>
                                                                        </div>

                                                                        <div className="flex items-start space-x-3">
                                                                              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                                                    <svg className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                                                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                                                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                                                    </svg>
                                                                              </div>
                                                                              <div className="flex-1">
                                                                                    <p className="text-sm font-medium text-gray-500">Email Address</p>
                                                                                    <p className="text-base text-gray-900">{show.email_address}</p>
                                                                              </div>
                                                                        </div>

                                                                        <div className="flex items-start space-x-3">
                                                                              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                                                    <svg className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                                                                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                                                    </svg>
                                                                              </div>
                                                                              <div className="flex-1">
                                                                                    <p className="text-sm font-medium text-gray-500">Phone Number</p>
                                                                                    <p className="text-base text-gray-900">{show.phone_number}</p>
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            </div>

                                                            {/* Professional Information */}
                                                            <div className="space-y-6">
                                                                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Professional Information</h3>

                                                                  <div className="space-y-4">
                                                                        <div className="flex items-start space-x-3">
                                                                              <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                                                                    <svg className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                                                                                          <path
                                                                                                fillRule="evenodd"
                                                                                                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                                                                                clipRule="evenodd"
                                                                                          />
                                                                                          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                                                                    </svg>
                                                                              </div>
                                                                              <div className="flex-1">
                                                                                    <p className="text-sm font-medium text-gray-500">Experience</p>
                                                                                    <p className="text-base text-gray-900">{show.experience_in_years} Years</p>
                                                                              </div>
                                                                        </div>

                                                                        <div className="flex items-start space-x-3">
                                                                              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                                                                    <svg className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                                                                                          <path
                                                                                                fillRule="evenodd"
                                                                                                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                                                                                clipRule="evenodd"
                                                                                          />
                                                                                    </svg>
                                                                              </div>
                                                                              <div className="flex-1">
                                                                                    <p className="text-sm font-medium text-gray-500">Salary Expectation</p>
                                                                                    <p className="text-base text-gray-900">{show.salary_expectation} BDT</p>
                                                                              </div>
                                                                        </div>

                                                                        <div className="flex items-start space-x-3">
                                                                              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                                                                    <svg className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                                                                          <path
                                                                                                fillRule="evenodd"
                                                                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                                                                clipRule="evenodd"
                                                                                          />
                                                                                    </svg>
                                                                              </div>
                                                                              <div className="flex-1">
                                                                                    <p className="text-sm font-medium text-gray-500">Status</p>
                                                                                    <span
                                                                                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${show.shortlist ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                                                                                }`}
                                                                                    >
                                                                                          {show.shortlist ? "Shortlisted" : "Pending Review"}
                                                                                    </span>
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </div>

                                                      {/* Why Apply Section */}
                                                      {show.why && (
                                                            <div className="mt-8">
                                                                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Why Apply</h3>
                                                                  <div className="bg-gray-50 rounded-lg p-4">
                                                                        <p className="text-gray-700 leading-relaxed">{show.why}</p>
                                                                  </div>
                                                            </div>
                                                      )}

                                                      {/* Actions */}
                                                      <div className="mt-8 flex flex-col sm:flex-row gap-3">
                                                            <button
                                                                  onClick={() => set_show(null)}
                                                                  className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                                                            >
                                                                  Close
                                                            </button>
                                                            <button
                                                                  onClick={() => shortlist_status(show._id, show.shortlist ? false : true)}
                                                                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${show.shortlist
                                                                        ? "bg-yellow-600 text-white hover:bg-yellow-700"
                                                                        : "bg-green-600 text-white hover:bg-green-700"
                                                                        }`}
                                                            >
                                                                  {show.shortlist ? "Remove from Shortlist" : "Add to Shortlist"}
                                                            </button>
                                                            <button
                                                                  onClick={() => setResume(show.resume)}
                                                                  className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                                                            >
                                                                  View Resume
                                                            </button>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        )}

                        {/* Resume Modal */}
                        {resume && (
                              <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75">
                                    <div className="flex min-h-full items-center justify-center p-4">
                                          <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl">
                                                <div className="flex items-center justify-between p-4 border-b">
                                                      <h2 className="text-lg font-semibold text-gray-900">Resume Preview</h2>

                                                      <button
                                                            onClick={() => setResume(null)}
                                                            className="text-gray-400 hover:text-gray-600 transition-colors p-2  rounded-full"
                                                      >
                                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                      </button>
                                                </div>
                                                <div className="flex items-center space-x-2 px-4 my-2">
                                                      <p className="text-xs text-blue-500 break-all">{resume}</p>
                                                      <button
                                                            onClick={handleCopy}
                                                            className={`p-1 rounded transition-colors ${copied ? "text-green-600 bg-green-100" : "text-blue-500 bg-blue-100"
                                                                  }`}
                                                            title={copied ? "Copied!" : "Copy to clipboard"}
                                                      >
                                                            {copied ? (
                                                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-check-icon lucide-clipboard-check"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" /></svg>
                                                            ) : (
                                                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-icon lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                                                            )}
                                                      </button>
                                                </div>
                                                <div className="px-4 pb-4">

                                                      <iframe src={resume} width="100%" height="600" title="Resume" className="border-none rounded" />
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        )}
                  </div>
            </div>
      )
}

export default Apply_List
