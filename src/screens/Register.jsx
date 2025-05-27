import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Register = () => {
  const [selectedCountry, setSelectedCountry] = React.useState('');

  return (
    <ScrollView style={styles.container}>
      {/* Logo and Title */}
      <View style={styles.header}>
        <Image
          source={require('../assets/nexus_logo.png')} // Update with your logo path
          style={styles.logo}
        />
        <Text style={styles.title}>REGISTER</Text>
      </View>

      {/* Input Fields */}
      <InputField label="Account name" placeholder="Enter account name here" />
      <InputField label="Full name" placeholder="Enter full name here" />
      <InputField label="Surname" placeholder="Enter surname here" />
      <InputField label="Email address" placeholder="Enter email address" />
      <InputField label="Confirm email" placeholder="Confirm email address" />
      
      {/* Country Picker */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Country</Text>
        <View style={styles.inputBox}>
          <Picker
            selectedValue={selectedCountry}
            onValueChange={(itemValue) => setSelectedCountry(itemValue)}
            style={styles.picker}
            dropdownIconColor="white">
            <Picker.Item label="Select Country" value="" />
            <Picker.Item label="Country 1" value="country1" />
            <Picker.Item label="Country 2" value="country2" />
            {/* Add all countries here */}
          </Picker>
        </View>
      </View>

      {/* Address Field */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.inputBox, styles.addressInput]}
          placeholder="Enter address here"
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const InputField = ({ label, placeholder }) => (
  <View style={styles.inputRow}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.inputBox}
      placeholder={placeholder}
      placeholderTextColor="#999"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    color: 'white',
    width: 120,
    marginRight: 10,
  },
  inputBox: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    color: 'black',
  },
  addressInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  picker: {
    color: 'black',
  },
  registerButton: {
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    alignSelf: 'center',
    marginTop: 15,
  },
  backText: {
    color: 'white',
    textDecorationLine: 'underline',
  },
});

export default Register;