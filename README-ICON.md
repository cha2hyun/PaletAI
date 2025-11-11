# 🎨 Changing App Icon

## ⚡ Quick Start

### 1️⃣ Prepare Icon Image

- **Recommended Size**: 1024x1024px (square)
- **Format**: PNG (transparent background supported)
- **Design**: Simple and clear designs work best

### 2️⃣ Generate Icon (2 Methods)

#### Method A: Using Automatic Script (macOS only)

```bash
# After preparing a 1024x1024 PNG image:
./create-icon.sh your-image.png

# Automatically generates:
# - resources/icon.icns (for macOS)
# - resources/icon.png (for Linux)
```

#### Method B: Online Conversion (All OS)

1. **ICNS for macOS**:

   - Visit https://cloudconvert.com/png-to-icns
   - Upload image → Convert → Download
   - Save as `resources/icon.icns`

2. **ICO for Windows** (optional):

   - Visit https://cloudconvert.com/png-to-ico
   - Save as `resources/icon.ico`

3. **PNG for Linux**:
   - Resize to 512x512
   - Save as `resources/icon.png`

### 3️⃣ Build

```bash
# Clean cache
rm -rf dist

# Build app
npm run dist:mac        # macOS
npm run dist:win        # Windows
npm run dist:linux      # Linux
```

### 4️⃣ Verify

- macOS: Check the `.app` file's icon in Finder
- Drag to Dock to see the updated Dock icon

---

## 📁 File Structure

```
multi-ai-electron/
├── resources/
│   ├── icon.icns              # For macOS ✅
│   ├── icon.ico               # For Windows (optional)
│   ├── icon.png               # For Linux ✅
│   └── entitlements.mac.plist
├── create-icon.sh             # Icon generation script
├── package.json               # Icon paths configured ✅
└── README-ICON.md             # This file
```

---

## 🎯 Current Configuration (package.json)

```json
"build": {
  "icon": "resources/icon.png",      // Default icon
  "mac": {
    "icon": "resources/icon.icns"    // macOS icon
  },
  "win": {
    "icon": "resources/icon.ico"     // Windows icon
  },
  "linux": {
    "icon": "resources/icon.png"     // Linux icon
  }
}
```

---

## 💡 Tips

### Good Icon Design

- ✅ Simple and clean design
- ✅ Clear silhouette
- ✅ Adequate padding
- ✅ Recognizable at small sizes
- ❌ Overly complex details
- ❌ Small text

### Free Icon Resources

- **Flaticon**: https://www.flaticon.com
- **Icons8**: https://icons8.com
- **Heroicons**: https://heroicons.com
- **Material Icons**: https://fonts.google.com/icons

### Icon Creation Tools

- **Figma**: Vector icon design
- **Canva**: Easy graphic design
- **GIMP**: Free image editing

---

## 🔧 Troubleshooting

### When Icon Doesn't Change

```bash
# 1. Completely clear cache
rm -rf dist
rm -rf node_modules/.cache

# 2. Rebuild
npm run dist:mac

# 3. Reset macOS icon cache
sudo rm -rf /Library/Caches/com.apple.iconservices.store
killall Dock
killall Finder
```

### When ICNS File is Missing

```bash
# Use create-icon.sh script
./create-icon.sh your-image.png
```

### When Windows ICO File is Needed

- Use https://cloudconvert.com/png-to-ico
- Or install ImageMagick:
  ```bash
  brew install imagemagick
  convert icon.png -define icon:auto-resize=256,128,64,48,32,16 resources/icon.ico
  ```

---

## ✨ Example

If you want to change the project's default icon to an AI style:

```bash
# 1. Download an AI-related icon
# Search for "AI" on https://www.flaticon.com

# 2. Save PNG file as 1024x1024

# 3. Run the script
./create-icon.sh ai-icon-1024.png

# 4. Build
npm run dist:mac

# Done! 🎉
```

---

**Reference**: See `ICON_GUIDE.md` for more detailed information.
