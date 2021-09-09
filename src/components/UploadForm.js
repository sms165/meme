
import React, {useState} from 'react'
import ProgressBar from './ProgressBar';



function UploadForm() {
//hook
// store in local
// initial state is null because no file is selected
 const [file, setFile] = useState(null);
 const [error, setError] = useState(null)

 const types = ['image/png',  'image/jpeg']

const changeHandler = (e) => {
    // = event in this case the onChange, the target is the import, files[0] -only first file is selected 
    let selected = e.target.files[0];

    // true if a file of the correct type is selected
    if (selected && types.includes(selected.type)) {
        setFile(selected );
        setError('');
        
    }else{
        setFile(null);
        setError('Not correct file type only png or jpeg');

    }
}

    return (
        <form>
            <label className="add-file" htmlFor="add file">
            <input className="choose-file" type="file" onChange={changeHandler}/>
            <span>+</span>
            </label>
            <div className="output">
                {/* if an error occurs the error is put out in a div tag called error */}
                {error && <div className="error">{error}</div>}
                {file && <div className="file">{file.name}</div>}
                {file && <ProgressBar file={file} setFile={setFile} />}

            </div>
        </form>  
    )
}

export default UploadForm
