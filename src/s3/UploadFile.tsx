import axios from 'axios';
import React , {useState} from 'react';
import { generateUploadURL } from './s3Config';


// installed using npm install buffer --save
window.Buffer = window.Buffer || require("buffer").Buffer;

// a React functional component, used to create a simple upload input and button

const UploadFile: React.FC<any> = () => {

    const [selectedFile, setSelectedFile] = useState(null);


    const handleFileInput = (e: any) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = async (file: any) => {
        // All axios request here
        const url = await generateUploadURL();
        console.log(url);
        const response = await axios.put(url, file);
        const imageUrl = url.split('?')[0];
        console.log(imageUrl);
    }
    return ( 
        <div>
            <div>
                React S3 File Upload
            </div>
            <input type="file" onChange={handleFileInput}/>
            <br></br>
            <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
        </div>
    );
}

export default UploadFile;