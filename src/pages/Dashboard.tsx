import { useState } from 'react';
import { Menu, Bell } from 'lucide-react';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { QRScanner } from '../components/QRScanner';

export function Dashboard() {
  const [currentTime, setCurrentTime] = useState('09:30');
  const [showScanner, setShowScanner] = useState(false);
  const [scannerType, setScannerType] = useState<'clockIn' | 'breakStart' | 'breakEnd' | 'clockOut'>('clockIn');

  const handleScanButton = (type: typeof scannerType) => {
    setScannerType(type);
    setShowScanner(true);
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="bg-white p-4 flex items-center justify-between shadow-sm">
        <Menu className="w-6 h-6" />
        <Logo />
        <Bell className="w-6 h-6" />
      </header>

      <main className="p-4 max-w-xl mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600">Current Time</p>
            <h1 className="text-4xl font-bold">{currentTime}</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => handleScanButton('clockIn')}>
              Clock In
            </Button>
            <Button 
              variant="secondary"
              onClick={() => handleScanButton('breakStart')}
            >
              Break Start
            </Button>
            <Button 
              variant="secondary"
              onClick={() => handleScanButton('breakEnd')}
            >
              Break End
            </Button>
            <Button onClick={() => handleScanButton('clockOut')}>
              Clock Out
            </Button>
          </div>
        </div>
      </main>

      {showScanner && (
        <QRScanner
          type={scannerType}
          onClose={() => setShowScanner(false)}
          onScan={() => {
            // Handle scan logic
            setShowScanner(false);
          }}
        />
      )}
    </div>
  );
}