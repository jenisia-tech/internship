"use client";

import React, { useState, useMemo, useCallback } from "react";

// ----------------------------------------------------------------------
// Types & Sample Data
// ----------------------------------------------------------------------

type AppointmentStatus = "Scheduled" | "Completed" | "Cancelled";
type Department =
  | "Cardiology"
  | "Neurology"
  | "Orthopedics"
  | "Pediatrics"
  | "Dermatology"
  | "General Medicine";

interface Appointment {
  id: string;
  patientName: string;
  doctor: string;
  department: Department;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  status: AppointmentStatus;
  notes?: string;
}

const SAMPLE_APPOINTMENTS: Appointment[] = [
  {
    id: "APT-2001",
    patientName: "John Anderson",
    doctor: "Dr. Sarah Chen",
    department: "Cardiology",
    date: "2026-06-27",
    time: "09:30",
    status: "Scheduled",
    notes: "Regular cardiac checkup",
  },
  {
    id: "APT-2002",
    patientName: "Emma Thompson",
    doctor: "Dr. James Wilson",
    department: "Neurology",
    date: "2026-06-27",
    time: "10:15",
    status: "Scheduled",
    notes: "Migraine consultation",
  },
  {
    id: "APT-2003",
    patientName: "Liam Martinez",
    doctor: "Dr. Maria Rodriguez",
    department: "Orthopedics",
    date: "2026-06-26",
    time: "11:00",
    status: "Completed",
    notes: "Knee injury follow-up",
  },
  {
    id: "APT-2004",
    patientName: "Sophia Lee",
    doctor: "Dr. Ahmed Hassan",
    department: "Pediatrics",
    date: "2026-06-26",
    time: "14:30",
    status: "Completed",
    notes: "Vaccination",
  },
  {
    id: "APT-2005",
    patientName: "Oliver Garcia",
    doctor: "Dr. Emily Turner",
    department: "Dermatology",
    date: "2026-06-25",
    time: "08:45",
    status: "Cancelled",
    notes: "Patient requested reschedule",
  },
  {
    id: "APT-2006",
    patientName: "Ava Williams",
    doctor: "Dr. Robert Kim",
    department: "General Medicine",
    date: "2026-06-28",
    time: "13:00",
    status: "Scheduled",
    notes: "Annual physical exam",
  },
  {
    id: "APT-2007",
    patientName: "Noah Davis",
    doctor: "Dr. Priya Sharma",
    department: "Cardiology",
    date: "2026-06-27",
    time: "15:45",
    status: "Scheduled",
    notes: "ECG review",
  },
  {
    id: "APT-2008",
    patientName: "Isabella Brown",
    doctor: "Dr. Michael Brown",
    department: "Neurology",
    date: "2026-06-26",
    time: "16:30",
    status: "Completed",
    notes: "Sleep study results",
  },
];

const DOCTORS_LIST = [
  "Dr. Sarah Chen",
  "Dr. James Wilson",
  "Dr. Maria Rodriguez",
  "Dr. Ahmed Hassan",
  "Dr. Emily Turner",
  "Dr. Robert Kim",
  "Dr. Priya Sharma",
  "Dr. Michael Brown",
];

const DEPARTMENTS: Department[] = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "General Medicine",
];

const STATUS_FILTERS = ["All", "Scheduled", "Completed", "Cancelled"];

// ----------------------------------------------------------------------
// Sub-components
// ----------------------------------------------------------------------

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  accent?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, accent = "border-blue-400" }) => (
  <div
    className={`bg-white rounded-2xl border-l-4 ${accent} shadow-sm p-5 flex items-center gap-4 transition hover:shadow-md`}
  >
    <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

interface BookModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (appointment: Omit<Appointment, "id" | "status">) => void;
}

