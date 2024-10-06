# Oasis Project Fall 2024

### Install the following:
1. Install yarn:
   
- `brew install yarn` (macOS)
- `winget install -e --id Yarn` (Windows)

2. `npm install`

3. `npx expo install react-native-vision-camera`

4. `npm install -g eas-cli`

5. Log in to your Expo account:
   ```
   eas login
   ```

6. `eas build:configure`

7. Create a development build:
   - For iOS simulator:
     ```
     eas build --profile development-simulator --platform ios
     ```
   - For iOS device:
     ```
     eas build --profile development --platform ios
     ```
   - For Android:
     ```
     eas build --profile development --platform android
     ```

8. Install the development build:
   - For iOS simulator:
     ```
     eas build:run --platform ios
     ```
   - For physical devices, follow the instructions provided by EAS after the build is complete.

### To start:
 `npx expo start --dev-client`
