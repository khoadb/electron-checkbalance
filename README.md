# electron-checkbalance
New Check-balance Kiosk powered by Electron


To use Electron and node-hid (i.e for connecting to RFID desktop reader) there are some important conditions need to meet:
 
* Install Nodejs on Raspberry Pi
* Run Npm init (to initiate and create a package.json file)
* Define necessary package names in package.json, electron-prebuilt AND electron rebuild 
* Run npm install (to install the packages defined in package.json
* Run the electron rebuild script in ./node_modules/.bin/electron-rebuild (this is very important to make node-hid runs with electron and the nodejs version within electron.)
* Run the electron app with sudo, i.e sudo npm start (very important, otherwise the node-hid will not run correctly due to insufficient privilege.

Bower
- use bower install in app directory to install all packages defined in bower.json (navigate to the app directory where bowser.json is located. if bower is not installed then issue command: npm install bower, this will intall locally in node_module. to use bower, run node_modules/.bin/bower.)
 
Autostart in Raspberry Pi
 
Edit file ~/.config/lxsession/LSDE-pi/autostart
Add line @sh /home/pi/development/checkbalance-app/tools/launcher.sh (note, the launcher.sh needs to be created and edited first.


