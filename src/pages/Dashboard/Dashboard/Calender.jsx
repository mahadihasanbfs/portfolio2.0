

import { useState } from "react"

const sampleHolidays = [
      { date: "2025-02-21", name: "Shaheed Day & International Mother Language Day" },
      { date: "2025-03-26", name: "Independence & National Day" },
      { date: "2025-03-28", name: "Jumatul Bida" },
      { date: "2025-03-31", name: "Eid-ul-Fitr" },
      { date: "2025-05-01", name: "May Day" },
      { date: "2025-05-11", name: "Buddha Purnima" },
      { date: "2025-06-07", name: "Eid-ul-Adha" },
      { date: "2025-08-16", name: "Janmashtami" },
      { date: "2025-09-05", name: "Eid-e-Milad-un-Nabi (SAW)" },
      { date: "2025-10-02", name: "Durga Puja (Bijoya Dashami)" },
      { date: "2025-12-16", name: "Victory Day" },
      { date: "2025-12-25", name: "Christmas Day" },
]

const ChevronLeftIcon = () => (
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
            <path d="m15 18-6-6 6-6" />
      </svg>
)

const ChevronRightIcon = () => (
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
            <path d="m9 18 6-6-6-6" />
      </svg>
)

const CalendarIcon = () => (
      <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
      >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
      </svg>
)

