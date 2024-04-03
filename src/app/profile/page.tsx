export default function ProfilePage() {
  return <section className="p-4">
    <h1 className="text-3xl font-bold text-primary-foreground">Profile</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-primary-200 p-4 rounded-md">
        <h2 className="text-xl font-bold text-primary-foreground">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" className="input" />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" className="input" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="input" />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" className="input" />
          </div>
        </div>
      </div>
      <div className="bg-primary-200 p-4 rounded-md">
        <h2 className="text-xl font-bold text-primary-foreground">Change Password</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="currentPassword">Current Password</label>
            <input type="password" id="currentPassword" className="input" />
          </div>
          <div>
            <label htmlFor="newPassword">New Password</label>
            <input type="password" id="newPassword" className="input" />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" className="input" />
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-end mt-4">
      <button className="btn btn-primary">Save Changes</button>
    </div>
  </section>
}