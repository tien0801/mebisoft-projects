/**
 * @file ExpenseTable.tsx
 * @description Component hiển thị bảng chi phí với Ant Design Table
 * @author Mebisoft Team
 * @created 2025-11-27
 */

'use client';

import { Button, Table, Tag, Modal } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import {
  ExpenseCategory,
  EXPENSE_CATEGORY_LABELS,
  EXPENSE_CATEGORY_COLORS,
  type Expense,
} from '../../types';
import { formatCurrency } from '../../data';

interface ExpenseTableProps {
  expenses: Expense[];
  onAdd: () => void;
  onDelete: (id: string) => void;
}

/**
 * Component bảng chi phí
 * Hiển thị: Ngày, Loại, Mô tả, Số tiền, Thao tác
 */
export function ExpenseTable({ expenses, onAdd, onDelete }: ExpenseTableProps) {
  /**
   * Handle xóa chi phí với confirm
   */
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa chi phí này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      okButtonProps: { danger: true },
      onOk: () => onDelete(id),
    });
  };

  // Columns definition
  const columns: ColumnsType<Expense> = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Loại chi phí',
      dataIndex: 'category',
      key: 'category',
      width: 150,
      render: (category: ExpenseCategory) => (
        <Tag className={EXPENSE_CATEGORY_COLORS[category]}>
          {EXPENSE_CATEGORY_LABELS[category]}
        </Tag>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      width: 150,
      align: 'right',
      render: (amount: number) => (
        <span className="font-semibold text-red-600">{formatCurrency(amount)}</span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4 md:mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Chi phí ({expenses.length})</h3>
        <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
          Thêm chi phí
        </Button>
      </div>
      <Table columns={columns} dataSource={expenses} rowKey="id" pagination={{ pageSize: 10 }} scroll={{ x: 800 }} />
    </div>
  );
}
