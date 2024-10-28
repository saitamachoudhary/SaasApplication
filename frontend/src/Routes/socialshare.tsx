import React,{useState,useEffect,useRef} from 'react';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { fill } from "@cloudinary/url-gen/actions/resize";

import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";


const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
};

type SocialFormat = keyof typeof socialFormats;

const Socialshare = () => {
  const [uploadedImage,setUploadedImage]=useState<string|null>(null);
  const  [selectedFormat,setSelectedFormat]=useState<SocialFormat>("Instagram Square (1:1)");
  const [isUploading,setIsUploading]=useState(false);
  const [isTransforming,setIsTransforming]=useState(false);
  const imageRef=useRef<HTMLImageElement>(null);

  useEffect(()=>{
    if(uploadedImage){
      setIsTransforming(true)
    }
  },[selectedFormat,uploadedImage])

  const handleFileUploade=async()=>{
     const file=event?.target.files?.[0];
     if(!file) return;
     setIsUploading(true);
     const formData=new FormData();
     formData.append("file",file);
     try {
      
     } catch (error) {
      
     }
  }
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'demo'
    }
  });
  const myImage = cld.image('samples/upscale-face-1');
  // myImage.resize(fill().width(250).height(250));
  myImage
    .resize(thumbnail().width(250).height(250).gravity(focusOn(FocusOn.face())))
    .roundCorners(byRadius(20));
  return ( 
    <div>
      <AdvancedImage cldImg={myImage} />
    </div>
  )
}

export default Socialshare;