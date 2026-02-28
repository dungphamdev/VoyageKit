# Scan & Suggest - AI Mobile App

A modern, cross-platform mobile application that uses AI to detect objects in real-time and suggest missing items that would complement the scene.

---

## 📂 Project Structure

- `backend/`: Next.js API server using Google Gemini AI for image analysis.
- `mobile_app/`: React Native (Expo) application with camera integration.

---

## 🚀 Getting Started

### 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Expo Go](https://expo.dev/expo-go) app on your physical device.
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey).

---

## 🛠️ Backend Setup (Next.js)

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the `backend/` directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The backend will start at `http://localhost:3000`.

---

## 📱 Mobile App Setup (Expo)

1. **Navigate to the mobile app directory**:
   ```bash
   cd mobile_app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Backend URL**:
   To allow your physical device to talk to your local backend, you need to use your machine's local IP address.
   
   Create a `.env` file in the `mobile_app/` directory:
   ```env
   EXPO_PUBLIC_API_URL=http://<YOUR_LOCAL_IP>:3000/api/analyze
   ```
   *(Tip: Find your IP using `ipconfig` on Windows or `ifconfig` on Mac/Linux)*.

4. **Run the app**:
   ```bash
   npm run start
   ```

5. **Scan the QR Code**:
   - Open the **Expo Go** app on your phone.
   - Scan the QR code shown in your terminal.

---

## 💡 Troubleshooting (Network Issues)

If the app cannot reach the backend:
- Ensure both your phone and computer are on the **same Wi-Fi network**.
- Check that your computer's **firewall** allows incoming connections on port 3000.
- Verify `EXPO_PUBLIC_API_URL` uses your actual local IP (e.g., `192.168.1.x`), not `localhost`.

---

## ✨ Features (Planned)

- [x] Real-time camera integration.
- [x] AI-powered object analysis via Gemini 1.5 Flash.
- [ ] Context-aware missing item suggestions.
- [ ] Premium, modern UI with smooth animations.
- [ ] Offline support for basic detection.
