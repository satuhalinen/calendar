import { fetchProfileImageUrl } from '../profileImageSlice';

export const fetchProfileImage = (userId) => async (dispatch) => {
    try {
        await dispatch(fetchProfileImageUrl(userId));
    } catch (error) {
        console.error('Error fetching profile image:', error);
    }
};