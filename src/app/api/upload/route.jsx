import { app } from "@/components/Firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import uniqid from "uniqid"; 

export async function POST(req,res) {
  try {
    const data = await req.formData();
    const file = data.get('file');

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file found in the request' }), { status: 400 });
    }

    // Get a reference to the Firebase Storage bucket
    const storage = getStorage(app);
    const storageRef = ref(storage, uniqid());

    // Upload file to Firebase Storage
    await uploadBytes(storageRef, file);
    // Get the download URL of the uploaded file
    const downloadURL = await getDownloadURL(storageRef);

    return new Response(JSON.stringify({ url: downloadURL }), { status: 200 });
  } catch (error) {
    console.error('Error during file upload:', error.message);
    return new Response(JSON.stringify({ error: 'File upload failed' }), { status: 500 });
  }
}