function createFolderList(parentElementId, data) {
    // Get the parent element
    const parentElement = document.getElementById(parentElementId);
    if (!parentElement) {
        console.error("Parent element not found");
        return;
    }

    // Recursive function to create folder structure
    const createFolderStructure = (folderData) => {
        const folderLists = document.createElement('div');
        folderLists.className = 'folder-lists';

        // Create folder-name div
        const folderName = document.createElement('div');
        folderName.className = 'folder-name';
        folderName.textContent = folderData.name || 'Unnamed Folder';

        // Create folder div
        const folder = document.createElement('div');
        folder.className = 'folder';

        // Initially, hide the folder content
        folder.style.display = 'none';

        // Add click event to toggle dropdown
        folderName.addEventListener('click', () => {
            const isVisible = folder.style.display === 'block';
            folder.style.display = isVisible ? 'none' : 'block';
        });

        // Check if items exist
        if (Array.isArray(folderData.items)) {
            folderData.items.forEach(item => {
                if (typeof item === 'object' && item.name) {
                    // Handle nested folder
                    const nestedFolder = createFolderStructure(item);
                    folder.appendChild(nestedFolder);
                } else {
                    // Handle flat item
                    const itemElement = document.createElement('div');
                    itemElement.className = 'item';
                    itemElement.textContent = item;
                    folder.appendChild(itemElement);
                }
            });
        }

        folderLists.appendChild(folderName);
        folderLists.appendChild(folder);
        return folderLists;
    };

    // Process top-level folders
    data.forEach(folderData => {
        const folderElement = createFolderStructure(folderData);
        parentElement.appendChild(folderElement);
    });
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
    const data = [
        {
            name: 'Folder 1',
            items: [
                'File 1',
                {
                    name: 'Subfolder 1',
                    items: ['File A', 'File B']
                },
                'File 3'
            ]
        },
        {
            name: 'Folder 2',
            items: ['File 4', 'File 5']
        }
    ];

    createFolderList('container', data);
});
