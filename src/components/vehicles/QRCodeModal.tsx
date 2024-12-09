import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeModalProps {
  value: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ value }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">QR Code</h3>
      <QRCodeSVG value={value} size={128} fgColor="#FFFFFF" bgColor="#000000" />
    </div>
  );
};

export default QRCodeModal;
