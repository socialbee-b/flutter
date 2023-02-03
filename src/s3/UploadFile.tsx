import axios from 'axios';
import React , {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfilePic, getUser } from '../components/store/users.slice';
import { generateUploadURL } from './s3Config';


// installed using npm install buffer --save
window.Buffer = window.Buffer || require("buffer").Buffer;

// a React functional component, used to create a simple upload input and button

const UploadFile: React.FC<any> = () => {


    const user = useSelector(getUser);
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch<any>();


    const handleFileInput = (e: any) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = async (file: any) => {
        // All axios request here
        console.log(file);
        const url = await generateUploadURL(user?.id, file.name);
        console.log(url);
        const response = await axios.put(url, file);
        const imageUrl = url.split('?')[0];
        console.log(imageUrl);
        dispatch(changeProfilePic({
            id: user?.id,
            imageUrl: imageUrl
        }))
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