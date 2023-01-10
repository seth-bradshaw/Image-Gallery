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
    
    body.tags.userId = res.userId;
    Image.create(body)
        .then((img) => res.status(200).send(pick(['_id', 'handle', 'tags'], img)))
        .catch(error => res.status(400).send({ message: 'Failed to upload image. Please try again.', error }));

}

// * stretch - update internal details after image transformation
const editImageDetails = async (req, res) => {
    res.send('edited image')
}

const deleteImage = async (req, res) => {
    const { id = '' } = req.query;

    await Image.findOne({ _id: id }).then((image) => {
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

    const images = await Image.find({ userId: res.userId }, 'id handle tags', { limit: +limit, skip: +offset });

    const baseUrl =`${process.env.HOST}/images/user`; 
    const nextOffset = +offset + +limit;
    // you need total to fix bug
    const next = images.length === +limit ? `${baseUrl}?offset=${nextOffset}&limit=${limit}` : null;
    const prev =  nextOffset - limit > 1 ? `${baseUrl}?offset=${Math.max(0, offset - limit)}&limit=${limit}` : null;
    
    // how to return response ===>
    return res.status(200).send({
        images,
        next,
        prev
    });
}

const fetchPublicImages = async (req, res) => {
    const { limit = 10, offset = 0 } = req.query;

    const images = await Image.find({ "tags.scope": 'public' }, 'id handle tags', { limit: +limit, skip: +offset });

    const baseUrl =`${process.env.HOST}/images/public`; 
    const nextOffset = +offset + +limit;
    // you need total to fix bug
    const next = images.length === +limit ? `${baseUrl}?offset=${nextOffset}&limit=${limit}` : null;
    const prev =  nextOffset - limit > 1 ? `${baseUrl}?offset=${Math.max(0, offset - limit)}&limit=${limit}` : null;
    
    // how to return response ===>
    return res.status(200).send({
        images,
        next,
        prev
    });
}

module.exports = { saveImageDetails, editImageDetails, deleteImage, fetchUserImages, fetchPublicImages }