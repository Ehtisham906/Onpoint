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

export const deleteOldStories = async () => {
    const isStoriesEmpty = await checkIfTableEmpty('story');
    if (isStoriesEmpty) {
        console.log('Stories table is empty. No records to delete.');
        return;
    }

    const { data, error } = await supabase
        .from('story')
        .delete()
        .lt('updatedat', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    if (error) {
        console.error('Error deleting old stories:', error);
    } else {
        console.log('Old stories deleted:', data);
    }
};