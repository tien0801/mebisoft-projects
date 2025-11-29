/**
 * @file AddRevenueModal.tsx
 * @description Modal thêm doanh thu mới cho dự án
 * @author Mebisoft Team
 * @created 2025-11-27
 */

'use client';

import { Modal, Form, Input, DatePicker, InputNumber } from 'antd';
import type { RevenueFormData } from '../../types';

interface CreateRevenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RevenueFormData) => void;
}

/**
 * Modal thêm doanh thu mới
 * Cho phép nhập: Mô tả, Số tiền, Hạn thanh toán, Mã hóa đơn
 */
export function CreateRevenueModal({ isOpen, onClose, onSubmit }: CreateRevenueModalProps) {
  const [form] = Form.useForm();

  /**
   * Handle submit form
   */
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const data: RevenueFormData = {
        description: values.description,
        amount: values.amount,
        dueDate: values.dueDate.format('YYYY-MM-DD'),
        invoiceNumber: values.invoiceNumber,
      };

      onSubmit(data);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  /**
   * Handle cancel
   */
  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Thêm doanh thu mới"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Thêm"
      cancelText="Hủy"
      destroyOnHidden
    >
      <Form form={form} layout="vertical">
        {/* Mô tả */}
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
        >
          <Input.TextArea rows={3} placeholder="Nhập mô tả doanh thu" />
        </Form.Item>

        {/* Số tiền */}
        <Form.Item
          name="amount"
          label="Số tiền (VND)"
          rules={[{ required: true, message: 'Vui lòng nhập số tiền' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            placeholder="Nhập số tiền"
          />
        </Form.Item>

        {/* Hạn thanh toán */}
        <Form.Item
          name="dueDate"
          label="Hạn thanh toán"
          rules={[{ required: true, message: 'Vui lòng chọn hạn thanh toán' }]}
        >
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
        </Form.Item>

        {/* Mã hóa đơn */}
        <Form.Item name="invoiceNumber" label="Mã hóa đơn">
          <Input placeholder="Nhập mã hóa đơn (tùy chọn)" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
