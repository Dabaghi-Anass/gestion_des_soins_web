"use client";
import imageIcon from "@/assets/svgs/edit-image.svg";
import defaultUserImageFemale from "@/assets/svgs/user-f.svg";
import defaultUserImageMale from "@/assets/svgs/user-m.svg";
import Form from "@/components/form";
import Loading from "@/components/ui/loading";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  onNext: (imageUrl: string) => void;
  onBack: () => void;
  gender: boolean;
}
export default function ProfileImageSelect({ onNext, onBack, gender }: Props) {
  const [formError, setFormError] = useState<string | null>(null)
  const [image, setImage] = useState<string>(defaultUserImageMale.src);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async () => {
    setFormError(null)
    setLoading(true);
    await onNext(image);
    setLoading(false);
  };
  const handlePickImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const imageFile = e.target.files?.[0];
    if (!imageFile) return;
    const imageUrl = URL.createObjectURL(imageFile);
    setImage(imageUrl);
    setLoading(false);
  }
  useEffect(() => {
    if (gender) {
      setImage(defaultUserImageMale.src)
    } else {
      setImage(defaultUserImageFemale.src)
    }
  }, [gender])
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
          <Image src={image} alt="profile image" className="rounded-lg w-full h-full object-cover max-w-md" width={200} height={200} />
        </div>
        <div className="button-group flex gap-4 w-full justify-center">
          <Form.Button variant="outline" onClick={onBack}>retourne</Form.Button>
          <Form.Button onClick={handleSubmit}>Save Image</Form.Button>
          <Form.Button variant="outline" onClick={() => {
            const image = gender ? defaultUserImageMale.src : defaultUserImageFemale.src;
            onNext(image)
          }}>Je Prefer pas</Form.Button>
        </div>
      </Form>
    </div>
  </section >
}