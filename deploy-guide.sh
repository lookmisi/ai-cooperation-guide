#!/bin/bash

# GitHub 部署腳本
# 使用方法：在 PowerShell 中執行以下指令

echo "=== AI 合作指南 GitHub 部署腳本 ==="
echo ""

# 檢查是否已設定遠端倉庫
echo "步驟 1: 檢查遠端倉庫設定"
git remote -v

echo ""
echo "步驟 2: 如果還沒設定遠端倉庫，請執行以下指令："
echo "git remote add origin https://github.com/您的用戶名/您的倉庫名稱.git"
echo ""

echo "步驟 3: 推送到 GitHub"
echo "git branch -M main"
echo "git push -u origin main"
echo ""

echo "步驟 4: 啟用 GitHub Pages"
echo "1. 前往 GitHub 倉庫頁面"
echo "2. 點擊 Settings 標籤"
echo "3. 滾動到 Pages 區域"
echo "4. 在 Source 選擇 'Deploy from a branch'"
echo "5. 選擇 'main' 分支"
echo "6. 點擊 Save"
echo ""

echo "步驟 5: 訪問您的網站"
echo "網址將會是: https://您的用戶名.github.io/您的倉庫名稱/"
echo ""

echo "=== 部署完成！ ==="
