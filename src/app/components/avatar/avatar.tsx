
import React from 'react';
import { Avatar } from 'primereact/avatar';

export default function ImageDemo() {
    return (
        <div className="card">
            <div className="flex flex-wrap gap-5">
                <div className="flex-auto">
                    <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" className="mr-2" size="xlarge" shape="circle" />
                </div>
            </div>
        </div>
    )
}
