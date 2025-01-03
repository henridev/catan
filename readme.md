# Catan boardgame

## setup

```ps
cd ./game
npm i
npm run dev
```


@echo off
setlocal enabledelayedexpansion

:: Define executable names
set EXE1=Executable1.exe
set EXE2=Executable2.exe
set EXE3=Executable3.exe

:: Define paths to executables
set PATH1=C:\Path\To\Executable1.exe
set PATH2=C:\Path\To\Executable2.exe
set PATH3=C:\Path\To\Executable3.exe

:: Function to check and launch an application
call :CheckAndLaunch "%EXE1%" "%PATH1%"
call :CheckAndLaunch "%EXE2%" "%PATH2%"
call :CheckAndLaunch "%EXE3%" "%PATH3%"

echo All checks completed.
pause
exit

:: Function definition
:CheckAndLaunch
set EXE=%~1
set PATH=%~2

:: Check if the process is already running
tasklist /FI "IMAGENAME eq !EXE!" | find /I "!EXE!" >nul
if %ERRORLEVEL% equ 0 (
    echo !EXE! is already running. Skipping launch.
) else (
    echo Launching !EXE!...
    start "" "!PATH!"
    echo !EXE! launched successfully.
)
timeout /t 2 /nobreak >nul
exit /b