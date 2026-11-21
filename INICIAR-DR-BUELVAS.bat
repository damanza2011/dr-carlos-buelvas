@echo off
title Clinica Odontologica Dr. Carlos Buelvas
color 0B
echo ========================================================
echo   CLINICA DR. CARLOS BUELVAS - ODONTOLOGIA ESPECIALIZADA
echo ========================================================
echo.
echo [1/2] Verificando entorno local...
cd /d "%~dp0"

echo [2/2] Abriendo aplicacion en tu navegador...
echo.

:: Intenta iniciar servidor local ligero con Python para soporte 100% microfono Web Speech API
python -c "import http.server, webbrowser, socket; s=socket.socket(); s.bind(('', 0)); port=s.getsockname()[1]; s.close(); webbrowser.open(f'http://localhost:{port}'); http.server.test(HandlerClass=http.server.SimpleHTTPRequestHandler, port=port)" 2>nul

:: Si Python no esta disponible o falla, abre directamente index.html en el navegador predeterminado
if %ERRORLEVEL% NEQ 0 (
    echo Iniciando directamente en navegador...
    start "" "index.html"
)

echo.
echo La aplicacion esta abierta. Puedes minimizar esta ventana.
echo ========================================================
