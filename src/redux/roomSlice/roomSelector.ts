import { useRemoveVietnameseTones } from '@/hooks/useRemoveVNTones';
import type { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';

export const room = (state: RootState) => state.room.room;
export const searchRoomByText = (state: RootState) => state.room.searchText;

export const roomFilter = createSelector([room, searchRoomByText], (listRoom, searchText) => {
    let list: any[] = listRoom;

    if (searchText) {
        const query = useRemoveVietnameseTones(searchText);
        list = list.filter((item) => useRemoveVietnameseTones(item.name).includes(query));
    }

    return list;
});
