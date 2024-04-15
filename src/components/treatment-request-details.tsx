import ProfileHeader from "./profile-header";
type Props = {
  request: any | null;
}
export default function TreatmentRequestDetails({ request }: Props) {
  if (!request)
    return <section className="profile bg-primary-foreground rounded-lg with-border flex flex-col gap-8 w-full p-6 items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-400">no request selected</h1>
    </section>
  return <section className="profile bg-primary-foreground rounded-lg with-border flex flex-col gap-8 w-full p-6">
    <ProfileHeader user={request.sentBy} />
    <div className="w-full h-full">
      <div className="flex gap-2 mb-4 items-center">
        <h1 className="text-xl font-semibold">{request.title}</h1>
        <span className="status-badge lowercase" style={{
          border: "1px solid orangered",
          color: "orangered"
        }}>{request.status}</span>
      </div>
      <p className="max-w-prose">{request.description}</p>
    </div>
    <div className="medical-info">

    </div>
  </section>
}