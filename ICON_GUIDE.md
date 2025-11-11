# App Icon Change Guide

## 📦 Step 1: Prepare Icon Files

### Required Files

- **icon.icns** - For macOS (1024x1024px)
- **icon.ico** - For Windows (256x256px)
- **icon.png** - For Linux (512x512px)

### Icon Generation Methods

#### A. Online Conversion Tool (Easiest)

1. Visit https://cloudconvert.com
2. Upload PNG/JPG file
3. Select conversion format (ICNS, ICO)
4. Download

#### B. Command Line Tool (macOS)

```bash
# Install Homebrew (if not installed)
# /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install ImageMagick
brew install imagemagick

# Generate ICNS from PNG
mkdir icon.iconset
sips -z 16 16     icon-1024.png --out icon.iconset/icon_16x16.png
sips -z 32 32     icon-1024.png --out icon.iconset/icon_16x16@2x.png
sips -z 32 32     icon-1024.png --out icon.iconset/icon_32x32.png
sips -z 64 64     icon-1024.png --out icon.iconset/icon_32x32@2x.png
sips -z 128 128   icon-1024.png --out icon.iconset/icon_128x128.png
sips -z 256 256   icon-1024.png --out icon.iconset/icon_128x128@2x.png
sips -z 256 256   icon-1024.png --out icon.iconset/icon_256x256.png
sips -z 512 512   icon-1024.png --out icon.iconset/icon_256x256@2x.png
sips -z 512 512   icon-1024.png --out icon.iconset/icon_512x512.png
sips -z 1024 1024 icon-1024.png --out icon.iconset/icon_512x512@2x.png
iconutil -c icns icon.iconset

# Generate ICO from PNG (for Windows)
convert icon-256.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico
```

## 📂 Step 2: Place Files

Copy the generated icon files to the following location:

```
multi-ai-electron/
├── resources/
│   ├── icon.icns          # For macOS
│   ├── icon.ico           # For Windows
│   └── icon.png           # For Linux
└── package.json
```

## ⚙️ Step 3: Configure package.json

Add icon paths to the "build" section in package.json:

```json
"build": {
  "appId": "com.paletai.app",
  "productName": "Palet AI",
  "icon": "resources/icon.png",
  "mac": {
    "icon": "resources/icon.icns",
    ...
  },
  "win": {
    "icon": "resources/icon.ico"
  },
  "linux": {
    "icon": "resources/icon.png"
  }
}
```

## 🔨 Step 4: Build

```bash
# Clean cache
rm -rf dist

# Rebuild
npm run dist:mac        # For macOS
npm run dist:win        # For Windows
npm run dist:linux      # For Linux
```

## 💡 Tips

1. **Source Image Size**: Minimum 1024x1024px (square)
2. **Image Format**: PNG (transparent background supported)
3. **Design**: Simple and clear designs look better at small sizes
4. **Testing**: Check the icon in Finder after building

## 🎨 Free Icon Resources

- https://www.flaticon.com
- https://icons8.com
- https://www.iconfinder.com
- https://heroicons.com
