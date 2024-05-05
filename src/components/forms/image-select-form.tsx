"use client";
import imageIcon from "@/assets/svgs/edit-image.svg";
import Form from "@/components/forms/form";
import Loading from "@/components/ui/loading";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  user: any;
  imageUrl: string | null;
  onBack: () => void;
  onSkip: () => void;
  onNext: (imageUrl: string) => void;
  onImage: (imageUrl: string) => void;
}
export default function ProfileImageSelect({
  onNext,
  onBack,
  onSkip,
  onImage,
  user,
  imageUrl: imageProp
}: Props) {
  const genderImage = (user?.profile?.gender === "FEMALE" ?
    "/user-f.svg" : '/user-m.svg');
  const imageUrl = imageProp || genderImage;

  const [formError, setFormError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async () => {
    setFormError(null)
    setLoading(true);
    await onNext(imageUrl);
    setLoading(false);
  };
  const handlePickImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const imageFile = e.target.files?.[0];
    if (!imageFile) return;
    onImage(URL.createObjectURL(imageFile));
    setLoading(false);
  }

  useEffect(() => {
    if (user?.profile?.imageUrl) onSkip()
    else onImage(imageUrl)
  }, [user])
  return <section className="flex flex-col items-center w-full ">
    <h1 className="md:text-3xl">selectioner une image</h1>
    <div className="h-screen w-full flex flex-col gap-4 items-center">
      {formError && <div className="text-red-600 text-center py-2 px-2 w-full rounded flex items-center justify-center gap-2 text-2xl">{formError}</div>}
      <Form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 px-4 w-full max-w-xl md:min-w-[500px] relative'>
        {loading && <Loading />}
        <div className="w-full flex items-center justify-center relative border border-primary my-4 rounded-lg">
          <label className="overlay absolute inset-0 z-10 hover:bg-slate-300 active:bg-slate-300 opacity-0 transition-all duration-300 hover:opacity-100 hover:bg-opacity-50 flex items-center justify-center">
            <input onChange={handlePickImage} type="file" accept="image/*" className="hidden" />
            <Image src={imageIcon.src} alt="edit image icon" className="max-w-full aspect-square" width={200} height={200} />
          </label>
          <Image src={imageUrl} loading="lazy" alt="profile image" className="rounded-lg w-full h-full object-cover max-w-md" width={200} height={200} />
        </div>
        <div className="button-group flex gap-4 w-full justify-center">
          <Form.Button variant="outline" onClick={onBack}>retourne</Form.Button>
          <Form.Button onClick={handleSubmit}>Save Image</Form.Button>
          <Form.Button variant="outline" onClick={() => {
            const image = user?.profile?.gender === "MALE" ? '/user-m.svg' : '/user-f.svg';
            onNext(image)
          }}>Je Prefer pas</Form.Button>
        </div>
      </Form>
    </div>
  </section >
}