import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import InstaPayQr from 'react-native-instapay-qr';

export default function Index() {
  const [scanning, setScanning] = useState(true);
  const [qrData, setQrData] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleRead = (data, errs) => {
    if (errs.length > 0) {
      console.log('Errors:', errs);
      setErrors(errs);
      return;
    }
    setQrData(data);
    setScanning(false); // Stop scanning once QR is read
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>InstaPay QR Scanner</Text>

      {scanning && (
        <InstaPayQr
          style={{ height: 300, width: 300 }}
          cameraStyle={{ flex: 1 }}
          scanning={scanning}
          onRead={handleRead}
        />
      )}

      {qrData && (
        <View style={styles.result}>
          <Text>Country Code: {qrData.countryCode}</Text>
          <Text>City: {qrData.city}</Text>
          <Text>Name: {qrData.name}</Text>
          <Text>Account #: {qrData.accountNumber}</Text>
          <Text>SWIFT Code: {qrData.swiftCode}</Text>
          <Text>Bank: {qrData.bankName}</Text>
        </View>
      )}

      {errors.length > 0 && (
        <>
          <Text style={styles.error}>Error when reading QR.</Text>
          <Text style={styles.error}>{errors}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  result: {
    marginTop: 20,
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
});
