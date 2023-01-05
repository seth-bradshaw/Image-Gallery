const { pick } = require('rambda');
const Image = require('../../models/Image');
const validateImageCreationRequestBody = require('../../validation/validateImage');

const saveImageDetails = async (req, res) => {
    const { body } = req;
    const { isValid, errors } = validateImageCreationRequestBody(body);

    if (!isValid) {
        res.status(400).send({ message: 'Failed to create image. Invalid request body.', errors });
        return;
    }

    const image = {
        ...body,
        userId: res.userId
    }
            
    Image.create(image)
        .then((img) => res.status(200).send(pick(['id', 'handle'], img)))
        .catch(error => res.status(400).send({ message: 'Failed to upload image. Please try again.', error }));

}

// * stretch - update internal details after image transformation
const editImageDetails = async (req, res) => {
    res.send('edited image')
}

const deleteImage = async (req, res) => {
    const { id = '' } = req.query;

    await Image.findOne({ _id: id }).then((image) => {
        console.log('image', { image, id })
        if (!image) {
            return res.status(400).send({ error: { message: 'Failed to delete image. Invalid id' } })
        }

        Image.deleteOne({ _id: id }).then((msg) => {
            if (!msg.acknowledged || msg.deletedCount < 1) {
                return res.status(400).send('Failed to delete image. Please try again.')
            } else {
                return res.status(200).send('Successfully deleted image.');
            }
        })
    })
}

const fetchUserImages = async (req, res) => {
    const { limit = 10, offset = 0 } = req.query;

    const images = await Image.find({ userId: res.userId }, 'id handle', { limit: +limit, skip: +offset });

    return res.status(200).send(images);
}

module.exports = { saveImageDetails, editImageDetails, deleteImage, fetchUserImages }