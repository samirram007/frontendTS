




export const DocumentUpload = () =>{
    return(
        <div className="w-full flex flex-col">
            <label htmlFor="uploadImage" className="font-bold">Document Upload</label>
            <input type="file" className="border-2 border-black w-fit" placeholder="Upload Document" />
        </div>
    )
}