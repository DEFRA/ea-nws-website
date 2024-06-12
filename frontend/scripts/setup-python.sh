if ! command -v python3 &>/dev/null; then
    echo "Python 3 is not installed. Installing Python3..."
    sudo apt-get update
    sudo apt-get install -y python3 python3-pip
else 
    echo "Python 3 is already installed"
fi

if ! command -v pip3 &>/dev/null; then
    echo "pip3 is not installed. Installing pip3..."
    sudo pip install
else 
    echo "pip3 is already installed"
fi

echo "Installing pytest..."
pip3 install pytest

echo "Installing Selenium..."
pip3 install selenium

echo "installing ChromeDriver..."
sudo apt-get install -y chromium-chromedriver