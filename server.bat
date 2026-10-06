
@REM This PC\OPPO A54\Internal shared storage\Android\data\com.coloros.backuprestore
@REM "deployment command": git tag -a v1.1.97 -m "Production release v1.1.97" && git push origin v1.1.97 employeesalary,salarycomponent,payslip delete karde lala
@REM last working tag v1.1.70

@REM always create venv with this version
@REM python3.10 -m venv venv

@REM #code for server.sh file for linux or mac
@REM #to start the Django server "./server.sh"
@REM set -e

@REM echo "📁 Changing to backend directory..."
@REM cd hrms_backend || { echo "❌ Failed to cd to backend"; exit 1; }

@REM echo "🐍 Activating virtual environment..."
@REM # source venv/bin/activate || { echo "❌ Failed to activate venv"; exit 1; }
@REM .\venv\Scripts\Activate.sh || venv\Scripts\activate.bat || { echo "❌ Failed to activate venv"; exit 1; }

@REM echo "🚀 Starting Django server..."
@REM python manage.py runserver
@REM # python -m pip install -r requirements.txt

@REM  #code for server.bat file for windows
@REM #to start the Django server "server.bat"
@echo off
echo Changing to backend directory...
cd backend || exit /b 1

echo Activating virtual environment...
call venv\Scripts\activate || exit /b 1

echo Starting Django server...
python manage.py runserver