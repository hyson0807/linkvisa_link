import { Badge } from '@/components/ui/badge';

const STATUS_CONFIG = {
  '대기': { variant: 'secondary' as const, className: 'bg-gray-100 text-gray-700 hover:bg-gray-100' },
  '검토중': { variant: 'secondary' as const, className: 'bg-blue-50 text-blue-700 hover:bg-blue-50' },
  '완료': { variant: 'secondary' as const, className: 'bg-green-50 text-green-700 hover:bg-green-50' },
};

export default function StatusBadge({ status }: { status: '대기' | '검토중' | '완료' }) {
  const config = STATUS_CONFIG[status];
  return (
    <Badge variant={config.variant} className={config.className}>
      {status}
    </Badge>
  );
}
