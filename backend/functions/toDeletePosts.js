import { supabase } from "../db/supadb.js";

const checkIfTableEmpty = async (tableName) => {
    const { count, error } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error(`Error checking if ${tableName} is empty:`, error);
        return true;
    }

    return count === 0;
};

export const deleteOldPosts = async () => {
    const isPostsEmpty = await checkIfTableEmpty('posts');
    if (isPostsEmpty) {
        console.log('Posts table is empty. No records to delete.');
        return;
    }

    const { data, error } = await supabase
        .from('posts')
        .delete()
        .lt('updated_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    if (error) {
        console.error('Error deleting old posts:', error);
    } else {
        console.log('Old posts deleted:', data);
    }
};