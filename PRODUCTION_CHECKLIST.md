# Palet AI - Production Deployment Checklist

## ✅ Completed Items

### Code Quality

- [x] TypeScript type safety verified
- [x] Linter errors fixed
- [x] Unnecessary console.log removed
- [x] Developer tools restricted to development mode only

### UI/UX

- [x] Dark mode minimal design applied
- [x] Pretendard font applied
- [x] Consistent styling across all components
- [x] Responsive layouts (Column/Row/Grid)
- [x] Optimized hover/focus states

### Features

- [x] Multi-AI simultaneous query feature
- [x] Automatic session saving
- [x] Browser integration
- [x] Layout selection feature
- [x] Service on/off toggle

### Documentation

- [x] User-friendly README written
- [x] App icon and screenshot included
- [x] Installation and usage guide written
- [x] GitHub repository link added

### Security

- [x] contextIsolation enabled
- [x] nodeIntegration disabled
- [x] sandbox mode enabled
- [x] External links with rel="noopener noreferrer"

### Deployment Preparation

- [x] package.json information updated
  - name: palet-ai
  - productName: Palet AI
  - author: @cha2hyun
  - appId: com.paletai.app
- [x] App icons prepared (icns, ico, png)
- [x] Build scripts configured

## 🚀 Deployment Steps

### 1. Final Testing

```bash
# Test in development mode
npm run dev
npm run dev:electron

# Test production build
npm run build
```

### 2. Platform-Specific Builds

```bash
# macOS (Apple Silicon)
npm run dist:mac:arm64

# macOS (Intel)
npm run dist:mac:x64

# macOS (Universal)
npm run dist:mac:universal

# Windows
npm run dist:win

# Linux
npm run dist:linux
```

### 3. Verify Build Output

- Check generated installer files in `dist/` folder
- macOS: `.dmg` file
- Windows: `.exe` file
- Linux: `.AppImage`, `.deb` files

### 4. Test Installation

Perform actual installation on each platform and verify:

- [ ] Is the app icon displayed correctly?
- [ ] Can you log in to all AI services?
- [ ] Does prompt sending work properly?
- [ ] Is layout changing smooth?
- [ ] Is the session maintained after restart?
- [ ] Are developer tools hidden in production?

## 📋 Version Management

### Current Version

- **v1.0.0**

### For Next Version Release

1. Update version in `package.json`
2. Record changes in `CHANGELOG.md`
3. Create Git tag
   ```bash
   git tag -a v1.1.0 -m "Release v1.1.0"
   git push origin v1.1.0
   ```

## ⚠️ Important Notes

### AI Service Terms

- Comply with the terms of service of each AI service (ChatGPT, Gemini, Claude, Perplexity)
- Automated mass requests may violate service policies
- Recommended for personal use and learning purposes

### Security

- User login information is stored locally only
- No data is sent to servers
- Each service's session is managed independently

### Updates

- Selector updates may be required when AI service UIs change
- Manage selectors in `src/constants/aiServices.ts`

## 📞 Support

If you encounter issues:

1. Report bugs on [GitHub Issues](https://github.krafton.com/sh-chae/multi-ai-electron/issues)
2. Attach screenshots and error logs
3. Provide environment information (OS, version, etc.)

---

**Complete all checklists before proceeding with deployment!**
