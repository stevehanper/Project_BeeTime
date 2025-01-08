import { X } from 'lucide-react';
import { Button } from './Button';

interface QRScannerProps {
  type: 'clockIn' | 'breakStart' | 'breakEnd' | 'clockOut';
  onClose: () => void;
  onScan: () => void;
}

export function QRScanner({ type, onClose, onScan }: QRScannerProps) {
  const titles = {
    clockIn: 'Clock In',
    breakStart: 'Break Start',
    breakEnd: 'Break End',
    clockOut: 'Clock Out'
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center p-4">
      <button onClick={onClose} className="absolute top-4 right-4 text-white">
        <X className="w-6 h-6" />
      </button>
      
      <h2 className="text-white mb-8">Scan your QR Code for {titles[type]}</h2>
      
      <div className="border-2 border-white w-64 h-64 mb-8 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* QR Scanner Placeholder */}
          <div className="w-48 h-48 border border-yellow-400" />
        </div>
      </div>

      <Button onClick={onScan}>Scan</Button>
    </div>
  );
}