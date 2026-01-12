🐾 Pet Store Mobile App
A cross-platform React Native (Expo) application for browsing pets, viewing details, and adding pets via validated forms.
Built with scalability, type safety, and maintainability as first-class concerns.
📱 Platforms Supported
iOS (Simulator & Physical Device)
Android (Emulator & Physical Device)
Built using Expo, ensuring a single codebase with native performance.
🧱 Tech Stack & Libraries Used
Core
React Native
Expo
TypeScript – strict typing across the app
UI & Navigation
expo-router – file-based, typed navigation
react-native-safe-area-context
@expo/vector-icons
Forms & Validation
Yup / Zod – schema-based validation
JSON Schema – portable validation definition
Controlled inputs with validation feedback
Media
expo-image-picker – camera & gallery access
State & Logic
React Hooks
Feature-based component structure
Unidirectional data flow
Networking
Fetch API
Typed API responses
Error handling & normalization
🏗️ Architecture Overview
The project follows a feature-based architecture, not a screen-based one.
src/
├── components/ # Reusable UI components (Toast, Forms, Cards)
├── screens/ # Screen-level components
├── services/ # API & network logic
├── utils/ # Validation schemas, helpers
├── types/ # Global TypeScript types
├── data/ # Dummy / mock data
└── store/ # State management (if applicable)
Why this architecture?
Clear separation of concerns
Scales cleanly as features grow
Easy to test, refactor, and onboard new developers
Prevents UI + business logic coupling
🧾 Forms & Validation Strategy
All forms (e.g., Pet Details Form) use schema-driven validation.
Benefits
Single source of truth
Consistent frontend + backend rules
Easier debugging
Strong runtime guarantees
Validation is handled using:
Zod / Yup for runtime validation
JSON Schema for portability and documentation
🌐 Third-Party APIs Used
Dog Image API (Dog CEO)
Endpoint Example
https://dog.ceo/api/breeds/image/random
Reason for Usage
Free and publicly available
No authentication required
Reliable image hosting
Perfect for demos, prototypes, and learning projects