const BookAppointmentModal: React.FC<BookModalProps> = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState<Omit<Appointment, "id" | "status">>({
    patientName: "",
    doctor: DOCTORS_LIST[0],
    department: "General Medicine",
    date: "",
    time: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      patientName: "",
      doctor: DOCTORS_LIST[0],
      department: "General Medicine",
      date: "",
      time: "",
      notes: "",
    });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-800">Book Appointment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-1"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
            <input
              type="text"
              name="patientName"
              required
              value={form.patientName}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
            <select
              name="doctor"
              value={form.doctor}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {DOCTORS_LIST.map((doc) => (
                <option key={doc} value={doc}>
                  {doc}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                required
                value={form.date}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                name="time"
                required
                value={form.time}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              rows={3}
              value={form.notes}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Optional notes..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition shadow-sm"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Icon Helpers
// ----------------------------------------------------------------------

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 3.5a7.5 7.5 0 0013.15 13.15z" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const BanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0zM12 8v4m0 4h.01" />
  </svg>
);

// ----------------------------------------------------------------------
// Main Page Component
// ----------------------------------------------------------------------

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(SAMPLE_APPOINTMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const simulateLoading = useCallback(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  }, []);

  // Derived statistics
  const stats = useMemo(() => {
    const today = new Date().toISOString().split("T")[0]; // For demo, use current date
    return {
      today: appointments.filter((a) => a.date === today).length,
      upcoming: appointments.filter((a) => a.status === "Scheduled" && a.date > today).length,
      completed: appointments.filter((a) => a.status === "Completed").length,
      cancelled: appointments.filter((a) => a.status === "Cancelled").length,
    };
  }, [appointments]);

  // Filter & search
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const matchesSearch =
        apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || apt.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchQuery, statusFilter]);

  const handleBookAppointment = (newApt: Omit<Appointment, "id" | "status">) => {
    const id = `APT-${2000 + appointments.length + 1}`;
    setAppointments((prev) => [
      ...prev,
      { ...newApt, id, status: "Scheduled" },
    ]);
  };

  const handleCancel = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, status: "Cancelled" as AppointmentStatus } : apt
      )
    );
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    const base = "px-2.5 py-0.5 rounded-full text-xs font-semibold";
    switch (status) {
      case "Scheduled":
        return <span className={`${base} bg-blue-50 text-blue-700`}>Scheduled</span>;
      case "Completed":
        return <span className={`${base} bg-emerald-50 text-emerald-700`}>Completed</span>;
      case "Cancelled":
        return <span className={`${base} bg-red-50 text-red-700`}>Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 1. Hero Section */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            Appointment Management
          </h1>
          <p className="mt-1 text-gray-500 max-w-2xl">
            Manage patient appointments efficiently. Schedule, track, and update appointments across all departments.
          </p>
        </div>

        {/* 2. Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Today's Appointments"
            value={stats.today}
            icon={<CalendarIcon />}
            accent="border-blue-500"
          />
          <StatCard
            title="Upcoming"
            value={stats.upcoming}
            icon={<ClockIcon />}
            accent="border-amber-400"
          />
          <StatCard
            title="Completed"
            value={stats.completed}
            icon={<CheckCircleIcon />}
            accent="border-emerald-400"
          />
          <StatCard
            title="Cancelled"
            value={stats.cancelled}
            icon={<XCircleIcon />}
            accent="border-red-400"
          />
        </div>

        {/* 3,4,5. Search, Filter & Book Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            {/* Search Bar */}
            <div className="relative w-full sm:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {/* Filter Dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-40 border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {STATUS_FILTERS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold text-sm rounded-xl shadow-sm hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Book Appointment
          </button>
        </div>

        {/* 6. Appointment Table / Loading / Empty State */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            /* 10. Loading State */
            <div className="p-12 flex flex-col items-center justify-center text-gray-400 space-y-4">
              <svg
                className="animate-spin h-10 w-10 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <p className="text-sm font-medium">Loading appointments data...</p>
            </div>
          ) : filteredAppointments.length === 0 ? (
            /* 9. Empty State */
            <div className="p-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="h-16 w-16 bg-blue-50 text-blue-400 rounded-full flex items-center justify-center">
                <CalendarIcon />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">No appointments found</h3>
              <p className="text-sm text-gray-500 max-w-md">
                {searchQuery || statusFilter !== "All"
                  ? "Try adjusting your search or filter criteria."
                  : "No appointments have been booked yet. Click \"Book Appointment\" to schedule one."}
              </p>
              {(searchQuery || statusFilter !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("All");
                  }}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100 text-sm">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Appointment ID
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Patient Name
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Doctor
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Time
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 bg-white">
                  {filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-gray-500">{apt.id}</td>
                      <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                        {apt.patientName}
                      </td>
                      <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{apt.doctor}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
                          {apt.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{apt.date}</td>
                      <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{apt.time}</td>
                      <td className="px-6 py-4">{getStatusBadge(apt.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            title="View details"
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          >
                            <EyeIcon />
                          </button>
                          <button
                            title="Edit appointment"
                            className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                          >
                            <PencilIcon />
                          </button>
                          {apt.status === "Scheduled" && (
                            <button
                              title="Cancel appointment"
                              onClick={() => handleCancel(apt.id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                            >
                              <BanIcon />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 7. Book Appointment Modal */}
      <BookAppointmentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleBookAppointment}
      />

      {/* 11. Footer */}
      <footer className="border-t border-gray-100 bg-white/80 backdrop-blur-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
          <p>&copy; 2026 MedCare Hospital Management System. All rights reserved.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span className="hover:text-blue-600 cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-blue-600 cursor-pointer transition">Terms of Service</span>
            <span className="hover:text-blue-600 cursor-pointer transition">Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppointmentsPage;