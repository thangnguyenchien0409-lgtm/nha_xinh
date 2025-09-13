import type { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
