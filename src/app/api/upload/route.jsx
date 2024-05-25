export async function POST(req){
  const data = await req.formData();
  if(data.get('file')){
    console.log();
  }
  return Response.json(true);
} 