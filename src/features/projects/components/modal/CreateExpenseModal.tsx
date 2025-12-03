/**
 * @file AddExpenseModal.tsx
 * @description Modal thêm chi phí mới cho dự án
 * @author Mebisoft Team
 * @created 2025-11-27
 */

'use client';

import { Modal, Form, Input, Select, DatePicker, InputNumber } from 'antd';
import {
  ExpenseCategory,
  EXPENSE_CATEGORY_LABELS,
  type ExpenseFormData,
} from '../../types';

interface CreateExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ExpenseFormData) => void;
}

/**
 * Modal thêm chi phí mới
 * Cho phép nhập: Loại chi phí, Mô tả, Số tiền, Ngày
 */
export function CreateExpenseModal({ isOpen, onClose, onSubmit }: CreateExpenseModalProps) {
  const [form] = Form.useForm();

  /**
   * Handle submit form
   */
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const data: ExpenseFormData = {
        category: values.category,
        description: values.description,
        amount: values.amount,
        date: values.date.format('YYYY-MM-DD'),
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
      title="Thêm chi phí mới"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Thêm"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        {/* Loại chi phí */}
        <Form.Item
          name="category"
          label="Loại chi phí"
          rules={[{ required: true, message: 'Vui lòng chọn loại chi phí' }]}
        >
          <Select placeholder="Chọn loại chi phí">
            {Object.values(ExpenseCategory).map((cat) => (
              <Select.Option key={cat} value={cat}>
                {EXPENSE_CATEGORY_LABELS[cat]}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Mô tả */}
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
        >
          <Input.TextArea rows={3} placeholder="Nhập mô tả chi phí" />
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

        {/* Ngày */}
        <Form.Item
          name="date"
          label="Ngày"
          rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
        >
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
