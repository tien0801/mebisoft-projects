/**
 * @file RevenueTable.tsx
 * @description Component hiển thị bảng doanh thu với Ant Design Table
 * @author Mebisoft Team
 * @created 2025-11-27
 */

'use client';

import { Button, Table, Tag, Modal } from 'antd';
import { DeleteOutlined, PlusOutlined, CheckCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import {
  PaymentStatus,
  PAYMENT_STATUS_LABELS,
  PAYMENT_STATUS_COLORS,
  type Revenue,
} from '../../types';
import { formatCurrency } from '../../data';

interface RevenueTableProps {
  revenues: Revenue[];
  onAdd: () => void;
  onDelete: (id: string) => void;
  onMarkAsPaid: (id: string) => void;
}

/**
 * Component bảng doanh thu
 * Hiển thị: Mã HĐ, Mô tả, Số tiền, Hạn TT, Trạng thái, Thao tác
 */
export function RevenueTable({ revenues, onAdd, onDelete, onMarkAsPaid }: RevenueTableProps) {
  /**
   * Handle xóa doanh thu với confirm
   */
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa doanh thu này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      okButtonProps: { danger: true },
      onOk: () => onDelete(id),
    });
  };

  // Columns definition
  const columns: ColumnsType<Revenue> = [
    {
      title: 'Mã hóa đơn',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
      width: 130,
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
        <span className="font-semibold text-green-600">{formatCurrency(amount)}</span>
      ),
    },
    {
      title: 'Hạn thanh toán',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 120,
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status: PaymentStatus) => (
        <Tag className={PAYMENT_STATUS_COLORS[status]}>{PAYMENT_STATUS_LABELS[status]}</Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      align: 'center',
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          {record.status === PaymentStatus.PENDING && (
            <Button
              type="primary"
              size="small"
              icon={<CheckCircleOutlined />}
              onClick={() => onMarkAsPaid(record.id)}
            >
              Đã TT
            </Button>
          )}
          <Button type="text" danger size="small" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Doanh thu ({revenues.length})</h3>
        <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
          Thêm doanh thu
        </Button>
      </div>
      <Table columns={columns} dataSource={revenues} rowKey="id" pagination={{ pageSize: 10 }} scroll={{ x: 900 }} />
    </div>
  );
}
