import { CiCreditCard1 } from 'react-icons/ci';
import { MdOutlineAttachMoney } from 'react-icons/md';
import type { IconType } from 'react-icons';

type DataPaymentType = {
    type: string;
    icon: IconType;
    title: string;
};

export const dataPayment: DataPaymentType[] = [
    {
        type: 'card',
        icon: CiCreditCard1,
        title: 'Chuyển khoản ngân hàng'
    },
    {
        type: 'cash',
        icon: MdOutlineAttachMoney,
        title: 'Thanh toán tiền mặt'
    }
];
