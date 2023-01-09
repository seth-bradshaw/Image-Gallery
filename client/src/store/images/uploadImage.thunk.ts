
import { createAsyncThunk } from "@reduxjs/toolkit";
import { uploadImageDetails } from "../../services/images";
import { Image } from "../types";

const uploadImage = createAsyncThunk<Image, string, { rejectValue: { message: string } | string }>('images/upload', async (handle, thunkApi) => {
    const response: Image = await uploadImageDetails({ handle });

    return response;
})

export default uploadImage;