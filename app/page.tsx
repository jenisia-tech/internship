export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">
        Hospital Management System
      </h1>

      <p className="mt-4">
        Manage patients, doctors, and appointments.
      </p>

      <h2 className="mt-8 text-2xl font-semibold">
        Features
      </h2>

      <ul className="list-disc ml-6 mt-2">
        <li>Create Patients</li>
        <li>View Patients</li>
        <li>Update Patient Records</li>
        <li>Delete Patients</li>
        <li>Manage Doctors</li>
        <li>Manage Appointments</li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold">
        CRUD APIs
      </h2>

      <ul className="list-disc ml-6 mt-2">
        <li>GET /api/patients</li>
        <li>POST /api/patients</li>
        <li>PATCH /api/patients/[id]</li>
        <li>DELETE /api/patients/[id]</li>
      </ul>
    </main>
  );
}