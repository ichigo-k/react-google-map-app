import React from 'react'

function SideBar() {
    const [folders, setFolders] = React.useState([]);
    const [selectedFolder, setSelectedFolder] = React.useState(null);

    const handleDirectoryPicker = async () => {
        if ('showDirectoryPicker' in window) {
            try {
                const directoryHandle = await window.showDirectoryPicker();
                const folders = [];

                for await (const [name, handle] of directoryHandle) {
                    if (handle.kind === 'directory') {
                        const subFiles = [];
                        for await (const [subName, subHandle] of handle) {
                            if (subHandle.kind === 'file') {
                                const file = await subHandle.getFile();
                                if (file.type.startsWith('image/')) {
                                    subFiles.push({
                                        name: file.name,
                                        url: URL.createObjectURL(file)
                                    });
                                }
                            }
                        }
                        if (subFiles.length > 0) {
                            folders.push({ name, files: subFiles });
                        }
                    }
                }

                setFolders(folders);
                if (folders.length > 0) setSelectedFolder(folders[0].name);
            } catch (error) {
                console.error('Error accessing directory:', error);
            }
        } else {
            alert('Your browser does not support the Directory Picker API');
        }
    };

    return (
        <div className='w-full h-screen overflow-x-auto p-2 shadow-md'>
            <div className="container mx-auto p-4">
                <button onClick={handleDirectoryPicker} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">
                    Select Directory
                </button>
                <div className="flex flex-col">
                    <div className="flex space-x-2 mb-4 overflow-x-auto scroll">
                        {folders.map((folder, index) => (
                            <button
                                key={index}
                                className={`cursor-pointer p-2 rounded-md whitespace-nowrap ${selectedFolder === folder.name ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                                onClick={() => setSelectedFolder(folder.name)}
                            >
                                {folder.name}
                            </button>
                        ))}
                    </div>
                    <div className="flex-grow bg-gray-100 rounded-md scroll">
                        {selectedFolder && (
                            <div className="grid grid-cols-2 gap-4">
                                {folders.find(folder => folder.name === selectedFolder).files.map((file, index) => (
                                    <div key={index} className="p-2 border border-gray-300 rounded-md">
                                        <img src={file.url} alt={file.name} className="w-full h-auto object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
