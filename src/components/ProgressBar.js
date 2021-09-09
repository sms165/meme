import React, {useEffect} from 'react'
import useStorage from '../hooks/useStorage'

function ProgressBar({file, setFile}) {
    // uses hook storage
    const {url, progress} = useStorage(file);

    useEffect(() => {
        if (url){
            setFile(null)
        }
    }, [url, setFile])

    
    return (
        <div>
            <div className="progress-bar" style={{width: progress +'%'}}>

            </div>
        </div>
    )
}

export default ProgressBar
