# CyberRanger Repository

This repository contains two distinct applications:

## 🛡️ CyberRanger Security Scanner (Qt/C++)

A professional network security scanner and penetration testing tool built with Qt6. Located in the root directory.

**Documentation**: See main [README.md](README.md)

**Features**:
- Wi-Fi network scanning
- Bluetooth device discovery
- Network topology mapping
- Cross-platform (Linux & Windows)

## 🛍️ CyberStore E-Commerce API (Node.js/TypeScript)

A modern e-commerce API server with Stripe integration. Located in the `/server` and `/client` directories.

**Documentation**: 
- Server API: [server/README.md](server/README.md)
- Deployment: [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)

**Features**:
- Product catalog with search and filtering
- User authentication (JWT)
- Stripe payment processing
- Order management
- RESTful API

## 🚀 Quick Start

### For CyberRanger Security Scanner:
```bash
# Linux
./build_linux.sh
./release/CyberRanger

# Windows
build_windows.bat
```

### For CyberStore E-Commerce API:
```bash
# Install dependencies
cd server && npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Start development server
npm run dev
```

### Deploy CyberStore to Railway:
```bash
# See RAILWAY_DEPLOYMENT.md for complete instructions
railway up
```

## 📁 Repository Structure

```
CyberRanger/
├── Core/              # CyberRanger scanner modules
├── server/            # CyberStore API server (Node.js)
│   ├── src/          # TypeScript source files
│   ├── dist/         # Compiled JavaScript (generated)
│   └── README.md     # Server documentation
├── client/            # CyberStore frontend (Next.js)
├── CMakeLists.txt     # CyberRanger build configuration
├── Procfile           # Railway/Heroku process file
├── railway.json       # Railway deployment config
├── nixpacks.toml      # Nixpacks build configuration
├── README.md          # CyberRanger documentation
└── RAILWAY_DEPLOYMENT.md  # CyberStore deployment guide
```

## 🔧 Technology Stack

### CyberRanger (Security Scanner)
- **Framework**: Qt 6.4+
- **Language**: C++17
- **Build System**: CMake
- **Platforms**: Linux, Windows

### CyberStore (E-Commerce)
- **Backend**: Node.js 18+ with Express & TypeScript
- **Frontend**: Next.js 14 with React & TailwindCSS
- **Database**: MongoDB with Mongoose
- **Payments**: Stripe
- **Auth**: JWT with bcrypt

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines

## 🔒 Security

See [SECURITY.md](SECURITY.md) for security policies and responsible disclosure

---

**Note**: This repository contains two separate applications. Choose the appropriate documentation based on which application you're working with.
