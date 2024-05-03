import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../auth/firebase';

export const fetchProfileImageUrl = createAsyncThunk(
    'profileImage/fetchProfileImageUrl',
    async () => {
        try {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const photoURL = currentUser.photoURL;
                return photoURL;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching profile image URL:', error);
            return null;
        }
    }
);

const profileImageSlice = createSlice({
    name: 'profileImage',
    initialState: {
        profileImageUrl: null,
        loading: false,
        error: null,
    },
    reducers: {
        setProfileImageUrl: (state, action) => {
            state.profileImageUrl = action.payload;
        },
        updateProfileImageUrl: (state, action) => {
            state.profileImageUrl = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfileImageUrl.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchProfileImageUrl.fulfilled, (state, action) => {
            state.loading = false;
            state.profileImageUrl = action.payload;
        });
        builder.addCase(fetchProfileImageUrl.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export const { setProfileImageUrl, updateProfileImageUrl } = profileImageSlice.actions;
export default profileImageSlice.reducer;
export const selectProfileImageUrl = (state) => state.profileImage.profileImageUrl;