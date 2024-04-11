
type Props = {
  title: string;
  content: string;
  icon: React.ReactNode
}
export default function InfoWithIcon({ title, content, icon }: Props) {
  return <div className="flex gap-4 w-full">
    {icon}
    <div className="flex flex-col w-full">
      <span className="text-light text-sm">{title}</span>
      <span className="capitalize">{content}</span>
    </div>
  </div>
}