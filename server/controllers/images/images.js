const runClientWith = require('../../mongo/client');

const saveImageDetails = async (req, res) => {
    const { body } = req;

    if (!body.handle || body.handle.length === 0) {
        res.status(400).send('Invalid body: handle field is required.');
    } else {
        const date = new Date();
        const time = date.getTime();
    
        const saveImageHandler = async (client) => {
            const db = client.db('gallery');
            const coll = db.collection('images');
            const image = {
                ...body,
                userId: res.userId,
                uploaded_at: time
            }
    
            const result = await coll.insertOne(image);
    
            if (!result.insertedId) {
                res.status(400).send({ error: { message: 'Failed to upload image. Please try again.' } })
            }
    
            res.status(200).send('Successfully uploaded image.')
        }
    
        await runClientWith(saveImageHandler);
    }

}

// * stretch - update internal details after image transformation
const editImageDetails = async (req, res) => {
    res.send('edited image')
}

const deleteImage = async (req, res) => {
    const { id } = req.params;


    const deleteImageHandler = async (client) => {
        const db = client.db('gallery');
        const coll = db.collection('images');

        const result = await coll.deleteOne({id});

        if (!result.deletedCount < 1) {
            res.status(400).send({ error: { message: 'Failed to upload image. Please check id and try again.' } })
        } else {
            res.status(200).send('Successfully deleted image.')
        }

    }

    await runClientWith(deleteImageHandler);
}

const fetchUserImages = async (req, res) => {
    const { limit = 10, offset = 0 } = req.query;

    const paginateImagesHandler = async (client) => {
        const db = client.db('gallery');
        const coll = db.collection('images');

        const result = await coll.find({ userId: res.userId }).limit(+limit).skip(+offset);
        
        const images = [];
        
        await result.forEach((img) => images.push(img))

        if (result.killed) {
            res.status(400).send({ error: { message: 'Failed to fetch user images. Please try again.' } })
        } else {
            res.status(200).send(images)
        }
    }

    await runClientWith(paginateImagesHandler);
}

module.exports = { saveImageDetails, editImageDetails, deleteImage, fetchUserImages }