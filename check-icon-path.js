// 아이콘 경로 디버깅 스크립트
const { app } = require('electron');
const { join } = require('path');
const fs = require('fs');

app.whenReady().then(() => {
  console.log('\n=== 아이콘 경로 디버깅 ===\n');

  const appPath = app.getAppPath();
  console.log('📁 App Path:', appPath);

  const iconPath = join(appPath, 'resources/icon.icns');
  console.log('🎨 Icon Path:', iconPath);

  const exists = fs.existsSync(iconPath);
  console.log('✅ File Exists:', exists ? 'YES' : 'NO');

  if (exists) {
    const stats = fs.statSync(iconPath);
    console.log('📊 File Size:', (stats.size / 1024 / 1024).toFixed(2), 'MB');
  } else {
    console.log('\n❌ 아이콘 파일을 찾을 수 없습니다!');
    console.log('다음 명령어를 실행하세요:');
    console.log('  ./create-icon.sh src/assets/icons/Icon.png');
  }

  console.log('\n=========================\n');

  app.quit();
});
