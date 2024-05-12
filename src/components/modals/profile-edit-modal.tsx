"use client"
import api from "@/api/api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks"
import { setCurrentUser } from "@/lib/features/user-reducer"
import { UserCog } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import Loading from "../ui/loading"
import WithToolTip from "../ui/with-tooltip"
export default function ProfileEditModal() {
  const dispatch = useAppDispatch();
  const currentUser: any = useAppSelector(state => state.UserReducer.user);
  const [user, setUser] = useState<any>(currentUser);
  const [open, setOpen] = useState<boolean>(false);
  const [image, setImage] = useState<any>();
  const [fileError, setFileError] = useState<string>();

  function handleUserChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  function handleProfileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, profile: { ...user?.profile, [e.target.name]: e.target.value } });
  }
  function openModal() {
    setOpen(true);
  }
  async function handleSubmit() {
    let savedProfile;
    if (image) {
      if (fileError) return toast.error("Image Upload Failed");
      const imageLink = await api.uploadImage(currentUser?.id, image);
      if (!imageLink) return toast.error("Image Upload Failed");
      savedProfile = await api.updateProfile({ ...user.profile, imageUrl: imageLink });
      if (!savedProfile) return toast.error("Profile Update Failed");
    } else {
      savedProfile = await api.updateProfile(user.profile);
    }
    const savedUser = await api.updateUser(user);
    if (!savedUser) return toast.error("User Update Failed");
    dispatch(setCurrentUser(savedUser));
    toast.success("Profile Updated Successfully");
  }
  useEffect(() => {
    setFileError("");
    if (image) {
      if (image.size > 1024 * 1024 * 5) return setFileError("File Size Must Be Less Than 5MB");
      let url = URL.createObjectURL(image);
      setUser((prev: any) => ({ ...prev, profile: { ...prev.profile, imageUrl: url } }));
    }
  }, [image])
  if (!currentUser) return <Loading />;
  return (
    <Dialog open={open} onOpenChange={(state: boolean) => setOpen(state)} >
      <DialogTrigger asChild>
        <WithToolTip description="edit profile">
          <Button variant="outline" className="aspect-square p-2" onClick={openModal}>
            <UserCog color="#888" size={20} />
          </Button>
        </WithToolTip>
      </DialogTrigger>
      <DialogContent className="w-full lg:max-w-[90vw] max-w-[97vw]">
        <div className="mx-auto space-y-8 py-12 w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Edit Profile</h1>
            <Button onClick={handleSubmit}>Save Changes</Button>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[300px_1fr]">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-44 w-44 object-cover">
                <AvatarImage alt="Profile Image" src={api.getUrlFromPath(user?.profile?.imageUrl) || "user-m.svg"} />
                <AvatarFallback className="uppercase">{user?.firstName?.charAt(0) + user?.lastName?.charAt(0)}</AvatarFallback>
              </Avatar>
              {fileError && <div className="text-red-500">{fileError}</div>}
              <Input type='file' onChange={(e) => setImage(e.target.files?.[0])} placeholder="Changer L'image" />
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input value={user?.firstName} id="name" name="firstName" onChange={handleUserChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Prenom</Label>
                  <Input value={user?.lastName} id="lname" name="lastName" onChange={handleUserChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input value={user?.username} readOnly disabled id="email" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input value={user?.profile?.address} name="address" onChange={handleProfileChange} id="address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telephone</Label>
                  <Input value={user?.profile?.phoneNumber} name='phoneNumber' onChange={handleProfileChange} id="phone" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Sexe</Label>
                  <Select value={user?.profile?.gender} onValueChange={(value) => {
                    setUser({ ...user, profile: { ...user.profile, gender: value } });
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sexe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Homme</SelectItem>
                      <SelectItem value="FEMALE">Femme</SelectItem>
                    </SelectContent>
                  </Select>

                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthdate">Birth Date</Label>
                  <Input id="birthdate" type="date" onChange={handleProfileChange} name="birthDate" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}