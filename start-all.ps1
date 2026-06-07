# MY CRIDITE - Demarrer API + Frontend (2 fenetres)
$root = $PSScriptRoot
Start-Process powershell -ArgumentList "-NoExit", "-File", "`"$root\start-api.ps1`""
Start-Sleep -Seconds 2
Start-Process powershell -ArgumentList "-NoExit", "-File", "`"$root\start-frontend.ps1`""
Write-Host "Ouverture de 2 terminaux: API (8000) et React (3000)" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "API:      http://localhost:8000" -ForegroundColor Yellow
