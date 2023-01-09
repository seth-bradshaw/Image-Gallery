
import { createAsyncThunk } from "@reduxjs/toolkit";
import { uploadImageDetails } from "../../services/images";
import { Image, ImageTags } from "../types";

const uploadImage = createAsyncThunk<Image, {handle: string, tags: ImageTags}, { rejectValue: { message: string } | string }>('images/upload', async (details, thunkApi) => {
    const response: Image = await uploadImageDetails(details);

    return response;
})

export default uploadImage;