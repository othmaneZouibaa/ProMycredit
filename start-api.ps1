# MY CRIDITE - Demarrer l'API Laravel (port 8000)
Set-Location "$PSScriptRoot\backend"
Write-Host "Demarrage API: http://localhost:8000" -ForegroundColor Green
php artisan serve --host=127.0.0.1 --port=8000
