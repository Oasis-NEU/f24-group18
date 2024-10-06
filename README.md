# Oasis Project Fall 2024

### Install the following:
1. Install yarn:
   
- `brew install yarn` (macOS)
- `winget install -e --id Yarn` (Windows)

2. `npm install`

3. `npx add expo` (idk if this is correct im sorry if this messes things up)

4. `npx expo install react-native-vision-camera`

5. `npx expo install expo-image-picker`

6. `npm install -g eas-cli`

7. Log in to your Expo account:
   ```
   eas login
   ```

8. `eas build:configure`

9. Create a development build:
   `eas build --platform ios --profile development`
10. Install the development build:
   - For iOS simulator:
     ```
     eas build:run --platform ios
     ```
   - For physical devices, follow the instructions provided by EAS after the build is complete.

### To start:
 `npx expo start --dev-client`
