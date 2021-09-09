import { useState, useEffect } from "react";
import {projectStorage, projectFirestore, timestamp} from '../firebase/config';

// hook: reuseable code to use in other components
// handle file upload

function useStorage(file) {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
   
    
    console.log(file)

    useEffect(() => {
        // references
        const storageRef = projectStorage.ref(file.name);
        // save image from storage to database
        const collectionRef = projectFirestore.collection('images'); //folder automatically created by firebase


        storageRef.put(file).on('state_changed', (snap)=>{
            let percentage = (snap.bytesTransferred / snap.totalBytes)*100;
            setProgress(percentage);
        }, 
        (err)=> {
            setError(err);
        }, async ()=>{ //waits for it to completly load
            const url = await storageRef.getDownloadURL();
            const alt = file.name;

            const createdAt= timestamp();
            collectionRef.add({url, createdAt, alt })
            setUrl(url)
          
        });
    }, [file]); //everytime file is changed this runs
    return { progress, url, error }
}

export default useStorage
