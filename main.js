function createFolderList(parentElementId,data){
    const parentElement=document.getElementById(parentElementId);
    if (!parentElement) {
        console.error("Parent element not found");
        return;
    }
    const createFolderStructure=(data)=>{
        const folderLists=document.createElement('div');
        folderLists.className='folder-lists';
        const folderName=document.createElement('div');
        folderName.className='folder-name';
        folderName.textContent=DataTransfer.name;
        const folder=document.createElement('div');
        folder.className='folder';
        folder.style.display='none';
        folderName.addEventListener('click',()=>{
            const isVisible = folder.style.display === 'block';
            folder.style.display = isVisible ? 'none' : 'block';
        })
        if(Array.isArray(data.items)){
            data.items.forEach(item=>{
                if(typeof item==='object' && item.name){
                    const nestedFolder=createFolderStructure(item);
                    folder.appendChild(nestedFolder);
                }
                else{
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

        
    }
    data.forEach(folderData=>{
        const folderElement = createFolderStructure(folderData);
        parentElement.appendChild(folderElement);
    })
}


document.addEventListener('DOMContentLoaded',()=>{
    const data = [
        {
            name: 'Folder 1',
            items: [
                'File 1',
                {
                    name: 'Subfolder 1',
                    items: ['File A', 'File B',{
                        name:'sub sub folder',
                        items:['File Aa', 'File Bb']
                    }]
                },
                'File 3',
                'file 4',
                'file 5',
                {
                    name: 'Subfolder 2',
                    items: ['File A2', 'File B2',{
                        name:'sub sub folder 2',
                        items:['File Aa', 'File Bb']
                    }]
                }
            ]
        },
        {
            name: 'Folder 2',
            items: ['File 4', 'File 5',
                {
                    name: 'Subfolder 2',
                    items: ['File A2', 'File B2',{
                        name:'sub sub folder 2',
                        items:['File Aa', 'File Bb']
                    }]
                }
            ]
        }
    ];
    createFolderList('container-main',data)
})