export default function CalendarPage() {
      const today = new Date()
      const [currentDate, setCurrentDate] = useState(today)
      const [holidays] = useState(sampleHolidays)

      const year = currentDate.getFullYear()
      const month = currentDate.getMonth()

      // Get first day of month and total days
      const firstDayOfMonth = new Date(year, month, 1).getDay()
      const daysInMonth = new Date(year, month + 1, 0).getDate()

      // Month names
      const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
      ]

      // Check if a date is today
      const isToday = (day) => {
            return day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
      }

      // Check if a date is a weekend (Saturday = 6, Sunday = 0)
      const isWeekend = (day) => {
            const date = new Date(year, month, day)
            const dayOfWeek = date.getDay()
            return dayOfWeek === 0 || dayOfWeek === 6
      }

      // Check if a date is a holiday from JSON
      const getHoliday = (day) => {
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
            return holidays.find((h) => h.date === dateStr)
      }

      // Navigate months
      const previousMonth = () => {
            setCurrentDate(new Date(year, month - 1, 1))
      }

      const nextMonth = () => {
            setCurrentDate(new Date(year, month + 1, 1))
      }

      const goToToday = () => {
            setCurrentDate(new Date())
      }

      // Generate calendar days
      const calendarDays = []

      // Empty cells for days before month starts
      for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(
                  <div key={`empty-${i}`} className="aspect-square md:aspect-auto md:h-24 lg:h-28 border border-slate-100"></div>,
            )
      }

      for (let day = 1; day <= daysInMonth; day++) {
            const isWeekendDay = isWeekend(day)
            const holiday = getHoliday(day)
            const isTodayDate = isToday(day)
            const isHoliday = isWeekendDay || holiday

            calendarDays.push(
                  <div
                        key={day}
                        className={`aspect-square md:aspect-auto md:h-24 lg:h-28 border border-slate-100 p-1.5 md:p-2 lg:p-3 transition-all hover:shadow-md relative overflow-hidden group ${isHoliday ? "bg-red-50 hover:bg-red-100" : "bg-white hover:bg-slate-50"
                              } ${isTodayDate ? "ring-2 ring-blue-600 ring-inset" : ""}`}
                  >
                        <div className="flex flex-col h-full relative z-10">
                              <span
                                    className={`text-xs md:text-sm lg:text-base font-semibold ${isTodayDate ? "text-blue-600" : isHoliday ? "text-red-600" : "text-slate-900"
                                          }`}
                              >
                                    {day}
                              </span>
                              {isTodayDate && (
                                    <span className="hidden md:block text-[10px] lg:text-xs font-medium text-blue-600">Today</span>
                              )}
                              {holiday && (
                                    <span className="text-[9px] md:text-[10px] lg:text-xs text-red-600 mt-0.5 md:mt-1 line-clamp-2 md:line-clamp-3 font-medium">
                                          {holiday.name}
                                    </span>
                              )}
                              {isWeekendDay && !holiday && (
                                    <span className="hidden md:block text-[10px] lg:text-xs text-slate-500 mt-1">Weekend</span>
                              )}
                        </div>
                        {isTodayDate && <div className="absolute inset-0 bg-blue-50/50 pointer-events-none"></div>}
                  </div>,
            )
      }

      return (
            <div className="min-h-screen bg-gray-900 mt-4">
                  <div className="max-w-7xl mx-auto">
                        <div className="bg-white rounded-xl p-4 md:p-6 lg:p-8 shadow-xl border border-slate-200">
                              {/* Header */}
                              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-3">
                                          <div className="p-2 md:p-3 bg-blue-50 rounded-lg">
                                                <CalendarIcon />
                                          </div>
                                          <div>
                                                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">
                                                      {monthNames[month]} {year}
                                                </h1>
                                                <p className="text-xs md:text-sm text-slate-600">
                                                      {today.toLocaleDateString("en-US", {
                                                            weekday: "long",
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                      })}
                                                </p>
                                          </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                          <button
                                                onClick={previousMonth}
                                                className="h-9 w-9 md:h-10 md:w-10 flex items-center justify-center rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-colors"
                                          >
                                                <ChevronLeftIcon />
                                          </button>

                                          <button
                                                onClick={goToToday}
                                                className="h-9 px-3 md:h-10 md:px-4 text-xs md:text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                          >
                                                Today
                                          </button>

                                          <button
                                                onClick={nextMonth}
                                                className="h-9 w-9 md:h-10 md:w-10 flex items-center justify-center rounded-lg border border-slate-300 bg-white hover:bg-slate-50 transition-colors"
                                          >
                                                <ChevronRightIcon />
                                          </button>
                                    </div>
                              </div>

                              {/* Legend */}
                              <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-6 pb-4 md:pb-6 border-b border-slate-200">
                                    <div className="flex items-center gap-2">
                                          <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm ring-2 ring-blue-600"></div>
                                          <span className="text-xs md:text-sm text-slate-600">Today</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                          <div className="w-3 h-3 md:w-4 md:h-4 rounded-sm bg-red-50 border border-red-200"></div>
                                          <span className="text-xs md:text-sm text-slate-600">Holiday/Weekend</span>
                                    </div>
                              </div>

                              {/* Calendar Grid */}
                              <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                                    {/* Day headers */}
                                    <div className="grid grid-cols-7 bg-slate-50">
                                          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                                                <div
                                                      key={day}
                                                      className={`p-2 md:p-3 text-center text-xs md:text-sm font-semibold ${index === 0 || index === 6 ? "text-red-600" : "text-slate-700"
                                                            }`}
                                                >
                                                      <span className="hidden md:inline">{day}</span>
                                                      <span className="md:hidden">{day.charAt(0)}</span>
                                                </div>
                                          ))}
                                    </div>

                                    <div className="grid grid-cols-7 bg-white">
                                          {calendarDays.map((day, index) => {
                                                const dayNumber = index - firstDayOfMonth + 1
                                                if (dayNumber < 1 || dayNumber > daysInMonth) {
                                                      return (
                                                            <div
                                                                  key={`empty-${index}`}
                                                                  className="aspect-square md:aspect-auto md:h-24 lg:h-28 border border-slate-100"
                                                            ></div>
                                                      )
                                                }

                                                const isWeekendDay = isWeekend(dayNumber)
                                                const holiday = getHoliday(dayNumber)
                                                const isTodayDate = isToday(dayNumber)
                                                const isHoliday = isWeekendDay || holiday

                                                return (
                                                      <div
                                                            key={dayNumber}
                                                            className={`aspect-square md:aspect-auto md:h-24 lg:h-28 border border-slate-100 p-1.5 md:p-2 lg:p-3 transition-all hover:shadow-md relative overflow-hidden group ${isHoliday ? "bg-red-50 hover:bg-red-100" : "bg-white hover:bg-slate-50"
                                                                  } ${isTodayDate ? "ring-2 ring-blue-600 ring-inset" : ""}`}
                                                      >
                                                            <div className="flex flex-col h-full relative z-10">
                                                                  <span
                                                                        className={`text-xs md:text-sm lg:text-base font-semibold ${isTodayDate ? "text-blue-600" : isHoliday ? "text-red-600" : "text-slate-900"
                                                                              }`}
                                                                  >
                                                                        {dayNumber}
                                                                  </span>
                                                                  {isTodayDate && (
                                                                        <span className="hidden md:block text-[10px] lg:text-xs font-medium text-blue-600">Today</span>
                                                                  )}
                                                                  {holiday && (
                                                                        <span className="text-[9px] md:text-[10px] lg:text-xs text-red-600 mt-0.5 md:mt-1 line-clamp-2 md:line-clamp-3 font-medium">
                                                                              {holiday.name}
                                                                        </span>
                                                                  )}
                                                                  {isWeekendDay && !holiday && (
                                                                        <span className="hidden md:block text-[10px] lg:text-xs text-slate-500 mt-1">Weekend</span>
                                                                  )}
                                                            </div>
                                                            {isTodayDate && <div className="absolute inset-0 bg-blue-50/50 pointer-events-none"></div>}
                                                      </div>
                                                )
                                          })}
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}
