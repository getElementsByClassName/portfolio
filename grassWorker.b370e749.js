grassWorker.onmessage = (event)=>{
    const { chunkKey, grassGeometryData } = event.data;
    // Create instanced buffer geometry for grass blades
    const grassGeometry = new THREE.InstancedBufferGeometry();
    grassGeometry.copy(new THREE.PlaneGeometry(0.1, 1)); // Base blade geometry
    grassGeometry.setAttribute("offset", new THREE.InstancedBufferAttribute(grassGeometryData.offsets, 3));
    grassGeometry.setAttribute("rotation", new THREE.InstancedBufferAttribute(grassGeometryData.rotations, 1));
    grassGeometry.setAttribute("scale", new THREE.InstancedBufferAttribute(grassGeometryData.scales, 1));
    const grassMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide
    });
    const grassMesh = new THREE.Mesh(grassGeometry, grassMaterial);
    // Add grass to the scene
    scene.add(grassMesh);
    // Store the grass mesh in the loadedChunks map
    if (loadedChunks.has(chunkKey)) loadedChunks.get(chunkKey).grassMesh = grassMesh;
};

//# sourceMappingURL=grassWorker.b370e749.js.map
