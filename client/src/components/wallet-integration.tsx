import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { solanaService, formatSolBalance } from '@/lib/solana-utils';

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
      isConnected: boolean;
      publicKey?: { toString: () => string };
      on: (event: string, callback: () => void) => void;
      off: (event: string, callback: () => void) => void;
    };
  }
}

interface WalletIntegrationProps {
  onWalletConnect?: (publicKey: string) => void;
  onWalletDisconnect?: () => void;
}

export default function WalletIntegration({ onWalletConnect, onWalletDisconnect }: WalletIntegrationProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const checkWalletConnection = () => {
      if (window.solana?.isConnected && window.solana.publicKey) {
        const pubKey = window.solana.publicKey.toString();
        setIsConnected(true);
        setPublicKey(pubKey);
        onWalletConnect?.(pubKey);
      }
    };

    checkWalletConnection();

    const handleConnect = () => {
      checkWalletConnection();
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      setPublicKey('');
      onWalletDisconnect?.();
    };

    if (window.solana) {
      window.solana.on('connect', handleConnect);
      window.solana.on('disconnect', handleDisconnect);
    }

    return () => {
      if (window.solana) {
        window.solana.off('connect', handleConnect);
        window.solana.off('disconnect', handleDisconnect);
      }
    };
  }, [onWalletConnect, onWalletDisconnect]);

  const connectWallet = async () => {
    if (!window.solana) {
      window.open('https://phantom.app/', '_blank');
      return;
    }

    try {
      setIsConnecting(true);
      const response = await window.solana.connect();
      const pubKey = response.publicKey.toString();
      setIsConnected(true);
      setPublicKey(pubKey);
      onWalletConnect?.(pubKey);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    if (!window.solana) return;

    try {
      await window.solana.disconnect();
      setIsConnected(false);
      setPublicKey('');
      onWalletDisconnect?.();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (isConnected && publicKey) {
    return (
      <motion.div
        className="flex items-center space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-2 px-4 py-2 rounded-lg border"
             style={{ 
               borderColor: '#39FF14', 
               background: 'rgba(57, 255, 20, 0.1)',
               color: '#F5F5F5'
             }}>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-mono">{truncateAddress(publicKey)}</span>
        </div>
        <Button
          onClick={disconnectWallet}
          variant="outline"
          size="sm"
          className="text-white border-red-500 hover:bg-red-500 hover:text-white"
        >
          Disconnect
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      <motion.div
        className="relative overflow-hidden rounded-2xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(45deg, #39FF14, #FFD700, #9A00FF)',
            backgroundSize: '300% 300%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <Button
          onClick={connectWallet}
          disabled={isConnecting}
          className="relative z-10 w-full h-14 text-black font-bold text-lg border-0 bg-transparent hover:bg-transparent"
          style={{
            background: 'rgba(13, 13, 13, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="flex items-center justify-center space-x-3">
            {isConnecting ? (
              <>
                <motion.div
                  className="w-5 h-5 border-3 border-black border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Connecting to Phantom...</span>
              </>
            ) : (
              <>
                <motion.i 
                  className="fas fa-wallet text-xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span>
                  {window.solana ? 'Connect Phantom Wallet' : 'Install Phantom Wallet'}
                </span>
                <motion.i 
                  className="fas fa-arrow-right"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </>
            )}
          </div>
        </Button>
      </motion.div>
      
      {/* Glowing effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl blur-xl opacity-30"
        style={{
          background: 'linear-gradient(45deg, #39FF14, #FFD700, #9A00FF)',
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}