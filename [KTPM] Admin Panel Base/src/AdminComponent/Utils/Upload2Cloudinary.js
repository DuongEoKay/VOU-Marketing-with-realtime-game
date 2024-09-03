const upload_preset='FoodEase'
const cloud_name='dxsvumas8'


export const upload2Cloudinary = async (file)=>
    {
        const data= new FormData()
        data.append('file', file);
        data.append('upload_preset',upload_preset)
        data.append('cloud_name',cloud_name)

        const req= await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,{
            method:'POST',
            body:data
        })


        const fileData=await req.json()
        return fileData.url
    }


