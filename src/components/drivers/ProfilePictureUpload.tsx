// src/components/ProfilePictureUpload.tsx

import React, { useState } from 'react';
import { uploadProfilePicture } from '@/lib/api';

interface ProfilePictureUploadProps {
    driverId: number;
}

export default function ProfilePictureUpload({ driverId }: ProfilePictureUploadProps) {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (file) {
            await uploadProfilePicture(driverId, file);
            alert('Profile picture updated successfully');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}
