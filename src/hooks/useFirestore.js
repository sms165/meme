import  {useState, useEffect} from 'react';
import {projectFirestore} from '../firebase/config';

function useFirestore(collection) {
    const [docs, setDocs] = useState([]);

    // active listener does not require to load page again when new image is added
    useEffect(() => {
        const unsub = projectFirestore.collection(collection)
        .orderBy('createdAt', 'desc')
        .onSnapshot((snap) => {
            let documents = [];
            snap.forEach(doc =>{
                // ... spread operator: expand object or array in this case the created at and the url
                documents.push({...doc.data(), id: doc.id})
                console.log(documents);
            });
            setDocs(documents);


        });
        // when no longer needed it unsubs -cleanup
        return () => unsub()
        
    }, [collection])

   
    
    return {docs};
}

export default useFirestore
