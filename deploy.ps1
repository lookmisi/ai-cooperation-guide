# AI 合作指南 GitHub 部署腳本 (PowerShell 版本)
# 使用方法：在 PowerShell 中執行 .\deploy.ps1

Write-Host "=== AI 合作指南 GitHub 部署腳本 ===" -ForegroundColor Cyan
Write-Host ""

# 檢查是否已設定遠端倉庫
Write-Host "步驟 1: 檢查遠端倉庫設定" -ForegroundColor Yellow
& "C:\Program Files\Git\bin\git.exe" remote -v

Write-Host ""
Write-Host "如果看到空白結果，表示還沒設定遠端倉庫" -ForegroundColor Yellow
Write-Host ""

# 提醒使用者設定遠端倉庫
Write-Host "請先在 GitHub 建立新的倉庫，然後執行以下指令：" -ForegroundColor Green
Write-Host "git remote add origin https://github.com/您的用戶名/您的倉庫名稱.git" -ForegroundColor White
Write-Host ""

$response = Read-Host "您是否已經設定好遠端倉庫？(y/n)"

if ($response -eq 'y' -or $response -eq 'Y') {
    Write-Host "正在推送到 GitHub..." -ForegroundColor Green
    
    # 設定主分支
    & "C:\Program Files\Git\bin\git.exe" branch -M main
    
    # 推送到 GitHub
    & "C:\Program Files\Git\bin\git.exe" push -u origin main
    
    Write-Host ""
    Write-Host "推送完成！" -ForegroundColor Green
    Write-Host ""
    Write-Host "接下來的步驟：" -ForegroundColor Yellow
    Write-Host "1. 前往您的 GitHub 倉庫頁面" -ForegroundColor White
    Write-Host "2. 點擊 'Settings' 標籤" -ForegroundColor White
    Write-Host "3. 在左側選單找到 'Pages'" -ForegroundColor White
    Write-Host "4. 在 'Source' 選擇 'Deploy from a branch'" -ForegroundColor White
    Write-Host "5. 選擇 'main' 分支和 '/ (root)' 資料夾" -ForegroundColor White
    Write-Host "6. 點擊 'Save'" -ForegroundColor White
    Write-Host ""
    Write-Host "您的網站將在幾分鐘後可在以下網址訪問：" -ForegroundColor Green
    Write-Host "https://您的用戶名.github.io/您的倉庫名稱/" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "請先完成以下步驟：" -ForegroundColor Yellow
    Write-Host "1. 前往 https://github.com" -ForegroundColor White
    Write-Host "2. 點擊右上角的 '+' 然後選擇 'New repository'" -ForegroundColor White
    Write-Host "3. 輸入倉庫名稱 (例如: ai-cooperation-guide)" -ForegroundColor White
    Write-Host "4. 選擇 'Public' (這樣 GitHub Pages 才能正常運作)" -ForegroundColor White
    Write-Host "5. 點擊 'Create repository'" -ForegroundColor White
    Write-Host "6. 複製倉庫的 HTTPS 網址" -ForegroundColor White
    Write-Host "7. 執行: git remote add origin [您的倉庫網址]" -ForegroundColor White
    Write-Host "8. 再次執行此腳本" -ForegroundColor White
}

Write-Host ""
Write-Host "=== 腳本執行完畢 ===" -ForegroundColor Cyan
