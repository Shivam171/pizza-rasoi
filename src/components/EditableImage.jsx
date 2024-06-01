import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({link,setLink}) {
  const handleFileChange = async (ev) => {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData;
      data.set('file', files[0]);

      const uploadPromise = new Promise(async (resolve, reject) => {
        const response = await fetch('api/upload', {
          method: 'POST',
          body: data,
        })
        if (response.ok) {
          const link = await response.json();
          setLink(link);
          resolve();
        } else {
          reject();
        }
      })

      await toast.promise(uploadPromise, {
        loading: 'Uploading...',
        success: 'Upload completed !',
        error: 'Upload error !',
      });
    }
  }
  return (
    <>
      {link && (
        <Image className="rounded-lg w-full h-full mb-1" src={link} alt={'avatar'} width={300} height={300} />
      )}
      {!link &&(
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">No Image</div>
      )}
      <label>
        <input type="file" name="" id="" className="hidden" onChange={handleFileChange} />
        <span className="border border-gray-300 rounded-lg p-2 text-center block cursor-pointer">Edit</span>
      </label>
    </>
  )
}
