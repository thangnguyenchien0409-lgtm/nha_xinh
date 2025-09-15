import * as yup from 'yup';

// Nếu muốn note/acceptTerms thật sự optional => dùng .notRequired()
// Nếu muốn luôn có field nhưng giá trị có thể rỗng => không optional trong type

export const orderSchema = yup.object({
    fullName: yup.string().required('Họ và tên là bắt buộc'),

    shippingAddress: yup.object({
        phone: yup
            .string()
            .required('Số điện thoại là bắt buộc')
            .matches(/^[0-9]{9,11}$/, 'Số điện thoại không hợp lệ'),
        postalCode: yup.string().nullable(),
        city: yup.string().required('Vui lòng chọn tỉnh / thành phố'),
        details: yup.string().required('Địa chỉ cụ thể là bắt buộc')
    }),

    note: yup.string().nullable().optional(),

    acceptTerms: yup
        .boolean()
        .oneOf([true], 'Bạn cần đồng ý điều khoản trước khi đặt hàng')
        .required()
});

export type OrderFormValues = yup.InferType<typeof orderSchema>;
