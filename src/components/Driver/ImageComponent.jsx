import React from 'react'
import ImageUploader from "../../utils/ImageUploader";
import { useState } from "react";


const ImageComponent = () => {
    const [imageUrls, setImageUrl] = useState([]);

    console.log(imageUrls);

   
    return (
        <div>
            <div className="bg-primary bg-gradient w-75">
                
            </div>
        </div>
    );
};
export default ImageComponent;
