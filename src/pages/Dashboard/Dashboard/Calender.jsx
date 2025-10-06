

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
      { date: "2025-12-25", name: "Christmas Day" }
];


export default function CalendarPage() {
      const [currentDate, setCurrentDate] = useState(new Date())
      const [holidays, setHolidays] = useState(sampleHolidays)

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

      // Generate calendar days
      const calendarDays = []

      // Empty cells for days before month starts
      for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="h-24 border border-border border-gray-700"></div>)
      }

      for (let day = 1; day <= daysInMonth; day++) {
            const isWeekendDay = isWeekend(day)
            const holiday = getHoliday(day)
            const isHoliday = isWeekendDay || holiday

            calendarDays.push(
                  <div
                        key={day}
                        className={`h-24 border border-border border-gray-700 p-2 ${isHoliday ? "bg-red-500" : "bg-background"} hover:bg-accent transition-colors`}
                  >
                        <div className="flex flex-col h-full">
                              <span className={`text-sm font-medium ${isHoliday ? "text-white" : "text-foreground"}`}>{day}</span>
                              {holiday && <span className="text-xs text-white mt-1 line-clamp-2">{holiday.name}</span>}
                              {isWeekendDay && !holiday && <span className="text-xs text-white mt-1">Weekend</span>}
                        </div>
                  </div>,
            )
      }

      return (
            <div className=" mt-4">


                        {/* Calendar Controls */}
                        <div className="flex items-center justify-between mb-6">
                              <button
                                    onClick={previousMonth}
                                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                              >
                                    Previous
                              </button>

                              <h2 className="text-2xl font-semibold text-foreground">
                                    {monthNames[month]} {year}
                              </h2>

                              <button
                                    onClick={nextMonth}
                                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                              >
                                    Next
                              </button>
                        </div>

                        {/* Calendar Grid */}
                        <div className="border border-gray-500 rounded-lg shadow-lg overflow-hidden">
                              {/* Day headers */}
                              <div className="grid grid-cols-7 bg-muted">
                                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                                          <div
                                                key={day}
                                                className={`p-3 text-center font-semibold ${index === 0 || index === 6 ? "text-destructive" : "text-foreground"
                                                      }`}
                                          >
                                                {day}
                                          </div>
                                    ))}
                              </div>

                              <div className="grid grid-cols-7">{calendarDays}</div>
                        </div>

            </div>
      )
}
