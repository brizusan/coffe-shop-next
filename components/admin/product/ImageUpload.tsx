"use client";
import { getImageUrl } from "@/src/utils";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useMemo, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

export const ImageUpload = ({ image }: { image: string | undefined }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const isUpload = useMemo(() => imageUrl !== "", [imageUrl]);

  return (
    <CldUploadWidget
      onSuccess={(result, { widget }) => {
        if (result.event === "success") {
          widget.close();
          // @ts-expect-error nextjs cludinary types
          setImageUrl(result.info?.secure_url);
        }
      }}
      uploadPreset="dhvk5j14"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => (
        <>
          <div className="space-y-2">
            <label htmlFor="image" className="text-slate-800 font-semibold">
              Imagen Producto
            </label>
            <div
              onClick={() => open()}
              className="relative cursor-pointer hover:opacity-80 
              transition border-dashed border-2 p-4 border-slate-300 rounded-lg flex flex-col justify-center items-center gap-3"
            >
              <div
                className={`${
                  isUpload ? "hidden" : "block"
                } flex justify-center flex-col gap-3 `}
              >
                <TbPhotoPlus className="w-12 h-12 text-amber-400 mx-auto" />
                <span className="text-lg font-semibold">
                  Selecciona tu Imagen
                </span>
              </div>

              {imageUrl && (
                <div className="w-48 h-48 relative">
                  <Image
                    src={imageUrl}
                    alt="Product Image"
                    fill
                    className="w-full h-full object-cover"
                    sizes="(max-width: 500px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
            </div>
            {image && !imageUrl && (
              <>
                <span className="text-lg font-semibold">Imagen Actual</span>
                <div className="w-48 h-48 relative">
                  <Image
                    src={getImageUrl(image)}
                    alt="Product Image"
                    fill
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
              </>
            )}
            <input
              type="hidden"
              id="image"
              name="image"
              defaultValue={imageUrl ? imageUrl : image}
            />
          </div>
        </>
      )}
    </CldUploadWidget>
  );
};
