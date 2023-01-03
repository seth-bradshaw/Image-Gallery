const saveImageDetails = async (req, res) => {
    res.send('saved image')
}

// * stretch - update internal details after image transformation
const editImageDetails = async (req, res) => {
    res.send('edited image')
}

const deleteImage = async (req, res) => {
    res.send('deleted image')
}

module.exports = { saveImageDetails, editImageDetails, deleteImage }