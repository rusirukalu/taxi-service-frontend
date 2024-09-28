import React from 'react'
import ImageUploader from "../../utils/ImageUploader";
import { useState } from "react";


const ImageComponent = () => {
    const [imageUrls, setImageUrl] = useState([]);

    console.log(imageUrls);

    const handleImageUrlChange = (newImageUrl) => {
        setImageUrl(newImageUrl);
    }
    return (
        <div>
            <div className="bg-primary bg-gradient w-75">
                <ImageUploader onImageUrlChange={handleImageUrlChange} />
            </div>
        </div>
    );
};
export default ImageComponent;
