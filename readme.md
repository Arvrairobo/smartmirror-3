# S.A.M. (Smart Assistant Mirror)

## Project description here
SAM is a customizable smart mirror that combines that power of a
microcomputer with an everyday household mirror. Using two-way mirror technology, SAM can
display a dashboard interface through a reflective mirror, presenting users with useful
information and widgets such as weather info, calendar appointments, and more. It features a
user-friendly configuration system, as well as Wi-Fi connectivity for always up-to- date
information.

## Widgets
* news
* outfit of the day (ootd)
* stocks
* clock (today)
* weather
* horoscope
* **Voice support!** (consumed "welcome" widget)

## Supported Commands
Refer to command.json.

## To Extend Voice Support
To add extra features to the voice support, refer to the file /widgets/voice/voice.js. The current speech-to-text
technology is through <a href="https://www.talater.com/annyang/">Annyang</a>. The current text-to-speech technology is <a href="https://responsivevoice.org/">ResponsiveVoice.js</a>.

## How To Add Custom Built Widgets
To add your very own widget, simply add a folder with your widget's name in the /widgets directory.
In that folder, you will place your js file that will control your widget.
While making your controller js file, keep in mind that the module wrapper's name and the module value within
config.json file must match in order of the application to render your widget properly. If you widget requires
to utilize any external APIs, this can be done within the server.js file. Refer to the given examples within the file.

## To Do List
* Add functionality to voice widget
  * Further extend voice capabilites
* Roger's Widget

## Group Members
Jose Ruiz  
Phouthasak Douanglee  
Thom Cohers  
Roger Cornell

## License
SAM is released under the [MIT license](license.md)
